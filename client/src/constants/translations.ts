import { IAllCatalogsResponse, ICatalogs } from "store/catalog/catalog.api";

export const ItemNames = {
  id: "",
  qr: "QR",
  name: "Наименование по бухгалтерии",
  month: "Месяц",
  year: "Год",
  serial_number: "Серийный номер",
  model: "Модель",
  description: "Описание",
  additional_information: "Дополнительная информация",
  instruction: "Инструкция",
  status: "Статус",
  user: "Пользователь",
  person: "МОЛ",
  place: "Местоположение",
  device: "Тип устройства",
  type: "Средство",
  updatedAt: "",
};

export const CatalogNames = {
  persons: "МОЛ",
  statuses: "Статус",
  users: "Пользователь",
  places: "Местоположение",
  devices: "Устройства",
  types: "Тип",
};

export const CatalogTypes: {
  [key in keyof IAllCatalogsResponse]: ICatalogs;
} = {
  persons: "persons",
  statuses: "statuses",
  types: "types",
  places: "places",
  repairsTypes: "repairsTypes",
  repairsDecisions: "repairsDecisions",
};
