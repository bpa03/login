import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from 'sequelize';
import bcrypt from 'bcrypt';

// Singleton
import { sequelize } from '../database';

type InferUser = InferAttributes<User>;
type InferCreationUser = InferCreationAttributes<User>;
class User extends Model<InferUser, InferCreationUser> {
  declare id: CreationOptional<string>;
  declare name: CreationOptional<string>;
  declare lastname: CreationOptional<string>;
  declare email: string;
  declare password: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  public static encryptPassword(password: string): string {
    return bcrypt.hashSync(password, 10);
  }

  public static comparePassword(
    password: string,
    userPassword: string
  ): boolean {
    return bcrypt.compareSync(password, userPassword);
  }
}

User.init(
  {
    id: {
      field: 'user_id',
      type: DataTypes.UUID,
      defaultValue: new DataTypes.UUIDV4(),
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: new DataTypes.STRING(40),
      allowNull: true,
    },
    lastname: {
      type: new DataTypes.STRING(40),
      allowNull: true,
    },
    email: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      unique: true,
      set(email: string) {
        this.setDataValue('email', email.toLowerCase());
      },
    },
    password: {
      type: new DataTypes.STRING(),
      set(password: string) {
        const hash = User.encryptPassword(password);
        this.setDataValue('password', hash);
      },
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    timestamps: true,
    charset: 'utf8',
    tableName: 'users',
    modelName: 'User',
  }
);

export default User;
