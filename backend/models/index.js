const User = require("./User");
const Admin = require("./Admin");
const Collector = require("./Collector");
const WasteCategory = require("./WasteCategory");
const PickupRequest = require("./PickupRequest");
const PickupAssignment = require("./PickupAssignment");
const Notification = require("./Notification");
const Feedback = require("./Feedback");

/* ==========================
   User Relations
========================== */

// User -> PickupRequest
User.hasMany(PickupRequest, {
  foreignKey: "UserID",
});

PickupRequest.belongsTo(User, {
  foreignKey: "UserID",
});

// WasteCategory -> PickupRequest
WasteCategory.hasMany(PickupRequest, {
  foreignKey: "CategoryID",
});

PickupRequest.belongsTo(WasteCategory, {
  foreignKey: "CategoryID",
});

// PickupRequest -> PickupAssignment
PickupRequest.hasOne(PickupAssignment, {
  foreignKey: "RequestID",
});

PickupAssignment.belongsTo(PickupRequest, {
  foreignKey: "RequestID",
});

// Collector -> PickupAssignment
Collector.hasMany(PickupAssignment, {
  foreignKey: "CollectorID",
});

PickupAssignment.belongsTo(Collector, {
  foreignKey: "CollectorID",
});

// User -> Notification
User.hasMany(Notification, {
  foreignKey: "UserID",
});

Notification.belongsTo(User, {
  foreignKey: "UserID",
});

// User -> Feedback
User.hasMany(Feedback, {
  foreignKey: "UserID",
});

Feedback.belongsTo(User, {
  foreignKey: "UserID",
});

// PickupRequest -> Feedback
PickupRequest.hasOne(Feedback, {
  foreignKey: "RequestID",
});

Feedback.belongsTo(PickupRequest, {
  foreignKey: "RequestID",
});

module.exports = {
  User,
  Admin,
  Collector,
  WasteCategory,
  PickupRequest,
  PickupAssignment,
  Notification,
  Feedback,
};