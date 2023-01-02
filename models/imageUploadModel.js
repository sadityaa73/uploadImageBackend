const mongoose = require('mongoose');

const imageUpload = mongoose.Schema({
    image: {
        type: String
    },
    name: {
        type: String
    },
    image_type: {
        type: String
    },
    image_size: {
        type: Number
    }
});
const ImageUploadModel = new mongoose.model("ImageUploadModel", imageUpload);

module.exports = ImageUploadModel;