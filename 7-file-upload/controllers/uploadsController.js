const path = require('path');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const cloudinary = require('cloudinary').v2;

/* This function stores images locally on the server in public/uploads folder */
const uploadProductImageLocal = async (req, res) => {
  // console.log(req.files);
  // check if file exists
  if (!req.files) {
    throw new CustomError.BadRequestError('No File Uploaded');
  }

  const productImage = req.files.image; // thanks to fileupload pkg

  // check format
  if (!productImage.mimetype.startsWith('image')) {
    throw new CustomError.BadRequestError('Please Upload Image');
  }

  // check size (size can be set in .env)
  const maxSize = 1024 * 1024;
  if (productImage.size > maxSize) {
    throw new CustomError.BadRequestError(
      'Please upload image smaller than 1MB'
    );
  }

  // creating a publicly available static img assets path
  // creating a path for images
  const imagePath = path.join(
    __dirname,
    '../public/uploads/' + `${productImage.name}`
  );

  // 'mv' method moves the file elsewhere on the server
  // in our case, any files uploaded will be moved to public/uploads
  await productImage.mv(imagePath);

  return res
    .status(StatusCodes.OK)
    .json({ image: { src: `/uploads/${productImage.name}` } }); // for ex., uploads/computer-1.jpeg
};

/* This function uploads images to cloudinary */
const uploadProductImageCloud = async (req, res) => {
  // upload an image
  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: '[nodejs course]file-upload',
    }
  );

  // console.log('result - ', result);
  return res.status(StatusCodes.OK).json({ image: { src: result.secure_url } });
};

module.exports = {
  // uploadProductImageLocal,
  uploadProductImageCloud,
};

/*
sample reponse from req.files after using fileupload pkg

 image: {
    name: 'computer-1.jpeg',
    data: <Buffer ff d8 ff e0 00 10 4a 46 49 46 00 01 01 01 00 48 00 48 00 00 ff e2 02 1c 49 43 43 5f 50 52 4f 46 49 4c 45 00 01 01 00 00 02 0c 6c 63 6d 73 02 10 00 00 ... 62296 more bytes>,
    size: 62346,
    encoding: '7bit',
    tempFilePath: '',
    truncated: false,
    mimetype: 'image/jpeg',
    md5: '2a300e280a3a84e9ede0468f0530ccd1',
    mv: [Function: mv]
  }
*/

/* sample response from cloudinary after uploading image - 

result -  {
  width: 1000,
  height: 1407,
  format: 'jpg',
  resource_type: 'image',
  created_at: '2024-12-16T02:59:41Z',
  placeholder: false,
  url: 'http://res.cloudinary.com/dzodbyzxe/image/upload/v1734317981/%5Bnodejs%20course%5Dfile-upload/tmp-1-1734317986549_drwtgd.jpg',
  secure_url: 'https://res.cloudinary.com/dzodbyzxe/image/upload/v1734317981/%5Bnodejs%20course%5Dfile-upload/tmp-1-1734317986549_drwtgd.jpg',  
  ...
}

*/
