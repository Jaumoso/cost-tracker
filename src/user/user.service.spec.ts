/* eslint-disable prettier/prettier */
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose, { connect, Connection, Model } from 'mongoose';
import { UserDtoStub } from './dto/create-user.dto.stub';
import { User, UserSchema } from './schemas/user.schema';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let userModel: Model<User>;


  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    userModel = mongoConnection.model(User.name, UserSchema);
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: getModelToken(User.name), useValue: userModel },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
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

  describe('createUser', () => {
    it('should return a created new user with _id, name, surname1 and 2, email, password, and array of accounts. ', async () => {
      const createdUser = await service.createUser({
        ...{
          name: 'default name',
          surname1: 'default surname1',
          surname2: 'default surname2',
          email: 'default email',
          password: 'default password',
          accounts: [],
        },
        ...UserDtoStub(),
      });
      expect(createdUser._id).toBeDefined();
    });
  });

  describe('updateUser', () => {
    it('should return an updated user with all its components.', async () => {
      const userId = '63a1ab07e65d191e9f15ad66';
      const updatedUser = await service.updateUser(
        userId,
        {
        ...{
          name: 'default name',
          surname1: 'default surname1',
          surname2: 'default surname2',
          email: 'default email',
          password: 'default password',
          accounts: [new mongoose.Types.ObjectId()],
        },
        ...UserDtoStub(),
      });
      expect(updatedUser._id).toBeDefined();
      expect(updatedUser.accounts.length).toBe(1);
    });
  });

  describe('getAllUsers', () => {
    it('should return all the operations in the database', async () => {
      const userResponseList = [
        {
          name: 'default name',
          surname1: 'default surname1',
          surname2: 'default surname2',
          email: 'default email',
          password: 'default password',
          accounts: [new mongoose.Types.ObjectId()],
        },
        {
          name: 'default name 2',
          surname1: 'default surname1',
          surname2: 'default surname2',
          email: 'default email',
          password: 'default password',
          accounts: [new mongoose.Types.ObjectId()],
        },
        {
          name: 'default name 3',
          surname1: 'default surname1',
          surname2: 'default surname2',
          email: 'default email',
          password: 'default password',
          accounts: [new mongoose.Types.ObjectId()],
        }
      ];
      await new userModel({
        ...userResponseList[0],
        ...UserDtoStub(),
      }).save();
      await new userModel({
        ...userResponseList[1],
        ...UserDtoStub(),
      }).save();
      await new userModel({
       ...userResponseList[2],
       ...UserDtoStub(),
      }).save();
      const result = await service.getAllUsers();
      result.forEach((x) => expect(x.name).not.toBe('default name 3'));
      expect(result.length).toBe(2);
    });
  });

  describe('getUser', () => {
    it('should return the user passed as parameter', async () => {
      const userId = '63a1ab07e65d191e9f15ad66';
      const userResponseList = [
        {
          _id: userId,
          name: 'default name',
          surname1: 'default surname1',
          surname2: 'default surname2',
          email: 'default email',
          password: 'default password',
          accounts: [new mongoose.Types.ObjectId()],
        },
      ];
      await new userModel({
        ...userResponseList[0],
        ...UserDtoStub(),
      }).save();
      const result = await service.getUser(userId);
      expect(result._id).toBe(userId);
    });
  });

  describe('deleteUser', () => {
    it('should delete the user from the database', async () => {
      const userId = '63a1ab07e65d191e9f15ad66';
      const userResponseList = [
        {
          _id: userId,
          name: 'default name',
          surname1: 'default surname1',
          surname2: 'default surname2',
          email: 'default email',
          password: 'default password',
          accounts: [new mongoose.Types.ObjectId()],
        },
      ];
      await new userModel({
        ...userResponseList[0],
        ...UserDtoStub(),
      }).save();
      const result = await service.deleteUser(userId);
      expect(result._id).toBe(userId);
    });
  });

  // DEFAULT
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
