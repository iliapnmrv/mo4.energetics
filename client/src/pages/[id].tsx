import React, { useState } from "react";
import $api from "http/index";
import { IItem } from "pages";
import { Field, Form, Formik, FormikProps } from "formik";
import { TextField, Select } from "formik-mui";
import { KeyboardDatePicker } from "@material-ui/pickers";
import {
  Button,
  Box,
  FormControl,
  Grid,
  MenuItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import ItemLayout from "layouts/ItemLayout";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { useRouter } from "next/router";
import Link from "next/link";

export async function getServerSideProps({ params }: any) {
  const { data } = await $api.get(`items/${params.id}`);
  return {
    props: { data }, // will be passed to the page component as props
  };
}

type Props = {
  data: IItem;
};

export default function Qr({ data }: Props) {
  const {
    inventorynumber,
    history,
    supplier,
    name,
    person_id,
    status_id,
    type_id,
    place_id,
    description,
    repairs,
    dateofdelivery,
    guaranteeperiod,
  } = data;

  const router = useRouter();

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);

  const saveData = async (values: IItem) => {
    const response = await $api.post(`items/${inventorynumber}`, values);
    router.push("/");
  };

  const deleteItem = async () => {
    const response = await $api.delete(`items/${inventorynumber}`);
    setIsDeleteDialogOpen(false);
    router.push("/");
  };

  const { persons, places, statuses, types, repairTypes } = useAppSelector(
    (state) => state.catalogsReducer
  );

  return (
    <ItemLayout>
      <Dialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Удалить позицию {inventorynumber}?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Вы уверены, что хотите удалить позицию с инвентарным номером{" "}
            {inventorynumber}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteDialogOpen(false)}>Отменить</Button>
          <Button onClick={() => deleteItem()} autoFocus>
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
      <Formik
        initialValues={{
          inventorynumber,
          history,
          supplier,
          name,
          person_id,
          status_id,
          type_id,
          place_id,
          description,
          dateofdelivery,
          guaranteeperiod,
        }}
        onSubmit={(values, actions) => {
          saveData(values);
        }}
      >
        {({ values, setFieldValue }) => (
          <Box sx={{ flexGrow: 1, padding: "30px", paddingTop: 0 }}>
            <Typography variant="h5" mb={"20px"}>
              {values.name} | {values.inventorynumber}
            </Typography>
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={8}>
                  <Field
                    label="Инвентарный номер"
                    type="number"
                    name="inventorynumber"
                    placeholder="Инвентарный номер"
                    style={{
                      width: "100%",
                    }}
                    disabled
                    component={TextField}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Field
                    style={{
                      width: "100%",
                    }}
                    label="Поставщик"
                    type="text"
                    name="supplier"
                    placeholder="Поставщик"
                    component={TextField}
                    value={values.supplier}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Field
                    style={{
                      width: "100%",
                    }}
                    label="Наименование"
                    type="text"
                    name="name"
                    placeholder="Наименование"
                    component={TextField}
                    value={values.name}
                  />
                </Grid>
                <Grid item xs={8}>
                  <Field
                    style={{
                      width: "100%",
                    }}
                    label="Дополнительная информация"
                    type="text"
                    name="description"
                    placeholder="Дополнительная информация"
                    component={TextField}
                    value={values.description}
                  />
                </Grid>

                <Grid item xs={8}>
                  <FormControl fullWidth>
                    <Field
                      width={100}
                      as="select"
                      name="type_id"
                      defaultValue=""
                      label="Номенкулатура устройства"
                      component={Select}
                    >
                      {types.map((type) => {
                        return (
                          <MenuItem value={type.typeId} key={type.id}>
                            {type.typeName}
                          </MenuItem>
                        );
                      })}
                    </Field>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <Field
                      width={100}
                      as="select"
                      defaultValue=""
                      name="person_id"
                      label="МОЛ"
                      component={Select}
                    >
                      {persons.map((person) => {
                        return (
                          <MenuItem value={person.personId} key={person.id}>
                            {person.personName}
                          </MenuItem>
                        );
                      })}
                    </Field>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <KeyboardDatePicker
                    label="Дата поставки"
                    inputVariant="outlined"
                    format="DD/MM/yyyy"
                    clearable
                    fullWidth
                    value={values.dateofdelivery}
                    onChange={(value) => setFieldValue("dateofdelivery", value)}
                  />
                </Grid>
                <Grid item xs={4}>
                  <KeyboardDatePicker
                    label="Гарантийный срок"
                    inputVariant="outlined"
                    format="DD/MM/yyyy"
                    clearable
                    fullWidth
                    value={values.guaranteeperiod}
                    onChange={(value) =>
                      setFieldValue("guaranteeperiod", value)
                    }
                  />
                </Grid>
                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <Field
                      width={100}
                      as="select"
                      defaultValue=""
                      name="status_id"
                      label="Статус"
                      component={Select}
                    >
                      {statuses.map((status) => {
                        return (
                          <MenuItem value={status.statusId} key={status.id}>
                            {status.statusName}
                          </MenuItem>
                        );
                      })}
                    </Field>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Stack
                    direction="row"
                    spacing={2}
                    justifyContent="space-between"
                    alignItems="center"
                    width={"100%"}
                  >
                    <Button size="large" type="submit">
                      Сохранить
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => setIsDeleteDialogOpen(true)}
                    >
                      Удалить
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </Form>
            <Typography
              variant="h5"
              sx={{
                padding: "10px 0px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              Ремонты
              <Link href={`/repairs/${inventorynumber}/create`} passHref>
                <Button variant="outlined" color="error">
                  Добавить ремонт
                </Button>
              </Link>
            </Typography>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Номер заявки</TableCell>
                    <TableCell align="right">Дата начала</TableCell>
                    <TableCell align="right">Дата окончания</TableCell>
                    <TableCell align="right">Стоимость</TableCell>
                    <TableCell align="right">Решение по ремонту</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {repairs?.map((repair) => (
                    <TableRow key={repair.id}>
                      <TableCell component="th" scope="row">
                        {repair.requestnumber}
                      </TableCell>
                      <TableCell align="right">{repair.startdate}</TableCell>
                      <TableCell align="right">{repair.enddate}</TableCell>
                      <TableCell align="right">{repair.price}</TableCell>
                      <TableCell align="right">{repair.decision}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </Formik>
    </ItemLayout>
  );
}
