import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return user data', () => {
      const mockRequest = {
        user: {
          id: 1,
          username: 'test_user',
          roles: ['User'],
          status: 'Enabled',
        },
      };

      const result = appController.getHello(mockRequest as any);
      expect(result).toEqual({
        id: 1,
        username: 'test_user',
        roles: ['User'],
        status: 'Enabled',
      });
    });
  });
});
