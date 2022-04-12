export type IRepairs = {
  id: number;
  requestnumber: number;
  inventorynumber: string;
  type_id: number;
  decision_id: number;
  startdate: Date;
  enddate: Date;
  handoverdate: Date;
  comments: string;
  price: number;
};

export type ILogs = {
  user: string;
  action: string;
  createdAt: Date;
};
