import { Request, Response } from 'express';
import { pool } from '../index';
import bcrypt from 'bcryptjs';

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: 'Please provide all user details',
      });
    }
    // check if email already exists
    const emailcheck = await pool.query('SELECT * FROM users.users WHERE email = $1', [
      email,
    ]);
    if (emailcheck.rows.length > 0) {
      return res.status(400).json({
        message: 'An account with this email already exits',
      });
    }
    // check if username already exists
    const usercheck = await pool.query('SELECT * FROM users.users WHERE username = $1', [
      username,
    ]);
    if (usercheck.rows.length > 0) {
      return res.status(400).json({
        message: 'An account with this username already exists',
      });
    }

    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const query = `INSERT INTO users.users(username, email, hashed_password) VALUES($1, $2, $3)`;
    await pool.query(query, [username, email, hashedPassword]);

    return res.status(200).json({
      message: 'User registered successfully',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    // get the user data from the request body
    const { username, password } = req.body;

    // check if user data is provided
    if (!username || !password) {
      return res.status(400).json({
        message: 'Please provide all user details',
      });
    }

    // check if username exists
    const user = await pool.query('SELECT * FROM users.users WHERE username = $1', [
      username,
    ]);
    if (user.rows.length === 0) {
      return res.status(400).json({
        message: 'User does not exist',
      });
    }
    // compare the password
    const validPassword = await bcrypt.compare(password, user.rows[0].hashed_password);
    if (!validPassword) {
      return res.status(400).json({
        message: 'Invalid password',
      });
    }
    return res.status(200).json({
      message: 'User logged in successfully',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};