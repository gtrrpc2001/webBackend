import { Test, TestingModule } from '@nestjs/testing';

describe('ecg_raw_monthlyController', () => {

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      
    }).compile();

    
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect('').toBe('Hello World!');
    });
  });
});
