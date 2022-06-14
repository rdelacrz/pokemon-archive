import { genSalt, hash } from 'bcrypt';
import { SignJWT } from 'jose';
import { connect } from 'mongoose';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sendEmail } from './_emailManager';
import { User } from './_models';
import { MONGODB_URI, SECRET_KEY } from './_utils';

const validPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-+])[A-Za-z\d!@#$%^&*()\-+]{8,100}$/;

async function registerUser(request: VercelRequest, response: VercelResponse) {
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
      return response.status(403).json({ error: 'Password must be at least 8 characters long.' });
    }
    if (!validPasswordRegex.test(password)) {
      return response.status(403).json({ error: 'Password format is invalid.' });
    }

    // Checks if password matches confirm password (other password validations will be performed in User schema)
    if (password !== confirmPassword) {
      return response.status(403).json({ error: 'Password and confirmation text must match.' });
    }

    // Checks if username already exists in system (collation ensure case insensitivity)
    const user = await User.findOne({ username }).collation({ locale: 'en', strength: 2 }).exec();
    if (user) {
      return response.status(403).json({ error: 'Username already exists in system.' });
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
      verified: false,
      active: false,
    });
    await newUser.save();

    // Creates verification JWT token
    const jwt = await new SignJWT({ 'userId': newUser?.id })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setIssuer(process.env.JWT_ISSUER || '')
      .setAudience(process.env.JWT_VERIFY_AUDIENCE || '')
      .sign(SECRET_KEY);

    // Sends email with verification link
    const subject = 'User Account Verification';
    const verificationLink = `${process.env.BASE_URL}/verify/${jwt}`
    const emailBody = `
      <p>Dear Pokemon fan,</p>
      <p>Please verify your account by clicking the link below.</p>
      <p><a href='${verificationLink}'></a>${verificationLink}</p>
      <p>Best regards,<br /> Pokemon Archive Team</p>
    `;
    await sendEmail(email, subject, emailBody, firstName, lastName);

    return response.status(200).send(true);
  } catch (err: any) {
    return response.status(400).send(err);
  }
}

export default async function handler(request: VercelRequest, response: VercelResponse) {
  switch (request.method) {
    case 'POST': return registerUser(request, response);
    default: return response.status(405).json({ error: 'You do not have access to the method.' });
  }
}