import { Box, Tab, Tabs } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

interface LinkTabProps {
  label?: string;
  href?: string;
}

const CatalogsTabs = () => {
  const [value, setValue] = useState(0);
  const router = useRouter();

  const { catalog } = router.query;

  const catalogsTabs = [
    "persons",
    "statuses",
    "places",
    "types",
    "repairsTypes",
    "repairsDecisions",
  ];

  useEffect(() => {
    if (typeof catalog === "string") {
      setValue(catalogsTabs.indexOf(catalog));
    }
  }, [catalog]);

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs value={value} aria-label="nav tabs example">
        <Link href={`/catalogs/persons`} passHref>
          <Tab label="МОЛы" />
        </Link>
        <Link href={`/catalogs/statuses`} passHref>
          <Tab onClick={() => setValue(1)} label="Статусы" />
        </Link>
        <Link href={`/catalogs/places`} passHref>
          <Tab onClick={() => setValue(2)} label="Местоположения" />
        </Link>
        <Link href={`/catalogs/types`} passHref>
          <Tab onClick={() => setValue(3)} label="Номенкулатуры" />
        </Link>
        <Link href={`/catalogs/repairsTypes`} passHref>
          <Tab onClick={() => setValue(4)} label="Типы ремонтов" />
        </Link>
        <Link href={`/catalogs/repairsDecisions`} passHref>
          <Tab onClick={() => setValue(5)} label="Решения по ремонтам" />
        </Link>
      </Tabs>
    </Box>
  );
};
export default CatalogsTabs;
