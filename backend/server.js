const express = require('express')
const mysql = require('mysql')
const cors = require('cors')

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"aridb",
    database:"signup"
})

app.post('/signup',(req,res)=>{
    const query = "INSERT INTO login (`name`,`email`,`password`) VALUES(?)";
    const value = [
        req.body.name,
        req.body.email,
        req.body.password
    ]

    console.log(value);
    
    db.query(query,value,(err,data)=>{
        if(err){
            return res.json("Error")
        }
        return res.json(data)
    })

})

app.listen(8081,()=>{
    console.log("listening....");
})