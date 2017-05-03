BEGIN;

DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id            SERIAL        PRIMARY KEY,
  github_id     VARCHAR(20)   UNIQUE,
  display_name  VARCHAR(64)   NOT NULL,
  avatar_url    VARCHAR(500)  NOT NULL
);

COMMIT;
