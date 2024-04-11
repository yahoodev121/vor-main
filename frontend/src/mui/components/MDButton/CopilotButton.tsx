import { styled } from "@mui/material";
import MDButton from ".";

const CopilotButton = styled(MDButton)(() => ({
  textTransform: 'none',
  '& .MuiSvgIcon-root' : {
    fontSize: '20px !important'
  }
}))

export default CopilotButton