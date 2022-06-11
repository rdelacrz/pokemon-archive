import { model, Schema } from 'mongoose';

interface IUser {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  loginDate: Date;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: [true, 'Username is required!'] },
  password: { type: String, required: [true, 'Password is required!'] },
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
  loginDate: { type: Date, required: false },
});

export const User = model<IUser>('users', userSchema);