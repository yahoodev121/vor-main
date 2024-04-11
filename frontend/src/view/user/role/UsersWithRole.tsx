import { FixedSizeList } from 'react-window';
import { i18n } from 'src/i18n';
import { ReactNode, useEffect, useState } from 'react';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useSelector } from 'react-redux';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AutoSizer from 'react-virtualized-auto-sizer';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import MDBox from 'src/mui/components/MDBox';
import MDButton from 'src/mui/components/MDButton';
import MDTypography from 'src/mui/components/MDTypography';
import roleSelectors from 'src/modules/user/roleSelectors';

interface IUser {
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  email: string;
}

const not = (a: readonly IUser[], b: readonly IUser[]) => {
  return a.filter(
    (value) =>
      b.findIndex(({ id }) => id === value.id) === -1,
  );
};

const intersection = (
  a: readonly IUser[],
  b: readonly IUser[],
) => {
  return a.filter(
    (value) =>
      b.findIndex(({ id }) => id === value.id) !== -1,
  );
};

const union = (
  a: readonly IUser[],
  b: readonly IUser[],
) => {
  return [...a, ...not(b, a)];
};

const UsersWithRole = (props) => {
  const { sidenavColor } = selectMuiSettings();

  const hasRoleEdit = useSelector(
    roleSelectors.selectPermissionToEdit,
  );

  const { doAddRole, doRemoveRole, users } = props;

  const [checked, setChecked] = useState<readonly IUser[]>(
    [],
  );
  const [left, setLeft] = useState<readonly IUser[]>(
    users.unassigned,
  );
  const [right, setRight] = useState<readonly IUser[]>(
    users.assigned,
  );

  useEffect(() => {
    setLeft(users.unassigned);
    setRight(users.assigned);
    setChecked([]);
  }, [users]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value: IUser) => () => {
    const currentIndex = checked.findIndex(
      ({ id }) => id === value.id,
    );
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items: readonly IUser[]) =>
    intersection(checked, items).length;

  const handleToggleAll =
    (items: readonly IUser[]) => () => {
      if (numberOfChecked(items) === items.length) {
        setChecked(not(checked, items));
      } else {
        setChecked(union(checked, items));
      }
    };

  const handleAddRole = () =>
    doAddRole &&
    doAddRole(leftChecked.map((user: IUser) => user.id));

  const handleRemoveRole = () =>
    doRemoveRole &&
    doRemoveRole(
      rightChecked.map((user: IUser) => user.id),
    );

  const getUserName = (user: IUser) =>
    [user.firstName, user.lastName]
      .filter(Boolean)
      .join(' ');

  const customList = (
    title: ReactNode,
    users: readonly IUser[],
  ) => {
    const Row = ({ index, style }) => {
      const user = users[index];
      const name = getUserName(user);
      return (
        <ListItemButton
          key={user.id}
          role="listitem"
          onClick={handleToggle(user)}
          sx={{
            display: 'flex',
            px: 1.6,
            alignItems: 'center',
          }}
          style={style}
        >
          <ListItemIcon sx={{ minWidth: 'auto', mr: 1.6 }}>
            <Checkbox
              checked={
                checked.findIndex(
                  ({ id }) => id === user.id,
                ) !== -1
              }
              tabIndex={-1}
              disableRipple
              color={sidenavColor}
            />
          </ListItemIcon>
          <MDBox
            display="flex"
            flexDirection="column"
            height="2rem"
            justifyContent="center"
          >
            {name && (
              <MDTypography
                variant="body2"
                fontWeight="regular"
                lineHeight={1}
                pb={0.4}
              >
                {name}
              </MDTypography>
            )}
            <MDTypography
              variant={name ? 'caption' : 'body2'}
              fontWeight="regular"
              color="text"
              lineHeight={1}
            >
              {user.email}
            </MDTypography>
          </MDBox>
        </ListItemButton>
      );
    };
    return (
      <Card>
        <MDBox py={1.6} topBorder>
          <MDBox px={1.6}>
            <MDBox
              display="flex"
              gap={1.6}
              alignItems="center"
            >
              <Checkbox
                onClick={handleToggleAll(users)}
                checked={
                  numberOfChecked(users) === users.length &&
                  users.length !== 0
                }
                indeterminate={
                  numberOfChecked(users) !== users.length &&
                  numberOfChecked(users) !== 0
                }
                disabled={users.length === 0}
                color={sidenavColor}
              />
              <MDBox lineHeight={0}>
                <MDTypography
                  variant="body1"
                  fontWeight="bold"
                >
                  {title}
                </MDTypography>
                <MDTypography
                  variant="button"
                  fontWeight="bold"
                  color="text"
                >
                  {i18n(
                    'role.labels.selected',
                    numberOfChecked(users),
                    users.length,
                  )}
                </MDTypography>
              </MDBox>
            </MDBox>
            <Divider />
          </MDBox>
          <List
            sx={{
              flexGrow: 1,
              overflow: 'hidden',
              height: '50vh',
            }}
            dense
            component="div"
            role="list"
          >
            <AutoSizer>
              {({ height, width }) => (
                <FixedSizeList
                  height={height}
                  itemCount={users.length}
                  itemSize={40}
                  width={width}
                >
                  {Row}
                </FixedSizeList>
              )}
            </AutoSizer>
          </List>
        </MDBox>
      </Card>
    );
  };

  return (
    <Grid
      container
      spacing={1.6}
      justifyContent="center"
      alignItems="center"
    >
      <Grid md={4} xs={12} item>
        {customList(i18n('role.labels.unassigned'), left)}
      </Grid>
      <Grid item>
        <MDBox
          display="flex"
          flexDirection="column"
          height="100%"
          alignItems="center"
          gap={1.6}
        >
          <MDButton
            variant="gradient"
            color={sidenavColor}
            onClick={handleAddRole}
            disabled={
              !hasRoleEdit || leftChecked.length === 0
            }
            size="medium"
            iconOnly
          >
            <ArrowForwardIosIcon />
          </MDButton>
          <MDButton
            variant="gradient"
            color={sidenavColor}
            onClick={handleRemoveRole}
            disabled={
              !hasRoleEdit || rightChecked.length === 0
            }
            size="medium"
            iconOnly
          >
            <ArrowBackIosNewIcon />
          </MDButton>
        </MDBox>
      </Grid>
      <Grid md={4} xs={12} item>
        {customList(i18n('role.labels.assigned'), right)}
      </Grid>
    </Grid>
  );
};

export default UsersWithRole;
