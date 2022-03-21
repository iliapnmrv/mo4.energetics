import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { IItem } from "pages";
import { ILogs } from "types/item";
import { useAppSelector } from "hooks/redux";

type Props = {
  row: IItem;
};

export default function Row({ row }: Props) {
  const [open, setOpen] = useState(false);

  const { persons, places, statuses, types, repairTypes } = useAppSelector(
    (state) => state.catalogsReducer
  );

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>
          <Link href={`${row.inventorynumber}`}>
            <a>{row.inventorynumber}</a>
          </Link>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.supplier}</TableCell>
        <TableCell align="right">
          {
            persons.filter((person) => person.personId === row.person_id)[0]
              .personName
          }
        </TableCell>
        <TableCell align="right">
          {
            statuses.filter((status) => status.statusId === row.status_id)[0]
              .statusName
          }
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Журнал действий
              </Typography>

              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Пользователь</TableCell>
                    <TableCell>Действие</TableCell>
                    <TableCell align="right">Дата</TableCell>
                  </TableRow>
                </TableHead>
                {row?.history ? (
                  <TableBody>
                    {row.history.map((historyRow: ILogs) => (
                      <TableRow key={historyRow.date}>
                        <TableCell component="th" scope="row">
                          {historyRow.user}
                        </TableCell>
                        <TableCell>{historyRow.action}</TableCell>
                        <TableCell align="right">{historyRow.date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                ) : (
                  <p>Данные отсутствуют</p>
                )}
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
