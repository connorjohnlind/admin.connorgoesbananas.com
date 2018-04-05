use cgb_dev;

CREATE TABLE example (
	id INTEGER AUTO_INCREMENT PRIMARY KEY,
	email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO example (email) VALUES ("clind7492@gmail.com");
