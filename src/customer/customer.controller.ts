import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  HttpCode,
  HttpStatus,
  Body,
  Param,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerDto } from './customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly service: CustomerService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getCustomers(): CustomerDto[] {
    return this.service.getAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getCustomerById(@Param('id') id: string): CustomerDto {
    return this.service.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createCustomer(@Body() customer: CustomerDto): CustomerDto {
    return this.service.insert(customer);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  putCustomer(@Body() body: CustomerDto, @Param('id') id: string): CustomerDto {
    return this.service.update(id, body);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  patchCustomer(
    @Body() body: CustomerDto,
    @Param('id') id: string,
  ): CustomerDto {
    return this.service.patch(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteCustomer(@Param('id') id: string): void {
    this.service.delete(id);
  }
}
