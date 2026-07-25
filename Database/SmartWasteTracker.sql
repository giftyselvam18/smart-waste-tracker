CREATE DATABASE SmartWasteTracker;
GO

USE SmartWasteTracker;
GO

CREATE TABLE Admins (
    AdminID INT PRIMARY KEY IDENTITY(1,1),
    AdminUsername VARCHAR(50) UNIQUE NOT NULL,
    Password VARCHAR(255) NOT NULL,
    SecurityCode VARCHAR(50) NOT NULL
);
GO

SELECT * FROM Admins;
GO
INSERT INTO Admins (AdminUsername, Password, SecurityCode)
VALUES
('admin', 'admin123', 'SWT2026');
GO

CREATE TABLE Users (
    UserID INT PRIMARY KEY IDENTITY(1,1),

    FullName VARCHAR(100) NOT NULL,

    Username VARCHAR(50) UNIQUE NOT NULL,

    Password VARCHAR(255) NOT NULL,

    Phone VARCHAR(15),

    Email VARCHAR(100),

    Address VARCHAR(255),

    CreatedAt DATETIME DEFAULT GETDATE()
);
GO

SELECT * FROM Users;

INSERT INTO Users
(FullName, Username, Password, Phone, Email, Address)
VALUES
('Gifty Selvam',
 'gifty',
 'user123',
 '9876543210',
 'gifty@gmail.com',
 'Chennai');
GO

SELECT * FROM Users;

CREATE TABLE Collectors (
    CollectorID INT PRIMARY KEY IDENTITY(1,1),

    CollectorCode VARCHAR(20) UNIQUE NOT NULL,

    CollectorName VARCHAR(100) NOT NULL,

    Password VARCHAR(255) NOT NULL,

    Phone VARCHAR(15),

    VehicleNumber VARCHAR(20),

    Status VARCHAR(20) DEFAULT 'Available'
);
GO

SELECT * FROM Collectors;

INSERT INTO Collectors
(CollectorCode, CollectorName, Password, Phone, VehicleNumber)
VALUES
('COL001',
 'Ramesh',
 'collector123',
 '9876543211',
 'TN01AB1234');
GO

CREATE TABLE WasteCategories (
    CategoryID INT PRIMARY KEY IDENTITY(1,1),
    CategoryName VARCHAR(50) NOT NULL,
    Description VARCHAR(255)
);
GO
INSERT INTO WasteCategories (CategoryName, Description)
VALUES
('Plastic', 'Plastic bottles, containers, bags'),
('Paper', 'Newspapers, books, cardboard'),
('Glass', 'Glass bottles and jars'),
('Metal', 'Aluminum, steel and iron items'),
('Organic', 'Food waste and garden waste'),
('Electronic', 'Phones, laptops, chargers and other e-waste'),
('Hazardous', 'Batteries, chemicals, paints'),
('Mixed Waste', 'Combination of different waste types');
GO

SELECT * FROM WasteCategories;

CREATE TABLE PickupRequests (
    RequestID INT PRIMARY KEY IDENTITY(1,1),

    UserID INT NOT NULL,

    CategoryID INT NOT NULL,

    PickupAddress VARCHAR(255) NOT NULL,

    PickupDate DATE NOT NULL,

    Description VARCHAR(255),

    Status VARCHAR(20) DEFAULT 'Pending',

    RequestDate DATETIME DEFAULT GETDATE(),

    FOREIGN KEY (UserID) REFERENCES Users(UserID),

    FOREIGN KEY (CategoryID) REFERENCES WasteCategories(CategoryID)
);
GO

INSERT INTO PickupRequests
(UserID, CategoryID, PickupAddress, PickupDate, Description)
VALUES
(1,
6,
'No.12, Gandhi Street, Chennai',
'2026-07-30',
'Old laptop and charger');
GO
SELECT * FROM PickupRequests;

CREATE TABLE PickupAssignments (
    AssignmentID INT PRIMARY KEY IDENTITY(1,1),

    RequestID INT NOT NULL,

    CollectorID INT NOT NULL,

    AssignedDate DATETIME DEFAULT GETDATE(),

    FOREIGN KEY (RequestID) REFERENCES PickupRequests(RequestID),

    FOREIGN KEY (CollectorID) REFERENCES Collectors(CollectorID)
);
GO

INSERT INTO PickupAssignments
(RequestID, CollectorID)
VALUES
(1, 1);
GO

SELECT * FROM PickupAssignments;

CREATE TABLE Notifications (
    NotificationID INT PRIMARY KEY IDENTITY(1,1),

    UserID INT NOT NULL,

    Message VARCHAR(255) NOT NULL,

    IsRead BIT DEFAULT 0,

    CreatedAt DATETIME DEFAULT GETDATE(),

    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);
GO
INSERT INTO Notifications
(UserID, Message)
VALUES
(1, 'Your pickup request has been assigned to a collector.');
GO
SELECT * FROM Notifications;
CREATE TABLE Feedback (
    FeedbackID INT PRIMARY KEY IDENTITY(1,1),

    RequestID INT NOT NULL,

    UserID INT NOT NULL,

    Rating INT NOT NULL CHECK (Rating BETWEEN 1 AND 5),

    Comments VARCHAR(255),

    FeedbackDate DATETIME DEFAULT GETDATE(),

    FOREIGN KEY (RequestID) REFERENCES PickupRequests(RequestID),

    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);
GO  
INSERT INTO Feedback
(RequestID, UserID, Rating, Comments)
VALUES
(1, 1, 5, 'Collector arrived on time and collected the waste safely.');
GO

SELECT * FROM Feedback;
