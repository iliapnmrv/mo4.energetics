import {
  Box,
  Button,
  FormControl,
  Grid,
  List,
  ListItemText,
  MenuItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField as TextFieldInput,
  Typography,
} from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import DeleteButton from "components/Buttons/Delete";
import FileViewDynamic from "components/FileView/FileViewDynamic";
import RepairsComponent from "components/Repairs/Repairs";
import { LOGS_CATALOG } from "constants/constants";
import { Field, Form, Formik } from "formik";
import { Select, TextField } from "formik-mui";
import { useAppSelector } from "hooks/redux";
import $api from "http/index";
import ItemLayout from "layouts/ItemLayout";
import _ from "lodash";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IItem } from "pages";
import { useGetCatalogsQuery } from "store/catalog/catalog.api";

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
  const { data: catalogs } = useGetCatalogsQuery();

  const {
    inventorynumber,
    commissioningdate,
    Log,
    supplier,
    name,
    person_id,
    status_id,
    type_id,
    place_id,
    description,
    Repairs,
    registrationdate,
    guaranteeperiod,
    receipt_from_repairs_date,
    departure_from_repairs_date,
    Deregistration,
  } = data;

  const initialState: IItem = {
    inventorynumber,
    supplier,
    name,
    person_id,
    status_id,
    type_id,
    place_id,
    description,
    registrationdate,
    guaranteeperiod,
    commissioningdate,
    receipt_from_repairs_date,
    departure_from_repairs_date,
  };

  const router = useRouter();

  const saveData = async (values: IItem) => {
    try {
      const response = await $api.post(`items/${inventorynumber}`, values);
      router.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ItemLayout>
      <Formik
        initialValues={initialState}
        onSubmit={(values) => {
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
                      {catalogs?.types.map((type) => {
                        return (
                          <MenuItem value={type.id} key={type.id}>
                            {type.name}
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
                      {catalogs?.persons.map((person) => {
                        return (
                          <MenuItem value={person.id} key={person.id}>
                            {person.name}
                          </MenuItem>
                        );
                      })}
                    </Field>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <DesktopDatePicker
                    label="Дата постановки на учет"
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
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={4}>
                  <DesktopDatePicker
                    label="Дата передачи в эксплуатацию"
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
                      />
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
                      <TextFieldInput
                        {...params}
                        fullWidth
                        autoComplete="off"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={8}>
                  <FormControl fullWidth>
                    <Field
                      width={100}
                      as="select"
                      defaultValue=""
                      name="place_id"
                      label="Местоположение"
                      component={Select}
                    >
                      {catalogs?.places.map((place) => {
                        return (
                          <MenuItem value={place.id} key={place.id}>
                            {place.name}
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
                      name="status_id"
                      label="Статус"
                      component={Select}
                    >
                      {catalogs?.statuses.map((status) => {
                        return (
                          <MenuItem value={status.id} key={status.id}>
                            {status.name}
                          </MenuItem>
                        );
                      })}
                    </Field>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <DesktopDatePicker
                    label="Дата прибытия из ремонта"
                    // clearable
                    inputFormat="DD/MM/yyyy"
                    value={values.receipt_from_repairs_date ?? null}
                    onChange={(value) =>
                      setFieldValue("receipt_from_repairs_date", value)
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
                  <DesktopDatePicker
                    label="Дата отправки на участок из ремонта"
                    // clearable
                    inputFormat="DD/MM/yyyy"
                    value={values.departure_from_repairs_date ?? null}
                    onChange={(value) =>
                      setFieldValue("departure_from_repairs_date", value)
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
                    <DeleteButton inventorynumber={inventorynumber} />
                  </Stack>
                </Grid>
              </Grid>
            </Form>
            <RepairsComponent
              inventorynumber={inventorynumber}
              Repairs={Repairs}
            />
            <Typography
              variant="h5"
              sx={{
                padding: "10px 0px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              Журнал действий
            </Typography>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">№</TableCell>
                    <TableCell align="left">Действие</TableCell>
                    <TableCell align="right">Дата</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Log?.map((log, index) => (
                    <TableRow key={index}>
                      <TableCell align="left">{index + 1}</TableCell>
                      <TableCell align="left" component="th" scope="row">
                        {log.action}
                      </TableCell>
                      <TableCell align="right">
                        {moment(log.createdAt).format("DD.MM.YYYY, H:mm:ss")}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Typography
              variant="h5"
              sx={{
                padding: "10px 0px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              Списание
              <Link href={`/deregistration/${inventorynumber}/create`} passHref>
                <Button variant="outlined">Списать позицию</Button>
              </Link>
            </Typography>
            <Stack spacing={2} sx={{ width: "100%" }}>
              {Deregistration?.map((item, index) => (
                <>
                  <Paper key={index} sx={{ padding: "10px" }}>
                    <List>
                      <ListItemText primary={`Причина: ${item.reason}`} />
                      <ListItemText primary={`Соглашение: ${item.agreement}`} />
                      <ListItemText
                        primary={`Дата списания: ${moment(
                          item.deregistrationdate
                        ).format("DD.MM.YYYY")}`}
                      />
                    </List>
                    <Link href={`deregistration/${item.id}`}>
                      <Button variant="outlined">Редактировать</Button>
                    </Link>
                    {item?.attachments?.length ? (
                      <>
                        <Typography
                          variant="h6"
                          sx={{
                            padding: "10px 0px",
                          }}
                        >
                          Вложения (Акт на списание, дефектная ведомость, фото,
                          согласование списания)
                        </Typography>

                        {item.attachments.map((attachment, index) => (
                          <>
                            <FileViewDynamic
                              attachment={attachment}
                              key={index}
                              deregistrationId={item.id}
                            />
                          </>
                        ))}
                      </>
                    ) : null}
                  </Paper>
                </>
              ))}
            </Stack>
          </Box>
        )}
      </Formik>
    </ItemLayout>
  );
}
