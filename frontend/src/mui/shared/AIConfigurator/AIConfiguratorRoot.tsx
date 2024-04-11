import Drawer from '@mui/material/Drawer';
import { styled, Theme } from '@mui/material/styles';

export default styled(Drawer)(
  ({
    theme,
    ownerState,
  }: {
    theme?: Theme;
    ownerState: any;
  }) => {
    const { boxShadows, functions, transitions } = theme;
    const { openAIConfigurator, width } = ownerState;

    const configuratorWidth = width || 288;
    const { lg } = boxShadows;
    const { pxToRem } = functions;

    // drawer styles when openAIConfigurator={true}
    const drawerOpenStyles = () => ({
      width: configuratorWidth,
      left: 'initial',
      right: 0,
      transition: transitions.create('right', {
        easing: transitions.easing.sharp,
        duration: transitions.duration.short,
      }),
    });

    // drawer styles when openAIConfigurator={false}
    const drawerCloseStyles = () => ({
      left: 'initial',
      right: pxToRem(-350),
      transition: transitions.create('all', {
        easing: transitions.easing.sharp,
        duration: transitions.duration.short,
      }),
    });

    return {
      '& .MuiDrawer-paper': {
        height: '100vh',
        margin: 0,
        padding: `0 0 0 ${pxToRem(8)}`,
        borderRadius: 0,
        boxShadow: lg,
        overflow: 'inherit',
        ...(openAIConfigurator
          ? drawerOpenStyles()
          : drawerCloseStyles()),
      },
    };
  },
);
