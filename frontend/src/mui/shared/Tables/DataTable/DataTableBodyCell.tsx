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

import { ReactNode } from 'react';

// @mui material components
import { Theme } from '@mui/material/styles';

// Material Dashboard 2 PRO React TS components
import MDBox from 'src/mui/components/MDBox';
import LazyLoad from 'react-lazy-load';

// Declaring prop types for DataTableBodyCell
interface Props {
  children: ReactNode;
  noBorder?: boolean;
  align?: 'left' | 'right' | 'center';
  noPaddingL?: boolean;
  noPaddingR?: boolean;
  [key: string]: any;
}

function DataTableBodyCell({
  noBorder,
  align,
  children,
  noPaddingL,
  noPaddingR,
  ...rest
}: Props): JSX.Element {
  return (
    <MDBox
      component="td"
      textAlign={align}
      py={1.2}
      pl={noPaddingL ? 0 : 2.4}
      pr={noPaddingR ? 0 : 2.4}
      sx={({
        palette: { light },
        typography: { size },
        borders: { borderWidth },
      }: Theme) => ({
        fontSize: size.sm,
        borderTop: noBorder
          ? 'none'
          : `${borderWidth[1]} solid ${light.main}`,
      })}
      {...rest}
    >
      {/* <LazyLoad> */}
      <MDBox
        display="block"
        minWidth="100%"
        width="max-content"
        lineHeight={1.3}
        color="text"
        sx={{
          verticalAlign: 'middle',
        }}
        maxWidth={240}
      >
        {children}
      </MDBox>
      {/* </LazyLoad> */}
    </MDBox>
  );
}

// Declaring default props for DataTableBodyCell
DataTableBodyCell.defaultProps = {
  noBorder: false,
  align: 'left',
  noPaddingL: false,
  noPaddingR: false,
};

export default DataTableBodyCell;
