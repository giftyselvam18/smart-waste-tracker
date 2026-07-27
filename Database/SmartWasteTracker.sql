USE SmartWasteTracker;
SELECT*FROM Admins;
UPDATE PickupRequests
SET Status = 'Pending'
WHERE RequestID = 1;
SELECT*FROM PickupRequests;
sp_help PickupAssignments;
sp_help PickupRequests;
SELECT * FROM PickupRequests;
SELECT * FROM PickupAssignments;
SELECT 
    COLUMN_NAME,
    DATA_TYPE
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_NAME = 'PickupAssignments';
INSERT INTO PickupAssignments
(RequestID, CollectorID, AssignedDate, Status)
VALUES
(1, 1, GETDATE(), 'Assigned');
SELECT * FROM PickupAssignments;
SELECT COLUMN_NAME, DATA_TYPE
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_NAME='PickupAssignments';
SELECT TOP 5 * FROM PickupAssignments;
ALTER TABLE PickupAssignments
ALTER TABLE PickupAssignments
ALTER COLUMN AssignedDate DATETIME NULL;
UPDATE PickupAssignments
SET AssignedDate = NULL;
SELECT*FROM collectors;
SELECT * FROM Collectors;  

ALTER COLUMN AssignedDate datetime;
SELECT CollectorID, Status
FROM Collectors
WHERE CollectorID=2;
UPDATE Collectors
SET Status='Busy'
WHERE CollectorID=2;

SELECT CollectorID, CollectorName, Status
FROM Collectors;