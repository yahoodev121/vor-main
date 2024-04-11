import MDBox from "src/mui/components/MDBox";
import { Theme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";

const useStyles: any = makeStyles((theme: Theme) => {
  const { palette, functions } = theme;
  const { gradients } = palette;
  const { linearGradient } = functions;

  return {
    slideButton: {
      position: 'absolute',
      top: '40vh',
      left: '-20px',
      cursor: 'ew-resize',
      border: 'none',
      background: (props: { color: string }) => linearGradient(gradients[props.color].main, gradients[props.color].state),
      // background: "white",
      userSelect: 'none',
      writingMode: 'vertical-rl',
      textOrientation: 'upright',
      whiteSpace: 'nowrap',
      textTransform: 'uppercase',
      fontSize: 12,
      fontWeight: 600,
      // color: (props: { color: string }) => gradients[props.color].state,
      color: 'white',
      padding: '3px 0',

      '&::before': {
        content: '""',
        display: "block",
        position: "absolute",
        top: '-10px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 0,
        height: 0,
        borderLeft: `20px solid transparent`,
        borderBottom: (props: { color: string }) => `10px solid ${gradients[props.color].main}`,
        // borderBottom: "white"
      },
      '&::after': {
        content: '""',
        display: "block",
        position: "absolute",
        bottom: '-10px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 0,
        height: 0,
        borderLeft: `20px solid transparent`,
        borderTop: (props: { color: string }) => `10px solid ${gradients[props.color].state}`,
        // borderTop: "white"
      }
    },
  }
});

export default function SlideButton(props) {
  const { color, label, doMouseDown } = props;
  const classes = useStyles({ color });
  return (
    <MDBox className={classes.slideButton} onMouseDown={doMouseDown}>
      {label}
    </MDBox>
  )
};