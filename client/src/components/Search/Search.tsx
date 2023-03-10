import { IconButton, InputBase, Paper } from "@mui/material";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Search as SearchIcon } from "@mui/icons-material";

type Props = {
  setSearch: Dispatch<SetStateAction<string>>;
  search: string;
};

const Search = ({ setSearch, search }: Props) => {
  return (
    <Paper
      component="form"
      sx={{
        p: "4px 8px",
        display: "flex",
        alignItems: "center",
        opacity: 1,
        mb: "5px",
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Поиск по списку..."
        inputProps={{ "aria-label": "search google maps" }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default Search;
