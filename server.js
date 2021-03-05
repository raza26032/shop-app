var express = require("express");
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cors = require("cors");
var morgan = require("morgan");
var { foodUserModel, foodOrderModel, foodProductModel } = require('./dbconn/module')
var path = require("path")
var SERVER_SECRET = process.env.SECRET || "1234";
var jwt = require('jsonwebtoken')
var app = express()
var authRoutes = require('./routes/auth')
const fs = require('fs')
const admin = require("firebase-admin");
const multer = require('multer')
const storage = multer.diskStorage({ // https://www.npmjs.com/package/multer#diskstorage
    destination: './uploads/',
    filename: function (req, file, cb) {
        cb(null, `${new Date().getTime()}-${file.filename}.${file.mimetype.split("/")[1]}`)
    }
})

var upload = multer({ storage: storage })

var SERVICE_ACCOUNT = {
    "type": "service_account",
    "project_id": "login-bucket",
    "private_key_id": "ba2f476abdfd34719a8269c95b3c3fe4238a3230",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQClW7qeI2hwgefW\n2gXHbC2c62UBqUdGlXcW7u5MsR7yAMCts59pvin380/sLXUjuMA+6CMbZofISWtW\n5hWmthZ0aIswb/hNDmAzIIbM5K0M2iUqvZvS0egJ32Qeg5CTI8WTL6z9fZPj8ZW9\nJCRJon/4Dj1cqzMJIabvxDjEbJRCralN2oTLxCgGfcqiicGJ+U163dt+WK6505pg\n7+2wCbE+7GJ9egcntBEJEStpbijcojNN+pGotpwCHz08P6yBtOMwrPG6HiXpFvWL\nMxlqDLPtpPQlsPjCZcryEj/xiIMm0PkcoW55c/5N2tkwfrq+BWaCd5OAeNTXaEr9\n4CRUXAsTAgMBAAECggEAHovX6P+cevAcbk2fNKwwruSzJ3/oWUsiETv5DHTJxSXL\ncisU3zlQUmwBjx0EnyExbk1+ssCZg6/AYvCk/kNz2XQ4hi2g/kcSEU/IZxA1QYMI\ny6D0KJk7FpvMSHDAY9X/WQW9HKS2jayinyqOg4W/wwiKYFSF3IF5b6BdZjeymbBj\nwGKMYknfws/BCowMdywlehEi6gNxs/XrLPGsryxgfp3SwwEnkxMYbKG0gN4AQbJk\nW4tyAoVQ7E1vFZyuCql9kzCxezqFf4MK8Ri8SbnxG/mMsTosaoXL7pQBvpA6kYgT\nWgbHwo5c1v1UfYvHB0hpICLpTdaJidnL75WQ1863EQKBgQDbxkXQzwN+Cb4Jxn9i\n3J6Id2dENcvK/yzuY93qoVUJZlHIW+hvJrej01Q7bpLVcABYBnukx33qWEKV3zLV\nf/NwYMQuX/FgTRfwCG9XF1B0QukQmNkW+J7/yGjWK3f6sAjS5PHFIuErSkqTDOmw\nhr4EyVD7TEUJjcCkqO7pasC/owKBgQDAnUfSg7hMw0DvcpiCvzsZzZpT2MGXLw4t\nTsp76HvNTkiMhFeGrkK2/i+F3pMGttmzfAaa9lFksNfQVQ0vfoZk6mYp8S0QKxPU\ncHhNnv4JTZ2a0FUf7mAMOwjDQrq7Uwrom4MXRyffJ5eZ89RhUwCI/WBgV6VT6Ye5\naxTvpa990QKBgFO1Z24rC0d8anfKtUZwhamw4RJn8yF0pCaAv0vY+0zDPi80YonD\nk3rAyXqBmUfWiyr7/Sg8G8egqmvvQat0OsL4+IA5ZvSpKI7yh4YCiVBfE+qQbU+E\njvsZ2GSK1f4UAqhhL31I1b7pYxIzfucPy1yDWWb+G+WRqmiNN8KMOLJFAoGBAJ6O\nmnob/lIKhWDXZ95xhzhFfR46l5pZnQUFEEAR8B/gqm4p31c6CidTdVFxGHz1dp5+\noX1c+UG3JeEUsob/U6itIC60n1Do9Sjy8MWM9Tg5UV0I1Jo1g5Ft41fBja/4u0ki\nAzbdV2Am2nBcPN9lEVKzqWuFms5JtnWXRaPFM4KRAoGBAIsk5E4nSLNcxTKK9a+8\nt9P5I7q9mxzPR7dYi/IcszaT5epH9SkjCIlfgt2naq5hJEGLx3KUaZF8cK54kd7C\nzLkKZkFK2ucE87oNnnmBqFfALOctfaMbfYw/kJp2D8vXRBAOxWJcU1lUUeWRV55B\nXe6Wxetvbxd3t/m3g9BnwMmL\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-iw5lc@login-bucket.iam.gserviceaccount.com",
    "client_id": "113510552557908114403",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-iw5lc%40login-bucket.iam.gserviceaccount.com"
  }
  

admin.initializeApp({
    credential: admin.credential.cert(SERVICE_ACCOUNT),
    databaseURL: 'https://login-bucket-default-rtdb.firebaseio.com/'
});
const bucket = admin.storage().bucket('gs://login-bucket.appspot.com');

app.use(bodyParser.json());
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(morgan('dev'));
// app.use("/", express.static(path.resolve(path.join(__dirname, "./web/build"))));

app.use('/', authRoutes);
app.use(function (req, res, next) {
    console.log(req.cookies.jToken)
    if (!req.cookies.jToken) {
        res.status(401).send("include http-only credentials with every request")
        return;
    }
    jwt.verify(req.cookies.jToken, SERVER_SECRET, function (err, decodedData) {
        if (!err) {

            const issueDate = decodedData.iat * 1000;
            const nowDate = new Date().getTime();
            const diff = nowDate - issueDate;

            if (diff > 300000) {
                res.status(401).send("token expired")
            } else {
                var token = jwt.sign({
                    id: decodedData.id,
                    name: decodedData.name,
                    email: decodedData.email,
                    role: decodedData.role
                }, SERVER_SECRET)
                res.cookie('jToken', token, {
                    maxAge: 86400000,
                    httpOnly: true
                });
                req.body.jToken = decodedData
                req.headers.jToken = decodedData
                next();
            }
        } else {
            res.status(401).send("invalid token")
        }
    });
})

app.get("/profile", (req, res, next) => {

    console.log(req.body)

    foodUserModel.findById(req.body.jToken.id, 'name email phone role createdOn',
        function (err, doc) {
            console.log("doc", doc)
            if (!err) {
                res.send({
                    status: 200,
                    profile: doc
                })

            } else {
                res.status(500).send({
                    message: "server error"
                })
            }
        })
})
app.post("/addProduct", upload.any(), (req, res, next) => {

    console.log("req.body: ", req.body);
    bucket.upload(
        req.files[0].path,
        function (err, file, apiResponse) {
            if (!err) {
                file.getSignedUrl({
                    action: 'read',
                    expires: '03-09-2491'
                }).then((urlData, err) => {
                    if (!err) {
                        console.log("public downloadable url: ", urlData[0])
                        foodUserModel.findById(req.headers.jToken.id, 'email role', (err, user) => {
                            console.log("user =======>", user.email)
                            if (!err) {
                                foodProductModel.create({
                                    "name": req.body.productName,
                                    "price": req.body.price,
                                    "stock": req.body.stock,
                                    "image": urlData[0],
                                    "description": req.body.description
                                }).then((data) => {
                                    console.log(data)
                                    res.send({
                                        status: 200,
                                        message: "Product add successfully",
                                        data: data
                                    })
                                }).catch(() => {
                                    console.log(err);
                                    res.status(500).send({
                                        message: "user create error, " + err
                                    })
                                })
                            }
                            else {
                                res.send("err")
                            }
                        })
                        try {
                            fs.unlinkSync(req.files[0].path)
                        } catch (err) {
                            console.error(err)
                        }
                    }
                })
            } else {
                console.log("err: ", err)
                res.status(500).send();
            }
        });
})

app.post("/order", (req, res, next) => {
    console.log("fsfsf", req.body)
    if (!req.body.orders || !req.body.total) {

        res.status(403).send(`
            please send email and passwod in json body.
            e.g:
            {
                "orders": "order",
                "total": "12342",
            }`)
        return;
    }

    foodUserModel.findOne({ email: req.body.jToken.email }, (err, user) => {
        console.log("afafa", user)
        if (!err) {
            foodOrderModel.create({
                name: req.body.name,
                email: user.email,
                phone: req.body.phone,
                status: "In review",
                address: req.body.address,
                total: req.body.total,
                orders: req.body.orders
            }).then((data) => {
                res.send({
                    status: 200,
                    message: "Order have been submitted",
                    data: data
                })
            }).catch(() => {
                res.status(500).send({
                    message: "order submit error, " + err
                })
            })
        }
        else {
            console.log(err)
        }
    })
})

app.get('/getOrders', (req, res, next) => {
    foodOrderModel.find({}, (err, data) => {
        if (!err) {
            res.send({
                data: data
            })
        }
        else {
            res.send(err)
        }
    })
})
app.get('/getProducts', (req, res, next) => {
    foodProductModel.find({}, (err, data) => {
        if (!err) {
            res.send({
                data: data
            })
        }
        else {
            res.send(err)
        }
    })
})
app.get('/myOrders' ,(req,res,next)=>{
    foodUserModel.findOne({email: req.body.jToken.email},(err,user)=>{
        if (user) {
            foodOrderModel.find({email: req.body.jToken.email},(err,data)=>{
                if (data) {
                    res.send({
                        data:data
                    })
                }
                else{
                    res.send(err)
                }
            })
        }else{
            res.send(err)
        }
    })
})

app.post('/updateStatus',(req,res,next)=>{
    foodOrderModel.findById({_id: req.body.id},(err,data)=>{
        if (data) {
            data.updateOne({status: req.body.status},(err,update)=>{
                if (update) {
                    res.send("Status update")
                }
                else{
                    res.send(err)
                }
            })
        }
        else{
            res.send(err)
        }
    })
})
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("server is running on: ", PORT);
})