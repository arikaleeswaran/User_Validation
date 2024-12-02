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

app.get('/',(req,res)=>{
    console.log("Hello");
    
    return res.json()
})

app.put('/signup',(req,res)=>{

    const {name, email,password} = req.body;

    const query = "INSERT INTO login (name,email,password) VALUES(?,?,?)";
    const values = [name,email,password]

    console.log(values);
    
    db.query(query,values,(err,result)=>{
        if(err){
            console.error("Database insertion error:", err);
            return res.status(500).json({ error: "Database insertion failed" });
        }
        return res.status(201).json({ message: "User registered successfully", insertId: result.insertId });
    })

})

app.post('/login',(req,res)=>{

    const {email,password} = req.body;

    const query = "SELECT * FROM login WHERE `email` = ? AND `password` = ?";
    const values = [email,password]

    console.log(values);
    
    db.query(query,values,(err,result)=>{
        if(err){
            console.error("Database insertion error:", err);
            return res.status(500).json({ error: "Database insertion failed" });
        }
        // return res.status(201).json({ message: "User registered successfully", insertId: result.insertId });

        if(result.length > 0){
            return res.json("Success");
        }else{
            return res.json("Failed")
        }
    })

})

app.listen(8081,()=>{
    console.log("listening....");
})