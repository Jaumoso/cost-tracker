/* eslint-disable prettier/prettier */
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { connect, Connection, Model } from 'mongoose';
import { OperationDtoStub } from './dto/create-operation.dto.stub';
import { OperationService } from './operation.service';
import { Operation, OperationSchema } from './schemas/operation.schema';

describe('OperationService', () => {
  let service: OperationService;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let operationModel: Model<Operation>;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    operationModel = mongoConnection.model(Operation.name, OperationSchema);
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OperationService,
        { provide: getModelToken(Operation.name), useValue: operationModel },
      ],
    }).compile();

    service = module.get<OperationService>(OperationService);
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

  describe('createOperation', () => {
    it('should return a created new operation with _id, date, concept, amount, and optionally details and location', async () => {
      const createdOperation = await service.createOperation({
        ...{
          date: Date.now(),
          concept: 'default concept',
          amount: 10,
          details: 'default details',
          location: 'default location',
        },
        ...OperationDtoStub(),
      });
      expect(createdOperation._id).toBeDefined();
    });
  });

  describe('updateOperation', () => {
    it('should return an updated operation with _id, date, concept, amount, and optionally details and location. All imput parameters are optionals in updateOperation', async () => {
      const operationId = '63a17e2cfab382593f7d265e';
      const updatedOperation = await service.updateOperation(
        operationId,
        {
        ...{
          date: Date.now(),
          concept: 'default concept',
          amount: 10,
          details: 'default details',
          location: 'default location',
        },
        ...OperationDtoStub(),
      });
      expect(updatedOperation._id).toBeDefined();
      expect(updatedOperation.date).toContain(updatedOperation.date);
      expect(updatedOperation.concept).toContain(updatedOperation.concept);
      expect(updatedOperation.amount).toContain(updatedOperation.amount);
      expect(updatedOperation.details).toContain(updatedOperation.details);
      expect(updatedOperation.location).toContain(updatedOperation.location);
    });
  });

  describe('getAllOperations', () => {
    it('should return all the operations in the database', async () => {
      const operationResponseList = [
        {
          date: Date.now(),
          concept: 'first operation',
          amount: 10,
          details: 'default details',
          location: 'default location',
        },
        {
          date: Date.now(),
          concept:'second operation',
          amount: 10,
          details: 'default details',
          location: 'default location',
        },
        {
          date: Date.now(),
          concept: 'third operation',
          amount: 10,
          details: 'default details',
          location: 'default location',
        },
      ];
      await new operationModel({
        ...operationResponseList[0],
        ...OperationDtoStub(),
      }).save();
      await new operationModel({
        ...operationResponseList[1],
        ...OperationDtoStub(),
      }).save();
      await new operationModel({
       ...operationResponseList[2],
       ...OperationDtoStub(),
      }).save();
      const result = await service.getAllOperations();
      result.forEach((x) => expect(x.concept).not.toBe('second operation'));
      expect(result.length).toBe(2);
    });
  });

  describe('getOperationsByDate', () => {
    it('should return all the operations in a timeframe', async () => {
      const operationResponseList = [
        {
          date: new Date('2019-01-16').toISOString(),
          concept: 'first operation',
          amount: 10,
          details: 'default details',
          location: 'default location',
        },
        {
          date: new Date('2020-05-29T10:30:50-04:00').toISOString(),
          concept:'second operation',
          amount: 10,
          details: 'default details',
          location: 'default location',
        },
        {
          date: new Date('2020-05-29T23:30:50-04:00').toISOString(),
          concept: 'third operation',
          amount: 10,
          details: 'default details',
          location: 'default location',
        },
      ];
      await new operationModel({
        ...operationResponseList[0],
        ...OperationDtoStub(),
      }).save();
      await new operationModel({
        ...operationResponseList[1],
        ...OperationDtoStub(),
      }).save();
      await new operationModel({
       ...operationResponseList[2],
       ...OperationDtoStub(),
      }).save();
      const date1 = '2019-01-16T23:30:50';
      const date2 = '2020-05-29T10:30:50-04:00';
      const result = await service.getOperationsByDate(date1, date2);
      result.forEach((x) => expect(x.date).toBe(typeof Date()));
      expect(result.length).toBe(2);
    });
  });

  describe('getOperation', () => {
    it('should return the operation passed as parameter', async () => {
      const operationId = '63a17e2cfab382593f7d265e';
      const operationResponseList = [
        {
          _id: operationId,
          date: Date.now(),
          concept: 'first operation',
          amount: 10,
          details: 'default details',
          location: 'default location',
        },
      ];
      await new operationModel({
        ...operationResponseList[0],
        ...OperationDtoStub(),
      }).save();
      const result = await service.getOperation(operationId);
      expect(result._id).toBe(operationId);
    });
  });

    describe('deleteOperation', () => {
    it('should delete the operation from the database', async () => {
      const operationId = '63a17e2cfab382593f7d265e';
      const operationResponseList = [
        {
          _id: operationId,
          date: Date.now(),
          concept: 'first operation',
          amount: 10,
          details: 'default details',
          location: 'default location',
        },
      ];
      await new operationModel({
        ...operationResponseList[0],
        ...OperationDtoStub(),
      }).save();
      const result = await service.deleteOperation(operationId);
      expect(result._id).toBe(operationId);
      expect(result.date).toContain(result.date);
      expect(result.amount).toContain(result.amount);
      expect(result.details).toContain(result.details);
      expect(result.location).toContain(result.location);
      expect(result.concept).toContain(result.concept);
    });
  });


  // DEFAULT
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OperationService],
    }).compile();

    service = module.get<OperationService>(OperationService);
    });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});