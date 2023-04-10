CREATE DATABASE pernmovies;

CREATE TABLE movie(
    id SERIAL PRIMARY KEY,
    user_id UUID,
    title VARCHAR(255),
    summary VARCHAR(255),
    rating DECIMAL,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL
);

--insert fake users
INSERT INTO users (user_name, user_email,
user_password) VALUES ('jacob',
'jacob@gmail.com', 'kth18822');

--fake movies data
INSERT INTO movie (user_id, title, summary, rating) values 
('c1a94627-0e86-4078-9b12-b1abb74c424a', 'smrad3', 'dobar', '7');