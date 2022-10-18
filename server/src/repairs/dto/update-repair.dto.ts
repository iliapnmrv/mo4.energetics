export type UpdateRepairDto = {
  readonly type_id: number;
  readonly requestnumber: number;
  readonly startdate: Date;
  readonly endDate: Date;
  readonly decision_id: number;
  readonly handoverdate: Date;
  readonly comments: string;
  readonly price: number;
};
