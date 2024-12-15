const path = require('path');

const { StatusCodes } = require('http-status-codes');

const uploadProductImage = async (req, res) => {
  // console.log(req.files);

  const productImage = req.files.image; // thanks to fileupload pkg

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

module.exports = {
  uploadProductImage,
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
