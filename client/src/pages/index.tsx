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
import { IItem } from "../types/item";

const rows: IItem[] = [
  { qr: "00001", supplier: "АО ДиМ", name: "Позиция 1", person: 1, status: 1 },
  { qr: "00002", supplier: "АО ДиМ2", name: "Позиция 2", person: 2, status: 2 },
];

const Home: NextPage = () => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>QR номер</TableCell>
            <TableCell align="right">Поставщик</TableCell>
            <TableCell align="right">Название</TableCell>
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
