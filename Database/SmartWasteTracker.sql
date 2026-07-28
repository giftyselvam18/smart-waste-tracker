CREATE DATABASE SmartWasteTracker;
GO

USE SmartWasteTracker;
GO

-- Admin Table
SELECT * FROM Admins;

-- Pickup Requests
UPDATE PickupRequests
SET Status = 'Pending'
WHERE RequestID = 1;

SELECT * FROM PickupRequests;

-- Pickup Assignments Table Structure
sp_help PickupAssignments;

-- Pickup Requests Table Structure
sp_help PickupRequests;

-- View Pickup Requests
SELECT * FROM PickupRequests;

-- View Pickup Assignments
SELECT * FROM PickupAssignments;

-- Check PickupAssignments Columns
SELECT
    COLUMN_NAME,
    DATA_TYPE
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_NAME = 'PickupAssignments';

-- Insert Assignment
INSERT INTO PickupAssignments
(
    RequestID,
    CollectorID,
    AssignedDate,
    Status
)
VALUES
(
    1,
    1,
    GETDATE(),
    'Assigned'
);

-- Verify Assignment
SELECT * FROM PickupAssignments;

-- Check Column Types
SELECT
    COLUMN_NAME,
    DATA_TYPE
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_NAME = 'PickupAssignments';

-- Top Records
SELECT TOP 5 *
FROM PickupAssignments;

-- Make AssignedDate Nullable
ALTER TABLE PickupAssignments
ALTER COLUMN AssignedDate DATETIME NULL;

-- Set AssignedDate to NULL
UPDATE PickupAssignments
SET AssignedDate = NULL;

-- View Collectors
SELECT * FROM Collectors;

-- Check Collector Status
SELECT
    CollectorID,
    Status
FROM Collectors
WHERE CollectorID = 2;

-- Update Collector Status
UPDATE Collectors
SET Status = 'Busy'
WHERE CollectorID = 2;

-- View All Collectors
SELECT
    CollectorID,
    CollectorName,
    Status
FROM Collectors;