export type CreateItemDto = {
  name: string;
  inventorynumber: number;
  dateofdelivery: Date;
  guaranteeperiod: Date;
  supplier: string;
  place_id?: number;
  person_id?: number;
  status_id?: number;
  type_id?: number;
  description?: string;
};
