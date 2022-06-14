import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Chip,
  FormControl,
  Grid,
  MenuItem,
  Stack,
  Typography,
  TextField as TextFieldInput,
  Box,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { TextField, Select } from "formik-mui";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Field, Form, Formik } from "formik";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import Search from "components/Search/Search";
import $api from "http/index";
import { IItem } from "pages";
import { DateRangePicker, DesktopDatePicker } from "@mui/lab";
import { setIsRepairs } from "store/slices/repairsSlice";

type Props = {
  setItems: Dispatch<SetStateAction<IItem[]>>;
};

const Filters = ({ setItems }: Props) => {
  const { persons, places, statuses, types, repairTypes, repairDecisions } =
    useAppSelector((state) => state.catalogsReducer);
  const { isRepairs } = useAppSelector((state) => state.repairsReducer);

  const dispatch = useAppDispatch();

  const [search, setSearch] = useState("");

  const filterItems = async (values?: any) => {
    const { data } = await $api.get(
      `items/filter/?${new URLSearchParams(values).toString()}&search=${search}`
    );
    setItems(data);
  };

  useEffect(() => {
    if (isRepairs) {
      filterItems({ status_id: [2] });
    } else {
      filterItems();
    }
  }, [search, isRepairs]);

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
        <Search search={search} setSearch={setSearch} />
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
                dateofdeliveryFrom: null,
                dateofdeliveryTo: null,
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
                          {types.map((type) => (
                            <MenuItem value={type.typeId} key={type.id}>
                              {type.typeName}
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
                          {statuses.map((status) => (
                            <MenuItem value={status.statusId} key={status.id}>
                              {status.statusName}
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
                          value={values.dateofdeliveryFrom}
                          onChange={(value) =>
                            setFieldValue("dateofdeliveryFrom", value)
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
                          value={values.dateofdeliveryTo}
                          onChange={(value) =>
                            setFieldValue("dateofdeliveryTo", value)
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
                          {persons.map((person) => (
                            <MenuItem value={person.personId} key={person.id}>
                              {person.personName}
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
                          {places.map((place) => (
                            <MenuItem value={place.placeId} key={place.id}>
                              {place.placeName}
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
