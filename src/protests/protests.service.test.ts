import { expect } from 'chai';
import sinon, { SinonStubbedInstance } from 'sinon';
import { ProtestsService } from './protests.service';
import { UsersService } from '../users/users.service';

describe('ProtestsService', function () {
  let protestsService: ProtestsService;
  let usersService: UsersService;

  beforeEach(() => {
    protestsService = new ProtestsService();
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
