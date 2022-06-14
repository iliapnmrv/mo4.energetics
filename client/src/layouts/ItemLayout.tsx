import { Box, Button, Container } from "@mui/material";
import React, { ReactNode } from "react";
import { useRouter } from "next/router";
import styles from "./ItemLayout.module.css";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Link from "next/link";
type Props = {
  children: ReactNode;
};

const ItemLayout = ({ children }: Props) => {
  const router = useRouter();
  return (
    <div className={styles.flex}>
      <Box width={"100px"}>
        <Link href="/" passHref>
          <a>
            <Button>
              <HomeOutlinedIcon />
            </Button>
          </a>
        </Link>
        <Button onClick={() => router.back()} className={styles.button}>
          назад
        </Button>
      </Box>

      {children}
    </div>
  );
};

export default ItemLayout;
