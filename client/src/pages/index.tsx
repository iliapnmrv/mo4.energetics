import React, { FC, useState } from "react";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/system";
import { Button, Fab, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import AddIcon from "@mui/icons-material/Add";
import Row from "../components/Table/Row";
import $api from "../http";
import { IDeregistration, ILogs, IRepairs } from "../types/item";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import Link from "next/link";
import Filters from "components/Filters/Filters";
import Download from "components/Buttons/Download";
import { ICatalog, useGetCatalogsQuery } from "store/catalog/catalog.api";
import { useGetItemsQuery } from "store/item/item.api";
import useDebounce from "hooks/debounce";

export type IItem = {
  id: number;
  inventorynumber: number;
  supplier: string;
  name: string;
  registrationdate: Date;
  commissioningdate: Date;
  departure_from_repairs_date?: Date;
  receipt_from_repairs_date?: Date;
  guaranteeperiod: Date;
  person_id?: number;
  status_id?: number;
  type_id?: number;
  place_id?: number;
  description?: string;
  Repairs?: IRepairs[];
  Log?: ILogs[];
  Place?: ICatalog;
  Status?: ICatalog;
  Type?: ICatalog;
  Person?: ICatalog;
  Deregistration?: IDeregistration[];
};

const Home: FC = () => {
  const [filters, setFilters] = useState({});

  const { isRepairs, search } = useAppSelector((state) => state.repairsReducer);

  const debouncedSearch = useDebounce(search, 500);

  const { data: items } = useGetItemsQuery({
    status_id: isRepairs ? [2] : [],
    ...filters,
    search: debouncedSearch,
  });

  return (
    <>
      <Box sx={{ position: "relative" }}>
        <Filters setFilters={setFilters} />

        {items?.length ? (
          <TableContainer
            component={Paper}
            sx={{ overflowX: "initial", position: "sticky" }}
          >
            <Table stickyHeader aria-label="collapsible sticky table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell width={"10%"}>Инвентарный номер</TableCell>
                  <TableCell>Номенклатура</TableCell>
                  <TableCell>Характеристика</TableCell>
                  <TableCell align="right" width={"15%"}>
                    МОЛ
                  </TableCell>
                  <TableCell
                    align="center"
                    colSpan={isRepairs ? 2 : 1}
                    width={"25%"}
                  >
                    {isRepairs ? "Ремонты" : "Статус"}
                  </TableCell>
                  <TableCell align="right">Изменить</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((row) => (
                  <Row key={row.inventorynumber} row={row} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography
            variant="h5"
            sx={{
              padding: "10px 0px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            По вашему запросу не было найдено элементов
          </Typography>
        )}
      </Box>
      <Box
        sx={{
          position: "fixed",
          bottom: "30px",
          rigth: "0px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Download items={items} />

        <Link
          href={{
            pathname: "/create",
            query: {
              inventorynumber:
                (items?.[items?.length - 1]?.inventorynumber ?? 0) + 1,
            },
          }}
          passHref
          as={"/create"}
        >
          <Fab color="primary" aria-label="add">
            <AddIcon />
          </Fab>
        </Link>
      </Box>
    </>
  );
};

export default Home;
