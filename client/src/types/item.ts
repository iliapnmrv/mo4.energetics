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

export type IDeregistration = {
  deregistrationdate: Date;
  attachments: IFile[];
  reason: string;
  agreement: string;
};

export type IFile = {
  path: string;
  name: string;
};
