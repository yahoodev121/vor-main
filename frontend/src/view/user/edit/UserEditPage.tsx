import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import ProfileFormPage from 'src/view/auth/ProfileFormPage';

function UserEditPage(props) {
  return (
    <ProfileFormPage
      onCancel={() => getHistory().push('/user')}
      title={i18n('user.edit.title')}
    />
  );
}

export default UserEditPage;
