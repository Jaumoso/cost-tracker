/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CreateOperationDto } from 'src/operation/dto/create-operation.dto';
import { UpdateOperationDto } from 'src/operation/dto/update-operation.dto';
import { OperationService } from 'src/operation/operation.service';
@ApiTags('Operation')
@Controller('operation')
export class OperationController {

  constructor(private readonly operationService: OperationService) { }

  @Post()
  @ApiCreatedResponse({description: 'Creation of a new operation and insertion into the database.'})
  async createOperation(@Res() response, @Body() createOperationDto: CreateOperationDto) {
    try {
      const newOperation = await this.operationService.createOperation(createOperationDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Operation has been created successfully',
        newOperation,});
    } 
    catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
      statusCode: 400,
      message: 'Error: Operation not created!',
      error: 'Bad Request'
      });
    }
  }

  @Put('/:id')
  @ApiCreatedResponse({description: 'Update the data of a specific operation and change it into the database.'})
  async updateOperation(@Res() response,@Param('id') operationId: string, @Body() updateOperationDto: UpdateOperationDto) {
    try {
      const existingOperation = await this.operationService.updateOperation(operationId, updateOperationDto);
      return response.status(HttpStatus.OK).json({
        message: 'Operation has been successfully updated',
        existingOperation,});
    } 
    catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get()
  @ApiCreatedResponse({description: 'This function will get all the operations from the database.'})
    async getOperations(@Res() response) {
    try {
      const operationData = await this.operationService.getAllOperations();
      return response.status(HttpStatus.OK).json({
        message: 'All operations data found successfully',operationData,});
    } 
    catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/date/:id/:date1/:date2')
  @ApiCreatedResponse({description: 'This function will get the Operations in a defined timeframe.'})
    async getOperationsByDate(@Res() response, @Param('date1') dateIntervalIni: string, @Param('date2') dateIntervalEnd: string,) {
    try {
      dateIntervalIni
      const operationData = await this.operationService.getOperationsByDate(dateIntervalIni, dateIntervalEnd);
      return response.status(HttpStatus.OK).json({
        message: 'All operations data found successfully for date interval ' 
        + dateIntervalIni + " - " + dateIntervalEnd, operationData,});
    } 
    catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/:id')
  @ApiCreatedResponse({description: 'This function will get the operation passed as parameter from the database.'})
  async getOperation(@Res() response, @Param('id') operationId: string) {
    try {
      const existingOperation = await
      this.operationService.getOperation(operationId);
      return response.status(HttpStatus.OK).json({
        message: 'Operation found successfully',existingOperation,});
    } 
    catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete('/:id')
  @ApiCreatedResponse({description: 'This function will delete the operation passed as parameter from the database.'})
  async deleteOperation(@Res() response, @Param('id') operationId: string) {
    try {
      const deletedOperation = await this.operationService.deleteOperation(operationId);
      return response.status(HttpStatus.OK).json({
        message: 'Operation deleted successfully',
        deletedOperation,});
    }
    catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}