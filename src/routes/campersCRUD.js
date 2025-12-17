import CustomRouter from './customRouter.js';
import CampersController from '../controllers/campersController.js';
import authToken from '../middleware/authToken.js';

export default class CampersCRUD extends CustomRouter {
  init() {
    this.get('/', ['PUBLIC'], [authToken], async (req, res) => {
      const campers = await CampersController.getAllCampers(req, res);

      let campersList = campers.map((camper, index) => ({
        index: index + 1,
        ...camper,
      }));

      res.render('campers', { campers: campersList });
    });
    this.get('/:id', [], [], async (req, res) => {
      const camper = await CampersController.getCamperById(req, res);
      res.json(camper);
    });
    this.post('/', [], [], async (req, res) => {
      console.log('Datos recibidos', req.body);
      if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ error: 'No camper data provided' });
      }
      if (req.body.secured || req.body.secured === undefined) {
        res.status(403).json({ error: 'error' });
        return;
      }
      const newCamper = await CampersController.createCamper(req.body);
      res.status(201).send('Campamentista creado con éxito');
    });
    this.put('/:id', [], [], async (req, res) => {
      const updatedCamper = await CampersController.updateCamper(req, res);
      res.json(updatedCamper);
    });
    this.delete('/:id', [], [], async (req, res) => {
      const deletedCamper = await CampersController.deleteCamper(req, res);
      res.json(deletedCamper);
    });
  }
}
