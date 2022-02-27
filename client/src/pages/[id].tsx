import React from "react";
import $api from "http/index";
import { IItem } from "pages";
import { Field, Form, Formik, FormikProps } from "formik";
import { TextField, Select } from "formik-mui";
import {
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import ItemLayout from "layouts/ItemLayout";
import { useAppDispatch, useAppSelector } from "hooks/redux";

export async function getStaticPaths() {
  const { data } = await $api.get<IItem[]>(`items`);
  const paths = data.map((item) => ({
    params: { id: item.inventorynumber.toString() },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }: any) {
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
  } = data;

  const saveData = async (values: IItem) => {
    const response = await $api.post(`items/${inventorynumber}`);
  };

  const { persons } = useAppSelector((state) => state.catalogsReducer);
  const dispatch = useAppDispatch();

  return (
    <ItemLayout>
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
        }}
        onSubmit={(values, actions) => {
          console.log(values);
          // saveData(values);
        }}
      >
        {({ values }) => (
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
                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <Field
                      width={100}
                      as="select"
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

                <Button size="large" type="submit">
                  Сохранить
                </Button>
              </Grid>
            </Form>
            <Typography variant="h5">Ремонты</Typography>
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
