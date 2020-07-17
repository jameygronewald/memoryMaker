
USE memories_db;

-- data for users table
SELECT * FROM users;
delete createdAt FROM memories_db.users;

INSERT INTO memories_db.users (username, email, password, firstName, lastName, createdAt, updatedAt)
VALUES ("testName","email@gmail.com", "Passworddf", "Peter", "Hook", "2020/07/12","2020/07/12"),("testName2","email2@gmail.com", "Password2", "Nick", "Habor", "2020/07/16","2020/07/16");
DELETE FROM memories_db.users WHERE id=1;

-- data for categories table
SELECT * FROM memories_db.categories;

INSERT INTO memories_db.categories (categoryName, createdAt, updatedAt)
VALUES ("Family","2020/07/12","2020/07/12"),("Friends", "2020/07/16","2020/07/16"),("Parks", "2020/07/16","2020/07/16");

DELETE FROM memories_db.categories
WHERE id=1;

-- data for events table
SELECT * FROM memories_db.events;

INSERT INTO memories_db.events (title, date, description, location, rating, createdAt, updatedAt)
VALUES ("Family Trip","2020/07/12", "It was cool trip with all my family!", "Atlanta", "5", "2020/07/12","2020/07/12"),("Trip to Europe","2020/07/12", "Historian trip toItaly with friends!","Europe", "5", "2020/07/12","2020/07/12");

DELETE FROM memories_db.events
WHERE id=1;

-- data for images table
SELECT * FROM memories_db.images;

INSERT INTO memories_db.images (url, caption, altAttribute, createdAt, updatedAt)
VALUES ("https://images.unsplash.com/photo-1533141657590-d8aa5e631eda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60","City at Night", "City", "2020/07/12","2020/07/12"),("https://images.unsplash.com/photo-1467269204594-9661b134dd2b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80","City in Italy", "Small town", "2020/07/12","2020/07/12");
DELETE FROM memories_db.events
WHERE id=1;

