-- // watawiki schema

DROP TABLE IF EXISTS emails_sent CASCADE;
DROP TABLE IF EXISTS articles_tags CASCADE;
DROP TABLE IF EXISTS articles_editors CASCADE;
DROP TABLE IF EXISTS articles CASCADE;
DROP TABLE IF EXISTS users	CASCADE;
DROP TABLE IF EXISTS tags	CASCADE;

CREATE TABLE users (
                      id 		SERIAL PRIMARY KEY,
                      user_name	VARCHAR(10) NOT NULL,
                      user_email	VARCHAR(40),
                      user_pword	VARCHAR(10)
);

CREATE TABLE articles (
                       id		          SERIAL PRIMARY KEY,
                       article_body	    TEXT NOT NULL,
                       article_title	    VARCHAR(255),
                       users_id		    INTEGER REFERENCES users,
                       creation_date    TIMESTAMP without time zone DEFAULT now() NOT NULL,
                       tagged		     BOOLEAN,
                       edited		BOOLEAN
);


CREATE TABLE tags (
                      id 		SERIAL PRIMARY KEY,
                      tag 		VARCHAR(20) NOT NULL
);

CREATE TABLE emails_sent (
                       id 		SERIAL PRIMARY KEY,
                       articles_id 	INTEGER REFERENCES articles,
                       users_id 		INTEGER REFERENCES users,
                       date_sent	TIMESTAMP without time zone DEFAULT now() NOT NULL,
                       user_email	VARCHAR(40) NOT NULL
);

CREATE TABLE articles_editors (
                       articles_id 	INTEGER REFERENCES articles,
                       users_id 		INTEGER REFERENCES users,
                       date_edited	TIMESTAMP without time zone DEFAULT now() NOT NULL
);

CREATE TABLE articles_tags (
                        articles_id 	INTEGER REFERENCES articles,
                        users_id 	INTEGER REFERENCES users
);

