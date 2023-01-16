/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  // DEFAULT
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService]
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // CUSTOM
  describe('createUser', () => {
    it('shuld return a newly created user', async () => {
      const result: any = null;
      jest.spyOn(service, 'createUser').mockImplementation(() => result);
      expect(await controller.createUser).toBe(result);
    });
  });


});
