import { Avatar, Box } from '@mui/material';
import {
  getUserAvatar,
  getUserNameOrEmailPrefix,
} from 'src/modules/utils';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import authSelectors from 'src/modules/auth/authSelectors';
import AutocompleteInMemoryFormItem from 'src/view/shared/form/items/AutocompleteInMemoryFormItem';
import MDBox from 'src/mui/components/MDBox';
import selectors from 'src/modules/user/userSelectors';
import UserNewFormModal from 'src/view/user/new/UserNewFormModal';
import UserService from 'src/modules/user/userService';

const renderOption = (props, option) => (
  <>
    <Avatar
      src={option.avatar}
      alt={option.label}
      sx={{
        width: 24,
        height: 24,
        mr: 1,
      }}
    />
    {option.label}
  </>
);

const UserAutocompleteFormItem = (props) => {
  const {
    autoFocus,
    label,
    margin,
    mode,
    name,
    readOnlyRoles,
    required,
    rerender: parentRerender,
    roles,
    showCreate,
    showSelect,
    shrink,
    size,
    variant,
  } = props;

  const { setValue, getValues } = useFormContext();
  const [modalVisible, setModalVisible] = useState(false);

  const isMultiple = mode && mode === 'multiple';

  const [avatar, setAvatar] = useState(null);
  const [rerender, setRerender] = useState(0);

  const hasPermissionToCreate = useSelector(
    selectors.selectPermissionToCreate,
  );

  const currentUser = useSelector(
    authSelectors.selectCurrentUser,
  );

  const onChangeUserAutocomplete = (value) => {
    setAvatar(
      (value && (value.avatar || getUserAvatar(value))) ??
        null,
    );
  };

  const doSelectCurrentUser = () => {
    const user = {
      id: currentUser.id,
      label: getUserNameOrEmailPrefix(currentUser),
      avatar: getUserAvatar(currentUser),
    };
    if (isMultiple) {
      setValue(name, [user], {
        shouldValidate: false,
        shouldDirty: true,
      });
    } else {
      setValue(name, user, {
        shouldValidate: false,
        shouldDirty: true,
      });
    }
    setRerender(rerender + 1);
  };

  const doCreateSuccess = (record) => {
    if (isMultiple) {
      setValue(
        name,
        [...(getValues()[name] || []), record],
        { shouldValidate: false, shouldDirty: true },
      );
    } else {
      setValue(name, record, {
        shouldValidate: false,
        shouldDirty: true,
      });
    }
    setModalVisible(false);
    setRerender(rerender + 1);
  };

  const fetchFn = (value, limit) => {
    return UserService.fetchUserAutocomplete(
      value,
      limit,
      roles,
    );
  };

  const mapper = {
    toAutocomplete(originalValue) {
      if (!originalValue) {
        return null;
      }

      return {
        value: originalValue.id,
        avatar: originalValue.avatar,
        label: originalValue.label,
      };
    },

    toValue(originalValue) {
      if (!originalValue) {
        return null;
      }

      return {
        id: originalValue.value,
        avatar: originalValue.avatar,
        label: originalValue.label,
      };
    },
  };

  useEffect(() => {
    setRerender(rerender + 1);
  }, [parentRerender]);

  return (
    <>
      <MDBox position="relative" pl={isMultiple ? 0 : 4.8}>
        {!isMultiple && (
          <Avatar
            src={avatar}
            sx={{
              position: 'absolute',
              flexShrink: 0,
              bottom: 4,
              left: 0,
              width: 32,
              height: 32,
            }}
          />
        )}
        <AutocompleteInMemoryFormItem
          {...props}
          renderOption={renderOption}
          fetchFn={fetchFn}
          mapper={mapper}
          hasPermissionToCreate={hasPermissionToCreate}
          rerender={rerender}
          onChange={onChangeUserAutocomplete}
          {...(showSelect
            ? {
                onOpenModal: () => doSelectCurrentUser(),
                showCreate: true,
                createButtonIcon: <AccountCircleIcon />,
              }
            : {
                onOpenModal: () => setModalVisible(true),
                showCreate,
              })}
        />
      </MDBox>

      {modalVisible && (
        <UserNewFormModal
          onClose={() => setModalVisible(false)}
          onSuccess={doCreateSuccess}
          readOnlyRoles={readOnlyRoles}
          roles={roles}
          visible={modalVisible}
        />
      )}
    </>
  );
};

export default UserAutocompleteFormItem;
