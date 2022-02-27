import { Button, Container } from "@mui/material";
import React, { ReactNode } from "react";
import { useRouter } from "next/router";
import styles from "./ItemLayout.module.css";

type Props = {
  children: ReactNode;
};

const ItemLayout = ({ children }: Props) => {
  const router = useRouter();
  return (
    <div className={styles.flex}>
      <Button onClick={() => router.back()} className={styles.button}>
        назад
      </Button>
      {children}
    </div>
  );
};

export default ItemLayout;
