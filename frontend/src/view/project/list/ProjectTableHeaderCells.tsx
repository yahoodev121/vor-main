import { i18n } from 'src/i18n';
import DataTableHeadCell from 'src/mui/shared/Tables/DataTable/DataTableHeadCell';

function ProjectListTableHeaderCells(props) {
  const { sorter, doChangeSort } = props;

  const getSorted = (field) =>
    sorter.field === field ? sorter.order : 'none';

  return (
    <>
      <DataTableHeadCell
        onClick={() => doChangeSort('reference')}
        sorted={getSorted('reference')}
        width="0"
        noWrap
      >
        {i18n('entities.risk.fields.reference')}
      </DataTableHeadCell>
      <DataTableHeadCell
        onClick={() => doChangeSort('name')}
        sorted={getSorted('name')}
      >
        {i18n('entities.project.fields.name')}
      </DataTableHeadCell>
      <DataTableHeadCell sorted={false}>
        {i18n('entities.project.fields.owner')}
      </DataTableHeadCell>
      <DataTableHeadCell sorted={false}>
        {i18n('entities.project.fields.status')}
      </DataTableHeadCell>
      <DataTableHeadCell sorted={false}>
        {i18n('entities.project.fields.type')}
      </DataTableHeadCell>
      <DataTableHeadCell sorted={false}>
        {i18n('entities.project.fields.priority')}
      </DataTableHeadCell>
      <DataTableHeadCell
        onClick={() => doChangeSort('dueDate')}
        sorted={getSorted('dueDate')}
      >
        {i18n('entities.project.fields.dueDate')}
      </DataTableHeadCell>
      <DataTableHeadCell sorted={false}>
        {i18n('entities.project.fields.tasks')}
      </DataTableHeadCell>
      <DataTableHeadCell sorted={false}>
        {i18n('entities.project.fields.risks')}
      </DataTableHeadCell>
    </>
  );
}

export default ProjectListTableHeaderCells;
