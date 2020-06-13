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
  pro_user_id:String,
  cus_user_id:String,

}, {
  timestamps: true,
  strict: false,
});

const Assign = mongoose.model('Assign', schema);

export default Assign;
