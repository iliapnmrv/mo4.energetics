import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  MenuItem,
  Stack,
  TextField as TextFieldInput,
  Typography,
} from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import Search from "components/Search/Search";
import { Field, Form, Formik } from "formik";
import { Select } from "formik-mui";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useGetCatalogsQuery } from "store/catalog/catalog.api";
import { setIsRepairs, setSearch } from "store/slices/repairsSlice";

type Props = {
  setFilters: Dispatch<SetStateAction<Record<string, any>>>;
};

const Filters = ({ setFilters }: Props) => {
  const { data: catalogs } = useGetCatalogsQuery();

  const { isRepairs, search } = useAppSelector((state) => state.repairsReducer);

  const dispatch = useAppDispatch();

  const filterItems = async (values?: any) => {
    setFilters(values);
  };

  return (
    <>
      <Box sx={{ position: "sticky", top: "0px", opacity: 1 }}>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={isRepairs} />}
            label="Ремонты"
            onChange={() => dispatch(setIsRepairs(!isRepairs))}
          />
        </FormGroup>
        <Search
          search={search}
          //@ts-ignore
          setSearch={(search) => dispatch(setSearch(search))}
        />
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Фильтры</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Formik
              initialValues={{
                person_id: [],
                status_id: [isRepairs ? 2 : null],
                type_id: [],
                place_id: [],
                guaranteeperiodFrom: null,
                guaranteeperiodTo: null,
                registrationdateFrom: null,
                registrationdateTo: null,
              }}
              onSubmit={(values) => {
                filterItems(values);
              }}
              enableReinitialize
            >
              {({ values, setFieldValue, handleReset }) => (
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <FormControl fullWidth>
                        <Field
                          disabled={false}
                          width={100}
                          as="select"
                          defaultValue=""
                          name="type_id"
                          label="Номенкулатура устройства"
                          component={Select}
                          multiple
                        >
                          {catalogs?.types.map((type) => (
                            <MenuItem value={type.id} key={type.id}>
                              {type.name}
                            </MenuItem>
                          ))}
                        </Field>
                      </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                      <FormControl fullWidth>
                        <Field
                          disabled={false}
                          width={100}
                          as="select"
                          defaultValue=""
                          name="status_id"
                          label="Cтатус"
                          component={Select}
                          multiple
                        >
                          {catalogs?.statuses.map((status) => (
                            <MenuItem value={status.id} key={status.id}>
                              {status.name}
                            </MenuItem>
                          ))}
                        </Field>
                      </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <DesktopDatePicker
                          label="Гарантийный срок от"
                          inputFormat="DD/MM/yyyy"
                          value={values.guaranteeperiodFrom}
                          onChange={(value) =>
                            setFieldValue("guaranteeperiodFrom", value)
                          }
                          renderInput={(params) => (
                            <TextFieldInput
                              {...params}
                              fullWidth
                              autoComplete="off"
                            />
                          )}
                        />
                        <Box sx={{ mx: 2 }}>До</Box>
                        <DesktopDatePicker
                          label="Гарантийный срок до"
                          inputFormat="DD/MM/yyyy"
                          value={values.guaranteeperiodTo}
                          onChange={(value) =>
                            setFieldValue("guaranteeperiodTo", value)
                          }
                          renderInput={(params) => (
                            <TextFieldInput
                              {...params}
                              fullWidth
                              autoComplete="off"
                            />
                          )}
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={4}>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <DesktopDatePicker
                          label="Дата поставки от"
                          inputFormat="DD/MM/yyyy"
                          value={values.registrationdateFrom}
                          onChange={(value) =>
                            setFieldValue("registrationdateFrom", value)
                          }
                          renderInput={(params) => (
                            <TextFieldInput
                              {...params}
                              fullWidth
                              autoComplete="off"
                            />
                          )}
                        />
                        <Box sx={{ mx: 2 }}>До</Box>
                        <DesktopDatePicker
                          label="Дата поставки до"
                          inputFormat="DD/MM/yyyy"
                          value={values.registrationdateTo}
                          onChange={(value) =>
                            setFieldValue("registrationdateTo", value)
                          }
                          renderInput={(params) => (
                            <TextFieldInput
                              {...params}
                              fullWidth
                              autoComplete="off"
                            />
                          )}
                        />
                      </Stack>
                    </Grid>

                    <Grid item xs={4}>
                      <FormControl fullWidth>
                        <Field
                          disabled={false}
                          width={100}
                          as="select"
                          defaultValue=""
                          name="person_id"
                          label="МОЛ"
                          component={Select}
                          multiple
                        >
                          {catalogs?.persons.map((person) => (
                            <MenuItem value={person.id} key={person.id}>
                              {person.name}
                            </MenuItem>
                          ))}
                        </Field>
                      </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                      <FormControl fullWidth>
                        <Field
                          disabled={false}
                          width={100}
                          as="select"
                          defaultValue=""
                          name="place_id"
                          label="Местоположение"
                          component={Select}
                          multiple
                        >
                          {catalogs?.places.map((place) => (
                            <MenuItem value={place.id} key={place.id}>
                              {place.name}
                            </MenuItem>
                          ))}
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
                          Отфильтровать
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={handleReset}
                        >
                          Сбросить
                        </Button>
                      </Stack>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </AccordionDetails>
        </Accordion>
      </Box>
    </>
  );
};

export default Filters;
