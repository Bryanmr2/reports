const InspectionFactory = require("../factory/InspectionFactory");
const supabase = require("../config/supabase");

const createInpection = async (inspection) => {
  try {
    const newInspection = InspectionFactory.create(
      inspection.inspection_type,
      inspection
    );

    const inspectionValues = {
      inspection_type: newInspection.type,
      name: newInspection.name,
      date: newInspection.date,
      dog_name: newInspection.dogName,
      shift: newInspection.shift,
      description: newInspection.description,
      plant: newInspection.plant,
    };

    if (newInspection.type === "shipment") {
      inspectionValues.shipment_inspections = newInspection.shipmentInspections;
    }

    if (newInspection.type === "site") {
      inspectionValues.inspection_areas = newInspection.inspectionAreas;
    }

    const { data, error } = await supabase
      .from("inspection")
      .insert([inspectionValues]);

    if (error) {
      throw new Error(error.message);
    }

    console.log(data);
    return data;
  } catch (error) {
    console.error("Error al guardar inspeccion:", error.message);
    throw error;
  }
};

module.exports = createInpection;
