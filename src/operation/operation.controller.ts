/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { CreateOperationDto } from 'src/operation/dto/create-operation.dto';
import { UpdateOperationDto } from 'src/operation/dto/update-operation.dto';
import { OperationService } from 'src/operation/operation.service';
@Controller('operation')
export class OperationController {
   constructor(private readonly operationService: OperationService) { }
@Post()
   async createOperation(@Res() response, @Body() createOperationDto: CreateOperationDto) {
  try {
    const newOperation = await this.operationService.createOperation(createOperationDto);
    return response.status(HttpStatus.CREATED).json({
    message: 'Operation has been created successfully',
    newOperation,});
 } catch (err) {
    return response.status(HttpStatus.BAD_REQUEST).json({
    statusCode: 400,
    message: 'Error: Operation not created!',
    error: 'Bad Request'
 });
 }
}
@Put('/:id')
async updateOperation(@Res() response,@Param('id') operationId: string,
@Body() updateOperationDto: UpdateOperationDto) {
  try {
   const existingOperation = await this.operationService.updateOperation(operationId, updateOperationDto);
  return response.status(HttpStatus.OK).json({
  message: 'Operation has been successfully updated',
  existingOperation,});
 } catch (err) {
   return response.status(err.status).json(err.response);
 }
}
@Get()
async getOperations(@Res() response) {
try {
  const operationData = await this.operationService.getAllOperations();
  return response.status(HttpStatus.OK).json({
  message: 'All operations data found successfully',operationData,});
 } catch (err) {
  return response.status(err.status).json(err.response);
 }
}
@Get('/:id')
async getOperation(@Res() response, @Param('id') operationId: string) {
 try {
    const existingOperation = await
this.operationService.getOperation(operationId);
    return response.status(HttpStatus.OK).json({
    message: 'Operation found successfully',existingOperation,});
 } catch (err) {
   return response.status(err.status).json(err.response);
 }
}
@Delete('/:id')
async deleteOperation(@Res() response, @Param('id') operationId: string)
{
  try {
    const deletedOperation = await this.operationService.deleteOperation(operationId);
    return response.status(HttpStatus.OK).json({
    message: 'Operation deleted successfully',
    deletedOperation,});
  }catch (err) {
    return response.status(err.status).json(err.response);
  }
 }
}