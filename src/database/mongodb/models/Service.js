/**
* Terminal Model
* Stores Terminal details
*/
import mongoose from 'mongoose';

const { Schema } = mongoose;

const schema = new Schema({
  address:String,
  service_date:Date,
  service_time:String,
  title:String,
  description:String,
  services:String,
  category:String,
  user_id:String,
  firstname:String,
  lastname:String,
  view: {type : Boolean, default: false }

}, {
  timestamps: true,
  strict: false,
});

const Booking = mongoose.model('Booking', schema);

export default Booking;
