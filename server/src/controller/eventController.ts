import { Request, Response } from 'express';
import { pool } from '../index';

export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const { title, start, end, username } = req.body;

    if (!title || !start || !end || !username) {
      return res.status(400).json({
        message: 'Not all event details provided',
      });
    }
    //check if event exists with provided body
    const eventCheck =
    await pool.query('SELECT * FROM users.events WHERE title = $1 and start_time = $2::timestamp and end_time = $3::timestamp and event_user = $4',
      [title, start, end, username]
    );
    if (eventCheck.rows.length === 0) {
        return res.status(400).json({
          message: 'No such event exists',
        });
    }
    const query = `DELETE FROM users.events WHERE title = $1 and start_time = $2::timestamp and end_time = $3::timestamp and event_user = $4`;
    await pool.query(query, [title, start, end, username]);
    return res.status(200).json({
      message: 'Event Deleted successfully',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

export const createEvent = async (req: Request, res: Response) => {
  try {
    const { title, start, end, username } = req.body;

    if (!title || !start || !end || !username) {
      return res.status(400).json({
        message: 'Not all event details provided',
      });
    }
    //check if event exists with provided body
    const eventCheck =
    await pool.query('SELECT * FROM users.events WHERE title = $1 and start_time = $2::timestamp and end_time = $3::timestamp and event_user = $4',
      [title, start, end, username]);
    if (eventCheck.rows.length > 0) {
        return res.status(400).json({
          message: 'Event already exists',
        });
    }
    const query = `INSERT INTO users.events(title, start_time, end_time, event_user) VALUES($1, $2::timestamp, $3::timestamp, $4)`;
    await pool.query(query, [title, start, end, username]);
    return res.status(200).json({
      message: 'Event created successfully',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

export const getUserEvents = async (req: Request, res: Response) => {
  try {
    const { username } = req.headers;
    if (!username) {
      return res.status(400).json({
        message: 'username not provided',
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
    const query = `SELECT * FROM users.events WHERE event_user = $1`;
    const events = await pool.query(query, [username]);
    return res.status(200).json({
      message: 'events retrieved',
      events: events.rows
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  try {
    const { title, start_time, end_time, username, newStart, newEnd } = req.body;

    if (!title || !start_time || !end_time || !username || !newStart || !newEnd) {
      return res.status(400).json({
        message: 'Not all event details supplied',
      });
    }
    //check if event exists with provided body
    const eventCheck =
    await pool.query('SELECT * FROM users.events WHERE title = $1 and start_time = $2::timestamp and end_time = $3::timestamp and event_user = $4',
      [title, start_time, end_time, username]
    );
    if (eventCheck.rows.length === 0) {
        return res.status(400).json({
          message: 'No such event exists',
        });
    }
    const query = `UPDATE users.events SET start_time = $5::timestamp, end_time = $6::timestamp WHERE title = $1 and start_time = $2::timestamp and end_time = $3::timestamp and event_user = $4`;
    await pool.query(query, [title, start_time, end_time, username, newStart, newEnd]);
    return res.status(200).json({
      message: 'Event Time updated successfully',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

