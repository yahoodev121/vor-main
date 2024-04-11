import { i18n } from 'src/i18n';
import ProgramHealth from 'src/view/shared/components/ProgramHealth';

function TotalTaskHealth(props) {
  const { health } = props;
  const healthArray = [];

  if (health.completed !== 0) {
    healthArray.push({
      color: 'success',
      title: i18n(
        'entities.programControl.enumerators.status.Completed',
      ),
      value: health.completed,
    });
  }

  if (health.overdue !== 0) {
    healthArray.push({
      color: 'warning',
      title: i18n(
        'entities.programControl.enumerators.status.OverDue',
      ),
      value: health.overdue,
    });
  }

  if (health.failed !== 0) {
    healthArray.push({
      color: 'error',
      title: i18n(
        'entities.programControl.enumerators.status.Failed',
      ),
      value: health.failed,
    });
  }

  return <ProgramHealth health={healthArray} />;
}

export default TotalTaskHealth;
