/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateOperationDto } from 'src/operation/dto/create-operation.dto';
import { UpdateOperationDto } from 'src/operation/dto/update-operation.dto';
import { IOperation } from 'src/operation/interfaces/operation.interface';
import { Model } from "mongoose";

@Injectable()
export class OperationService {
  
constructor(@InjectModel('Operation') private operationModel:Model<IOperation>) { }
    
    async createOperation(createOperationDto: CreateOperationDto): Promise<IOperation> {
      const newOperation = await new this.operationModel(createOperationDto);
      return newOperation.save();
    }
    async updateOperation(operationId: string, updateOperationDto: UpdateOperationDto): Promise<IOperation> {
      const existingOperation = await        this.operationModel.findByIdAndUpdate(operationId, updateOperationDto, { new: true });
      if (!existingOperation) {
        throw new NotFoundException(`Operation #${operationId} not found`);
      }
      return existingOperation;
    }
    async getAllOperations(): Promise<IOperation[]> {
      const operationData = await this.operationModel.find();
      if (!operationData || operationData.length == 0) {
          throw new NotFoundException('Operations data not found!');
      }
      return operationData;
    }
    async getOperation(operationId: string): Promise<IOperation> {
      const existingOperation = await     this.operationModel.findById(operationId).exec();
      if (!existingOperation) {
      throw new NotFoundException(`Operation #${operationId} not found`);
      }
      return existingOperation;
    }
    async deleteOperation(operationId: string): Promise<IOperation> {
      const deletedOperation = await this.operationModel.findByIdAndDelete(operationId);
      if (!deletedOperation) {
        throw new NotFoundException(`Operation #${operationId} not found`);
      }
      return deletedOperation;
    }
/*     async filterOperation(): Promise<IOperation> {
      const filterOperation = await this.operationModel.filterOperation()
    } */
}