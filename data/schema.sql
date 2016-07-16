CREATE DATABASE carPool;

USE carPool;

CREATE TABLE users (
userID INTEGER(11) AUTO_INCREMENT NOT NULL,
email VARCHAR(50) NOT NULL,
userPassword VARCHAR(1000) NOT NULL,
userName VARCHAR(30) NOT NULL,
firstName VARCHAR(30) NOT NULL,
lastName VARCHAR(30) NOT NULL,
-- EXTENDED**
userImage VARCHAR(10000),
-- EXTENDED**
address VARCHAR(50) NOT NULL,
-- EXTENDED**
city VARCHAR(30) NOT NULL,
-- EXTENDED**
state VARCHAR(30) NOT NULL,
-- EXTENDED**
zip VARCHAR(10),
-- EXTENDED**Could be used for drivers who need to contact parents or possibly to send quick text alerts
phoneNumber VARCHAR(20) NOT NULL,
PRIMARY KEY (userID)
);

-- Dummy Data for users table
INSERT INTO users (email, userPassword, userName, firstName, lastName, userImage, address, city, state, zip, phoneNumber) VALUES ("brucewayne@notbatman.com", "RichBat", "BatmanOrBust2", "Bruce", "Wayne", "<img src='http://www.mbird.com/wp-content/uploads/2012/07/tumblr_m3b0anGHPD1qje60io1_1280.jpg'>", "3030 Goodrick Ln", "Kissimmee", "FL", "34743", "9999999999"), ("chloeLovesTreats@dog.com", "treats", "GoodDog", "Chloe", "Prine", "<img src='https://scontent.ftpa1-2.fna.fbcdn.net/v/t1.0-1/p160x160/11825639_124892927852533_4183234602635820129_n.jpg?oh=2377cda37e44c8f0bf7e3af59ee6d2fd&oe=5837373F'>", "8464 Lake Waverly Ln", "Orlando", "FL", "32829", "8888888888");

CREATE TABLE groups (
groupID INTEGER(11) AUTO_INCREMENT NOT NULL,
groupName VARCHAR(30) NOT NULL,
groupDescription VARCHAR(100) NOT NULL,
createdBy VARCHAR(30) NOT NULL,
-- if everyone is dropping off at the drivers house
meet BOOLEAN NOT NULL,
-- if everyone is being picked up at their own houses
pickUp BOOLEAN NOT NULL,
PRIMARY KEY (groupID)
);

-- Dummy Data for groups table
INSERT INTO groups (groupName, groupDescription, createdBy, meet, pickUp) VALUES ("CoolGroup", "Save Gothem", "BatmanOrBust2", true, false), ("DogGroup", "Drive to the dog park.", "GoodDog", false, true);

CREATE TABLE groupMembers (
groupName VARCHAR(30) NOT NULL,
memberName VARCHAR(30) NOT NULL
);

INSERT INTO groupMembers (groupName, memberName) VALUES ("CoolGroup", "BatmanOrBust2"), ("CoolGroup", "GoodDog");

CREATE TABLE drivers (
groupName VARCHAR(30) NOT NULL,
driverUserName VARCHAR(30) NOT NULL,
seatsAvailable INTEGER(5) NOT NULL,
-- EXTENDED**Start off at zero on account creation
milesDriven DECIMAL(30, 2),
-- EXTENDED**Starts at 0
daysDriving INTEGER(30),
-- EXTENDED**Starts at 0
timeHoursDriving DECIMAL(30, 1),
-- EXTENDED**Starts as null
driverRating INTEGER(2)
);

-- Dummy Data for drivers table
INSERT INTO drivers (groupName, driverUserName, seatsAvailable, milesDriven, daysDriving, timeHoursDriving, driverRating) VALUES ("CoolGroup", "BatmanOrBust2", 3, 45.33, 7, 1.2, 9), ("DogGroup", "GoodDog", 1, 0, 0, 0, null); 

CREATE TABLE passengers (
driverUserName VARCHAR(30) NOT NULL,
passengerUserName VARCHAR(30) NOT NULL
);

INSERT INTO passengers (driverUserName, passengerUserName) VALUES ("BatmanOrBust2", "GoodDog");

CREATE TABLE userDirections (
userDestinationID INTEGER(11) AUTO_INCREMENT NOT NULL,
userName VARCHAR(30) NOT NULL,
-- EXTENDED**Where they work/want to go. This would need to be updated on a page
userDestination VARCHAR(30),
userDestinationAddress VARCHAR(50) NOT NULL,
userDestinationCity VARCHAR(30),
userDestinationState VARCHAR(30),
userDestinationZip INTEGER(10) NOT NULL,
-- EXTENDED**Would probably have to be a button pressed when they left their house
userPickUpTime DATETIME NOT NULL DEFAULT NOW(),
-- EXTENDED**same, but for final dropoff so that we could get length of time driving
userDropOffTime DATETIME NOT NULL DEFAULT NOW(),
PRIMARY KEY (userDestinationID)
);

-- Dummy Data for userDirections table
INSERT INTO userDirections (userName, userDestinationAddress, userDestinationCity, userDestinationState, userDestinationZip) VALUES ("BatmanOrBust2", "111 W Jefferson St #100", "Orlando", "FL", 32801);

CREATE TABLE groupDirections (
groupDestinationID INTEGER(11) AUTO_INCREMENT NOT NULL,
groupName VARCHAR(30) NOT NULL,
-- ex: football practice/shopping adventure/work
destinationDescription VARCHAR(100),
-- EXTENDED**Where they work/want to go. This would need to be updated on a page
groupDestinationAddress VARCHAR(50) NOT NULL,
groupDestinationCity VARCHAR(30),
groupDdestinationState VARCHAR(30),
groupDestinationZip INTEGER(10) NOT NULL,
-- EXTENDED**Would probably have to be a button pressed when they left their house
groupPickUpTime DATETIME NOT NULL DEFAULT NOW(),
-- EXTENDED**same, but for final dropoff so that we could get length of time driving
groupDropOffTime DATETIME NOT NULL DEFAULT NOW(),
PRIMARY KEY (groupDestinationID)
);

-- Dummy Data for groupDirections table
INSERT INTO groupDirections (groupName, destinationDescription, groupDestinationAddress, groupDestinationCity, groupDdestinationState, groupDestinationZip) VALUES ("CoolGroup", "work", "4000 Central Florida Blvd", "Orlando", "FL", 32816);