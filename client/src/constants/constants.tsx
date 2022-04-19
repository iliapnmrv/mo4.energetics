export const LOGS_CATALOG = {
  inventorynumber: "Инвентарный номер",
  supplier: "Поставщик",
  name: "Наименование",
  dateofdelivery: "Дата доставки",
  guaranteeperiod: "Гарантивный срок",
  person_id: "МОЛ",
  status_id: "Статус",
  type_id: "Номенкулатура",
  place_id: "Местонахождение",
  description: "Дополнительная информация",
};

export interface ILogsCatalog {
  inventorynumber: string;
  supplier: string;
  name: string;
  dateofdelivery: string;
  guaranteeperiod: string;
  person_id: string;
  status_id: string;
  type_id: string;
  place_id: string;
  description: string;
}
