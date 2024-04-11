import {
  Avatar,
  AvatarGroup,
  Tooltip,
} from '@mui/material';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import {
  getUserAvatar,
  getUserNameOrEmailPrefix,
} from 'src/modules/utils';
import Colors from 'src/view/shared/theme/Colors';

const UserGroupItem = ({ value }) => {
  const { sidenavColor } = selectMuiSettings();
  const valueAsArray = () => {
    if (!value) {
      return [];
    }

    if (Array.isArray(value)) {
      return value;
    }

    return [value];
  };

  const values = valueAsArray();

  const label = (record) =>
    getUserNameOrEmailPrefix(record);

  const avatar = (record) => {
    const name = label(record);
    return (
      <Tooltip
        key={record.id}
        title={name}
        disableInteractive
      >
        <Avatar
          alt={name}
          src={getUserAvatar(record)}
          sx={{
            bgcolor: Colors(sidenavColor),
            width: 24,
            height: 24,
            fontSize: '0.8rem',
            textTransform: 'uppercase',
            fontWeight: 'bold',
          }}
        >
          {name[0]}
        </Avatar>
      </Tooltip>
    );
  };

  return (
    <AvatarGroup sx={{ justifyContent: 'start' }}>
      {!!values.length && values.map(avatar)}
    </AvatarGroup>
  );
};

export default UserGroupItem;
