import { generateCampersPDF } from '../utils/pdfCamperGenerator.js';
import CustomRouter from './customRouter.js';
import CampersController from '../controllers/campersController.js';
import authToken from '../middleware/authToken.js';

class PDFRoute extends CustomRouter {
  init() {
    this.get('/generate', ['PUBLIC'], [authToken], async (req, res) => {
      try {
        let campers = await CampersController.getAllCampers(req, res);
        campers.forEach((camper) => {
          camper.medications = camper.medications.map((med) => {
            return `Nombre: ${med?.name ?? 'Ninguna'}, Dosis: ${
              med?.dosage ?? 'Ninguna'
            }`;
          });
        });
        console.log(campers);

        // Generar PDF
        const pdfBuffer = generateCampersPDF(campers);

        // Enviar respuesta
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader(
          'Content-Disposition',
          'attachment; filename=campamentistas.pdf'
        );
        res.send(Buffer.from(pdfBuffer));
      } catch (error) {
        console.error('Error generando PDF:', error);
        res.status(500).json({ error: 'Error al generar PDF' });
      }
    });
  }
}

export default PDFRoute;
