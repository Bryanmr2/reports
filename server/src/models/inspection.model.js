class Inspection {
  constructor(data) {
    if (!data.inspection_type) {
      throw new Error("Type is required");
    }

    this.type = data.inspection_type;
    this.date = data.date;
    this.dogName = data.dog_name;
    this.description = data.description;
    this.shift = data.shift;
    this.name = data.name;
    this.plant = data.plant;
    // Add other common properties and validation as needed
  }
}

class ShipmentInspection extends Inspection {
  constructor(data) {
    super(data);
    this.shipmentInspections = data.shipment_inspections;
    // Additional shipment Inspection properties
  }
}

class SiteInspection extends Inspection {
  constructor(data) {
    super(data);
    this.inspectionAreas = data.inspection_areas;
    // Additional site Inspection properties
  }
}

module.exports = { Inspection, ShipmentInspection, SiteInspection };
