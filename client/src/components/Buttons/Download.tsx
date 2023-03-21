import React from "react";
import FileSaver from "file-saver";
import * as XLSX from "xlsx";
import moment from "moment";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { Box, Button, Fab } from "@mui/material";
import { IItem } from "pages";

type Props = {
  items?: IItem[];
};

const Download = ({ items }: Props) => {
  const exportToCSV = (csvData: any[], fileName: string, wscols: any[]) => {
    const ws = XLSX.utils.json_to_sheet(Heading, {
      header: [
        "id",
        "inventorynumber",
        "type",
        "name",
        "registrationdate",
        "guaranteeperiod",
        "supplier",
        "person",
        "status",
        "place",
        "description",
        "departure_from_repairs_date",
        "receipt_from_repairs_date",
        "commissioningdate",
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
        "registrationdate",
        "guaranteeperiod",
        "supplier",
        "person",
        "status",
        "place",
        "description",
        "departure_from_repairs_date",
        "receipt_from_repairs_date",
        "commissioningdate",
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
      registrationdate: "Дата поставки",
      guaranteeperiod: "Гарантийный срок",
      supplier: "Поставщик",
      person: "МОЛ",
      status: "Статус",
      place: "Местоположение",
      description: "Описание",
      departure_from_repairs_date: "Дата отправки на участок из ремонта",
      receipt_from_repairs_date: "Дата прибытия из ремонта",
      commissioningdate: "Дата передачи в эксплуатацию",
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
          items?.map((item) => ({
            id: item.id,
            name: item.name,
            inventorynumber: item.inventorynumber,
            registrationdate: item.registrationdate,
            guaranteeperiod: item.guaranteeperiod,
            supplier: item.supplier,
            type: item?.Type?.name || null,
            place: item?.Place?.name || null,
            person: item?.Person?.name || null,
            status: item?.Status?.name || null,
            description: item.description,
            departure_from_repairs_date: item.departure_from_repairs_date,
            receipt_from_repairs_date: item.receipt_from_repairs_date,
            commissioningdate: item.commissioningdate,
          })) ?? [],
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
