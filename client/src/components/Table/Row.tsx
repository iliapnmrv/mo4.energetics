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
import moment from "moment";
import {
  Button,
  Card,
  CardContent,
  Divider,
  Paper,
  Stack,
  TableContainer,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import BuildOutlinedIcon from "@mui/icons-material/BuildOutlined";
import DeleteButton from "components/Buttons/Delete";

type Props = {
  row: IItem;
};

export default function Row({ row }: Props) {
  const [open, setOpen] = useState(false);

  const { persons, places, statuses, types, repairTypes } = useAppSelector(
    (state) => state.catalogsReducer
  );

  const { isRepairs } = useAppSelector((state) => state.repairsReducer);

  return (
    <>
      <TableRow>
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
        <TableCell scope="row">{row.name}</TableCell>
        <TableCell align="right">{row?.Place?.placeName}</TableCell>
        <TableCell align="right">{row?.Person?.personName}</TableCell>
        <TableCell align="right">
          {isRepairs ? (
            row?.Repairs?.[0]?.enddate && row?.Repairs?.[0]?.handoverdate ? (
              <Typography color={"red"}>
                {moment(row?.Repairs?.[0]?.startdate).format("DD.MM.YYYY")}
              </Typography>
            ) : (
              moment(row?.Repairs?.[0]?.startdate).format("DD.MM.YYYY")
            )
          ) : (
            row?.Status?.statusName
          )}
        </TableCell>
        <TableCell align="right">
          <Box style={{ display: "flex", justifyContent: "space-around" }}>
            <Link href={`${row.inventorynumber}`}>
              <a>
                <EditOutlinedIcon />
              </a>
            </Link>
            <Link href={`/repairs/${row.inventorynumber}/create`}>
              <a>
                <BuildOutlinedIcon />
              </a>
            </Link>
          </Box>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Информация по позиции
              </Typography>
              <Stack
                direction="row"
                spacing={1}
                justifyContent="space-between"
                divider={<Divider orientation="vertical" flexItem />}
                alignItems="flex-start"
              >
                <Card variant="outlined" sx={{ border: "0px" }}>
                  <CardContent sx={{ padding: "2px" }}>
                    <Typography color="text.secondary" sx={{ fontSize: 14 }}>
                      Номенкулатура устройства
                    </Typography>
                    <Typography variant="body2">
                      {row?.Type?.typeName}
                    </Typography>
                  </CardContent>
                </Card>
                <Card variant="outlined" sx={{ border: "0px" }}>
                  <CardContent sx={{ padding: "2px" }}>
                    <Typography color="text.secondary" sx={{ fontSize: 14 }}>
                      Дополнительная информация
                    </Typography>
                    <Typography variant="body2">{row.description}</Typography>
                  </CardContent>
                </Card>
                <Card variant="outlined" sx={{ border: "0px" }}>
                  <CardContent sx={{ padding: "2px" }}>
                    <Typography color="text.secondary" sx={{ fontSize: 14 }}>
                      Дата поставки
                    </Typography>
                    <Typography variant="body2">
                      {row.dateofdelivery}
                    </Typography>
                  </CardContent>
                </Card>
                <Card variant="outlined" sx={{ border: "0px" }}>
                  <CardContent sx={{ padding: "2px" }}>
                    <Typography color="text.secondary" sx={{ fontSize: 14 }}>
                      Гарантийный срок
                    </Typography>
                    <Typography variant="body2">
                      {row.guaranteeperiod}
                    </Typography>
                  </CardContent>
                </Card>
                <Card variant="outlined" sx={{ border: "0px" }}>
                  <CardContent sx={{ padding: "2px" }}>
                    <Typography color="text.secondary" sx={{ fontSize: 14 }}>
                      Поставщик
                    </Typography>
                    <Typography variant="body2">{row?.supplier}</Typography>
                  </CardContent>
                </Card>
              </Stack>
            </Box>
            <Stack
              direction="row"
              spacing={2}
              justifyContent="space-between"
              alignItems="center"
              width={"100%"}
            >
              <Link href={`${row.inventorynumber}`}>
                <a>
                  <Button size="large" type="submit">
                    Редактировать
                  </Button>
                </a>
              </Link>

              <DeleteButton inventorynumber={row.inventorynumber} />
            </Stack>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Журнал действий
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>№</TableCell>
                    <TableCell>Действие</TableCell>
                    <TableCell align="right">Дата</TableCell>
                  </TableRow>
                </TableHead>
                {row?.Log ? (
                  <TableBody>
                    {row.Log.map((log: ILogs, index) => (
                      <TableRow key={index}>
                        <TableCell component="th" scope="row">
                          {index + 1}
                        </TableCell>
                        <TableCell>{log.action}</TableCell>
                        <TableCell align="right">
                          {moment(log.createdAt).format("DD.MM.YYYY, h:mm:ss")}
                        </TableCell>
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
