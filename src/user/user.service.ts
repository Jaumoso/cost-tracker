/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { IUser } from 'src/user/interfaces/user.interface';
import { Model } from "mongoose";

@Injectable()
export class UserService {
  
constructor(@InjectModel('User') private userModel:Model<IUser>) { }

async createUser(createUserDto: CreateUserDto): Promise<IUser> {
   const newUser = await new this.userModel(createUserDto);
   return newUser.save();
}
async updateUser(userId: string, updateUserDto: UpdateUserDto): Promise<IUser> {
    const existingUser = await        this.userModel.findByIdAndUpdate(userId, updateUserDto, { new: true });
   if (!existingUser) {
     throw new NotFoundException(`User #${userId} not found`);
   }
   return existingUser;
}
async getAllUsers(): Promise<IUser[]> {
    const userData = await this.userModel.find().populate({path: 'account', populate: { path: 'operations'}}); // TODO: cuidadito con esto
    if (!userData || userData.length == 0) {
        throw new NotFoundException('Users data not found!');
    }
    return userData;
}
async getUser(userId: string): Promise<IUser> {
   const existingUser = await     this.userModel.findById(userId).exec();
   if (!existingUser) {
    throw new NotFoundException(`User #${userId} not found`);
   }
   return existingUser;
}
async deleteUser(userId: string): Promise<IUser> {
    const deletedUser = await this.userModel.findByIdAndDelete(userId);
   if (!deletedUser) {
     throw new NotFoundException(`User #${userId} not found`);
   }
   return deletedUser;
}
}