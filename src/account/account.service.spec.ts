/* eslint-disable prettier/prettier */
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose, { connect, Connection, Model } from 'mongoose';
import { AccountService } from './account.service';
import { AccountDtoStub } from './dto/create-account.dto.stub';
import { Account, AccountSchema } from './schemas/account.schema';

describe('AccountService', () => {
  let service: AccountService;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let accountModel: Model<Account>;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    accountModel = mongoConnection.model(Account.name, AccountSchema);
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountService,
        { provide: getModelToken(Account.name), useValue: accountModel },
      ],
    }).compile();

    service = module.get<AccountService>(AccountService);
  });

  afterAll(async () => {
    await mongoConnection.dropDatabase();
    await mongoConnection.close();
    await mongod.stop();
  });

  afterEach(async () => {
    const collections = mongoConnection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  });

  describe('createAccount', () => {
    it('should return a created new account with _id, name, totalMoney and array of operations', async () => {
      const createdAccount = await service.createAccount({
        ...{
          name: 'default name',
          totalMoney: 100,
          operations: [new mongoose.Types.ObjectId()],
        },
        ...AccountDtoStub(),
      });
      expect(createdAccount._id).toBeDefined();
      expect(createdAccount.name).toContain(createdAccount.name);
      expect(createdAccount.totalMoney).toBe(createdAccount.totalMoney);
      expect(createdAccount.operations.length).toBe(1);
    });
  });

  describe('updateAccount', () => {
    it('should return an updated account with _id, name, totalMoney and an array of ojectId. All imput parameters are optionals in updateAccount', async () => {
      const accountId = '63a2c295e019e07519ff1445';
      const updatedAccount = await service.updateAccount(
        accountId,
        {
        ...{
          name: "default name",
          totalMoney: 100,
          operations: [new mongoose.Types.ObjectId()],
        },
        ...AccountDtoStub(),
      });
      expect(updatedAccount._id).toBeDefined();
      expect(updatedAccount.name).toContain(updatedAccount.name);
      expect(updatedAccount.totalMoney).toBe(updatedAccount.totalMoney);
      expect(updatedAccount.operations.length).toBe(1);
    });
  });

  describe('getAllAccounts', () => {
    it('should return all the accounts in the database', async () => {
      const accountResponseList = [
        {
          name: 'default name',
          totalMoney: 100,
          operations: [new mongoose.Types.ObjectId()],
        },
        {
          name: 'default name 2',
          totalMoney: 100,
          operations: [],
        },
        {
          name: 'default name 3',
          totalMoney: 100,
          operations: [new mongoose.Types.ObjectId()],
        }
      ];
      await new accountModel({
        ...accountResponseList[0],
        ...AccountDtoStub(),
      }).save();
      await new accountModel({
        ...accountResponseList[1],
        ...AccountDtoStub(),
      }).save();
      await new accountModel({
       ...accountResponseList[2],
       ...AccountDtoStub(),
      }).save();
      const result = await service.getAllAccounts();
      result.forEach((x) => expect(x.name).not.toBe('default name 3'));
      result.forEach((x) => expect(x.operations.length).toBe(0));
      expect(result.length).toBe(2);
    });
  });

    describe('getAccount', () => {
    it('should return the account passed as parameter', async () => {
      const accountId = '63a2c295e019e07519ff1445';
      const accountResponseList = [
        {
          _id: accountId,
          name: 'default name',
          totalMoney: 1000,
          operations: [new mongoose.Types.ObjectId()],
        },
      ];
      await new accountModel({
        ...accountResponseList[0],
        ...AccountDtoStub(),
      }).save();
      const result = await service.getAccount(accountId);
      expect(result._id).toBe(accountId);
      expect(result.operations.length).toBe(1);
    });
  });

  describe('deleteAccount', () => {
    it('should delete the account from the database', async () => {
      const accountId = '63a17e2cfab382593f7d265e';
      const accountResponseList = [
        {
          _id: accountId,
          name: 'default name',
          totalMoney: 1000,
          operations: [new mongoose.Types.ObjectId()],
        },
      ];
      await new accountModel({
        ...accountResponseList[0],
        ...AccountDtoStub(),
      }).save();
      const result = await service.deleteAccount(accountId);
      expect(result._id).toBe(accountId);
      expect(result.operations.length).toBe(1);
    });
  });

  describe('getTotalMoneyPerOperation', () => {
    it('should get the total money per each operation', async () => {
      const accountId = '63a17e2cfab382593f7d265e';
      const accountResponseList = [
        {
          operationMoney: [100, 40, 56]
        },
      ];
      await new accountModel({
        ...accountResponseList[0],
        ...AccountDtoStub(),
      }).save();
      const result = await service.getTotalMoneyPerOperation(accountId);
      expect(result.length).toBe(3);
      expect(result[0]).toBe(Number);
      expect(result[1]).toBe(Number);
      expect(result[2]).toBe(Number);
    });
  });

  describe('getMaxAndMinMoneyForAccount', () => {
    it('should get the max nd minimum money that the account got over time', async () => {
      const accountId = '63a17e2cfab382593f7d265e';
      const accountResponseList = [
        {
          maxmin: [100, 40]
        },
      ];
      await new accountModel({
        ...accountResponseList[0],
        ...AccountDtoStub(),
      }).save();
      const result = await service.getMaxAndMinMoneyForAccount(accountId);
      expect(result.length).toBe(2);
      expect(result[0]).toBe(Number);
      expect(result[1]).toBe(Number);
    });
  });



  // DEFAULT
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountService],
    }).compile();

    service = module.get<AccountService>(AccountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
