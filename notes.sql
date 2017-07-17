DROP DATABASE IF EXISTS notes;
CREATE DATABASE notes;

\c notes;

CREATE TABLE notes (
  ID SERIAL PRIMARY KEY,
  content VARCHAR
);

INSERT INTO notes (content) VALUES ('This is note 1.');
INSERT INTO notes (content) VALUES ('This is another note, note 2.');
INSERT INTO notes (content) VALUES ('Here's the last note, note 3');
