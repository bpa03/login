import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
} from 'sequelize';
import SequelizeSIninit from 'connect-session-sequelize';
import { Store as ExpressStore, CookieOptions } from 'express-session';
// Database
import { sequelize } from '../database';

type InferSession = InferAttributes<Session>;
type InferCreationSession = InferCreationAttributes<Session>;

class Session extends Model<InferSession, InferCreationSession> {
  declare sid: string;
  declare data: string;
  declare authorized: boolean;
  declare userId: string;
  declare expires: Date;
}

Session.init(
  {
    sid: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    authorized: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    data: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    expires: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: true 
    }
  },
  {
    sequelize,
    tableName: 'sessions',
    modelName: 'Session',
    charset: 'utf8',
    timestamps: true,
  }
);

const SequelizeStore = SequelizeSIninit(ExpressStore);
export const Store = new SequelizeStore({
  db: sequelize,
  tableName: 'sessions',
  table: 'Session',
  extendDefaultFields: (_defaults, session) => {
    return {
      data: _defaults.data,
      expires: _defaults.expires,
      authorized: session.authorized,
      userId: session.userId
    };
  },
});

export const CookiesOptions: CookieOptions = {
  httpOnly: true,
  maxAge: 60 * 60 * 1000,
  secure: false,
  sameSite: 'none',
  domain: 'localhost',
};
