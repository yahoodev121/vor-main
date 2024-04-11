import DataTableBodyCell from 'src/mui/shared/Tables/DataTable/DataTableBodyCell';
import moment from 'moment';
import ProjectPriorityListItem from 'src/view/projectPriority/list/ProjectPriorityListItem';
import ProjectStatusListItem from 'src/view/projectStatus/list/ProjectStatusListItem';
import ProjectTypeListItem from 'src/view/projectType/list/ProjectTypeListItem';
import RiskListItem from 'src/view/risk/list/RiskListItem';
import TaskListItem from 'src/view/task/list/TaskListItem';
import UserListItem from 'src/view/user/list/UserListItem';
import ProgressStatus from 'src/view/shared/components/ProgressStatus';
import { i18n } from 'src/i18n';

function ProjectListTableBodyCells(props) {
  const { row } = props;
  return (
    <>
      <DataTableBodyCell align="right">
        {row.reference}
      </DataTableBodyCell>
      <DataTableBodyCell>{row.name}</DataTableBodyCell>
      <DataTableBodyCell>
        <UserListItem value={row.owner} />
      </DataTableBodyCell>
      <DataTableBodyCell>
        <ProjectStatusListItem value={row.status} />
      </DataTableBodyCell>
      <DataTableBodyCell>
        <ProjectTypeListItem value={row.type} />
      </DataTableBodyCell>
      <DataTableBodyCell>
        <ProjectPriorityListItem value={row.priority} />
      </DataTableBodyCell>
      <DataTableBodyCell>
        {row.dueDate
          ? moment(row.dueDate).format('YYYY-MM-DD HH:mm')
          : null}
      </DataTableBodyCell>
      <DataTableBodyCell>
        <ProgressStatus
          completed={row.completedTasks}
          total={row.totalTasks}
          title={i18n('entities.project.fields.completed')}
        />
      </DataTableBodyCell>
      <DataTableBodyCell>
        <ProgressStatus
          completed={row.remediatedRisks}
          total={row.totalRisks}
          title={i18n('entities.project.fields.remediated')}
        />
      </DataTableBodyCell>
    </>
  );
}

export default ProjectListTableBodyCells;
