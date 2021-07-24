import { expect } from 'chai';
import { ProtestsService } from './protests.service';
import Protest from './protests.models';

describe('ProtestsService', function () {
  let protestsService: ProtestsService;

  beforeEach(() => {
    protestsService = new ProtestsService(protestRepositoryStub);
  });

  it('should create', () => {
    expect(protestsService).to.be.ok;
  });
});

const protestRepositoryStub = {
  getProtestPins: async (id: string) => {
    return await [new Protest()];
  },
  getProtestsByUser: async () => {
    return await [new Protest()];
  },
  getProtestByShareToken: async () => {
    return await [new Protest()];
  },
  getProtestsWithUser: async () => {
    return await [new Protest()];
  },
  getProtestDetailsById: async () => {
    return await [new Protest()];
  },
  addUserToProtest: async () => {
    return await new Protest();
  },
  addProtest: async () => {
    return await new Protest();
  },
};
