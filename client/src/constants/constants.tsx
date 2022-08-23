export const LOGS_CATALOG = {
  inventorynumber: "Инвентарный номер",
  supplier: "Поставщик",
  name: "Наименование",
  registrationdate: "Дата доставки",
  guaranteeperiod: "Гарантивный срок",
  person_id: "МОЛ",
  status_id: "Статус",
  type_id: "Номенкулатура",
  place_id: "Местонахождение",
  description: "Дополнительная информация",
};

export const CatalogsNames = {
  statuses: {
    id: "statusId",
    name: "statusName",
  },
  places: {
    id: "placeId",
    name: "placeName",
  },
  types: {
    id: "typeId",
    name: "typeName",
  },
  persons: {
    id: "personId",
    name: "personName",
  },
  repairsTypes: {
    id: "typeId",
    name: "typeName",
  },
  repairsDecisions: {
    id: "decisionId",
    name: "decisionName",
  },
};

export interface ILogsCatalog {
  inventorynumber: string;
  supplier: string;
  name: string;
  registrationdate: string;
  guaranteeperiod: string;
  person_id: string;
  status_id: string;
  type_id: string;
  place_id: string;
  description: string;
}
