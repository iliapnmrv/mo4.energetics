export type CreateItemDto = {
  name: string;
  inventorynumber: number;
  dateofdelivery: Date;
  guaranteeperiod: Date;
  supplier: string;
  person?: number;
  status?: number;
  type?: number;
  description?: string;
};
