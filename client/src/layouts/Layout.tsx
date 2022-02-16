import { Container } from "@mui/material";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return <Container fixed>{children}</Container>;
};

export default Layout;
