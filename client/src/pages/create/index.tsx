import React, { useEffect, useState } from "react";
import $api from "http/index";
import { IItem } from "pages";
import { Field, Form, Formik, FormikProps } from "formik";
import { TextField, Select } from "formik-mui";
import {
  Autocomplete,
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
import * as Yup from "yup";

type Props = {
  inventorynumber: number;
  names: string[];
};

const CreateItemSchema = Yup.object().shape({
  person_id: Yup.string().required("Обязательное поле"),
  status_id: Yup.string().required("Обязательное поле"),
  type_id: Yup.string().required("Обязательное поле"),
  place_id: Yup.string().required("Обязательное поле"),
});

export async function getServerSideProps({ query }: any) {
  const { data: names } = await $api.get<IItem[]>(`items`);
  const { inventorynumber } = query;

  return {
    props: {
      inventorynumber: inventorynumber || null, //pass it to the page props
      names: names
        .map(({ name }) => name)
        .filter((value, index, array) => array.indexOf(value) === index)
        .sort(),
    },
  };
}

export default function Qr({ inventorynumber, names }: Props) {
  console.log(names);

  const router = useRouter();
  const saveData = async (values: any) => {
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
          person_id: "",
          status_id: "",
          type_id: "",
          place_id: "",
          description: "",
          registrationdate: null,
          commissioningdate: null,
          guaranteeperiod: null,
        }}
        validationSchema={CreateItemSchema}
        onSubmit={(values) => {
          saveData(values);
        }}
      >
        {({ values, setFieldValue, handleChange, isValid, dirty }) => (
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
                    component={TextField}
                    required
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
                    required
                  />
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
                <Grid item xs={8}>
                  <Autocomplete
                    id="name"
                    options={names}
                    getOptionLabel={(option) => option}
                    style={{ width: "100%" }}
                    onChange={(event, value) => {
                      setFieldValue("name", value);
                    }}
                    renderInput={(params) => (
                      <TextFieldInput
                        {...params}
                        onChange={handleChange}
                        label="Наименование"
                        fullWidth
                        value={values?.name}
                        required
                      />
                    )}
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
                    label="Дата постановки на учет"
                    // clearable
                    inputFormat="DD/MM/yyyy"
                    value={values.registrationdate}
                    onChange={(value) =>
                      setFieldValue("registrationdate", value)
                    }
                    renderInput={(params) => (
                      <TextFieldInput
                        {...params}
                        fullWidth
                        autoComplete="off"
                        required
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={4}>
                  <DesktopDatePicker
                    label="Дата передачи в эксплуатацию"
                    // clearable
                    inputFormat="DD/MM/yyyy"
                    value={values.commissioningdate}
                    onChange={(value) =>
                      setFieldValue("commissioningdate", value)
                    }
                    renderInput={(params) => (
                      <TextFieldInput
                        {...params}
                        fullWidth
                        autoComplete="off"
                        required
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={4}>
                  <DesktopDatePicker
                    label="Гарантийный срок"
                    inputFormat="DD/MM/yyyy"
                    value={values.guaranteeperiod}
                    onChange={(value) =>
                      setFieldValue("guaranteeperiod", value)
                    }
                    renderInput={(params) => (
                      <TextFieldInput
                        {...params}
                        fullWidth
                        required
                        autoComplete="off"
                      />
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

                <Button
                  size="large"
                  type="submit"
                  disabled={!(isValid && dirty)}
                >
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
