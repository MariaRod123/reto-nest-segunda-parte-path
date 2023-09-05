import { Injectable } from '@nestjs/common';
import { InvoiceDto } from './invoice.dto';
import { randomUUID } from 'crypto';
import { InvoiceDetailDto } from './invoice-detail.dto';

function totalCalculator(invoice: InvoiceDto[]): void {
  invoice.forEach((i) => {
    let subTotal = 0;
    i.details.forEach((p) => {
      subTotal += p.price * p.quantity;
    });
    i.total = subTotal;
  });
}

const invoices: InvoiceDto[] = [
  {
    id: '0',
    details: [
      {
        idDetail: randomUUID(),
        product: 'harina',
        price: 48,
        quantity: 2,
      },
    ],
    total: 0,
  },
  {
    id: '1',
    details: [
      {
        idDetail: randomUUID(),
        product: 'azucar',
        price: 60,
        quantity: 4,
      },
      {
        idDetail: randomUUID(),
        product: 'coca',
        price: 135,
        quantity: 1,
      },
    ],
    total: 0,
  },
];

totalCalculator(invoices);

@Injectable()
export class InvoiceService {
  getAll(): InvoiceDto[] {
    return invoices;
  }

  getById(id: string): InvoiceDto {
    const index: number = invoices.findIndex((i) => i.id == id);
    return invoices[index];
  }

  getDetailById(id: string, idDetail: string): InvoiceDetailDto {
    const index: number = invoices.findIndex((i) => i.id === id);

    const indexDetail: number = invoices[index].details.findIndex(
      (d) => d.idDetail === idDetail,
    );
    return invoices[index].details[indexDetail];
  }

  insert(invoice: InvoiceDto): InvoiceDto {
    if (invoice.id == null) {
      invoice.id = randomUUID();
    }
    if (invoice.details == null) {
      invoice.details = [];
    }
    invoices.push(invoice);
    totalCalculator(invoices);

    return invoice;
  }

  insertDetail(id: string, invoiceDetail: InvoiceDetailDto): InvoiceDetailDto {
    if (invoiceDetail.idDetail == null) {
      invoiceDetail.idDetail = randomUUID();
    }
    if (invoiceDetail.product == null) {
      invoiceDetail.product = 'undefined';
    }
    if (invoiceDetail.price == null) {
      invoiceDetail.price = 0;
    }
    if (invoiceDetail.quantity == null) {
      invoiceDetail.quantity = 1;
    }

    const index: number = invoices.findIndex((i) => i.id == id);

    invoices[index].details.push(invoiceDetail);
    totalCalculator(invoices);

    return invoiceDetail;
  }

  update(id: string, body: InvoiceDto): InvoiceDto {
    const index: number = invoices.findIndex((i) => i.id == id);

    if (body.details == null) {
      body.details = [];
    } else {
      body.details.forEach((d) => {
        if (d.idDetail == null) {
          d.idDetail = randomUUID();
        }
        if (d.product == null) {
          d.product = 'undefined';
        }
        if (d.price == null) {
          d.price = 0;
        }
        if (d.quantity == null) {
          d.quantity = 1;
        }
      });
    }
    invoices[index].details = body.details;
    invoices[index].total = body.total;

    totalCalculator(invoices);

    return invoices[index];
  }

  updateDetail(
    id: string,
    idDetail: string,
    body: InvoiceDetailDto,
  ): InvoiceDetailDto {
    const index: number = invoices.findIndex((i) => i.id == id);
    const indexDetail: number = invoices[index].details.findIndex(
      (d) => d.idDetail == idDetail,
    );

    if (body.product == null) {
      body.product = 'undefined';
    }
    if (body.price == null) {
      body.price = 0;
    }
    if (body.quantity == null) {
      body.quantity = 1;
    }

    invoices[index].details[indexDetail].product = body.product;
    invoices[index].details[indexDetail].price = body.price;
    invoices[index].details[indexDetail].quantity = body.quantity;

    totalCalculator(invoices);

    return invoices[index].details[indexDetail];
  }

  patch(id: string, body: InvoiceDto): InvoiceDto {
    const index: number = invoices.findIndex((i) => i.id == id);

    if (
      body.details != null &&
      body.details.length == invoices[index].details.length
    ) {
      invoices[index].details.forEach((d, i) => {
        if (body.details[i].idDetail != null) {
          d.idDetail = body.details[i].idDetail;
        }
        if (body.details[i].product != null) {
          d.product = body.details[i].product;
        }
        if (body.details[i].price != null) {
          d.price = body.details[i].price;
        }
        if (body.details[i].quantity != null) {
          d.quantity = body.details[i].quantity;
        }
      });
    }
    if (body.total != null) {
      invoices[index].total = body.total;
    }

    totalCalculator(invoices);

    return invoices[index];
  }

  patchDetail(
    id: string,
    idDetail: string,
    body: InvoiceDetailDto,
  ): InvoiceDetailDto {
    const index: number = invoices.findIndex((i) => i.id == id);
    const indexDetail: number = invoices[index].details.findIndex(
      (d) => d.idDetail == idDetail,
    );

    if (body.product != null) {
      invoices[index].details[indexDetail].product = body.product;
    }
    if (body.price != null) {
      invoices[index].details[indexDetail].price = body.price;
    }
    if (body.quantity != null) {
      invoices[index].details[indexDetail].quantity = body.quantity;
    }

    totalCalculator(invoices);

    return invoices[index].details[indexDetail];
  }

  delete(id: string): void {
    const index: number = invoices.findIndex((i) => i.id == id);

    invoices.splice(index, 1);

    totalCalculator(invoices);
  }

  deleteDetail(id: string, idDetail: string): void {
    const index: number = invoices.findIndex((i) => i.id == id);
    const indexDetail: number = invoices[index].details.findIndex(
      (d) => d.idDetail == idDetail,
    );

    invoices[index].details.splice(indexDetail, 1);

    totalCalculator(invoices);
  }
}
