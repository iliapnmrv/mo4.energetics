import { Status } from 'src/item/models/statuses.model';

export interface CreateCatalogDto extends Omit<Status, 'id'> {}

export class CreateCatalogDto {}
