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
import { useAppSelector } from "hooks/redux";
import Search from "components/Search/Search";
import $api from "http/index";
import { IItem } from "pages";

type Props = {
  setItems: Dispatch<SetStateAction<IItem[]>>;
};

const Filters = ({ setItems }: Props) => {
  const { persons, places, statuses, types, repairTypes, repairDecisions } =
    useAppSelector((state) => state.catalogsReducer);

  const [search, setSearch] = useState("");
  const ref = useRef(null);

  console.log(ref?.current?.values);
  const filterItems = async (values?: any) => {
    const { data } = await $api.get(
      `items/filter/?${new URLSearchParams(values).toString()}&search=${search}`
    );
    setItems(data);
  };

  useEffect(() => {
    filterItems();
  }, [search]);

  return (
    <>
      <Search setSearch={setSearch} search={search} />

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
              status_id: [],
              type_id: [],
              place_id: [],
            }}
            onSubmit={(values) => {
              filterItems(values);
            }}
            innerRef={ref}
          >
            {({ values, setFieldValue, handleReset }) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <Field
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
                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <Field
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
                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <Field
                        width={100}
                        as="select"
                        defaultValue=""
                        name="person_id"
                        label="МОЛ"
                        component={Select}
                        multiple
                        isClearable
                      >
                        {persons.map((person) => (
                          <MenuItem value={person.personId} key={person.id}>
                            {person.personName}
                          </MenuItem>
                        ))}
                      </Field>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <Field
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
    </>
  );
};

export default Filters;
