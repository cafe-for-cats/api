import { expect } from 'chai';
import sinon, { SinonStubbedInstance } from 'sinon';
import { ProtestsService } from './protests.service';
import { UsersService } from '../users/users.service';
import { ProtestRepository } from './protest.repository';

describe('ProtestsService', function () {
  let protestsService: ProtestsService;
  let protestRepository: ProtestRepository;
  let usersService: UsersService;

  beforeEach(() => {
    protestRepository = new ProtestRepository();
    protestsService = new ProtestsService(protestRepository);
    usersService = new UsersService();
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should create', () => {
    expect(usersService).to.be.ok;
  });

  it('should add a protest', async () => {});
});
