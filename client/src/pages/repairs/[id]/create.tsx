import {
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Typography,
  TextField as TextFieldInput,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import { Select, TextField } from "formik-mui";
import { useAppSelector } from "hooks/redux";
import $api from "http/index";
import ItemLayout from "layouts/ItemLayout";
import { useRouter } from "next/router";
import React from "react";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";

type Props = {};

export async function getServerSideProps({ params }: any) {
  return {
    props: {}, // will be passed to the page component as props
  };
}

const Create = (props: Props) => {
  const router = useRouter();

  const { repairTypes } = useAppSelector((state) => state.catalogsReducer);

  const saveRepair = async (values: any) => {
    const response = await $api.post(`repairs/${router.query.id}`, values);
    router.push(`/${router.query.id}`);
  };
  return (
    <ItemLayout>
      <Formik
        initialValues={{
          requestnumber: 0,
          type_id: 0,
          startdate: null,
        }}
        onSubmit={(values, actions) => {
          console.log(values);
          //   saveData(values);
          saveRepair(values);
        }}
      >
        {({ values, setFieldValue }) => (
          <Box
            sx={{
              flexGrow: 1,
              padding: "30px",
              paddingTop: "20px",
            }}
          >
            <Form>
              <Typography variant="h4" component="h4">
                Создание ремонта для позиции {router.query.id}
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Field
                    label="Номер заявки на ремонт"
                    type="number"
                    name="requestnumber"
                    placeholder="Номер заявки на ремонт"
                    style={{
                      width: "100%",
                    }}
                    component={TextField}
                  />
                </Grid>
                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <Field
                      width={100}
                      as="select"
                      name="type_id"
                      defaultValue=""
                      label="Вид ремонта"
                      component={Select}
                    >
                      {repairTypes.map((repair) => {
                        return (
                          <MenuItem value={repair.typeId} key={repair.typeId}>
                            {repair.typeName}
                          </MenuItem>
                        );
                      })}
                    </Field>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <DesktopDatePicker
                    label="Дата начала ремонта"
                    // clearable
                    inputFormat="DD/MM/yyyy"
                    value={values.startdate}
                    onChange={(value) => setFieldValue("startdate", value)}
                    renderInput={(params) => (
                      <TextFieldInput
                        {...params}
                        fullWidth
                        autoComplete="off"
                      />
                    )}
                  />
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
};

export default Create;
