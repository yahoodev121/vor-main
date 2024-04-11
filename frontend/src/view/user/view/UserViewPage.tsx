import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';
import { useRouteMatch } from 'react-router-dom';
import ProfileFormPage from 'src/view/auth/ProfileFormPage';

function UserViewPage(props) {
  const match = useRouteMatch();
  return (
    <ProfileFormPage
      onEdit={() =>
        getHistory().push(`/user/${match.params.id}/edit`)
      }
      readOnly={true}
      title={i18n('user.view.title')}
    />
  );
}

export default UserViewPage;
