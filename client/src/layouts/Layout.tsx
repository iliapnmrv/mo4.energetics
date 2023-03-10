import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters variant="dense">
            <Link href={"/"}>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
              >
                Документооборот
              </Typography>
            </Link>
            <Link href={"/catalogs"}>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                <Button sx={{ my: 2, color: "white", display: "block" }}>
                  Справочники
                </Button>
              </Box>
            </Link>
          </Toolbar>
        </Container>
      </AppBar>
      <Container fixed>{children}</Container>
    </>
  );
};

export default Layout;
