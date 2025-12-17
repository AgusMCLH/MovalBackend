import mongoose from 'mongoose';
import { Camper } from '../models/camperModel.js';

class CampersDAO {
  constructor() {
    this.model = Camper;
  }
  async getAllCampers() {
    try {
      const campers = await this.model.find().lean();
      return campers;
    } catch (error) {
      throw new Error('Error fetching campers');
    }
  }
  async getCamperById(id) {
    try {
      const camper = await this.model.findById(id).lean();
      return camper;
    } catch (error) {
      throw new Error('Error fetching camper by ID');
    }
  }
  async createCamper(camperData) {
    console.log('DAO: Creating a new camper with data:', camperData);

    try {
      const newCamper = await this.model.create(camperData);
      console.log('DAO: New camper created:', newCamper);

      return newCamper;
    } catch (error) {
      console.log('DAO: Error creating camper:', error);

      throw new Error('Error creating camper', error);
    }
  }
  async updateCamper(id, camperData) {
    try {
      const updatedCamper = await this.model
        .findByIdAndUpdate(id, camperData, {
          new: true,
        })
        .lean();
      return updatedCamper;
    } catch (error) {
      throw new Error('Error updating camper');
    }
  }
  async deleteCamper(id) {
    try {
      await this.model.findByIdAndDelete(id).lean();
    } catch (error) {
      throw new Error('Error deleting camper');
    }
  }
}
export const campersDAO = new CampersDAO();
