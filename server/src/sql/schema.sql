CREATE SCHEMA users;

CREATE TABLE users.users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(30) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL
);

CREATE TABLE users.events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    start_time timestamp with time zone NOT NULL,
    end_time timestamp NOT NULL,
    event_user VARCHAR(30) REFERENCES users.users(username)
)