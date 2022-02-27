export type IRepairs = {
  id: number;
  requestnumber: number;
  inventorynumber: string;
  type_id: number;
  decision: string;
  startdate: Date;
  enddate: Date;
  handoverdate: Date;
  comments: string;
  price: number;
};

export type ILogs = {
  user: string;
  action: string;
  date: number;
};
