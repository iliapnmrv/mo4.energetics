import React from "react";
import FileSaver from "file-saver";
import * as XLSX from "xlsx";
import moment from "moment";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { Box, Button, Fab } from "@mui/material";

type Props = {
  items: any[];
};

const Download = ({ items }: Props) => {
  const exportToCSV = (csvData: any[], fileName: string, wscols: any[]) => {
    const ws = XLSX.utils.json_to_sheet(Heading, {
      header: [
        "id",
        "inventorynumber",
        "type",
        "name",
        "dateofdelivery",
        "guaranteeperiod",
        "supplier",
        "person",
        "status",
        "place",
        "description",
      ],
      skipHeader: true,
    });
    ws["!cols"] = wscols;
    XLSX.utils.sheet_add_json(ws, csvData, {
      header: [
        "id",
        "inventorynumber",
        "type",
        "name",
        "dateofdelivery",
        "guaranteeperiod",
        "supplier",
        "person",
        "status",
        "place",
        "description",
      ],
      skipHeader: true,
      origin: -1, //ok
    });
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const Heading = [
    {
      id: "id",
      inventorynumber: "Инвентарный номер",
      type: "Номенклатура",
      name: "Характеристика",
      dateofdelivery: "Дата поставки",
      guaranteeperiod: "Гарантийный срок",
      supplier: "Поставщик",
      person: "МОЛ",
      status: "Статус",
      place: "Местоположение",
      description: "Описание",
    },
  ];

  const wscols = [
    {
      wch: 10,
    },
  ];
  return (
    <Box
      onClick={(e) =>
        exportToCSV(
          items.map((item) => ({
            id: item.id,
            name: item.name,
            inventorynumber: item.inventorynumber,
            dateofdelivery: item.dateofdelivery,
            guaranteeperiod: item.guaranteeperiod,
            supplier: item.supplier,
            type: item?.Type?.typeName || null,
            place: item?.Place?.placeName || null,
            person: item?.Person?.personName || null,
            status: item?.Status?.statusName || null,
            description: item.description,
          })),
          String(moment()),
          wscols
        )
      }
    >
      <Fab
        size="medium"
        color="secondary"
        aria-label="add"
        sx={{ marginBottom: "10px" }}
      >
        <FileDownloadIcon />
      </Fab>
    </Box>
  );
};

export default Download;
