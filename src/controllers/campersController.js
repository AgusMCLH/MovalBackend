import { campersDAO } from '../DAO/campersDAO.js';

class CampersController {
  async getAllCampers() {
    try {
      const campers = (await campersDAO.getAllCampers()) || [];
      campers.forEach((camper) => {
        camper.treatment.length <= 0 ? (camper.treatment = 'Ninguno') : null;
        camper.contraindications.length <= 0
          ? (camper.contraindications = 'Ninguno')
          : null;
        camper.medications.length <= 0
          ? (camper.medications = [{ name: 'Ninguna', dosage: 'Ninguna' }])
          : null;
        camper.illness.length <= 0 ? (camper.illness = 'Ninguna') : null;
        camper.susceptibleIllness.length <= 0
          ? (camper.susceptibleIllness = 'Ninguna')
          : null;
        camper.isPaid = camper.isPaid ? undefined || false : false;
        if (camper.susceptibleIllness) {
          camper.susceptibleIllness[0].length <= 0
            ? (camper.susceptibleIllness[0] = 'Ninguna')
            : null;
        }
      });

      return campers;
    } catch (error) {
      return { error: error.message };
    }
  }
  async getCamperById() {
    try {
      const { id } = req.params;
      const camper = await campersDAO.getCamperById(id);
      if (!camper) {
        return { error: 'Camper not found' };
      }
      return camper;
    } catch (error) {
      return { error: error.message };
    }
  }
  async createCamper(camperData) {
    if (
      !camperData ||
      !camperData.name ||
      !camperData.age ||
      !camperData.direction ||
      !camperData.dni ||
      !camperData.parentsCellphone ||
      !camperData.hospital
    ) {
      return { error: 'Invalid camper data' };
    }

    try {
      // const camperData = {
      //   name: 'Martin Machin',
      //   age: 22,
      //   direction: 'Calle Falsa 123',
      //   dni: 53848536,
      //   telephone: 12345678,
      //   parentsCellphone: 912345678,
      //   hospital: 'COSEM',
      //   medicalEmergency: 'SEMM Y SUAT',
      //   illness: 'Mental',
      //   susceptibleIllness: ['Emputecimientos'],
      //   medications: [{ name: 'Clonazepam', dosage: '200mg' }],
      // };
      const newCamper = await campersDAO.createCamper(camperData);
      return newCamper;
    } catch (error) {
      return { error: error.message };
    }
  }
}

export default new CampersController();
