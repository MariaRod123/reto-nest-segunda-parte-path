import { InvoiceDetailDto } from './invoice-detail.dto';

export class InvoiceDto {
  id: string;
  details: InvoiceDetailDto[];
  total: number;
}
