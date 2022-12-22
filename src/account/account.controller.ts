/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { CreateAccountDto } from 'src/account/dto/create-account.dto';
import { UpdateAccountDto } from 'src/account/dto/update-account.dto';
import { AccountService } from 'src/account/account.service';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Account')
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  @ApiCreatedResponse({description: 'Creation of a new account.'})
  async createAccount(@Res() response, @Body() createAccountDto: CreateAccountDto) {
    try {
      const newAccount = await this.accountService.createAccount(
        createAccountDto,
      );
      return response.status(HttpStatus.CREATED).json({
        message: 'Account has been created successfully',
        newAccount,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Account not created!',
        error: 'Bad Request',
      });
    }
  }

  @Put('/:id')
  @ApiCreatedResponse({description: 'Modification of the data of the account.'})
  async updateAccount( @Res() response, @Param('id') accountId: string, @Body() updateAccountDto: UpdateAccountDto) {
    try {
      const existingAccount = await this.accountService.updateAccount(
        accountId,
        updateAccountDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Account has been successfully updated',
        existingAccount,
      });
    } 
    catch (err) {
      return response.status(err.status).json(err.response);
    }
  }


  @Get()
  @ApiCreatedResponse({description: 'This function will get all the accounts in the database.'})
  async getAccounts(@Res() response) {
    try {
      const accountData = await this.accountService.getAllAccounts();
      return response.status(HttpStatus.OK).json({
        message: 'All accounts data found successfully',
        accountData,
      });
    } 
    catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/:id')
  @ApiCreatedResponse({description: 'This function will get the account passed as parameter from the database.'})
  async getAccount(@Res() response, @Param('id') accountId: string) {
    try {
      const existingAccount = await this.accountService.getAccount(accountId);
      return response.status(HttpStatus.OK).json({
        message: 'Account found successfully',
        existingAccount,
      });
    } 
    catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete('/:id')
  @ApiCreatedResponse({description: 'This function will delete the account passed as parameter from the database.'})
  async deleteAccount(@Res() response, @Param('id') accountId: string) {
    try {
      const deletedAccount = await this.accountService.deleteAccount(accountId);
      return response.status(HttpStatus.OK).json({
        message: 'Account deleted successfully',
        deletedAccount,
      });
    } 
    catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}