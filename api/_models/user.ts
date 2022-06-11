import { model, Schema } from 'mongoose';

interface IUser {
  username: string;
  password: string;
  salt: string;
  firstName: string;
  lastName: string;
  email: string;
  creationDate: Date;
  loginDate: Date;
  modifiedDate: Date;
  active: boolean;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: [true, 'Username is required!'] },
  salt: { type: String, required: true },
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  email: {
    type: String,
    required: [true, 'Email address is required!'],
    validate: {
      validator: function (value: string) {
        return /^[a-z0-9\.\-]+@[a-z]+\.[a-z]{2,4}$/.test(value);
      },
      message: props => `${props.value} is not a valid email address!`,
    },
  },
  creationDate: { type: Date, required: false },
  loginDate: { type: Date, required: false },
  modifiedDate: { type: Date, required: false },
  active: { type: Boolean, required: false },
});

export const User = model<IUser>('users', userSchema);