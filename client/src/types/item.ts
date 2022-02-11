// export type IRepairs = {
//   applicationNumber: number;
//   repairType: string;
//   startDate: number;
//   decision: string;
//   endDate: number;

// };

export type ILogs = {
  user: string;
  action: string;
  date: number;
};

export type IItem = {
  inventorynumber: string;
  supplier: string;
  name: string;
  person?: number;
  status?: number;
  history?: ILogs[];
};
