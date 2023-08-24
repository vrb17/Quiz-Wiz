-- Create the users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Create the topics table
CREATE TABLE topics (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- Create the questions table
CREATE TABLE questions (
    id SERIAL PRIMARY KEY,
    topic_id INT NOT NULL REFERENCES topics(id),
    text TEXT NOT NULL,
    options JSONB NOT NULL,
    correct_option INT NOT NULL
);

-- Create the quiz_submissions table
CREATE TABLE quiz_submissions (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id),
    topic_id INT NOT NULL REFERENCES topics(id),
    score FLOAT NOT NULL
);
