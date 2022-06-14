import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import GridMUI from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { styled } from "@mui/material/styles";
import { EditingState } from "@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  TableEditColumn,
  TableHeaderRow,
  TableInlineCellEditing,
  Toolbar,
} from "@devexpress/dx-react-grid-material-ui";
import $api from "http/index";
import { useRouter } from "next/router";
import { CatalogsNames } from "constants/constants";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TableContainer,
  Tabs,
} from "@mui/material";
import CatalogsTabs from "components/Tabs/CatalogsTabs";

export async function getServerSideProps({ params }: any) {
  const { data } = await $api.get(`catalogs/${params.catalog}`);
  const returnedData = data.map((item: any) => ({
    //@ts-ignore
    name: item[CatalogsNames[params.catalog].name],
    //@ts-ignore
    id: item[CatalogsNames[params.catalog].id],
  }));
  return {
    props: { data: returnedData }, // will be passed to the page component as props
  };
}

type ICatalogsItem = {
  id: number;
  name: string;
};

const getRowId = (row: ICatalogsItem) => row.id;

type IFocusableCell = {
  onClick: Function;
};
const FocusableCell = ({ onClick, ...restProps }: IFocusableCell) => (
  //@ts-ignore
  <Table.Cell {...restProps} tabIndex={0} onFocus={onClick} />
);

type Props = {
  data: ICatalogsItem[];
};

const Catalogs = ({ data }: Props) => {
  const [columns] = useState([
    { name: "id", title: "Значение" },
    { name: "name", title: "Наименование" },
  ]);

  const editColumnMessages = {
    addCommand: "Добавить",
    editCommand: "Изменить",
    deleteCommand: "Удалить",
    commitCommand: "Сохранить",
    cancelCommand: "Отменить",
  };

  const router = useRouter();
  const { catalog } = router.query;

  const [rows, setRows] = useState<ICatalogsItem[]>(data);
  const [idToDelete, setIdToDelete] = useState<number>(0);
  const [editingCells, setEditingCells] = useState([]);

  const addEmptyRow = () =>
    commitChanges({ added: [{ name: "", id: rows[rows.length - 1].id + 1 }] });

  const addCatalog = async (item: ICatalogsItem[]) => {
    const { name, id } = item?.[0];
    const { data } = await $api.post(`catalogs/${catalog}`, {
      //@ts-ignore
      [CatalogsNames[catalog].name]: name,
      //@ts-ignore
      [CatalogsNames[catalog].id]: id,
    });
  };

  const changeCatalog = async (item: ICatalogsItem[]) => {
    if (item.length) {
      const { name, id } = item[0];
      const { data } = await $api.put(`catalogs/${catalog}/${id}`, {
        //@ts-ignore
        [CatalogsNames[catalog].name]: name,
      });
    }
  };

  const deleteCatalog = async () => {
    const { data } = await $api.delete(`catalogs/${catalog}/${idToDelete}`);
    const deletedSet = new Set([idToDelete]);
    let changedRows: ICatalogsItem[];
    changedRows = rows.filter((row) => !deletedSet.has(row.id));
    setRows(changedRows);
    setIdToDelete(0);
  };

  const handleClose = () => {
    setIdToDelete(0);
  };

  useEffect(() => {
    const getData = async () => {
      const { data } = await $api.get(`catalogs/${catalog}`);
      setRows(
        data.map((item: any) => ({
          //@ts-ignore
          name: item[CatalogsNames[catalog].name],
          //@ts-ignore
          id: item[CatalogsNames[catalog].id],
        }))
      );
    };
    getData();
  }, [catalog]);

  type ICatalogsChanges = {
    added?: ICatalogsItem[];
    changed?: ICatalogsItem[];
    deleted?: number[];
  };

  const commitChanges = ({ added, changed, deleted }: ICatalogsChanges) => {
    let changedRows: ICatalogsItem[] = [];
    if (added) {
      const startingAddedId =
        rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
      changedRows = [
        ...rows,
        ...added.map((row, index) => ({
          //@ts-ignore
          index: startingAddedId + index,
          ...row,
        })),
      ];
      addCatalog([
        ...added.map((row, index) => ({
          //@ts-ignore
          id: startingAddedId + index,
          ...row,
        })),
      ]);
    }
    if (changed) {
      changedRows = rows.map((row) =>
        changed[row.id] ? { ...row, ...changed[row.id] } : row
      );
      changeCatalog(
        rows
          .map((row) =>
            changed[row.id]
              ? { ...row, ...changed[row.id] }
              : { name: "", id: 0 }
          )
          .filter((item) => item.id !== 0)
      );
    }
    if (deleted) {
      setIdToDelete(rows.filter((row) => deleted[0] === row.id)?.[0]?.id);
      changedRows = rows;
    }
    setRows(changedRows);
  };

  return (
    <>
      <CatalogsTabs />
      <Dialog
        open={idToDelete !== 0}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Вы уверены что хотите удалить{" "}
          {rows.filter((row) => row.id === idToDelete)[0]?.name}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Подтвердите действие
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отменить</Button>
          <Button onClick={deleteCatalog} autoFocus>
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
      <TableContainer
        component={Paper}
        sx={{ overflowX: "initial", position: "relative" }}
      >
        <Grid rows={rows} columns={columns} getRowId={getRowId}>
          <EditingState
            //@ts-ignore
            onCommitChanges={commitChanges}
            editingCells={editingCells}
            //@ts-ignore
            onEditingCellsChange={setEditingCells}
            addedRows={[]}
            onAddedRowsChange={addEmptyRow}
          />
          <Table
            //@ts-ignore
            cellComponent={FocusableCell}
            stickyHeader
            aria-label="collapsible sticky table"
          />
          <TableHeaderRow />
          <TableInlineCellEditing
            selectTextOnEditStart={false}
            startEditAction={"click"}
          />
          <TableEditColumn
            showAddCommand
            showDeleteCommand
            messages={editColumnMessages}
          />
        </Grid>
      </TableContainer>
    </>
  );
};
export default Catalogs;
