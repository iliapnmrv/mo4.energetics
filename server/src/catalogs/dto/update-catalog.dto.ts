import { Status } from 'src/item/models/statuses.model';

export interface UpdateCatalogDto extends Omit<Status, 'id'> {}

export class UpdateCatalogDto {}
