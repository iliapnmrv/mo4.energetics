import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  MenuItem,
  Typography,
  TextField as TextFieldInput,
  Stack,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import { Select, TextField } from "formik-mui";
import { useAppSelector } from "hooks/redux";
import $api from "http/index";
import ItemLayout from "layouts/ItemLayout";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { IRepairs } from "types/item";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";

export async function getServerSideProps({ params }: any) {
  const { data: repair } = await $api.get(`repairs/${params.id}`);
  return {
    props: {
      repair,
    }, // will be passed to the page component as props
  };
}

type Props = {
  repair: IRepairs;
};

const EditRepair = ({ repair }: Props) => {
  const router = useRouter();

  const {
    inventorynumber,
    requestnumber,
    startdate,
    enddate,
    handoverdate,
    decision_id,
    type_id,
    comments,
    price,
  } = repair;

  const { repairTypes, repairDecisions } = useAppSelector(
    (state) => state.catalogsReducer
  );

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);

  const saveRepair = async (values) => {
    const response = await $api.put(`repairs/${router.query.id}`, values);
    router.push(`/${inventorynumber}`);
  };

  const deleteItem = async () => {
    const response = await $api.delete(`repairs/${router.query.id}`);
    setIsDeleteDialogOpen(false);
    router.push(`/${inventorynumber}`);
  };

  return (
    <ItemLayout>
      <Dialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Удалить заявку на ремонт {router.query.id}?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Вы уверены, что хотите удалить заявку на ремонт с инвентарным
            номером {inventorynumber}?
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
          requestnumber,
          startdate,
          enddate,
          handoverdate,
          decision_id,
          type_id,
          comments,
          price,
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
                Изменение заявки на ремонт №{router.query.id}
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
                    disabled
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
                  <FormControl fullWidth>
                    <Field
                      width={100}
                      as="select"
                      name="decision_id"
                      defaultValue=""
                      label="Решение по ремонту"
                      component={Select}
                    >
                      {repairDecisions.map((decision) => {
                        return (
                          <MenuItem
                            value={decision.decisionId}
                            key={decision.decisionId}
                          >
                            {decision.decisionName}
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
                <Grid item xs={4}>
                  <DesktopDatePicker
                    label="Дата окончания ремонта"
                    // clearable
                    inputFormat="DD/MM/yyyy"
                    value={values.enddate}
                    onChange={(value) => setFieldValue("enddate", value)}
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
                  <DesktopDatePicker
                    label="Дата передачи"
                    // clearable
                    inputFormat="DD/MM/yyyy"
                    value={values.handoverdate}
                    onChange={(value) => setFieldValue("handoverdate", value)}
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
                    label="Стоимость ремонта"
                    type="number"
                    name="price"
                    placeholder="Стоимость ремонта"
                    style={{
                      width: "100%",
                    }}
                    component={TextField}
                  />
                </Grid>
                <Grid item xs={8}>
                  <Field
                    label="Примечания"
                    name="comments"
                    placeholder="Примечания"
                    style={{
                      width: "100%",
                    }}
                    component={TextField}
                  />
                </Grid>
                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent="space-between"
                  alignItems="center"
                  width={"100%"}
                  marginTop={2}
                >
                  <Button size="large" type="submit">
                    Сохранить
                  </Button>
                  <Button
                    size="large"
                    variant="outlined"
                    color="error"
                    onClick={() => setIsDeleteDialogOpen(true)}
                  >
                    Удалить ремонт
                  </Button>
                </Stack>
              </Grid>
            </Form>
          </Box>
        )}
      </Formik>
    </ItemLayout>
  );
};

export default EditRepair;
