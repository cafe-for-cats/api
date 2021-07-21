import { findUserById } from '../users/users.statics';
import { ObjectId } from 'mongodb';
import {
  AddProtestInput,
  AddUserToProtestInput,
  ProtestRepository,
} from './protest.repository';

export class ProtestsService {
  constructor(private repository: ProtestRepository) {}

  async addUserToProtest(input: AddUserToProtestInput) {
    const protests = await this.repository.getProtestsWithUser(
      input.protestId,
      input.userId
    );

    if (protests.length > 0) {
      return {
        status: true,
        message: 'User already exists on protest.',
        payload: null,
      };
    }

    const result = await this.repository.addUserToProtest(input);

    return {
      status: true,
      message: 'Success.',
      payload: result,
    };
  }

  async getProtestDetails(id: string) {
    const result = await this.repository.getProtestDetailsById(id);

    return {
      status: true,
      message: 'Success.',
      payload: result,
    };
  }

  async getProtestByToken(key: string) {
    const result = await this.repository.getProtestByShareToken(key);

    // TODO: is this a more UTC-safe approach for this?
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/UTC
    const currentDate = new Date();

    const expirationDate = new Date(result[0].shareToken.expirationDate);

    if (currentDate > expirationDate) {
      return {
        status: false,
        message: 'Protest token is expired.',
        payload: null,
      };
    }

    return {
      status: true,
      message: 'Success.',
      payload: result,
    };
  }

  async addProtest({
    userId,
    title,
    description,
    startDate,
    endDate,
  }: AddProtestInput) {
    const user = await findUserById(userId);

    const userObjectId = user?.get('_id');

    const newProtest: AddProtestInput = {
      userId: userObjectId,
      title,
      description,
      startDate,
      endDate,
    };

    const newProtestResult = await this.repository.addProtest(newProtest);

    const protestId = newProtestResult?.get('_id');

    if (!protestId) {
      return {
        status: false,
        message: 'Failed to create the protest.',
      };
    }

    const newItem = {
      _id: protestId,
    };

    return newItem;
  }
}

export enum AccessLevels {
  Admin = -1,
  Organizer = 1,
  Attendee = 2,
  Unassigned = 3,
}

export interface ProtestAggregate {
  _id: ObjectId;
  protests: AssociatedProtest[];
}

export interface AssociatedProtest {
  _id: ObjectId;
  title: string;
  description: string;
  startDate: Date;
  users: UserDetail[][];
}

export interface UserDetail {
  _id: ObjectId;
  protestId: ObjectId;
  accessLevel: string;
  isCreator: boolean;
}

// -- may want to be able to filter protests by ones that have not happened yet
// -- pull down all protests by ones i've created

// -- separate the "who are you" from the "what you have access to"

// -- how to compsenate for leadership of a protest changing hands
