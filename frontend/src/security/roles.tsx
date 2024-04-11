import { i18n } from 'src/i18n';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonIcon from '@mui/icons-material/Person';
import StorefrontIcon from '@mui/icons-material/Storefront';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

class Roles {
  static get icons() {
    return {
      admin: <VerifiedUserIcon />,
      client: <PersonIcon />,
      custom: <AccountCircleIcon />,
      vendor: <StorefrontIcon />,
    };
  }

  static get values() {
    return {
      admin: 'admin',
      client: 'client',
      custom: 'custom',
      vendor: 'vendor',
      taskonly: 'taskonly',
    };
  }

  static labelOf(roleId) {
    if (!this.values[roleId]) {
      return roleId;
    }

    return i18n(`roles.${roleId}.label`);
  }

  static descriptionOf(roleId) {
    if (!this.values[roleId]) {
      return roleId;
    }

    return i18n(`roles.${roleId}.description`);
  }
}

export default Roles;
