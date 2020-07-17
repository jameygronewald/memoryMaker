USE memories_db;
SELECT * FROM users;
delete createdAt FROM memories_db.users;

INSERT INTO memories_db.users (username, email, password, firstName, lastName, createdAt, updatedAt)
VALUES ("testName","email@gmail.com", "Passworddf", "Peter", "Hook", "2020/07/12","2020/07/12"),("testName2","email2@gmail.com", "Password2", "Nick", "Habor", "2020/07/16","2020/07/16");
DELETE FROM memories_db.users WHERE id=1;