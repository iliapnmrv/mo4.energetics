import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { NextPage } from "next";
import Row from "../components/Table/Row";
import $api from "../http";
import { ILogs } from "../types/item";

export type IItem = {
  inventorynumber: string;
  supplier: string;
  name: string;
  person?: number;
  status?: number;
  history?: ILogs[];
};

export async function getStaticProps() {
  const { data: rows } = await $api.get<IItem[]>(`item`);
  return {
    props: { rows }, // will be passed to the page component as props
  };
}

type Props = {
  rows: IItem[];
};

const Home: React.FC<Props> = ({ rows }: Props) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Инвентарный номер</TableCell>
            <TableCell>Название</TableCell>
            <TableCell>Поставщик</TableCell>
            <TableCell align="right">МОЛ</TableCell>
            <TableCell align="right">Статус</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Home;
