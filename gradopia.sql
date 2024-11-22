use alumni;
-- 1. Users Table 
CREATE TABLE Users (
    UserID INT PRIMARY KEY AUTO_INCREMENT,
    Username VARCHAR(30) NOT NULL UNIQUE,  -- Unique identifier for the user
    Password VARCHAR(255) NOT NULL,  -- Storing hashed passwords
    Email VARCHAR(50) NOT NULL UNIQUE,
    PhoneNumber VARCHAR(15),  -- Optional
    DateOfBirth DATE,  -- Optional
    Role ENUM('Alumni', 'Student', 'Admin') NOT NULL,
    GraduationYear YEAR,  -- Only applicable to Alumni
    CurrentJobTitle VARCHAR(100),
    LinkedInProfile VARCHAR(255),
    DateJoined TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Profiles Table 
CREATE TABLE Profiles (
    ProfileID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT NOT NULL,  -- References the User
    Bio TEXT,  -- User's biography
    Address VARCHAR(255),  -- Optional
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

-- 3. NewsPosts Table 
CREATE TABLE NewsPosts (
    NewsID INT PRIMARY KEY AUTO_INCREMENT,
    Title VARCHAR(100) NOT NULL,  -- Title of the news post
    Content TEXT NOT NULL,  -- Content of the news
    PostedBy INT NOT NULL,  -- References the User who posted the news
    PostedDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Automatically set when posted
    FOREIGN KEY (PostedBy) REFERENCES Users(UserID)
);

-- 4. Events Table 
CREATE TABLE Events (
    EventID INT PRIMARY KEY AUTO_INCREMENT,
    EventName VARCHAR(50) NOT NULL,  -- Name of the event
    EventDate DATE NOT NULL,  -- Scheduled date of the event
    EventLocation VARCHAR(100) NOT NULL,  -- Location of the event
    OrganizerID INT,  -- References the User who organized the event
    MaxParticipants INT NOT NULL,  -- Maximum number of participants
    EventDescription TEXT,  -- Detailed description of the event
    PostedDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Automatically set when the event is created
    FOREIGN KEY (OrganizerID) REFERENCES Users(UserID)
);

-- 5. JobPostings Table 
CREATE TABLE JobPostings (
    JobID INT PRIMARY KEY AUTO_INCREMENT,
    CompanyName VARCHAR(100) NOT NULL,  -- Name of the company offering the job
    JobTitle VARCHAR(100) NOT NULL,  -- Title of the job
    JobDescription TEXT,  -- Description of the job
    JobLocation VARCHAR(100),  -- Location of the job
    PostedBy INT NOT NULL,  -- References the User who posted the job
    PostedDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Automatically set when job is posted
    FOREIGN KEY (PostedBy) REFERENCES Users(UserID)
);

-- 6. Friend Connections Table 
CREATE TABLE FriendConnections (
    ConnectionID INT PRIMARY KEY AUTO_INCREMENT,
    UserID1 INT,  -- Reference to the first user in the connection (follower)
    UserID2 INT,  -- Reference to the second user in the connection (followed)
    ConnectionDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Automatically set when a connection is made
    FOREIGN KEY (UserID1) REFERENCES Users(UserID),
    FOREIGN KEY (UserID2) REFERENCES Users(UserID)
);

--7. User registration 
CREATE TABLE UserRegistrationLog (
    LogID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT,
    Username VARCHAR(50),
    RegistrationTimestamp DATETIME,
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);