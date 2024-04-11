import { Card } from '@mui/material';
import { GRID_MODE } from 'src/modules/types';
import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import darkBreakpoints from 'src/mui/assets/theme-dark/base/breakpoints';
import lightBreakpoints from 'src/mui/assets/theme/base/breakpoints';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import muiActions from 'src/modules/mui/muiActions';
import PolicyTemplateListFilter from 'src/view/policyTemplate/list/PolicyTemplateListFilter';
import PolicyTemplateListTable from 'src/view/policyTemplate/list/PolicyTemplateListTable';
import PolicyTemplateListToolbar from 'src/view/policyTemplate/list/PolicyTemplateListToolbar';

const VIEW_MODE_SECTION_NAME = 'policy-template';

function PolicyTemplateListPage(props) {
  const dispatch = useDispatch();
  const { darkMode, viewMode } = selectMuiSettings(
    VIEW_MODE_SECTION_NAME,
  );

  const breakpoints = darkMode
    ? darkBreakpoints.values
    : lightBreakpoints.values;

  const [columns, setColumns] = useState(6);

  const onSetViewMode = (mode) => {
    dispatch(
      muiActions.doViewMode({
        section: VIEW_MODE_SECTION_NAME,
        viewMode: mode,
      }),
    );
  };

  const renderPage = () => (
    <>
      <MDBox pt={2.4} px={2.4}>
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
          pb={2.4}
        >
          <MDTypography variant="h3">
            {i18n('entities.policyTemplate.list.title')}
          </MDTypography>
          <PolicyTemplateListToolbar
            viewMode={viewMode}
            onSetViewMode={onSetViewMode}
          />
        </MDBox>
        <PolicyTemplateListFilter />
      </MDBox>
      <PolicyTemplateListTable
        viewMode={viewMode}
        columns={columns}
      />
    </>
  );

  useEffect(() => {
    function handleDetectColumns() {
      if (viewMode !== GRID_MODE) {
        return;
      }
      const width = window.innerWidth;
      if (width >= breakpoints.lg) {
        setColumns(4);
      } else if (width >= breakpoints.md) {
        setColumns(3);
      } else if (width >= breakpoints.sm) {
        setColumns(2);
      } else {
        setColumns(1);
      }
    }

    window.addEventListener('resize', handleDetectColumns);

    handleDetectColumns();

    return () =>
      window.removeEventListener(
        'resize',
        handleDetectColumns,
      );
  }, [viewMode]);

  return viewMode === GRID_MODE ? (
    renderPage()
  ) : (
    <Card>
      <MDBox topBorder>{renderPage()}</MDBox>
    </Card>
  );
}

export default PolicyTemplateListPage;
