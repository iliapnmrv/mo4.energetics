import {
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Typography,
  TextField as TextFieldInput,
  Stack,
  Paper,
} from "@mui/material";
import { Field, FieldArray, Form, Formik } from "formik";
import { Select, TextField } from "formik-mui";
import { useAppSelector } from "hooks/redux";
import $api from "http/index";
import ItemLayout from "layouts/ItemLayout";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import CloseIcon from "@mui/icons-material/Close";
import { IDeregistration, IFile } from "types/item";

export async function getServerSideProps({ params }: any) {
  const { data: deregistration } = await $api.get(
    `deregistration/${params.id}`
  );
  return {
    props: {
      deregistration,
    }, // will be passed to the page component as props
  };
}

type Props = {
  deregistration: IDeregistration;
};

const EditDeregistration = ({ deregistration }: Props) => {
  const router = useRouter();

  const [filesToDelete, setFilesToDelete] = useState<(string | undefined)[]>(
    []
  );

  const saveDeregistration = async (values: any) => {
    const data = new FormData();

    for (const key in values) {
      if (key === "attachments") {
        if (values[key].length) {
          for (let i = 0; i < values[key].length; i++) {
            if (values[key][i] instanceof File) {
              data.append("files", values[key][i]);
            } else {
              data.append(key, JSON.stringify(values[key][i]));
            }
          }
        } else {
          data.append(key, values[key]);
        }
      } else {
        data.append(key, values[key]);
      }
    }

    const { data: responseData } = await $api.put(
      `deregistration/${router.query.id}`,
      data
    );
    router.push(`/${responseData.inventorynumber}`);
  };
  return (
    <ItemLayout>
      <Formik
        initialValues={deregistration}
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
                Изменить списание
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
                  name="attachments"
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
                            name="attachments"
                            type="file"
                            multiple
                            hidden
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              if (e.currentTarget.files?.length) {
                                const { files } = e.currentTarget;
                                for (let i = 0; i < files.length; i++) {
                                  insert(values.attachments.length, files[i]);
                                }
                              }
                            }}
                          />
                        </Button>
                      </Typography>
                      <Stack spacing={2} sx={{ width: "100%" }}>
                        {values?.attachments?.map((file: IFile, index) => (
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
                                onClick={() => {
                                  remove(index);
                                  setFilesToDelete([
                                    ...filesToDelete,
                                    file.path,
                                  ]);
                                }}
                              />
                            </Paper>
                          </>
                        ))}
                      </Stack>
                      {console.log(values.attachments, filesToDelete)}
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

export default EditDeregistration;
