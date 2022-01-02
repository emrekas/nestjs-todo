export interface IAudit {
  createdBy: number;
  created: Date;
  modifiedBy?: number;
  modified?: Date;
}
