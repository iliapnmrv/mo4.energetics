import React, { useEffect } from "react";
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
  TextField as TextFieldInput,
} from "@mui/material";
import ItemLayout from "layouts/ItemLayout";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { useRouter } from "next/router";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";

type Props = {
  inventorynumber: number;
};

export async function getServerSideProps({ query }: any) {
  const { inventorynumber } = query;
  return {
    props: {
      inventorynumber, //pass it to the page props
    },
  };
}

export default function Qr({ inventorynumber }: Props) {
  const router = useRouter();
  const saveData = async (values: IItem) => {
    const response = await $api.post(`items`, values);
    router.push("/");
  };

  const { persons, places, statuses, types, repairTypes } = useAppSelector(
    (state) => state.catalogsReducer
  );

  return (
    <ItemLayout>
      <Formik
        initialValues={{
          inventorynumber,
          supplier: "",
          name: "",
          person_id: 0,
          status_id: 0,
          type_id: 0,
          place_id: 0,
          description: "",
          dateofdelivery: null,
          guaranteeperiod: null,
        }}
        onSubmit={(values, actions) => {
          console.log(values);
          saveData(values);
        }}
      >
        {({ values, setFieldValue }) => (
          <Box sx={{ flexGrow: 1, padding: "30px", paddingTop: "20px" }}>
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
                    // disabled
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
                      defaultValue=""
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
                  <DesktopDatePicker
                    label="Дата поставки"
                    // clearable
                    inputFormat="DD/MM/yyyy"
                    value={values.dateofdelivery}
                    onChange={(value) => setFieldValue("dateofdelivery", value)}
                    renderInput={(params) => (
                      <TextFieldInput {...params} fullWidth />
                    )}
                  />
                </Grid>
                <Grid item xs={4}>
                  <DesktopDatePicker
                    label="Гарантийный срок"
                    // clearable
                    inputFormat="DD/MM/yyyy"
                    value={values.guaranteeperiod}
                    onChange={(value) =>
                      setFieldValue("guaranteeperiod", value)
                    }
                    renderInput={(params) => (
                      <TextFieldInput {...params} fullWidth />
                    )}
                  />
                </Grid>
                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <Field
                      width={100}
                      as="select"
                      name="status_id"
                      defaultValue=""
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
                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <Field
                      width={100}
                      as="select"
                      defaultValue=""
                      name="type_id"
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
                      name="place_id"
                      label="Место нахождения"
                      component={Select}
                    >
                      {places.map((place) => {
                        return (
                          <MenuItem value={place.placeId} key={place.id}>
                            {place.placeName}
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
          </Box>
        )}
      </Formik>
    </ItemLayout>
  );
}
