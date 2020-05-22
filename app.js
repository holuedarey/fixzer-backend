import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import CookieParser from 'cookie-parser';
import http from 'http';
import 'dotenv/config.js';
import routes from './routes.js';
import socketSever from './socket.js';
import adminSocketSever, { sendNotification, onConnect } from './socket/admin.js';
import Logger from './helpers/Logger.js';

const PORT = process.env.NODE_ENV === 'test' ? 3011 : process.env.PORT || 5000;

process.env.TZ = 'Africa/Lagos';
morgan.token('date', () => new Date().toLocaleString());

const app = express();
const httpServer = http.createServer(app);
// const httpsServer = https.createServer(app);

app.use(cors());
app.use(CookieParser());
app.use(morgan(':date *** :method :: :url ** :response-time'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static('public'));
app.use(express.static('files'))
routes(app);


socketSever(httpServer);
adminSocketSever(httpServer)

httpServer.listen(PORT, () => {
  Logger.log(`app running on http://localhost:${PORT}`);
});

export default app;