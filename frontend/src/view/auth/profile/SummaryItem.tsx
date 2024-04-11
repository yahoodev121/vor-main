import { Grid, Icon } from '@mui/material';
import { Link } from 'react-router-dom';
import MaterialLink from '@mui/material/Link';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import NumberFormat from 'react-number-format';

interface SummaryItemProps {
  color: string;
  count: number;
  icon: string;
  title: string;
  to: string;
}

const SummaryItem = ({
  color,
  count,
  icon,
  title,
  to,
}: SummaryItemProps) => {
  return (
    <Grid item xs={12}>
      <MDBox display="flex" justifyContent="space-between">
        <MDBox display="flex">
          <MDBox
            width="2.4rem"
            height="2.4rem"
            bgColor={color ?? 'info'}
            variant="gradient"
            borderRadius="md"
            display="flex"
            shadow="md"
            justifyContent="center"
            alignItems="center"
            color="white"
            mr={1.6}
          >
            <Icon fontSize="medium">{icon}</Icon>
          </MDBox>
          <MDBox lineHeight={1}>
            <MDTypography
              variant="body2"
              fontWeight="bold"
              textTransform="capitalize"
            >
              {title}
            </MDTypography>
            <MDBox>
              <MDTypography
                variant="button"
                fontWeight="bold"
                color="text"
              >
                <MaterialLink
                  component={Link}
                  to={to}
                  underline="hover"
                >
                  <NumberFormat
                    value={count ?? 0}
                    displayType="text"
                    thousandSeparator
                  />
                </MaterialLink>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </MDBox>
    </Grid>
  );
};

export default SummaryItem;
