import mongoose from 'mongoose';

const camperSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  direction: { type: String, required: true },
  dni: { type: Number, required: true, unique: true, index: true },
  telephone: { type: Number, required: false, default: 0 },
  parentsCellphone: { type: Number, required: true },
  hospital: { type: String, required: true },
  treatment: { type: String, required: false, default: 'Ninguno' },
  contraindications: { type: String, required: false, default: 'Ninguna' },
  medicalEmergency: { type: String, required: false, default: 'Ninguna' },
  illness: { type: String, required: false, default: 'Ninguna' },
  susceptibleIllness: { type: Array, required: false, default: [] },
  medications: { type: Array, required: false, default: [] },
  isPaid: { type: Boolean, required: false, default: false },
  test: { type: Boolean, required: false, default: false },
});

export const Camper = mongoose.model('Camper', camperSchema);
