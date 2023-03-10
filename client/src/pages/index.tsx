import React, { useState } from "react";
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
import {
  IPerson,
  IPlace,
  IRepairDecision,
  IRepairType,
  IStatus,
  IType,
} from "types/catalogs";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import Link from "next/link";
import Filters from "components/Filters/Filters";
import Download from "components/Buttons/Download";
import { ICatalog, useGetCatalogsQuery } from "store/catalog/catalog.api";

export type IItem = {
  inventorynumber: string;
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

export async function getServerSideProps() {
  const { data: rows } = await $api.get<IItem[]>(`items`);
  return {
    props: {
      rows,
    },
  };
}

type Props = {
  rows: IItem[];
  persons: IPerson[];
  places: IPlace[];
  statuses: IStatus[];
  types: IType[];
  repairsTypes: IRepairType[];
  repairsDecisions: IRepairDecision[];
};

const Home: React.FC<Props> = ({ rows }: Props) => {
  const [items, setItems] = useState<IItem[]>(rows);

  const { isRepairs } = useAppSelector((state) => state.repairsReducer);

  return (
    <>
      <Box sx={{ position: "relative" }}>
        <Filters setItems={setItems} />

        {items.length ? (
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
              inventorynumber: rows[rows.length - 1]?.inventorynumber + 1,
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
