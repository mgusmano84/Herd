CREATE DATABASE carPool;

USE carPool;

CREATE TABLE users (
userID INTEGER(11) AUTO_INCREMENT NOT NULL,
email VARCHAR(50) NOT NULL,
userPassword VARCHAR(20) NOT NULL,
userName VARCHAR(30) NOT NULL,
firstName VARCHAR(30) NOT NULL,
lastName VARCHAR(30) NOT NULL,
-- EXTENDED**
userImage VARCHAR(50),
-- EXTENDED**
address VARCHAR(50) NOT NULL,
-- EXTENDED**
city VARCHAR(30) NOT NULL,
-- EXTENDED**
state VARCHAR(30) NOT NULL,
-- EXTENDED**
zip INTEGER(10),
-- EXTENDED**Could be used for drivers who need to contact parents or possibly to send quick text alerts
phoneNumber INTEGER(10) NOT NULL,
-- EXTENDED**Where they work/want to go. This would need to be updated on a page
destination VARCHAR(30),
PRIMARY KEY (userID)
);



CREATE TABLE groups (
groupID INTEGER(11) AUTO_INCREMENT NOT NULL,
groupName VARCHAR(30) NOT NULL,
createdBy VARCHAR(30) NOT NULL,
-- if everyone is dropping off at the drivers house
meet BOOLEAN NOT NULL,
-- if everyone is being picked up at their own houses
pickUp BOOLEAN NOT NULL,
destinationAddress VARCHAR(50) NOT NULL,
destinationZip INTEGER(10) NOT NULL,
destinationCity VARCHAR(30),
destinationState VARCHAR(30),
-- EXTENDED**Would probably have to be a button pressed when they left their house
pickUpTime DATETIME,
-- EXTENDED**same, but for final dropoff so that we could get length of time driving
dropOffTime DATETIME,
PRIMARY KEY (groupID)
);



CREATE TABLE drivers (
groupName VARCHAR(30) NOT NULL,
driverUserName VARCHAR(30) NOT NULL,
seatsAvailable INTEGER(5) NOT NULL,
-- EXTENDED**Start off at zero on account creation
milesDriven DECIMAL(30, 2),
-- EXTENDED**Starts at 0
daysDriving INTEGER(30),
-- EXTENDED**Starts at 0
timeDriving DECIMAL(30, 1),
-- EXTENDED**Starts as null
driverRating INTEGER(2)
);

-- Should this be an array or a separate table?
CREATE TABLE passengers (
driverUserName VARCHAR(30) NOT NULL,
-- This is to join to user table to get address and such if we needed it
username VARCHAR(30) NOT NULL
);