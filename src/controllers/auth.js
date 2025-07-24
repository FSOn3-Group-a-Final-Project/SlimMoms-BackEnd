import { registerUser, loginUser, refreshUser, getUserByEmail } from '../services/auth.js';
import createHttpError from 'http-errors';
import { ONE_DAY } from '../constants/index.js';
import jwt from 'jsonwebtoken';
import { SessionCollection } from '../db/models/session.js';

export const registerUserController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    //Email conflict kontrolü
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return next(createHttpError(409, 'This email already exists'));
    }

    const newUser = await registerUser({ name, email, password });

    const userObj = newUser.toObject();
    delete userObj.password;

    const { _id, name: userName, email: userEmail, createdAt, updatedAt } = userObj;

    const token = jwt.sign({ id: _id }, process.env.JWT_SECRET, {
      expiresIn: '10d',
    });

    res.status(201).json({
      status: 201,
      message: 'Successfully registered a user!',
      data: { id: _id, name: userName, email: userEmail, createdAt, updatedAt },
      token,
    });
  } catch (error) {
    next(createHttpError(500, error));
  }
};

export const loginUserController = async (req, res) => {
  const { session, user } = await loginUser(req.body);

    res.cookie('refreshToken', session.refreshToken, {
        httpOnly: true,
        expires: new Date(Date.now() + ONE_DAY),
    });
    res.cookie('sessionId', session._id, {
        httpOnly: true,
        expires: new Date(Date.now() + ONE_DAY),
    });
    res.json({
        status: 200,
        message: 'Successfully logged in an user!',
        data: {
          accessToken: session.accessToken,
          user: {
            name: user.name,
            email: user.email
          }
        },
    });
};

const setupSession = (res, session) => {
    res.cookie('refreshToken', session.refreshToken, {
        httpOnly: true,
        expires: new Date(Date.now() + ONE_DAY),
    });
    res.cookie('sessionId', session._id, {
        httpOnly: true,
        expires: new Date(Date.now() + ONE_DAY),
    });
};

export const refreshUserController = async (req, res) => {
  const session = await refreshUser({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const logoutUserController = async (req, res, next) => {
  try {
    const accessToken = req.get('Authorization')?.split(' ')[1];
    const refreshToken = req.cookies.refreshToken;
    const sessionId = req.cookies.sessionId;

    if (!accessToken && !refreshToken && !sessionId) {
      return res.status(401).json({ message: 'Authorization error: No tokens provided' });
    }

    let session = null;

    if (accessToken) {
      session = await SessionCollection.findOne({ accessToken });
    }

    if (!session && refreshToken) {
      session = await SessionCollection.findOne({ refreshToken });
    }

    if (!session && sessionId) {
      session = await SessionCollection.findById(sessionId);
    }

    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    await SessionCollection.findByIdAndDelete(session._id);

    res.clearCookie('sessionId');
    res.clearCookie('refreshToken');

    res.status(200).json({ message: 'Successfully logged out!' });
  } catch (error) {
    next(createHttpError(500, error));
  }
};
