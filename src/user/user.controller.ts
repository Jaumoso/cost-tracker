import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { UserService } from 'src/user/user.service';

@ApiTags('User')
@Controller('user')
export class UserController {

   constructor(private readonly userService: UserService) { }

  @Post()
  @ApiCreatedResponse({description: 'Creation of a new user and insertion in the database.'})
  async createUser(@Res() response, @Body() createUserDto: CreateUserDto) {
    try {
      const newUser = await this.userService.createUser(createUserDto);
      return response.status(HttpStatus.CREATED).json({
      message: 'User has been created successfully',
      newUser,});
    } 
    catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
      statusCode: 400,
      message: 'Error: User not created!',
      error: 'Bad Request'
    });
    }
}

@Put('/:id')
@ApiCreatedResponse({description: 'Update te data of the user into the database.'})
async updateUser(@Res() response,@Param('id') userId: string, @Body() updateUserDto: UpdateUserDto) {
  try {
   const existingUser = await this.userService.updateUser(userId, updateUserDto);
    return response.status(HttpStatus.OK).json({ 
      message: 'User has been successfully updated', 
      existingUser,});
  } 
  catch (err) {
    return response.status(err.status).json(err.response);
  }
}

@Get()
@ApiCreatedResponse({description: 'This function will get all the accounts from the database.'})
async getUsers(@Res() response) {
  try {
    const userData = await this.userService.getAllUsers();
    return response.status(HttpStatus.OK).json({
      /* message: 'All users data found successfully', */ userData,});
  } 
  catch (err) {
    return response.status(err.status).json(err.response);
  }
}

@Get('/:id')
@ApiCreatedResponse({description: 'This function will get the user passed as parameter from the database.'})
async getUser(@Res() response, @Param('id') userId: string) {
 try {
    const existingUser = await
    this.userService.getUser(userId);
    return response.status(HttpStatus.OK).json({
      message: 'User found successfully',existingUser,});
 } 
 catch (err) {
   return response.status(err.status).json(err.response);
 }
}

@Delete('/:id')
@ApiCreatedResponse({description: 'This function will delete the account passed as parameter from the database.'})
async deleteUser(@Res() response, @Param('id') userId: string) {
  try {
    const deletedUser = await this.userService.deleteUser(userId);
    return response.status(HttpStatus.OK).json({
      message: 'User deleted successfully',
      deletedUser,});
  }
  catch (err) {
    return response.status(err.status).json(err.response);
  }
 }
}