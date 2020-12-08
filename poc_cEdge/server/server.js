const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const fileUpload = require('express-fileupload');


//app.use(cors()); // to remove cross browser issue etc
//app.use(express.json()); //when data comes from front end - to parse

var corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));
app.use(fileUpload());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//const router = express.Router();
//const axios = require('axios');
const mysql = require("mysql");
const dotenv = require('dotenv');
const path = require('path');
//const { json } = require('express');
dotenv.config({ path: './.env'});
//for hndling file from formdata uploaded - binary file
const { SSL_OP_SINGLE_DH_USE } = require('constants');


const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    port: 8889
});

db.connect((error) =>{
    if(error){
        console.log(error)
    }else{
        console.log("MYSQL Connected...")
    }
})

//upload files in  public folder 
//console.log(__dirname);
const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

//app.use('/binary', express.static(__dirname + '/public/binary'));

//parse URLencoded bodies (as sent by HTML forms)
app.use(express.urlencoded({
    extended: false
}));

// simple route for testing server --. "node server.js" on cmd
app.get("/", (req, res) => {
    res.json({ message: "Welcome to cEdge server." });
});

app.post("/newService", (req, res) => {
    const port = req.body.port;
    const serviceCrt = req.body.serviceCrt;
    const serviceKey = req.body.serviceKey;
    //const appbin = req.body.appbin;
    const serviceName= req.body.serviceName;
    const saveGet= req.body.saveGet;
    const saveSet = req.body.saveSet;

    db.query('INSERT INTO available_services (port, serviceCrt,serviceKey ,serviceName,getAPI,setAPI) VALUES (?,?,?,?,?,?)',[port, serviceCrt,serviceKey ,serviceName,saveGet,saveSet],async(error, results) => {
        if(error) {
            console.log(error);
            res.send(error);
        } else {
            res.send("success");
        }
    });
});

app.post("/login",(req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        if(!email || !password){
            return res.status(400).render('login', {
                message: 'Please provide an email and password'
            })
        }
    
        db.query('SELECT * FROM users WHERE email = ?', [email], async (error, results)=> {
            if(!results || !(await bcrypt.compare(password, results[0].password))){
          //if(!results){
                console.log("Email or Password is incorrect\n");
                res.status(401).render('login', {
                    message: "Email or Password is incorrect\n"
                })
            }else{
                const id = results[0].id;
                //if key and value are same name in javescript then :<value> can be ignored. 
                //in below case it would be ```const token = jwt.sign({id})```
                const token = jwt.sign({ id: id}, process.env.JWT_SECRET,{
                    expiresIn: process.env.JWT_EXPIRES_IN
                });
    
                console.log("The token is : " +token);
    
                const cookieOptions = {
                    expires: new Date(
                        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                    ),
                    httpOnly: true
                }
    
                res.cookie('jwt', token, cookieOptions);
                //res.status(200).redirect("http://localhost:3000/Dashboard");
                res.status(200);
                //res.send({
                 //   redirect: "/Dashboard"
                //});
                res.send("logged in ..");
            }
        })
    
    } catch (error) {
        console.log(error);
    }
});

app.post("/register", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const passwordConfirm = req.body.passwordConfirm;
    console.log(req.body);

    db.query('SELECT email FROM users where email = ?', [email],async(error, results) => {
        //console.log(req.body);
        console.log("passowrd "+password+" and confirmPasswd "+passwordConfirm)
        if(error) {
            console.log(error);
        }

        if(results.length > 0) {
            res.send("That email is already registered");
            
        } else if( password !== passwordConfirm){
            res.send("Passwords do not match");
            
        }else{
    
        //we need to add keyword async in dbquery to use await 
        let hashedPassword = await bcrypt.hash(password, 8)
        //console.log(hashedPassword);

    db.query('INSERT INTO users (name, email, password) VALUES (?,?,?)',[name, email, hashedPassword],async(error, results) => {
        if(error) {
            console.log(error);
        } else {
            res.status(200);
            res.send("user registered");
        }
    });
}
});
});

app.get("/servicesRunning", (req, res) => {
    db.query('SELECT service FROM service_cloud_running',async(error, results) => {
        console.log(results+"\n"+"______");
        if(error) {
            console.log(error);
        } else {
            //console.log(results.data+"\n"+"______");
            res.send(results);
        }
    });
});

app.get("/servicesCloudRunning", (req, res) => {
    db.query('SELECT service,cloud FROM service_cloud_running',async(error, results) => {
        console.log(results+"\n"+"______");
        if(error) {
            console.log(error);
        } else {
            //console.log(results.data+"\n"+"______");
            res.send(results);
        }
    });
});

app.get("/cloudRunning", (req, res) => {
    db.query('SELECT DISTINCT cloud FROM service_cloud_running',async(error, results) => {
        console.log(results+"\n"+"______");
        if(error) {
            console.log(error);
        } else {
            res.send(results);
        }
    });
});

app.get("/servicesAvailable", (req, res) => {
    db.query('SELECT serviceName FROM available_services',async(error, results) => {
        console.log(results+"\n"+"______");
        console.log(results[0].serviceName+"\n"+"___vas___");
        if(error) {
            console.log(error);
        } else {
            //console.log(results.data+"\n"+"______");
            res.send(results);
        }
    });
});

app.get("/cloudAvailable", (req, res) => {
    db.query('SELECT cloudName FROM available_clouds',async(error, results) => {
        console.log(results+"\n"+"______");
        if(error) {
            console.log(error);
        } else {
            //console.log(results.data+"\n"+"______");
            res.send(results);
        }
    });
});

//insert service and cloud from dashboard
app.post("/serviceCloud", (req, res) => {
    console.log(req.body);
    
    const service = req.body.service;
    const cloud = req.body.cloud;
    
   // service.forEach((serviceItem) => {
   //     db.query('INSERT INTO service_cloud_running (service, cloud) VALUES (?,?)',[serviceItem, cloud ],async(error, results) => {
    db.query('INSERT INTO service_cloud_running (service, cloud) VALUES (?,?)',[service, cloud ],async(error, results) => {
            if(error) {
                console.log(error);
                res.send(error);
            } else {
                res.send("success");
            }
        });
    //});
});

// file upload api
app.post('/uploadfile', (req, res) => {
    //console.log("inside 1");
    if (!req.files) {
        console.log("file not found");
        return res.status(500).send({ msg: "file is not found" })
    }
        // accessing the file
    const myFile = req.files.file;

    //  mv() method places the file inside public directory
    myFile.mv(`${__dirname}/public/uploads/${myFile.name}`, function (err) {
        console.log("uploaded the file");

        if (err) {
            console.log(err)
            return res.status(500).send({ msg: "Error occured" });
        }
        // returing the response with file path and name
        return res.send({name: myFile.name, path: `/${myFile.name}`});

    });
})


app.listen(3033, ()=>{
    console.log("server started on port 3033");
})
