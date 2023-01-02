const express = require('express');
const mongoose = require('mongoose');
const ImageModel = require('../models/imageUploadModel');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: '',
    api_key: '',
    api_secret: '',
    secure: true
});

mongoose.set('strictQuery', true);

const image = express.Router();

//get request

image.get("/get", async(request, response) => {
    const image = await ImageModel.find({});
    try {
        response.status(200).send(image);
    } catch (err) {
        response.status(500).send(err.message);
    }
})

//post request :
image.post("/post", async(request, response) => {
    console.log(request.files.file);
    let file = request.files.file;
    let file_type = request.files.file.mimetype;
    let file_name = request.files.file.name;
    let file_size = request.files.file.size;
    console.log(`file to be uploaded ${file}`);
    let image_url = await cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
        if (err) {
            console.log(err.message)
        } else { console.log(result); }

    });
    console.log("printing image url", image_url);
    const image = await ImageModel({
        image: image_url.url,
        name: file_name,
        image_type: file_type,
        image_size: file_size
    });
    try {
        let data = await image.save();
        response.status(201).send(image);
    } catch (error) {
        response.status(500).send(error.message);
    }

})


//connection 
const client = mongoose.connect("mongodb+srv://aditya:trHYEDLrkH7aAudf@cluster0.laixrxp.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log(`mongoDB connection successfull!!`);
}).catch((error) => {
    console.log(`mongoDB connection error ${error.message}`);
})
module.exports = image;