import { i18n } from 'src/i18n';
import ProgramHealth from 'src/view/shared/components/ProgramHealth';

function TotalControlHealth(props) {
  const { health } = props;
  const healthArray = [];

  if (health.healthy !== 0) {
    healthArray.push({
      color: 'success',
      title: i18n(
        'entities.program.enumerators.status.Healthy',
      ),
      value: health.healthy,
    });
  }

  if (health.atRisk !== 0) {
    healthArray.push({
      color: 'warning',
      title: i18n(
        'entities.program.enumerators.status.AtRisk',
      ),
      value: health.atRisk,
    });
  }

  if (health.nonCompliance !== 0) {
    healthArray.push({
      color: 'error',
      title: i18n(
        'entities.program.enumerators.status.NonCompliance',
      ),
      value: health.nonCompliance,
    });
  }

  return <ProgramHealth health={healthArray} />;
}

export default TotalControlHealth;
