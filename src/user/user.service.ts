import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { IUser } from 'src/user/interfaces/user.interface';
import { Model } from "mongoose";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  
  constructor(@InjectModel('User') private userModel:Model<IUser>) { }

  async createUser(userDto: CreateUserDto ): Promise<IUser> {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(userDto.password, saltOrRounds);
    userDto.password = hashedPassword;
    const newUser = await this.userModel.create(userDto);
    if (!newUser) {
        throw new NotFoundException('Could not create user!');
    }
    return newUser;
}

  async updateUser(userId: string, updateUserDto: UpdateUserDto): Promise<IUser> {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(updateUserDto.password, saltOrRounds);
    updateUserDto.password = hashedPassword;
      const existingUser = await this.userModel.findByIdAndUpdate(userId, updateUserDto, { new: true });
    if (!existingUser) {
      throw new NotFoundException(`User #${userId} not found`);
    }
    return existingUser;
  }

  async getAllUsers(): Promise<IUser[]> {
      const userData = await this.userModel.find().populate({path: 'accounts', populate: { path: 'operations'}}); // TODO: cuidadito con esto
      if (!userData || userData.length == 0) {
          throw new NotFoundException('Users data not found!');
      }
      return userData;
  }

  async getUser(userId: string): Promise<IUser> {
    const existingUser = await     this.userModel.findById(userId).populate({path: 'accounts', populate: { path: 'operations'}});
    if (!existingUser) {
      throw new NotFoundException(`User #${userId} not found`);
    }
    return existingUser;
  }

  // ######### LOGIN METHODS ############
  async findUser(email: string): Promise<IUser> {
    const existingUser = this.userModel.findOne({ email: email })
    if (!existingUser) {
      throw new NotFoundException(`User #${email} not found`);
    }
    return existingUser;
  }
  // ###################################

  async deleteUser(userId: string): Promise<IUser> {
      const deletedUser = await this.userModel.findByIdAndDelete(userId);
    if (!deletedUser) {
      throw new NotFoundException(`User #${userId} not found`);
    }
    return deletedUser;
  }

  // checks for a user email address
  async getUserByEmail(email: string){
    return this.userModel.findOne({ email: email });
  }


}