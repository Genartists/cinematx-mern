import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String},
    year: {type: Number},
    genres: {type: [String]},
    rating: {type: Number}
})

export default mongoose.model('Movie', movieSchema)