import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  TextField as TextFieldInput,
  Typography,
} from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { Field, FieldArray, Form, Formik } from "formik";
import { TextField } from "formik-mui";
import $api from "http/index";
import ItemLayout from "layouts/ItemLayout";
import { useRouter } from "next/router";
import React from "react";

type Props = {};

export async function getServerSideProps({ params }: any) {
  return {
    props: {}, // will be passed to the page component as props
  };
}

const Create = (props: Props) => {
  const router = useRouter();

  const saveDeregistration = async (values: any) => {
    console.log(values);

    const data = new FormData();

    for (const key in values) {
      if (typeof values[key] === "object" && key !== "deregistrationdate") {
        for (let i = 0; i < values[key].length; i++) {
          data.append(key, values[key][i]);
        }
      } else {
        data.append(key, values[key]);
      }
    }

    const { data: responseData } = await $api.post(
      `deregistration/${router.query.id}`,
      data
    );
    router.push(`/${router.query.id}`);
  };
  return (
    <ItemLayout>
      <Formik
        initialValues={{
          deregistrationdate: null,
          reason: "",
          agreement: "",
          files: [],
        }}
        onSubmit={(values, actions) => {
          saveDeregistration(values);
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
                Списание позиции {router.query.id}
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Field
                    label="Причина списания"
                    type="text"
                    name="reason"
                    placeholder="Причина списания"
                    style={{
                      width: "100%",
                    }}
                    component={TextField}
                  />
                </Grid>
                <Grid item xs={4}>
                  <DesktopDatePicker
                    label="Дата списания"
                    inputFormat="DD/MM/yyyy"
                    value={values.deregistrationdate}
                    onChange={(value) =>
                      setFieldValue("deregistrationdate", value)
                    }
                    renderInput={(params) => (
                      <TextFieldInput
                        {...params}
                        fullWidth
                        autoComplete="off"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Field
                    label="Согласование"
                    type="text"
                    name="agreement"
                    placeholder="Согласование"
                    style={{
                      width: "100%",
                    }}
                    component={TextField}
                  />
                </Grid>

                <FieldArray
                  name="files"
                  render={({ remove, insert }) => (
                    <>
                      <Typography
                        variant="h6"
                        sx={{
                          padding: "10px 0px",
                          display: "flex",
                          width: "100%",
                          justifyContent: "space-between",
                        }}
                      >
                        Вложения (Акт на списание, дефектная ведомость, фото,
                        согласование списания)
                        <Button variant="outlined" component="label">
                          Загрузить файлы
                          <input
                            name="files"
                            type="file"
                            multiple
                            hidden
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              if (e.currentTarget.files?.length) {
                                const { files } = e.currentTarget;
                                for (let i = 0; i < files.length; i++) {
                                  insert(values.files.length, files[i]);
                                }
                              }
                            }}
                          />
                        </Button>
                      </Typography>
                      <Stack spacing={2} sx={{ width: "100%" }}>
                        {values?.files?.map(
                          (file: { path?: string; name?: string }, index) => (
                            <>
                              <Paper
                                key={index}
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  padding: "15px 20px",
                                }}
                              >
                                <div>&nbsp;{file.name}</div>
                                <CloseIcon
                                  sx={{ cursor: "pointer" }}
                                  onClick={() => remove(index)}
                                />
                              </Paper>
                            </>
                          )
                        )}
                      </Stack>
                    </>
                  )}
                />
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
