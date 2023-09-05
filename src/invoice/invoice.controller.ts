import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceDto } from './invoice.dto';
import { InvoiceDetailDto } from './invoice-detail.dto';

@Controller('invoice')
export class InvoiceController {
  constructor(private readonly service: InvoiceService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getInvoices(): InvoiceDto[] {
    return this.service.getAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getInvoiceById(@Param('id') id: string): InvoiceDto {
    return this.service.getById(id);
  }

  @Get(':id/:idDetail')
  @HttpCode(HttpStatus.OK)
  getInvoiceDetailById(
    @Param('id') id: string,
    @Param('idDetail') idDetail: string,
  ): InvoiceDetailDto {
    return this.service.getDetailById(id, idDetail);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  postInvoice(@Body() body: InvoiceDto): InvoiceDto {
    return this.service.insert(body);
  }

  @Post(':id')
  @HttpCode(HttpStatus.CREATED)
  postInvoiceDetail(
    @Param('id') id: string,
    @Body() body: InvoiceDetailDto,
  ): InvoiceDetailDto {
    return this.service.insertDetail(id, body);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  putInvoiceById(
    @Param('id') id: string,
    @Body() body: InvoiceDto,
  ): InvoiceDto {
    return this.service.update(id, body);
  }

  @Put(':id/:idDetail')
  @HttpCode(HttpStatus.OK)
  putInvoiceDetailById(
    @Param('id') id: string,
    @Param('idDetail') idDetail: string,
    @Body() body: InvoiceDetailDto,
  ): InvoiceDetailDto {
    return this.service.updateDetail(id, idDetail, body);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  patchInvoiceById(
    @Param('id') id: string,
    @Body() body: InvoiceDto,
  ): InvoiceDto {
    return this.service.patch(id, body);
  }

  @Patch(':id/:idDetail')
  @HttpCode(HttpStatus.OK)
  patchInvoiceDetailById(
    @Param('id') id: string,
    @Param('idDetail') idDetail: string,
    @Body() body: InvoiceDetailDto,
  ): InvoiceDetailDto {
    return this.service.patchDetail(id, idDetail, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteInvoice(@Param('id') id: string): void {
    this.service.delete(id);
  }

  @Delete(':id/:idDetail')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteInvoiceDetail(
    @Param('id') id: string,
    @Param('idDetail') idDetail: string,
  ): void {
    this.service.deleteDetail(id, idDetail);
  }
}
