import protest from './protests.models';
import { ObjectId } from 'mongodb';
import { AccessLevels } from './protests.service';

export const getProtestDetailsById = async (protestId: string) => {
  return await protest.find(new ObjectId(protestId), {
    title: 1,
    description: 1,
    startDate: 1,
    endDate: 1,
  });
};

export const addUserToProtest = async (input: AddUserToProtestInput) => {
  const { protestId, userId, accessLevel } = input;

  return await protest.findOneAndUpdate(
    { _id: protestId },
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

export const addProtest = async (input: AddProtestInput) => {
  const { title, startDate, description, endDate, userId } = input;

  return await protest.findOneAndUpdate(
    {},
    {
      $set: {
        title,
        startDate,
        description,
        endDate,
        associatedUsers: [
          {
            _id: new ObjectId(userId),
            accessLevel: AccessLevels.Leader,
            isCreator: true,
          },
        ],
      },
    },
    { upsert: true, new: true }
  );
};

export const getProtestByShareToken = async (token: string) =>
  await protest.aggregate([
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

export const getProtestsByUserAndProtest = async (
  protestId: string,
  userId: string
) => {
  return await protest.aggregate([
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

export const getProtestsByUser = async (userId: string) =>
  await protest.aggregate([
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

export interface AddProtestInput {
  title: string;
  startDate: Date;
  endDate: Date;
  description: string;
  userId: string;
}

export interface AddUserToProtestInput {
  protestId: string;
  userId: string;
  accessLevel: AccessLevels;
}
