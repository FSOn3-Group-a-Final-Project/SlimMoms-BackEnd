import {
  registerUser,
  loginUser,
  logoutUser,
  refreshUser,
  getUserByEmail,
} from '../services/auth.js';
import createHttpError from 'http-errors';
import { ONE_DAY } from '../constants/index.js';

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

    const {
      _id,
      name: userName,
      email: userEmail,
      createdAt,
      updatedAt,
    } = userObj;

    res.status(201).json({
      status: 201,
      message: 'Successfully registered a user!',
      data: { id: _id, name: userName, email: userEmail, createdAt, updatedAt },
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
        email: user.email,
        bloodType: user.bloodType, // kan grubu için
      },
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

export const refreshUserController = async (req, res, next) => {
  try {
    const { session, user } = await refreshUser({
      sessionId: req.cookies.sessionId,
      refreshToken: req.cookies.refreshToken,
    });

    setupSession(res, session);

    res.json({
      status: 200,
      message: 'Successfully refreshed a session!',
      data: {
        accessToken: session.accessToken,
        user: {
          name: user.name,
        },
      },
    });
  } catch (error) {
    next(createHttpError(500, error));
  }
};

export const logoutUserController = async (req, res) => {
  if (req.cookies.sessionId) {
    await logoutUser(req.cookies.sessionId);
  }

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).send();
};
