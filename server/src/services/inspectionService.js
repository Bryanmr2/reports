const InspectionFactory = require("../factory/inspectionFactory");
const supabase = require("../config/supabase");

const createInspection = async (inspection) => {
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
      inspection_description: newInspection.description,
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

const getInspection = async () => {
  try {
    const { data, error } = await supabase.from("inspection").select("*");

    if (error) {
      throw new Error(error.message);
    }

    console.log(data);
    return data;
  } catch (error) {
    console.error("Error al obtener inspeccion:", error.message);
    throw error;
  }
};

module.exports = {
  createInspection,
  getInspection,
};
