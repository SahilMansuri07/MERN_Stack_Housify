import monngoose from 'mongoose';


const sellerSchema = new monngoose.Schema({

    user_id : {
        type: monngoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    agency_name: {
    type: String,
    default: null
  },
  license_number: {
    type: String,
    default: null
  },
  contact_number: {
    type: String,
    required: true
  },
  verified: {
    type: Boolean,
    default: false  
  }


},{timestamps: true});

const Seller = monngoose.model('Seller', sellerSchema);
export default Seller;