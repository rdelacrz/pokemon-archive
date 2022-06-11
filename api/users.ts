import { genSalt, hash } from 'bcrypt';
import { connect } from 'mongoose';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { User } from './_models';
import { MONGODB_URI } from './_constants';

const validPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-+])[A-Za-z\d!@#$%^&*()\-+]{8,100}$/;

async function createUser(request: VercelRequest, response: VercelResponse) {
  const username = request.body.username as string;
  const password = request.body.password as string;
  const confirmPassword = request.body.confirmPassword as string;
  const email = request.body.email as string;
  const firstName = request.body.firstName as string;
  const lastName = request.body.lastName as string;

  try {
    await connect(MONGODB_URI);

    // Validates password to ensure it is:
    // 1: At least 8 characters long
    // 2: At most 100 characters long
    // 3. Has at least one uppercase letter, one lowercase letter, one number and one special character
    if (!password?.length || password.length < 8) {
      return response.status(403).json({ error: 'Password must be at least 8 characters long!' });
    }
    if (!validPasswordRegex.test(password)) {
      return response.status(403).json({ error: 'Password format is invalid!' });
    }

    // Checks if password matches confirm password (other password validations will be performed in User schema)
    if (password !== confirmPassword) {
      return response.status(403).json({ error: 'Password and confirmation text must match!' });
    }

    // Checks if username already exists in system
    let user = await User.find({ username }).exec();
    if (user.length > 0) {
      return response.status(403).json({ error: 'Username already exists in system!' });
    }

    // Checks if email address already exists in system
    user = await User.find({ email }).exec();
    if (user.length > 0) {
      return response.status(403).json({ error: 'Email address already exists in system!' });
    }

    // Hashes password with Bcrypt algorithm
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);
    
    // Creates users within MongoDB
    const newUser = new User({
      username,
      password: hashedPassword,
      email,
      firstName,
      lastName,
      creationDate: new Date(),
      active: true,   // TODO: Set initially to false, and have user verify account via email address
    });
    await newUser.save();

    return response.status(200).send(true);
  } catch (err: any) {
    return response.status(400).send(err);
  }
}

export default async function handler(request: VercelRequest, response: VercelResponse) {
  switch (request.method) {
    case 'POST': return createUser(request, response);
    default: return response.status(405).json({ error: 'You do not have access to the method.' });
  }
}