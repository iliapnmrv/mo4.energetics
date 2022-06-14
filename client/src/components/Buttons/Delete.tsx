import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import $api from "http/index";
import { useRouter } from "next/router";
import React, { useState } from "react";

type Props = {
  inventorynumber: string;
};

const DeleteButton = ({ inventorynumber }: Props) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const deleteItem = async () => {
    const response = await $api.delete(`items/${inventorynumber}`);
    setIsDeleteDialogOpen(false);
    router.push("/");
  };

  const router = useRouter();

  return (
    <>
      <Dialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Удалить позицию {inventorynumber}?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Вы уверены, что хотите удалить позицию с инвентарным номером{" "}
            {inventorynumber}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteDialogOpen(false)}>Отменить</Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => deleteItem()}
            autoFocus
          >
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
      <Button color="error" onClick={() => setIsDeleteDialogOpen(true)}>
        Удалить
      </Button>
    </>
  );
};

export default DeleteButton;
