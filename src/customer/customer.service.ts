import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CustomerDto } from './customer.dto';

@Injectable()
export class CustomerService {
  private customers: CustomerDto[] = [
    {
      id: '0',
      name: 'Toby',
      address: 'Calle 123',
    },
    {
      id: '1',
      name: 'Kira',
      address: 'Calle 345',
    },

    {
      id: '2',
      name: 'Charly',
      address: 'Calle 567',
    },
    {
      id: '3',
      name: 'Jackie',
      address: 'Calle 789',
    },
    {
      id: '4',
      name: 'Kody',
      address: 'Calle 012',
    },
  ];

  getAll(): CustomerDto[] {
    return this.customers;
  }

  getById(id: string): CustomerDto {
    const index: number = this.customers.findIndex((c) => c.id == id);
    return this.customers[index];
  }

  insert(customer: CustomerDto): CustomerDto {
    if (customer.id == null) {
      customer.id = randomUUID();
    }
    this.customers.push(customer);
    return customer;
  }

  update(id: string, body: CustomerDto): CustomerDto {
    const index: number = this.customers.findIndex((c) => c.id == id);
    this.customers[index].name = body.name;
    this.customers[index].address = body.address;

    return this.customers[index];
  }

  patch(id: string, body: CustomerDto): CustomerDto {
    const index: number = this.customers.findIndex((c) => c.id == id);

    if (body.name != null) {
      this.customers[index].name = body.name;
    }
    if (body.address != null) {
      this.customers[index].address = body.address;
    }

    return this.customers[index];
  }

  delete(id: string): boolean {
    const index: number = this.customers.findIndex((c) => c.id == id);

    if (index != -1) {
      this.customers.splice(index, 1);
      return true;
    }
    return false;
  }
}
