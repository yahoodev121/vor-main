/**
=========================================================
* Material Dashboard 2 PRO React TS - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-2-pro-react-ts
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import {
  useRef,
  useEffect,
  useState,
  useMemo,
  ReactNode,
} from 'react';

// react-chartjs-2 components
import { Line } from 'react-chartjs-2';

// @mui material components
import Card from '@mui/material/Card';
import Icon from '@mui/material/Icon';

// Material Dashboard 2 PRO React TS components
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

// Material Dashboard 2 PRO React TS Helper Functions
import gradientChartLine from 'src/mui/assets/theme/functions/gradientChartLine';

// GradientLineChart configurations
import configs from 'src/mui/shared/Charts/LineCharts/GradientLineChart/configs';

// Material Dashboard 2 PRO React TS Base Styles
import colors from 'src/mui/assets/theme/base/colors';

// Declaring props types for GradientLineChart
interface Props {
  icon?: {
    color?:
      | 'primary'
      | 'secondary'
      | 'info'
      | 'success'
      | 'warning'
      | 'error'
      | 'light'
      | 'dark'
      | 'purple';
    component: ReactNode;
  };
  title?: string;
  description?: string | ReactNode;
  height?: string | number;
  chart: {
    labels: string[];
    datasets: {
      label: string;
      color:
        | 'primary'
        | 'secondary'
        | 'info'
        | 'success'
        | 'warning'
        | 'error'
        | 'light'
        | 'dark'
        | 'purple';
      data: number[];
    }[];
  };
  [key: string]: any;
}

function GradientLineChart({
  icon,
  title,
  description,
  height,
  chart,
}: Props): JSX.Element {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState({});
  const { data, options }: any = chartData;

  useEffect(() => {
    const chartDatasets = chart.datasets
      ? chart.datasets.map((dataset) => ({
          ...dataset,
          tension: 0,
          pointRadius: 0,
          borderWidth: 4,
          borderColor: colors[dataset.color]
            ? colors[dataset.color || 'dark'].main
            : colors.dark.main,
          fill: true,
          maxBarThickness: 6,
          backgroundColor: gradientChartLine(
            chartRef.current.children[0],
            colors[dataset.color]
              ? colors[dataset.color || 'dark'].main
              : colors.dark.main,
          ),
        }))
      : [];

    setChartData(
      configs(chart.labels || [], chartDatasets),
    );
  }, [chart]);

  const renderChart = (
    <MDBox py={1.6} pr={1.6} pl={icon.component ? 1 : 2}>
      {title || description ? (
        <MDBox
          display="flex"
          px={description ? 1 : 0}
          pt={description ? 1 : 0}
        >
          {icon.component && (
            <MDBox
              width="3.2rem"
              height="3.2rem"
              bgColor={icon.color || 'info'}
              variant="gradient"
              coloredShadow={icon.color || 'info'}
              borderRadius="xl"
              display="flex"
              justifyContent="center"
              alignItems="center"
              color="white"
              mt={-5}
              mr={1.6}
            >
              <Icon fontSize="medium">
                {icon.component}
              </Icon>
            </MDBox>
          )}
          <MDBox mt={icon.component ? -2 : 0}>
            {title && (
              <MDTypography variant="h6">
                {title}
              </MDTypography>
            )}
            <MDBox mb={1.6}>
              <MDTypography
                component="div"
                variant="button"
                color="text"
              >
                {description}
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      ) : null}
      {useMemo(
        () => (
          <MDBox ref={chartRef} sx={{ height }}>
            <Line data={data} options={options} />
          </MDBox>
        ),
        [chartData, height],
      )}
    </MDBox>
  );

  return title || description ? (
    <Card>{renderChart}</Card>
  ) : (
    renderChart
  );
}

// Declaring default props for GradientLineChart
GradientLineChart.defaultProps = {
  icon: { color: 'info', component: '' },
  title: '',
  description: '',
  height: '15.3rem',
};

export default GradientLineChart;
