if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

var fs = require("fs");
const {
  BlobServiceClient,
  StorageSharedKeyCredential,
  newPipeline
} = require('@azure/storage-blob');
const express = require('express');
const router = express.Router();
const path = require('path');

// const containerName1 = 'thumbnails';
const multer = require('multer');
const inMemoryStorage = multer.memoryStorage();
const inFolderStorage = multer.diskStorage({ 
  destination: (req, file, cb) => { cb(null,  path.join(__dirname, '../temp/zip')) 
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname );
  }
});
const uploadStrategy = multer({ storage: inMemoryStorage }).single('image');
const uploadZip = multer({ storage: inFolderStorage }).single('image');
const getStream = require('into-stream');
const containerName1 = 'images';
const ONE_MEGABYTE = 1024 * 1024;
const uploadOptions = { bufferSize: 4 * ONE_MEGABYTE, maxBuffers: 20 };
const ONE_MINUTE = 60 * 1000;
const StreamZip = require('node-stream-zip');
var JSZip = require("jszip");
const { file } = require('jszip');


const sharedKeyCredential = new StorageSharedKeyCredential(
  process.env.AZURE_STORAGE_ACCOUNT_NAME,
  process.env.AZURE_STORAGE_ACCOUNT_ACCESS_KEY);
const pipeline = newPipeline(sharedKeyCredential);

const blobServiceClient = new BlobServiceClient(
  `https://${process.env.AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net`,
  pipeline
);

const getBlobName = originalName => {
  // Use a random number to generate a unique file name, 
  // removing "0." from the start of the string.
  const identifier = Math.random().toString().replace(/0\./, '');
  return `${identifier}-${originalName}`;
};

router.get('/', async (req, res, next) => {

  let viewData;
  let imageData;
  let imageDataJson = [];
  console.log(process.env);

  try {
    const containerClient = blobServiceClient.getContainerClient(containerName1);
    const listBlobsResponse = await containerClient.listBlobFlatSegment();

    for await (const blob of listBlobsResponse.segment.blobItems) {
      console.log(`Blob: ${blob.name}`);
    }

    viewData = {
      title: 'Home',
      viewName: 'index',
      accountName: process.env.AZURE_STORAGE_ACCOUNT_NAME,
      containerName: containerName1
    };

    if (listBlobsResponse.segment.blobItems.length) {
      viewData.thumbnails = listBlobsResponse.segment.blobItems;
      imageData = listBlobsResponse.segment.blobItems;
      imageData.map((x, i) => {
        // console.log(`this is x - ${i}`, x);
        imageDataJson.push({
          name: x.name
        });
      })
    }
  } catch (err) {
    viewData = {
      title: 'Error',
      viewName: 'error',
      message: 'There was an error contacting the blob storage container.',
      error: err
    };
    res.status(500);
  } finally {
    // res.send("hello");
    res.render(viewData.viewName, viewData);
  }
});

router.post('/', uploadStrategy, async (req, res) => {

  console.log("req", req.file);

 
  const blobName = getBlobName(req.file.originalname);
  const stream = getStream(req.file.buffer);

  const containerClient = blobServiceClient.getContainerClient(containerName1);;
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  try {
    await blockBlobClient.uploadStream(stream,
      uploadOptions.bufferSize, uploadOptions.maxBuffers,
      { blobHTTPHeaders: { blobContentType: "image/jpeg" } });
    res.render('success', { message: 'File uploaded to Azure Blob storage.' });
  } catch (err) {
    res.render('error', { message: err.message });
  }
});

router.post('/zip', uploadZip, async (req, res) => {

  console.log("req/zip", req.file);
  let files = [];



  // const blobName = getBlobName(req.file.originalname);
  // const stream = getStream(req.file.buffer);

  // const containerClient = blobServiceClient.getContainerClient(containerName1);;
  // const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  try {

    const data = await readZipStream();
    console.log("data", data);

    // fs.readFile(path.join(__dirname, '../temp/zip/Downloads.zip'), function(err, data) {
    //   if (err) throw err;
    //    JSZip.loadAsync(data).then(function (zip) {

    //     for (const [key, value] of Object.entries(zip.files)) {
    //       console.log(`${key}: ${value}`);
    //       files.push(zip.files[key]);
    //     }

    //     return files;

    //     // files.map(x => {
    //     //   const blobName = getBlobName(x.name);
    //     //   const stream = getStream(x._data.compressedContent);

    //     //   const containerClient = blobServiceClient.getContainerClient(containerName1);;
    //     //   const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    //     //   if(x.name.includes('jpg'||'jpeg'||'png'||'gif')){
    //     //     // console.log("yes");
    //     //     await blockBlobClient.uploadStream(stream,
    //     //     uploadOptions.bufferSize, uploadOptions.maxBuffers,
    //     //     { blobHTTPHeaders: { blobContentType: "image/jpeg" } });
    //     //   }

    //     // });

    //   });
    // });

    res.render('success', { message: 'File uploaded to Azure Blob storage.' });
  } catch (err) {
    res.render('error', { message: err.message });
  }
});

async function readZipStream(){
  let temp = await fs.readFile(path.join(__dirname, '../temp/zip/Downloads.zip'), async function(err, data) {
    if (err) throw err;
      let _temp =  await JSZip.loadAsync(data).then(async function (zip) {
      let files = [];
      for (const [key, value] of Object.entries(zip.files)) {
        console.log(`${key}: ${value}`);
        files.push(zip.files[key]);
      }

        files.map(async function(x) {
          const blobName = getBlobName(x.name);
          const stream = getStream(x._data.compressedContent);

          const containerClient = blobServiceClient.getContainerClient(containerName1);;
          const blockBlobClient = containerClient.getBlockBlobClient(blobName);

          if(x.name.includes('jpg'||'jpeg'||'png'||'gif')){
            // console.log("yes");
            await blockBlobClient.uploadStream(stream,
            uploadOptions.bufferSize, uploadOptions.maxBuffers,
            { blobHTTPHeaders: { blobContentType: "image/jpeg" } });
          }

        });

      console.log("files", files);
      return files;

    });

    console.log("_temp", _temp);
    return _temp;

  });

  console.log("temp", temp);
  return temp;

}

module.exports = router;