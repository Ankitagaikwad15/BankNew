var http= require('http');
var express=require('express');
var bodayparsar=require('body-parser');
var app=express();
app.use(bodayparsar.json())
BASE_URL = "http://localhost:4200/";
APPLICATION_API = "nodejsApp/";
app.get('/', (req,res) =>
{
    res.send({message:'server is ok.. '})

})
// aws s3 integration 
// following required  package 
var aws = require('aws-sdk');

// this require data
var AWS_ACCESS_KEY = process.env.AWS_ID || 'AKIAI4E74B77PJK7A';
var AWS_SECRET_KEY = process.env.AWS_SECRET || 'UQRffnT1d9QQ3+IQqdxGNPQVyTaoEyD0kiG';
var S3_BUCKET = process.env.S3_bucket || 'rsGroup-dev';
var AWS_REGION = process.env.AWS_REGION || 'ap-south-1';
var config = {
  "accessKeyId": AWS_ACCESS_KEY,
  "secretAccessKey": AWS_SECRET_KEY,
  "region": AWS_REGION
}

// here create aws backet link to upload data  url 

app.use('/aws', function (req, res) {
  console.log(req);
  aws.config.update(config);
  aws.config.update({ signatureVersion: 'v4' });
  let uploadDoc = req.body.uploadDoc;
  // {docType:,fileName:,artefactType:}
  var s3 = new aws.S3();
  let folder = 'test_gallary';

  if (!!uploadDoc.fileName) {
    let fnames = uploadDoc.fileName.split('.');
    uploadDoc.fileName = fnames[0] + '_' + timeStr+fnames[1] ;
  } else {
    uploadDoc.fileName = timeStr +fnames[1] ;
  }
  // Get the file name
  folder = folder + uploadDoc.fileName;
  var s3_params = {
    Bucket: S3_BUCKET,
    Key: folder,
    Expires: 60,
    ContentType: uploadDoc.docType,
    ACL: 'public-read'
    // ACL: 'private'
  };
  s3.getSignedUrl('putObject', s3_params, function (err, data) {
    
    if (err) {
      console.log(err);
    }
    else {
      var return_data = {
        signed_request: data,
        url: /*'https://' + S3_BUCKET + '.s3.amazonaws.com/' +*/ folder
      };
      res.write(JSON.stringify(return_data));
      res.end();
    }
  });
});
// end aws s3 
http.createServer(app).listen(this.BASE_URL + this.APPLICATION_API)
