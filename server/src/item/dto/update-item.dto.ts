export type UpdateItemDto = {
  name?: string;
  registrationdate?: Date;
  guaranteeperiod?: Date;
  supplier?: string;
  commissioningdate: Date;
  place_id?: number;
  person_id?: number;
  status_id?: number;
  type_id?: number;
  description?: string;
  departure_from_repairs_date?: Date;
  receipt_from_repairs_date?: Date;
};
