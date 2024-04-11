import { DEFAULT_MOMENT_FORMAT } from 'src/config/common';
import { Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import moment from 'moment';
import PropTypes from 'prop-types';
import TextViewItem from 'src/view/shared/view/TextViewItem';
import UserViewItem from 'src/view/user/view/UserViewItem';

function CreationInfo(props) {
  const { record } = props;
  return (
    <Grid spacing={1.6} container>
      <Grid item md={6} xs={12}>
        <UserViewItem
          label={i18n('common.createdBy')}
          value={record.createdBy}
        />
      </Grid>
      <Grid item md={6} xs={12}>
        <TextViewItem
          label={i18n('common.createdAt')}
          value={moment(record.createdAt).format(
            DEFAULT_MOMENT_FORMAT,
          )}
        />
      </Grid>
    </Grid>
  );
}

CreationInfo.propTypes = {
  record: PropTypes.any.isRequired,
};

export default CreationInfo;
