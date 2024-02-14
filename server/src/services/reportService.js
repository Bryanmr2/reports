const db = require("./db");

const createReportInDB = async (report) => {
  try {
    const result = await db.query(
      "INSERT INTO reports (location, date, name, dog_name, corporate, plant, shift, inspection_area, inspection_description, shipment_type, carrier_company, operator_name, tractor_brand, tractor_color, tractor_model, tractor_plate, tractor_number, trailer_number, shipment_number, total_skids, stamps_number, security_company, guard_names, custody_company, custodian_names, custody_unit_number, departure_time, start_time, inspected_areas, end_time, security_items) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        report.location,
        report.date,
        report.name,
        report.dog_name,
        report.corporate,
        report.plant,
        report.shift,
        report.inspection_area,
        report.inspection_description,
        report.shipment_type,
        report.carrier_company,
        report.operator_name,
        report.tractor_brand,
        report.tractor_color,
        report.tractor_model,
        report.tractor_plate,
        report.tractor_number,
        report.trailer_number,
        report.shipment_number,
        report.total_skids,
        report.stamps_number,
        report.security_company,
        report.guard_names,
        report.custody_company,
        report.custodian_names,
        report.custody_unit_number,
        report.departure_time,
        report.start_time,
        report.inspected_areas,
        report.end_time,
        report.security_items,
      ]
    );
    return result;
  } catch (error) {
    console.error("Error al insertar reporte:", error.message);
    throw error;
  }
};

module.exports = {
  createReportInDB,
};
