import { IFile } from '../models/deregistration.model';

export type UpdateDeregistrationDto = {
  readonly reason: string;
  readonly deregistrationdate: Date;
  readonly agreement: string;
  readonly attachments: string | string[];
};
