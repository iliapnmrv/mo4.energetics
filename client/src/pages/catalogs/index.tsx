"use client";

import {
  Box,
  Divider,
  Fab,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import React, { FC, useState } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CatalogModal from "components/Catalogs/CatalogModal";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useSnackbar } from "notistack";
import { CatalogTypes } from "constants/translations";
import {
  useDeleteCatalogMutation,
  useGetCatalogsQuery,
} from "store/catalog/catalog.api";

export type ICatalog = {
  name: string;
  id: number;
};

export type IAllCatalogsResponse = {
  persons: ICatalog[];
  statuses: ICatalog[];
  users: ICatalog[];
  places: ICatalog[];
  devices: ICatalog[];
  types: ICatalog[];
};

const Catalogs: FC = () => {
  const { data: catalogs } = useGetCatalogsQuery();

  const [catalog, setCatalog] = useState<keyof IAllCatalogsResponse>("places");
  const [deleteCatalog] = useDeleteCatalogMutation();

  const [catalogId, setCatalogId] = useState<number>(0);

  const [modalType, setModalType] = useState<"edit" | "create" | undefined>();

  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (
    event: React.SyntheticEvent,
    newCatalog: keyof IAllCatalogsResponse
  ) => {
    if (newCatalog !== null) {
      setCatalog(newCatalog);
    }
  };

  const onDeleteCatalog = async (id: number) => {
    try {
      await deleteCatalog({
        //@ts-ignore
        catalog: CatalogTypes[catalog],
        id,
      }).unwrap();
      enqueueSnackbar("Позиция удалена", { variant: "success" });
    } catch (e) {
      enqueueSnackbar("Произошла ошибка", { variant: "error" });
    }
  };

  return (
    <>
      <ToggleButtonGroup
        color="primary"
        value={catalog}
        exclusive
        onChange={handleChange}
        aria-label="catalogs"
      >
        <ToggleButton value="places">Местоположения</ToggleButton>
        <ToggleButton value="persons">МОЛы</ToggleButton>
        <ToggleButton value="types">Номенкулатуры</ToggleButton>
        <ToggleButton value="statuses">Статусы</ToggleButton>
        <ToggleButton value="repairsTypes">Типы ремонтов</ToggleButton>
        <ToggleButton value="repairsDecisions">
          Решения по ремонтам
        </ToggleButton>
      </ToggleButtonGroup>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>№</TableCell>
              <TableCell align="left">Значение</TableCell>
              <TableCell align="right">Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* @ts-ignore */}
            {catalogs?.[catalog]?.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="right">
                  <Stack
                    direction="row"
                    justifyContent="flex-end"
                    divider={<Divider orientation="vertical" flexItem />}
                    spacing={1}
                  >
                    <IconButton
                      aria-label="edit"
                      onClick={() => {
                        setCatalogId(row.id);
                        setModalType("edit");
                      }}
                    >
                      <EditOutlinedIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() => onDeleteCatalog(row.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <CatalogModal
        defaultValue={
          //@ts-ignore
          catalogs?.[catalog]?.find((item) => item.id === catalogId)?.name
        }
        catalogType={catalog}
        catalogId={catalogId}
        onClose={() => setModalType(undefined)}
        type={modalType}
      />
      <Fab
        color="primary"
        sx={{
          zIndex: 10,
          margin: 0,
          top: "auto",
          right: 20,
          bottom: 20,
          left: "auto",
          position: "fixed",
        }}
        onClick={() => {
          setCatalogId(0);
          setModalType("create");
        }}
        aria-label="add"
      >
        <AddIcon />
      </Fab>
      {/* <AlertDialog
        open={!!deleteCatalogId}
        handleClose={() => setDeleteCatalogId(0)}
        text={`Удалить ${CatalogNames[catalog]} с наименованием ${
          catalogs?.[catalog]?.find((item) => item.id === deleteCatalogId)?.name
        }`}
        confirmAction={onDeleteCatalog}
        confirmText={"Да, удалить"}
      /> */}
    </>
  );
};

export default Catalogs;
