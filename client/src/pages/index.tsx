import * as React from "react";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/system";
import { Fab } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import AddIcon from "@mui/icons-material/Add";
import Row from "../components/Table/Row";
import $api from "../http";
import { ILogs, IRepairs } from "../types/item";
import {
  IPerson,
  IPlace,
  IRepairDecision,
  IRepairType,
  IStatus,
  IType,
} from "types/catalogs";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import {
  setPersons,
  setPlaces,
  setRepairDecisions,
  setRepairTypes,
  setStatuses,
  setTypes,
} from "store/slices/catalogsSlice";
import Link from "next/link";

export type IItem = {
  inventorynumber: string;
  supplier: string;
  name: string;
  dateofdelivery: Date;
  guaranteeperiod: Date;
  person_id?: number;
  status_id?: number;
  type_id?: number;
  place_id?: number;
  description?: string;
  Repairs?: IRepairs[];
  Log?: ILogs[];
};

export async function getServerSideProps() {
  const { data: rows } = await $api.get<IItem[]>(`items`);
  const { data: persons } = await $api.get<IPerson[]>(`catalogs/persons`);
  const { data: places } = await $api.get<IPlace[]>(`catalogs/places`);
  const { data: statuses } = await $api.get<IStatus[]>(`catalogs/statuses`);
  const { data: types } = await $api.get<IType[]>(`catalogs/types`);
  const { data: repairsTypes } = await $api.get<IRepairType[]>(
    `catalogs/repairsTypes`
  );
  const { data: repairsDecisions } = await $api.get<IRepairType[]>(
    `catalogs/repairsDecisions`
  );
  return {
    props: {
      rows,
      persons,
      places,
      statuses,
      types,
      repairsTypes,
      repairsDecisions,
    }, // will be passed to the page component as props
  };
}

type Props = {
  rows: IItem[];
  persons: IPerson[];
  places: IPlace[];
  statuses: IStatus[];
  types: IType[];
  repairsTypes: IRepairType[];
  repairsDecisions: IRepairDecision[];
};

const Home: React.FC<Props> = ({
  rows,
  persons,
  places,
  statuses,
  types,
  repairsTypes,
  repairsDecisions,
}: Props) => {
  const dispatch = useAppDispatch();
  dispatch(setPersons(persons));
  dispatch(setPlaces(places));
  dispatch(setStatuses(statuses));
  dispatch(setTypes(types));
  dispatch(setRepairTypes(repairsTypes));
  dispatch(setRepairDecisions(repairsDecisions));

  return (
    <>
      <Box sx={{ "& > :not(style)": { m: 1 } }}>
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Инвентарный номер</TableCell>
                <TableCell>Название</TableCell>
                <TableCell>Поставщик</TableCell>
                <TableCell align="right">МОЛ</TableCell>
                <TableCell align="right">Статус</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <Row key={row.name} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Link
          href={{
            pathname: "/create",
            query: {
              inventorynumber: rows[rows.length - 1]?.inventorynumber + 1,
            },
          }}
          passHref
          as={"/create"}
        >
          <Fab color="primary" aria-label="add">
            <AddIcon />
          </Fab>
        </Link>
      </Box>
    </>
  );
};

export default Home;
