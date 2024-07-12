const {
  ShipmentInspection,
  K9Inspection,
  SiteInspection,
} = require("../models/inspection.model");

class InspectionFactory {
  static create(type, data) {
    switch (type) {
      case "shipment":
        return new ShipmentInspection(data);
      case "site":
        return new SiteInspection(data);
      // Add other cases for different inspection types
      default:
        throw new Error("Unknown inspection type");
    }
  }
}

module.exports = InspectionFactory;
