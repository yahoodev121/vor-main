import { Card } from '@mui/material';
import { i18n } from 'src/i18n';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import actions from 'src/modules/emailTemplate/view/emailTemplateViewActions';
import EmailTemplateView from 'src/view/emailTemplate/view/EmailTemplateView';
import EmailTemplateViewToolbar from 'src/view/emailTemplate/view/EmailTemplateViewToolbar';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import selectors from 'src/modules/emailTemplate/view/emailTemplateViewSelectors';

function EmailTemplatePage() {
  const dispatch = useDispatch();
  const match = useRouteMatch();

  const loading = useSelector(selectors.selectLoading);
  const record = useSelector(selectors.selectRecord);

  useEffect(() => {
    dispatch(actions.doFind(match.params.id));
  }, [dispatch, match.params.id]);

  return (
    <Card>
      <MDBox py={2.4} px={2.4} topBorder>
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <MDTypography variant="h3" mb={2.4}>
            {i18n('entities.emailTemplate.view.title')}
          </MDTypography>
          <EmailTemplateViewToolbar match={match} />
        </MDBox>
        <EmailTemplateView
          loading={loading}
          record={record}
        />
      </MDBox>
    </Card>
  );
}

export default EmailTemplatePage;
