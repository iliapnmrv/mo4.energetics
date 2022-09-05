import {
  Box,
  Button,
  Card,
  CardContent,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import moment from "moment";
import Link from "next/link";
import React, { useState } from "react";
import { IRepairs } from "types/item";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import BuildOutlinedIcon from "@mui/icons-material/BuildOutlined";
import DeleteButton from "components/Buttons/Delete";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useAppSelector } from "hooks/redux";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import $api from "http/index";
import { useRouter } from "next/router";

type Props = {
  inventorynumber: string;
  Repairs?: IRepairs[];
};

const RepairsComponent = ({ inventorynumber, Repairs }: Props) => {
  const { persons, places, statuses, types, repairTypes, repairDecisions } =
    useAppSelector((state) => state.catalogsReducer);

  const [open, setOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [repairId, setRepairId] = useState<number>();
  const router = useRouter();

  const deleteItem = async () => {
    const response = await $api.delete(`repairs/${repairId}`);
    setIsDeleteDialogOpen(false);
    router.push(`/${inventorynumber}`);
  };

  return (
    <>
      <Dialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Удалить заявку на ремонт?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Вы уверены, что хотите удалить ремонт?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteDialogOpen(false)}>Отменить</Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => deleteItem()}
            autoFocus
          >
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
      <Typography
        variant="h5"
        sx={{
          padding: "10px 0px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        Ремонты
        <Box
          sx={{
            fontSize: "15px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {Repairs?.reduce((sum, { price }) => (sum += price), 0) ? (
            <p style={{ marginRight: "10px" }}>
              Общая сумма{" "}
              {Repairs?.reduce((sum, { price }) => (sum += price), 0)}
            </p>
          ) : null}

          <Link href={`/repairs/${inventorynumber}/create`} passHref>
            <Button variant="outlined">Добавить ремонт</Button>
          </Link>
        </Box>
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell />

              <TableCell>Номер заявки</TableCell>
              <TableCell align="right">Дата начала</TableCell>
              <TableCell align="right">Дата окончания</TableCell>
              <TableCell align="right">Стоимость</TableCell>
              <TableCell align="right">Решение по ремонту</TableCell>
              <TableCell align="right">Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Repairs?.map((repair) => (
              <>
                <TableRow>
                  <TableCell>
                    <IconButton
                      aria-label="expand row"
                      size="small"
                      onClick={() => setOpen(!open)}
                    >
                      {open ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <Link href={`/repairs/${repair.id}`}>
                      <a>{repair.id}</a>
                    </Link>
                  </TableCell>
                  <TableCell align="right">
                    {moment(repair.startdate).format("DD.MM.YYYY")}
                  </TableCell>
                  <TableCell align="right">
                    {repair.enddate
                      ? moment(repair.enddate).format("DD.MM.YYYY")
                      : null}
                  </TableCell>
                  <TableCell align="right">{repair.price}</TableCell>
                  <TableCell align="right">
                    {
                      repairDecisions.filter(
                        (decision) => decision.decisionId === repair.decision_id
                      )[0]?.decisionName
                    }
                  </TableCell>
                  <TableCell align="right">
                    <Box
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                      }}
                    >
                      <Link href={`/repairs/${repair.id}`}>
                        <a>
                          <EditOutlinedIcon />
                        </a>
                      </Link>
                      <a
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setRepairId(repair.id);
                          setIsDeleteDialogOpen(true);
                        }}
                      >
                        <DeleteOutlineIcon />
                      </a>
                    </Box>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={7}
                  >
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
                              <Typography
                                color="text.secondary"
                                sx={{ fontSize: 14 }}
                              >
                                Вид ремонта
                              </Typography>
                              <Typography variant="body2">
                                {
                                  repairTypes.filter(
                                    (type) => type.typeId === repair.type_id
                                  )[0]?.typeName
                                }
                              </Typography>
                            </CardContent>
                          </Card>
                          <Card variant="outlined" sx={{ border: "0px" }}>
                            <CardContent sx={{ padding: "2px" }}>
                              <Typography
                                color="text.secondary"
                                sx={{ fontSize: 14 }}
                              >
                                Запасные части
                              </Typography>
                              <Typography variant="body2">
                                {repair.comments}
                              </Typography>
                            </CardContent>
                          </Card>

                          <Card variant="outlined" sx={{ border: "0px" }}>
                            <CardContent sx={{ padding: "2px" }}>
                              <Typography
                                color="text.secondary"
                                sx={{ fontSize: 14 }}
                              >
                                Дата передачи
                              </Typography>
                              <Typography variant="body2">
                                {moment(repair.handoverdate).format(
                                  "DD.MM.YYYY"
                                )}
                              </Typography>
                            </CardContent>
                          </Card>
                        </Stack>
                      </Box>
                      {/* <Stack
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
                      </Stack> */}
                    </Collapse>
                  </TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default RepairsComponent;
