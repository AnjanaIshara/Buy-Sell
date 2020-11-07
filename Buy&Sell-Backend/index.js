const express = require('express');
const bodyParser = require('body-parser');
var CryptoJS = require("crypto-js");
const upload = require('express-fileupload');
const fs = require("fs");
const sharp = require('sharp');
const pathToFile = "uploads/";
const pathToSearch="search/";
const bcrypt = require('bcrypt');
const saltRounds = 10;
const cors = require('cors');

const vision = require('@google-cloud/vision');

require('dotenv').config();
const PORT = process.env.PORT || 8080;

/////////////////////////////////Firebase Initialization/////////////////////////
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "gs://engineeringproject-30727.appspot.com"
});
const db = admin.firestore();
const msgNot=admin.firestore();
const bucket = admin.storage().bucket();
////////////////////////////////////////////////////////////////////////////////
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(upload());
const { v4: uuidv4,v1:uuidv1 } = require('uuid');
uuidv4();
uuidv1();
const ACCOUNTSID = process.env.ACCOUNTSID;
const TWILIOAUTHTOKEN = process.env.TWILIOAUTHTOKEN;
const client = require("twilio")(ACCOUNTSID, TWILIOAUTHTOKEN);
var UserData;

app.get('/', function (req, res) {
    res.send(`Hello from Server ${PORT}`);
});
app.post('/confirm', function (req, res) {
    UserData = req;

    client
        .verify
        .services(process.env.SERVICESID)
        .verifications
        .create({
            to: req.body.MobileNumber,
            channel: "sms"
        }).then((data) => {
            res.status(200).send(data);
        })

});

async function RegisterUser(Data){
    const res = await db.collection('UserData').doc(Data.Email).set(Data);

}
function decrypt (cipher,key) {
    // decrypt() : decrypt the given cipher text

      var decipher = CryptoJS.AES.decrypt(cipher, key);
      decipher = decipher.toString(CryptoJS.enc.Utf8);
      return decipher;
    }
function encrypt(clear,key){
        // encrypt() : encrypt the given clear text

          var cipher = CryptoJS.AES.encrypt(clear, key);
          cipher = cipher.toString();
          return cipher;
        }
app.get('/Verify', (req, res) => {
    client
        .verify
        .services(process.env.SERVICESID)
        .verificationChecks
        .create({
            to: `+${req.query.MobileNumber}`,
            code: req.query.Code
        })
        .then(data => {
            if (data.status === "approved") {
                res.status(200).send({

                    message: "User is Verified!!",
                    data,

                })
                if (req.query.Type == 'Signup') {
                    console.log(`Encrypted Password is ${req.query.EncPword.trim()}`);
                    let SecretCode = req.query.Code;
                    var bytes = decrypt(req.query.EncPword.trim(), SecretCode);
                    //var originalText = bytes.toString(CryptoJS.enc.Utf8).trim();
                    var ciphertext = encrypt(bytes, UserData.body.Email);
                    
                    console.log(originalText);
                    console.log(UserData.body);
                    UserData.body.Password=ciphertext;
                    // db.collection('UserData').doc(UserData.body.Email)
                    //     .set(UserData.body).then(() =>
                    //         console.log(`new user has been added to the database=`)
                    //     );
                    RegisterUser(UserData.body);
                    console.log(`user data is =>${UserData.body}`)
                   

                }

            }
        })



});

app.post('/login', function (req, res) {
    req.body.Password = (CryptoJS.AES.decrypt(req.body.Password, req.body.Email).toString(CryptoJS.enc.Utf8).trim());
    console.log(req.body);

    db.collection('UserData').doc(req.body.Email).get()
        .then(user => {

                                                                                            //Comment this to do the functionalities                                                                               


                                                                                   //Uncomment this when deploying this is commented to reduce the cos                                                                                     
            console.log(user.data());
             if (user.data().Password == req.body.Password) {
                client
                    .verify
                    .services(process.env.SERVICESID)
                    .verifications
                    .create({
                        to: user.data().MobileNumber,
                        channel: "sms"
                    }).then((data) => {
                        res.status(200).send({
                            message: "User Login Password Matched",
                            data
                        });
                    }

                    );
            }
            else {
                res.status(200).send({
                    message: "User Login Password Not Matched"
                })
                                                                                  //Uncomment this when deploying this is commented to reduce the cost
            }                                                                                                    

        }).catch(error => {
            console.log(error);
        });
});
app.get('/LoginVerify', (req, res) => {
    console.log(req.query.Code);
    console.log(`typie is : ${req.query.Type}`);
    console.log(`Email  is : ${req.query.Email}`);


    db.collection('UserData').doc(req.query.Email).get()
        .then(user => {
                      
            
            client                                                                       //Uncomment this when deploying this is commented to reduce the cost
                .verify
                .services(process.env.SERVICESID)
                .verificationChecks
                .create({
                    to: user.data().MobileNumber,
                    code: req.query.Code
                })
                .then(data => {
                    if (data.status === "approved") {
                        res.status(200).send({
                            message: "User is Verified when logging in!",
                            data
                        });
                    }
                    else{
                        res.send(200).send({
                            message: "User is not verified when logging in!",
                            data
                        });
                    }
                });                                                                      //Uncomment this when deploying this is commented to reduce the cost


        });



});
/////////////////////////// For the Image slider//////////////////////////////
function findurl(nameoftheimage) {
    var file = bucket.file(`ImageSlider/${nameoftheimage}`);
    return file.getSignedUrl({
        action: 'read',
        expires: '03-09-2491'
    }).then(signedUrls => {
        return signedUrls[0];
    });
}
app.get('/ImageSlider', (req, res) => {
    db.collection('ImageSlider').doc('Images').get().then(img => {
        let StrValues = (img.data().values);


        let promises = []
        for (let stringval of StrValues) {
            promises.push(findurl(stringval));
        }
        Promise.all(promises).then((result) => {

            console.log('Succesfully sent the urls for the slides');
            res.status(200).send({
                result
            })

        }).catch((err) => console.log(err))



    });

});
/////////////////////////// End of the Image slider//////////////////////////////

////////////////////////////Getting the name of the user////////////////////////
app.get('/GetName', (req, res) => {
    console.log(req.query.Email);
    db.collection('UserData').doc(req.query.Email).get().
        then(user => {
            let userName = (user.data().Name);
            console.log(userName);
            res.status(200).send({
                userName
            })

        }).catch((err) => console.log(err))
});
///////////////////////////End of the Getting the name of the user ////////////////


//////////////////////////Uploading images of the advertisement//////////////////////////
function StoreServer(FileObj) { 
    for (let i = 0; i < FileObj.length; i++) {
        console.log(FileObj[i].name);
        FileObj[i].mv(pathToFile + FileObj[i].name, function (e) {
            if (e) { console.log(e) }
            else { console.log("done") }
        })
    }
}
function StoreCloud(FileObj, ID) {
    for (let i = 0; i < FileObj.length; i++) {
        
        bucket.upload(`uploads/${FileObj[i].name}`, {
            destination: `Addvertisements/${ID}/${FileObj[i].name}`,
            metadata: {
                metadata :{
                  firebaseStorageDownloadTokens: uuidv4(),
               }
            },
        });
    }
}
function IncrementID() {

    db.collection('AdvertisementID').doc('ID').get()
        .then(RetData => {
            db.collection('AdvertisementID').doc('ID').update({ 'count': RetData.data().count + 1 });//updating the id
        });

}
function EmptyUploads() {
    fs.readdirSync('uploads').forEach(file => {
        console.log(file);
        fs.unlink('uploads/' + file, (err) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log("ALl cleared");
            }
        })
    });

}


app.post("/AddImages", function (req, res) {
    //EmptyUploads();
    
    if (req.files) {
        let obj = req.files.fileArr;//obj[i]==file     obj[i].name==filename   
        db.collection('AdvertisementID').doc('ID').get()
            .then(RetData => {
                
                StoreServer(obj);
                StoreCloud(obj, RetData.data().count);
                
            });
        console.log(`email os : ${req.body.Email}`);
    }
})
//////////////////////////End of Uploading images of the advertisement///////////////////

/////////////////////////Posting the Advertisement //////////////////////////////////////
function findAddvertisementImages(ImageName,ID){
    console.log(`Addvertisements/${ID.toString()}/${ImageName}`);
    var file=bucket.file(`Addvertisements/${ID.toString()}/${ImageName}`);
    return file.getSignedUrl({
        action: 'read',
        expires: '03-09-2491'
    }).then(signedUrls => {
        console.log(signedUrls[0]);
        return signedUrls[0];
    });
}
app.post("/PostAdd", (req, res) => {
    
    console.log(req.body.ImageFilenames);
    db.collection('AdvertisementID').doc('ID').get()
        .then(RetData => {
            let promises=[];
            for(let Nme of req.body.ImageFilenames){
                promises.push(findAddvertisementImages(Nme,RetData.data().count))
            }
            Promise.all(promises).then((result)=>{
               // console.log(result);
                req.body["ImgURL"]=result;
                req.body["AddID"]=RetData.data().count.toString();
                db.collection("Advertisements").doc(RetData.data().count.toString()).set(req.body).then(() => {
                    console.log("New advertisement details has been posted");
                    console.log(req.body);
                    
                })
                res.status(200).send({
                    message: "Posted data in the firebase now you can see the advertisement",
                    ID:RetData.data().count,
                    UserEmail:req.body.Email,
                    IMUrl:result
                })

            }).catch((err)=>console.log(err))
            
            


        });

    
   
    IncrementID();


});



/////////////////////////End of Posting the Advertisement //////////////////////////////////////


///////////////////////////Sending the advertisement Images////////////////////////////////////////
app.get("/AddvImages",(req,res)=>{
    console.log("Got the get");
    let addvertisementid=0;
    db.collection('AdvertisementID').doc('ID').get()
            .then(RetData => {
                
                
                addvertisementid=(RetData.data().count);
                

                
            });
    console.log(addvertisementid);
})


///////////////////End of Sending the advertisement Images////////////////////////////////////////

//////////////////Showing the advertisement data//////////////////////////////////////////////////
async function allAddvertisement(res){
    const target= db.collection('Advertisements');
   const snapshot=await target.get();
   if (snapshot.empty) {
    console.log('No matching documents.');
    return;
  }  
  else{
    let cont=[];
    snapshot.forEach(doc => {
        console.log(`document id is : ${doc.id}`);
        cont.push(doc.data());
      });
      res.status(200).send(cont)
      return cont;
      
  }
}
async function  LoadCategory(res,cate){
    const target= db.collection('Advertisements');
    const snapshot=await target.where('ItemCategory','==',cate).get();
    let cont=[];
    if (snapshot.empty) {
        console.log('No matching documents.');
        res.status(200).send(cont)

        return cont;
    }  
  else{
    
    snapshot.forEach(doc => {
        cont.push(doc.data());
      });
      res.status(200).send(cont)
      return cont;
      
  }
}

////////////////////////////////for specific item///////////////
async function  LoadSpecific(res,ItemTitle){
    const target= db.collection('Advertisements');
    const snapshot=await target.where('ItemTitle','==',ItemTitle).get();
    let cont=[];
    if (snapshot.empty) {
        console.log('No matching documents.');
        res.status(200).send(cont)

        return cont;
    }  
  else{
    
    snapshot.forEach(doc => {
        cont.push(doc.data());
      });
      res.status(200).send(cont)
      return cont;
      
  }
}

///////////////////////////////////////////////////////////////

app.get("/loadgrid",(req,res)=>{
    console.log(req.query.category);
    console.log(req.query.searchstr);
    console.log("Got the get about to load the grid");


if(req.query.category==='All' && req.query.searchstr==='any' ){
    console.log('all the addvertisments')
    
   allAddvertisement(res);
    

}
if(req.query.category!='All'&& req.query.searchstr===''){
    LoadCategory(res,req.query.category);
}
if(req.query.searchstr!=''){
    console.log('Search has some value')
    LoadSpecific(res,req.query.searchstr);
}


    
    
})

//////////////////End of Showing the advertisement data//////////////////////////////////////////////////


/////////////////Image Classification////////////////////////////////////////////////////////////////////
async function findaddrelatedtoimage(str,cont){
    
    console.log(str);
    const target= db.collection('Advertisements');
    const snapshot=await target.where('ItemTitle','==',str).get();
    
    if (snapshot.empty) {
        console.log('No matching documents.');
        return "not Found";
    }  
  else{
    snapshot.forEach(doc => {
        cont.push(doc.data());
      });
      return "result found";  
  }

}
async function FindAddsByImage(res,arr){
    let dup=arr;
    let cont=[];
    
    let promises=[];
    for(var x of arr){
        promises.push(findaddrelatedtoimage(x,cont));
    }
    Promise.all(promises).then((result)=>{
        console.log(result);
        console.log(cont);
        if(cont.length!=0){
            res.status(200).send({
                    content:cont,
                    message:"Results found"
                })
        }
        else{
            res.status(200).send({
                content:dup,
                message:"Not found"
            })
        }
    }).catch((err)=>console.log(err))
   
    
}

app.post('/imageclass',(req,res)=>{
    if (!fs.existsSync(pathToSearch)){
        fs.mkdirSync(pathToSearch);
    }
    if(req.files){
        //console.log(req.files.image);
        req.files.image.mv(req.files.image.name,function(e){
            if(e) {console.log(e)}
            else{console.log("Ready to search ")
        
            const client = new vision.ImageAnnotatorClient();
            client
            .labelDetection(`${req.files.image.name}`)
            .then(results => {
                let x;
                let result=[];
                for (x of results[0].labelAnnotations) {
                result.push(JSON.stringify(x.description,null,2));
              }
            //const result = results[0].labelAnnotations[0].description;
            
            console.log(`Label Annotations Result: ${result}`);
            FindAddsByImage(res,result);
            // res.status(200).send({
            //     content:result,
            //     message:"Results found"
            // })

            })
            
            .catch(err => {
            console.error('ERROR:', err);
            });



        
        }
        })
    }
    
    

    // directory path


// delete directory recursively
fs.rmdir(pathToSearch, { recursive: true }, (err) => {
    if (err) {
        throw err;
    }

    console.log(`${pathToSearch} is deleted!`);
});

})


///////////////////////End of Image Classification///////////////////////////////////////////////////////


////////////////////////////////////Messaging section///////////////////////////////////////////////////


// const doc = msgNot.collection('Chats').doc('0');

// const observer = doc.onSnapshot(docSnapshot => {
//   console.log(`Received doc snapshot: ${docSnapshot.data().To}`);
//     console.log(uuidv1());

// }, err => {
//   console.log(`Encountered error: ${err}`);
// });
async function UpdateArray(user,number){
    const res = await db.collection('UserData').doc(user).update({
        ChatArray: admin.firestore.FieldValue.arrayUnion(number)
      });
}
async function UpdateChatIndex(value){
    const res = await db.collection('Chatnumber').doc('chatID').update({
        number:value
      });
}
function getCommonItems(array1, array2) {
    
    if(array1==null ||array2==null ){
        return -1;
    }
    else{

        for (var i = 0; i < array1.length; i++) {
            for (var j = 0; j < array2.length; j++) {
              if (array1[i] == array2[j]) { 
                return array1[i]; 
              }
            }
          }
          return -1;
    }
    
   
   
  }
async function FindWhetherContains(userId1,userId2){
    
    const user1 = await db.collection('UserData').doc(userId1).get();
    const user2 = await db.collection('UserData').doc(userId2).get();
    
    if(user2.data().ChatArray==undefined || user1.data().ChatArray==undefined){
        db.collection('Chatnumber').doc('chatID').get().then(index=>{
            UpdateArray(userId1,index.data().number);
            UpdateArray(userId2,index.data().number);
            UpdateChatIndex(index.data().number+1);
            return index.data().number;
        }).catch(err=>{
            console.log(err);
        });
    }
    else{
        if(getCommonItems(user1.data().ChatArray,user2.data().ChatArray)==-1){
            db.collection('Chatnumber').doc('chatID').get().then(index=>{
            UpdateArray(userId1,index.data().number);
            UpdateArray(userId2,index.data().number);
            UpdateChatIndex(index.data().number+1);
            return index.data().number;
        }).catch(err=>{
            console.log(err);
        });
        }
        else{
            
            return getCommonItems(user1.data().ChatArray,user2.data().ChatArray);
        }

    }

    

    
    
}
function addchat(userId1,userId2){
    

    db.collection('Chatnumber').doc('chatID').get().then(index=>{
        
        db.collection('UserData').doc(userId1).get().then(user1=>{
            if(user1.get('ChatArray')!=null){
                
                return FindWhetherContains(userId1,userId2);
            }
            else{
               UpdateArray(userId1,index.data().number);
               UpdateArray(userId2,index.data().number);
               UpdateChatIndex(index.data().number+1);
               return index.data().number;
               
            }

        }).catch(erruser1=>{
            console.log(erruser1);
        })
    }
    ).catch(err=>{
        console.log(err);
    })


}

function createChatRoom(To,From){
    
    console.log(`${To} and ${From}`);
    addchat(To,From)
}
async function getChatRoom(To,From){
    await new Promise(resolve => setTimeout(resolve, 2500));//waits until all the data is stored
    const user1 = await db.collection('UserData').doc(To).get();
    const user2 = await db.collection('UserData').doc(From).get();
    return getCommonItems(user1.data().ChatArray,user2.data().ChatArray);

}
async function StoreMessage(messageInst,data){
    console.log(data);
    console.log(messageInst);
    const res=await db.collection("Chats").doc(data.toString(10)).collection("Messages").doc(uuidv1()).set(messageInst);
}
app.post("/message",(req,res)=>{
    var messageInst={
        To:req.body.To,
        From: req.body.From,
        Content: req.body.Message,
        Timestamp:req.body.Timestamp
    }
    console.log(messageInst);
    createChatRoom(req.body.To,req.body.From);
    
    getChatRoom(req.body.To,req.body.From).then(data=>{
        console.log(`value is ${data}`);
        StoreMessage(messageInst,data);

    }).catch(error=>{
        console.log(error);
    })
    res.status(200).send({
        message:"Message received"
    })

})


////////////////////////////////////End of Messaging section////////////////////////////////////////////

///////////////////////////////////Get Chat List //////////////////////////////////////////////////////
async function GetChatContent(number){
    return await db.collection("Chats").doc(number.toString(10)).collection("Messages").get(); 
}
async function GetChatArray(Email){
    const ret=await db.collection("UserData").doc(Email).get();
    // let promises=[];
    // ret.data().ChatArray.forEach(element=>{
    //     promises.push(GetChatContent(element));
    // })
    // Promise.all(promises).then((result)=>{
    //     //console.log(result);
    //     result.forEach(snaps=>{
    //         snaps.forEach(doc => {
    //             console.log(doc.id, '=>', doc.data());
    //           }) 
    //     })
    // }).catch(error=>{
    //     console.log(error);
    // })
    var names=[]
    const final=await db.collection("UserData").where('ChatArray','array-contains-any',ret.data().ChatArray).get();
    final.forEach(element=>{
        if(element.data().Name!=ret.data().Name){
            names.push(element.data().Name);
        }
        
    })
    return names;
}

app.get("/getChatList",(req,res)=>{
    
    GetChatArray(req.query.Email).then(data=>{
        console.log(data);
        res.status(200).send({
            message:"Got the Email",
            Contacts: data,
        })
    }).catch(error=>{
        console.log(error);
    });

    
})
//////////////////////////////////ENd of Get CHat List////////////////////////////////////////////////
//////////////////////////////////Get the Chat Content////////////////////////////////////////////////

async function GetChat(name1,name2){
    const result1=await db.collection("UserData").where('Name','==',name1).get();
    const result2=await db.collection("UserData").where('Name','==',name2).get();
    var arr=[];
    result1.forEach(element=>{
        arr.push(element.data().ChatArray);

    })
    result2.forEach(element=>{
        arr.push(element.data().ChatArray);
    })
    const finalresult= await db.collection("Chats").doc(getCommonItems(arr[0],arr[1]).toString(10)).collection("Messages").orderBy("Timestamp.seconds", "asc").get();
    return finalresult;
    
}


app.get("/getChatContent",(req,res)=>{
    GetChat(req.query.To,req.query.From).then(data=>{
        var content=[];
        data.forEach(element=>{
            content.push(element.data());
        })
        res.status(200).send(content);
        console.log("Sent the results");


    }).catch(error=>{
        console.log(error);
    })
})
//////////////////////////////End of the Get the Chat content/////////////////////////////////////////
/////////////////////////////Sending a message throug chat///////////////////////////////////////////
async function getEmailOfTheReceiver(instance){
    const result1=await db.collection("UserData").where('Name','==',instance.To).get();
    const result2=await db.collection("UserData").where('Email','==',instance.From).get();
    var arr=[];
    
    result1.forEach(element=>{
        instance.To=element.data().Email;
        arr.push(element.data().ChatArray);
    })
    result2.forEach(element=>{
        arr.push(element.data().ChatArray);
    })
    console.log(instance);
    console.log(`Common element is  =>  ${getCommonItems(arr[0],arr[1])}`)
    const res=await db.collection("Chats").doc(getCommonItems(arr[0],arr[1]).toString(10)).collection("Messages").doc(uuidv1()).set(instance);
    
    return "All done in storing";
}

app.post("/chatting",(req,res)=>{
    
    getEmailOfTheReceiver(req.body).then(result=>{
        console.log(`recipient email is ${result}`)
        console.log(result);
        

    }).catch(error=>{
        console.log(error);
    })
    
    res.status(200).send({message:"Message received"})
})

//////////////////////End of sending message through a chat/////////////////////////////////////////
app.listen(PORT, function () {
    console.log("Server Running on Localhost : " + PORT);
});
