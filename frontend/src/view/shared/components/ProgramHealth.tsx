import MDBox from 'src/mui/components/MDBox';
import ProgressStatus from 'src/view/shared/components/ProgressStatus';

interface IProgramHealthProps {
  health: Array<{
    color:
      | 'primary'
      | 'secondary'
      | 'info'
      | 'success'
      | 'warning'
      | 'error'
      | 'light'
      | 'dark'
      | 'purple';
    title: string;
    value: number;
  }>;
}

const ProgramHealth = ({ health }: IProgramHealthProps) => {
  const total =
    health.reduce(
      (total, current) => (total += current.value ?? 0),
      0,
    ) ?? 0;
  if (total === 0) {
    return null;
  }
  return (
    <MDBox
      display="flex"
      flexDirection="row"
      flexWrap="nowrap"
      width={250}
    >
      {health.map(({ color, title, value }, idx) => (
        <MDBox
          key={`health-item-${idx}-${title}`}
          width={`${((value ?? 0) * 100) / total}%`}
          minWidth="max-content"
        >
          <ProgressStatus
            color={color}
            completed={value}
            fullProgress={true}
            gap={0.8}
            justifyContent="start"
            textPadding={0.4}
            title={title}
            total={total}
          />
        </MDBox>
      ))}
    </MDBox>
  );
};

export default ProgramHealth;
