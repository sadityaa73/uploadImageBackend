const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload')
const port = 4000;

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(fileUpload({
    useTempFiles: true,
}));

const image = require('./api/imageUpload');

app.use('/api/imageUpload', image);

app.listen(port, (error) => {
    if (!error) {
        console.log(`express connected successfull at port${port}!`);
    } else {
        console.log(`express connection error at port ${port}`);
    }
})