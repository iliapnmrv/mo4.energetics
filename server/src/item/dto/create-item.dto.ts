export type CreateItemDto = {
  name: string;
  inventorynumber: number;
  dateofdelivery: Date;
  guaranteeperiod: Date;
  supplier: string;
  placeId?: number;
  personId?: number;
  statusId?: number;
  typeId?: number;
  description?: string;
};
