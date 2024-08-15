import { AppBar, Box, Button, Toolbar } from "@mui/material";
import { PropsWithChildren } from "react";
import Css from "../styles/types";

const toolbarStyle: Css = {
  height: (theme) => theme.header.height,
  '& .separator': {
    borderRight: (theme) => `1px solid ${theme.palette.primary.contrastText}`,
    marginX: 2,
    height: '75%',
  },
  '& .spacer': {
    flex: 1,
  },
};

export default function Layout({ children }: PropsWithChildren) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100%'}}>
      
      <AppBar position="relative">
        <Toolbar sx={toolbarStyle}>
          <Button color="inherit" href="/">
            Home
          </Button>
        </Toolbar>
      </AppBar>
      <main>{children}</main>
    </Box>
  );
}

