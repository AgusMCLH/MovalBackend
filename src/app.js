import CampersCRUD from './routes/campersCRUD.js';
import config from './utils/config.js';
import session from 'express-session';
import mongoStore from 'connect-mongo';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import handlebars from 'express-handlebars';
import LoginRoutes from './routes/login.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
// app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
console.log(config.mongodbUri);

mongoose.connect(config.mongodbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(
  session({
    store: mongoStore.create({
      mongoUrl: config.mongodbUri,
      ttl: 60000,
    }),
    secret: config.SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(express.static('public'));
app.engine('handlebars', handlebars.engine());
app.set('views', 'src/views/');
app.set('view engine', 'handlebars');

app.use('/api/campers', new CampersCRUD().getRouter());
app.use('/login', new LoginRoutes().getRouter());
// app.get('/', (req, res) => {
//   res.redirect('/login');
// });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
