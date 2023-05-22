
const fs = require('fs');
const formidable = require('formidable');



const cors=require('cors');
const directoryPath = './uploads';

var express = require('express');
var app =express();
app.use(cors());
app.use(express.static('public'));
app.use('/images', express.static('uploads'));
app.post('/upload', (req, res) => {

  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    var oldpath = files.image.filepath;
    console.log(oldpath);
    var newpath = __dirname+'/uploads/' + files.image.originalFilename;
    fs.copyFile(oldpath, newpath, (err) => {
      if (err) {
        console.error('Error copying file: ' + err);
        return res.status(500).send('Error uploading file');
      }
      fs.unlink(oldpath, (err) => {
        if (err) {
          console.error('Error deleting temporary file: ' + err);
        }});
    
    res.write('File uploaded and moved!');
      res.end();
    
  });
  });
});

app.get('/images', (req, res) => {
    console.log(directoryPath+"here");
    fs.readdir(directoryPath, function (err, files) {
      if (err) {
        console.error('Unable to scan directory: ' + err);
        return res.status(500).send('Unable to read directory');
      }

      const images =files;

      const validExtensions = ['.png', '.jpg', 'JPG' , '.jpeg'];

      const validImages = images.filter((image) => {
        return validExtensions.some((extension) => image.endsWith(extension));
      });


      const imageUrls = validImages.map(file => {
        console.log("came");
        return `http://localhost:8080/images/${file}`;    //app.use('/images', express.static('uploads')); 
        //images in the url is the public folder which we have made using app.use in the start where we have placed images, its the name against folder named uploads 
      });


      return res.status(200).json(imageUrls);
    });





});





var server =app.listen(8080,function()
{

  console.log("server is created ");

});
