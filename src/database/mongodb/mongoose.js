/**
 * Creates connection with the local mongodb
 * on "monitor" database
 */
import mongoose from 'mongoose';

// const mongoConnectionUrl = `mongodb://${process.env.MDB_HOST}:${process.env.MDB_PORT}/${process.env.MDB_DB}`;
const mongoConnectionUrl = `mongodb://cluster0-i3it2.mongodb.net:27017/fixzer`;

mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb+srv://fixzer:C0HITYLbCjEkR6DS@cluster0-i3it2.mongodb.net/fixzer?retryWrites=true&w=majority');
// mongoose.connect(mongoConnectionUrl, {
//   user:'fixzer',
//   pass: 'C0HITYLbCjEkR6DS',
//   keepAlive: 1,
//   connectTimeoutMS: 300000,
//   useNewUrlParser: true,
//   reconnectTries: Number.MAX_VALUE,
//   reconnectInterval: 1000,
// });

const db = mongoose.connection;
mongoose.set('debug', true);
// eslint-disable-next-line no-console
db.on('error', console.error.bind(console, 'connection error:'));
// db.once('connected successfully')
// eslint-disable-next-line import/prefer-default-export
export { mongoose };
