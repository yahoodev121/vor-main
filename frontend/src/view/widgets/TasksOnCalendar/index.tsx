import React, { useEffect, useState } from 'react';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import FullCalendar, {
  EventContentArg,
} from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import rrulePlugin from '@fullcalendar/rrule';

import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';

import $ from 'jquery';

import MDBox from 'src/mui/components/MDBox';
import MDButton from 'src/mui/components/MDButton';
import { ButtonGroup } from '@mui/material';
import { makeStyles } from '@mui/styles';

import CalendarRoot from 'src/mui/shared/Calendar/CalendarRoot';

import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import actions from 'src/modules/widget/tasksOnCalendar/tasksOnCalendarActions';
import TaskViewModal from 'src/view/widgets/TasksOnCalendar/TaskViewModal';
import RecurringTaskModal from 'src/view/widgets/TasksOnCalendar/RecurringTaskModal';
import taskSelectors from 'src/modules/task/taskSelectors';
import tasksOnCalendarSelectors from 'src/modules/widget/tasksOnCalendar/tasksOnCalendarSelectors';
import TaskFormModal from 'src/view/widgets/TasksOnCalendar/TaskFormModal';
import Message from 'src/view/shared/message';
import upcomingTasksActions from 'src/modules/widget/upcomingTasks/upcomingTasksActions';
import Spinner from 'src/view/shared/Spinner';

interface TasksOnCalendarProps {
  title?: string;
  date?: string;
}

const useStyles: any = makeStyles({
  taskButton: {
    fontSize: '11px',
    fontWeight: 400,
    lineHeight: 1.7,
    borderRadius: '0.2rem',
    padding: '0.3rem 0.45rem',
    border: 'none',
    boxShadow:
      '0rem 0.25rem 0.375rem -0.0625rem rgba(0, 0, 0, 0.1),0rem 0.125rem 0.25rem -0.0625rem rgba(0, 0, 0, 0.06)!important',
    minHeight: 'unset',
    textTransform: 'none',
    '&:hover': {
      border: 'none',
      borderBottom: '2px solid white',
      transform: 'scale(1.02)',
      opacity: 1,
      lineHeight: 1.3,
    },
    '&:focus': {
      transform: 'scale(1.02)',
      borderBottom: '2px solid white',
      boxShadow:
        '0rem 0.25rem 0.375rem -0.0625rem rgba(0, 0, 0, 0.1),0rem 0.125rem 0.25rem -0.0625rem rgba(0, 0, 0, 0.06)!important',
      lineHeight: 1.3,
    },
    '& .MuiTouchRipple-root': {
      display: 'none',
    },
  },
});

function TasksOnCalendar({
  title,
  date,
}: TasksOnCalendarProps): JSX.Element {
  const [rerender, setRerender] = useState(0);
  const dispatch = useDispatch();

  const { miniSidenav4View, darkMode, sidenavColor } =
    selectMuiSettings();

  const editable = useSelector(
    taskSelectors.selectPermissionToEdit,
  );

  const isLoading = useSelector(
    tasksOnCalendarSelectors.selectLoading,
  );

  const calendarRef: any = React.useRef();

  const classes = useStyles();

  useEffect(() => {
    setTimeout(() => {
      try {
        calendarRef.current.getApi().updateSize();
      } catch {}
    }, 500);
  }, [dispatch, miniSidenav4View]);

  const handleDateClick = (dateInfo) => {
    if ($(dateInfo.dayEl).hasClass('fc-day-past')) {
      return;
    }
    if (editable) {
      if (
        $('.fc-event:not(.event-success)', dateInfo.dayEl)
          .length === 0
      ) {
        doOpenTaskFormModal(null, dateInfo.date);
      } else {
        doOpenRecurringTaskModal(dateInfo.date);
      }
      calendarRef.current.getApi().select(dateInfo.date);
    }
  };

  const handleEvents = (
    info,
    successCallback,
    failureCallback,
  ) => {
    dispatch(
      actions.doSearch(
        info,
        successCallback,
        failureCallback,
      ),
    );
  };

  const handleEventClick = (eventInfo) => {
    doOpenTaskViewModal(eventInfo.event.id);
  };

  const handleEventDrop = (eventDropInfo) => {
    dispatch(actions.doMove(eventDropInfo, calendarRef));
  };

  const [taskViewModalVisible, setTaskViewModalVisible] =
    useState(false);
  const [taskId4View, setTaskId4View] = useState(null);

  const doCloseTaskViewModal = () => {
    setTaskViewModalVisible(false);
  };

  const doOpenTaskViewModal = (id) => {
    setTaskId4View(id);
    setTaskViewModalVisible(true);
  };

  const doTaskFormModal = () => {
    setTaskFormFromRecurringTaskId(taskId4View);
    setNewTaskDueDate(null);
    setTaskFormModalVisible(true);
  };

  const [
    recurringTaskModalVisible,
    setRecurringTaskModalVisible,
  ] = useState(false);
  const [recurringTaskDate, setRecurringTaskDate] =
    useState(null);

  const setFilterAll = () => {
    dispatch(actions.doSetFilter('all'));
    setRerender(rerender + 1);
  };

  const setFilterControl = () => {
    dispatch(actions.doSetFilter('control'));
    setRerender(rerender + 1);
  };

  const setFilterNoControl = () => {
    dispatch(actions.doSetFilter('non-control'));
    setRerender(rerender + 1);
  };

  const doCloseRecurringTaskModal = () => {
    setRecurringTaskModalVisible(false);
  };

  const doOpenRecurringTaskModal = (date) => {
    setRecurringTaskDate(date);
    setRecurringTaskModalVisible(true);
  };

  const [taskFormModalVisible, setTaskFormModalVisible] =
    useState(false);
  const [newTaskDueDate, setNewTaskDueDate] =
    useState(null);
  const [
    taskFormFromRecurringTaskId,
    setTaskFormFromRecurringTaskId,
  ] = useState(null);

  const doCloseTaskFormModal = () => {
    setTaskFormModalVisible(false);
  };

  const doOpenTaskFormModal = (id, dueDate = null) => {
    setTaskFormFromRecurringTaskId(id);
    setNewTaskDueDate(dueDate);
    setTaskFormModalVisible(true);
  };

  const doSuccessOnEditTaskFormModal = () => {
    Message.success(i18n('entities.task.update.success'));
    doCloseTaskFormModal();
    dispatch(upcomingTasksActions.doRefresh());
    calendarRef.current.getApi().refetchEvents();
  };

  const doSuccessOnNewTaskFormModal = () => {
    Message.success(i18n('entities.task.create.success'));
    doCloseTaskFormModal();
    doCloseRecurringTaskModal();
    dispatch(upcomingTasksActions.doRefresh());
    calendarRef.current.getApi().refetchEvents();
  };

  return (
    <>
      <Card sx={{ height: '100%' }}>
        <MDBox
          pt={title || date ? 2.4 : 0}
          pb={1.2}
          px={1.6}
          lineHeight={1}
          topBorder
        >
          <Grid spacing={1.6} container>
            <Grid xs={12} item>
              <ButtonGroup>
                <MDButton
                  color={sidenavColor}
                  className={classes.taskButton}
                  onClick={setFilterAll}
                >
                  {i18n('entities.task.fields.allTasks')}
                </MDButton>
                <MDButton
                  color={sidenavColor}
                  className={classes.taskButton}
                  onClick={setFilterControl}
                >
                  {i18n(
                    'entities.task.fields.controlTasks',
                  )}
                </MDButton>
                <MDButton
                  color={sidenavColor}
                  className={classes.taskButton}
                  onClick={setFilterNoControl}
                >
                  {i18n(
                    'entities.task.fields.nonControlTasks',
                  )}
                </MDButton>
              </ButtonGroup>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox height="100%">
          <CalendarRoot
            p={1.6}
            ownerState={{ darkMode, sidenavColor }}
          >
            {useMemo(
              () => (
                <FullCalendar
                  ref={calendarRef}
                  initialView="dayGridMonth"
                  headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right:
                      'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
                  }}
                  plugins={[
                    dayGridPlugin,
                    timeGridPlugin,
                    interactionPlugin,
                    listPlugin,
                    rrulePlugin,
                  ]}
                  dateClick={handleDateClick}
                  events={handleEvents}
                  eventClick={handleEventClick}
                  eventDrop={handleEventDrop}
                  eventContent={(
                    eventInfo: EventContentArg,
                  ) => {
                    const viewType =
                      calendarRef.current.getApi().view
                        .type;
                    if (viewType === 'listWeek') {
                      return `${eventInfo.event.extendedProps.title} ${eventInfo.event.extendedProps.repeat}`;
                    }
                    return (
                      <MDBox
                        overflow="hidden"
                        textOverflow="ellipsis"
                        whiteSpace="nowrap"
                        width="100%"
                      >
                        <div className="fc-event-main-frame">
                          <div className="fc-event-title-container">
                            <div className="fc-event-title fc-sticky">
                              <span>
                                {`${eventInfo.event.extendedProps.title} `}
                              </span>
                              <span>
                                {
                                  eventInfo.event
                                    .extendedProps.repeat
                                }
                              </span>
                            </div>
                          </div>
                        </div>
                      </MDBox>
                    );
                  }}
                  height="100%"
                />
              ),
              [dispatch, rerender],
            )}
          </CalendarRoot>
          {isLoading && (
            <MDBox
              display="flex"
              justifyContent="center"
              alignItems="center"
              position="absolute"
              width="100%"
              height="100%"
              top="0"
              zIndex={2}
            >
              <Spinner size={100} />
            </MDBox>
          )}
        </MDBox>
      </Card>
      {taskViewModalVisible && (
        <TaskViewModal
          id={taskId4View}
          onClose={doCloseTaskViewModal}
          onEdit={doTaskFormModal}
          onSuccess={doSuccessOnEditTaskFormModal}
        />
      )}
      {editable && recurringTaskModalVisible && (
        <RecurringTaskModal
          date={recurringTaskDate}
          onOpenTaskFormModal={doOpenTaskFormModal}
          onClose={doCloseRecurringTaskModal}
        />
      )}
      {editable && taskFormModalVisible && (
        <TaskFormModal
          id={taskFormFromRecurringTaskId}
          dueDate={newTaskDueDate}
          onClose={doCloseTaskFormModal}
          onSuccess={doSuccessOnNewTaskFormModal}
        />
      )}
    </>
  );
}

TasksOnCalendar.defaultProps = {
  title: i18n('widgets.tasksOnCalendar.title'),
};

export default TasksOnCalendar;
