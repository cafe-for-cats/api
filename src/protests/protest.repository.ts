import Protest, { Location } from './protests.models';
import { ObjectId } from 'mongodb';
import { AccessLevels } from './protests.service';

export class ProtestRepository {
  getProtestPins = async (protestId: string) =>
    await Protest.findOne(new ObjectId(protestId), {
      pins: 1,
    });

  getProtestsByUser = async (userId: string) =>
    await Protest.aggregate([
      {
        $match: { 'associatedUsers._id': new ObjectId(userId) },
      },
      {
        $sort: { startDate: -1 },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          startDate: 1,
          duration: 1,
          associatedUsers: {
            $filter: {
              input: '$associatedUsers',
              as: 'associatedUser',
              cond: {
                $eq: ['$$associatedUser._id', new ObjectId(userId)],
              },
            },
          },
        },
      },
    ]);

  getProtestByShareToken = async (token: string) =>
    await Protest.aggregate([
      {
        $match: {
          'shareToken.token': token,
        },
      },
      {
        $project: {
          _id: 1,
          shareToken: 1,
        },
      },
    ]);

  getProtestsWithUser = async (protestId: string, userId: string) => {
    return await Protest.aggregate([
      {
        $match: {
          _id: new ObjectId(protestId),
          'associatedUsers._id': new ObjectId(userId),
        },
      },
      {
        $sort: { startDate: -1 },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          startDate: 1,
          duration: 1,
          associatedUsers: {
            $filter: {
              input: '$associatedUsers',
              as: 'associatedUser',
              cond: {
                $eq: ['$$associatedUser._id', new ObjectId(userId)],
              },
            },
          },
        },
      },
    ]);
  };

  getProtestDetailsById = async (protestId: string) => {
    return await Protest.findOne(new ObjectId(protestId), {
      title: 1,
      description: 1,
      startDate: 1,
      endDate: 1,
      location: 1,
    });
  };

  addUserToProtest = async (input: AddUserToProtestInput) => {
    const { protestId, userId, accessLevel } = input;

    return await Protest.findOneAndUpdate(
      { _id: { $eq: protestId } },
      {
        $push: {
          associatedUsers: {
            _id: new ObjectId(userId),
            accessLevel,
            isCreator: false,
          },
        },
      },
      { new: true }
    );
  };

  addProtest = async (input: AddProtestInput) => {
    const { title, startDate, description, endDate, userId, location } = input;

    return await Protest.findOneAndUpdate(
      { _id: new ObjectId().toHexString() },
      {
        $set: {
          title,
          startDate,
          description,
          endDate,
          location,
          associatedUsers: [
            {
              _id: new ObjectId(userId),
              accessLevel: AccessLevels.Organizer,
            },
          ],
        },
      },
      { upsert: true, new: true }
    );
  };
}

export interface AddProtestInput {
  title: string;
  startDate: Date;
  endDate: Date;
  description: string;
  userId: string;
  location: Location;
}

export interface AddUserToProtestInput {
  protestId: string;
  userId: string;
  accessLevel: AccessLevels;
}
