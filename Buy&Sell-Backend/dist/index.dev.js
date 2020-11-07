"use strict";

var express = require('express');

var bodyParser = require('body-parser');

var CryptoJS = require("crypto-js");

var upload = require('express-fileupload');

var fs = require("fs");

var sharp = require('sharp');

var pathToFile = "uploads/";
var pathToSearch = "search/";

var cors = require('cors');

mobilenet = require('@tensorflow-models/mobilenet');

require('dotenv').config();

var PORT = process.env.PORT || 8080; /////////////////////////////////Firebase Initialization/////////////////////////

var admin = require('firebase-admin');

var serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://engineeringproject-30727.appspot.com"
});
var db = admin.firestore();
var bucket = admin.storage().bucket(); ////////////////////////////////////////////////////////////////////////////////

var app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(upload());

var _require = require('uuid'),
    uuidv4 = _require.v4;

uuidv4();
var ACCOUNTSID = process.env.ACCOUNTSID;
var TWILIOAUTHTOKEN = process.env.TWILIOAUTHTOKEN;

var client = require("twilio")(ACCOUNTSID, TWILIOAUTHTOKEN);

var UserData;
app.get('/', function (req, res) {
  res.send("Hello from Server ".concat(PORT));
});
app.post('/confirm', function (req, res) {
  UserData = req;
  client.verify.services(process.env.SERVICESID).verifications.create({
    to: req.body.MobileNumber,
    channel: "sms"
  }).then(function (data) {
    res.status(200).send(data);
  });
});
app.get('/Verify', function (req, res) {
  client.verify.services(process.env.SERVICESID).verificationChecks.create({
    to: "+".concat(req.query.MobileNumber),
    code: req.query.Code
  }).then(function (data) {
    if (data.status === "approved") {
      res.status(200).send({
        message: "User is Verified!!",
        data: data
      });

      if (req.query.Type == 'Signup') {
        console.log("Encrypted Password is ".concat(req.query.EncPword.trim()));
        var SecretCode = req.query.Code;
        var bytes = CryptoJS.AES.decrypt(req.query.EncPword.trim(), SecretCode);
        var originalText = bytes.toString(CryptoJS.enc.Utf8).trim();
        var ciphertext = CryptoJS.AES.encrypt(originalText, UserData.body.Email).toString().trim();
        UserData.body.Password = ciphertext;
        console.log(originalText);
        console.log(UserData.body);
        db.collection('UserData').doc(UserData.body.Email).set(UserData.body).then(function () {
          return console.log("new user has been added to the database=");
        });
      }
    }
  });
});
app.post('/login', function (req, res) {
  var dCryPw = CryptoJS.AES.decrypt(req.body.Password, req.body.Email).toString(CryptoJS.enc.Utf8).trim();
  db.collection('UserData').doc(req.body.Email).get().then(function (user) {
    res.status(200).send({
      //Comment this to do the functionalities
      message: "User Login Password Matched"
    }); //Comment this to do the functionalities                                                                               
    // client                                                                       //Uncomment this when deploying this is commented to reduce the cost
    // var d = user.data();                                                                                     
    // DatabasePw = (CryptoJS.AES.decrypt(d.Password, d.Email).toString(CryptoJS.enc.Utf8));
    // console.log(`the request decrypted Password is =>${dCryPw}`);
    // console.log(`the database decrypted Password is =>${DatabasePw}`);
    // if (DatabasePw == dCryPw) {
    //     client
    //         .verify
    //         .services(process.env.SERVICESID)
    //         .verifications
    //         .create({
    //             to: d.MobileNumber,
    //             channel: "sms"
    //         }).then((data) => {
    //             res.status(200).send({
    //                 message: "User Login Password Matched",
    //                 data
    //             });
    //         }
    //         );
    // }
    // else {
    //     res.status(200).send({
    //         message: "User Login Password Not Matched"
    //     })
    // client                                                                       //Uncomment this when deploying this is commented to reduce the cost
    // }                                                                                                    
  })["catch"](function (error) {
    console.log(error);
  });
});
app.get('/LoginVerify', function (req, res) {
  console.log(req.query.Code);
  console.log("typie is : ".concat(req.query.Type));
  console.log("Email  is : ".concat(req.query.Email));
  db.collection('UserData').doc(req.query.Email).get().then(function (user) {
    var verficationMobileNumber = user.data().MobileNumber;
    res.status(200).send({
      //Comment this to do the functionalities
      message: "User is Verified when logging in!"
    }); // client                                                                       //Uncomment this when deploying this is commented to reduce the cost
    //     .verify
    //     .services(process.env.SERVICESID)
    //     .verificationChecks
    //     .create({
    //         to: verficationMobileNumber,
    //         code: req.query.Code
    //     })
    //     .then(data => {
    //         if (data.status === "approved") {
    //             res.status(200).send({
    //                 message: "User is Verified when logging in!",
    //                 data
    //             });
    //         }
    //     });                                                                      //Uncomment this when deploying this is commented to reduce the cost
  });
}); /////////////////////////// For the Image slider//////////////////////////////

function findurl(nameoftheimage) {
  var file = bucket.file("ImageSlider/".concat(nameoftheimage));
  return file.getSignedUrl({
    action: 'read',
    expires: '03-09-2491'
  }).then(function (signedUrls) {
    return signedUrls[0];
  });
}

app.get('/ImageSlider', function (req, res) {
  db.collection('ImageSlider').doc('Images').get().then(function (img) {
    var StrValues = img.data().values;
    var promises = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = StrValues[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var stringval = _step.value;
        promises.push(findurl(stringval));
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    Promise.all(promises).then(function (result) {
      console.log('Succesfully sent the urls for the slides');
      res.status(200).send({
        result: result
      });
    })["catch"](function (err) {
      return console.log(err);
    });
  });
}); /////////////////////////// End of the Image slider//////////////////////////////
////////////////////////////Getting the name of the user////////////////////////

app.get('/GetName', function (req, res) {
  console.log(req.query.Email);
  db.collection('UserData').doc(req.query.Email).get().then(function (user) {
    var userName = user.data().Name;
    console.log(userName);
    res.status(200).send({
      userName: userName
    });
  })["catch"](function (err) {
    return console.log(err);
  });
}); ///////////////////////////End of the Getting the name of the user ////////////////
//////////////////////////Uploading images of the advertisement//////////////////////////

function StoreServer(FileObj) {
  for (var i = 0; i < FileObj.length; i++) {
    console.log(FileObj[i].name);
    FileObj[i].mv(pathToFile + FileObj[i].name, function (e) {
      if (e) {
        console.log(e);
      } else {
        console.log("done");
      }
    });
  }
}

function StoreCloud(FileObj, ID) {
  for (var i = 0; i < FileObj.length; i++) {
    bucket.upload("uploads/".concat(FileObj[i].name), {
      destination: "Addvertisements/".concat(ID, "/").concat(FileObj[i].name),
      metadata: {
        metadata: {
          firebaseStorageDownloadTokens: uuidv4()
        }
      }
    });
  }
}

function IncrementID() {
  db.collection('AdvertisementID').doc('ID').get().then(function (RetData) {
    db.collection('AdvertisementID').doc('ID').update({
      'count': RetData.data().count + 1
    }); //updating the id
  });
}

function EmptyUploads() {
  fs.readdirSync('uploads').forEach(function (file) {
    console.log(file);
    fs.unlink('uploads/' + file, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("ALl cleared");
      }
    });
  });
}

app.post("/AddImages", function (req, res) {
  //EmptyUploads();
  if (req.files) {
    var obj = req.files.fileArr; //obj[i]==file     obj[i].name==filename   

    db.collection('AdvertisementID').doc('ID').get().then(function (RetData) {
      StoreServer(obj);
      StoreCloud(obj, RetData.data().count);
    });
    console.log("email os : ".concat(req.body.Email));
  }
}); //////////////////////////End of Uploading images of the advertisement///////////////////
/////////////////////////Posting the Advertisement //////////////////////////////////////

function findAddvertisementImages(ImageName, ID) {
  console.log("Addvertisements/".concat(ID.toString(), "/").concat(ImageName));
  var file = bucket.file("Addvertisements/".concat(ID.toString(), "/").concat(ImageName));
  return file.getSignedUrl({
    action: 'read',
    expires: '03-09-2491'
  }).then(function (signedUrls) {
    console.log(signedUrls[0]);
    return signedUrls[0];
  });
}

app.post("/PostAdd", function (req, res) {
  console.log(req.body.ImageFilenames);
  db.collection('AdvertisementID').doc('ID').get().then(function (RetData) {
    var promises = [];
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = req.body.ImageFilenames[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var Nme = _step2.value;
        promises.push(findAddvertisementImages(Nme, RetData.data().count));
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
          _iterator2["return"]();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    Promise.all(promises).then(function (result) {
      // console.log(result);
      req.body["ImgURL"] = result;
      db.collection("Advertisements").doc(RetData.data().count.toString()).set(req.body).then(function () {
        console.log("New advertisement details has been posted");
        console.log(req.body);
      });
      res.status(200).send({
        message: "Posted data in the firebase now you can see the advertisement",
        ID: RetData.data().count,
        UserEmail: req.body.Email,
        IMUrl: result
      });
    })["catch"](function (err) {
      return console.log(err);
    });
  });
  IncrementID();
}); /////////////////////////End of Posting the Advertisement //////////////////////////////////////
///////////////////////////Sending the advertisement Images////////////////////////////////////////

app.get("/AddvImages", function (req, res) {
  console.log("Got the get");
  var addvertisementid = 0;
  db.collection('AdvertisementID').doc('ID').get().then(function (RetData) {
    addvertisementid = RetData.data().count;
  });
  console.log(addvertisementid);
}); ///////////////////End of Sending the advertisement Images////////////////////////////////////////
//////////////////Showing the advertisement data//////////////////////////////////////////////////

function allAddvertisement(res) {
  var target, snapshot, cont;
  return regeneratorRuntime.async(function allAddvertisement$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          target = db.collection('Advertisements');
          _context.next = 3;
          return regeneratorRuntime.awrap(target.get());

        case 3:
          snapshot = _context.sent;

          if (!snapshot.empty) {
            _context.next = 9;
            break;
          }

          console.log('No matching documents.');
          return _context.abrupt("return");

        case 9:
          cont = [];
          snapshot.forEach(function (doc) {
            cont.push(doc.data());
          });
          res.status(200).send(cont);
          return _context.abrupt("return", cont);

        case 13:
        case "end":
          return _context.stop();
      }
    }
  });
}

function LoadCategory(res, cate) {
  var target, snapshot, cont;
  return regeneratorRuntime.async(function LoadCategory$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          target = db.collection('Advertisements');
          _context2.next = 3;
          return regeneratorRuntime.awrap(target.where('ItemCategory', '==', cate).get());

        case 3:
          snapshot = _context2.sent;
          cont = [];

          if (!snapshot.empty) {
            _context2.next = 11;
            break;
          }

          console.log('No matching documents.');
          res.status(200).send(cont);
          return _context2.abrupt("return", cont);

        case 11:
          snapshot.forEach(function (doc) {
            cont.push(doc.data());
          });
          res.status(200).send(cont);
          return _context2.abrupt("return", cont);

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  });
}

app.get("/loadgrid", function (req, res) {
  console.log(req.query.category);
  console.log(req.query.searchstr);
  console.log("Got the get about to load the grid");

  if (req.query.category === 'All' && req.query.searchstr === 'any') {
    console.log('all the addvertisments');
    allAddvertisement(res);
  }

  if (req.query.category != 'All' && req.query.searchstr === '') {
    LoadCategory(res, req.query.category);
  }

  if (req.query.searchstr != '') {
    console.log('Search has some value');
  }
}); //////////////////End of Showing the advertisement data//////////////////////////////////////////////////
/////////////////Image Classification////////////////////////////////////////////////////////////////////

app.post('/imageclass', function (req, res) {
  res.status(200).send({
    message: 'Image Search will start'
  });
}); ///////////////////////End of Image Classification///////////////////////////////////////////////////////

app.listen(PORT, function () {
  console.log("Server Running on Localhost : " + PORT);
});