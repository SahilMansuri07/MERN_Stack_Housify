import mongoose from 'mongoose';

const buyersSchema = new mongoose.Schema({

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },  
    preferance: {
        type: String,
        required: true
    },
    budget: {
        type: String,
        required: true
    }, 
    location: {
        type: String,
        required: true
    },  
    contact_number: {
        type: Number,
        required: true
    },
    

},{timestamps: true});

const Buyers = mongoose.model('Buyers', buyersSchema);
export default Buyers;