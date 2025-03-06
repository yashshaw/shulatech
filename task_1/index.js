import express from "express"
import ejs from "ejs"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import sendMail from './views/sendMail.js'

mongoose.connect("mongodb://localhost:27017/userdb").then(()=>{
    console.log(`Congrats MongoDB is connected.`);
}).catch((err)=>{
    console.log(err);
    
})

const userschema = new mongoose.Schema({
    name:String,
    email:String,
    message:String

})

const usermodel = new mongoose.model("UserMessasges", userschema)


const app = express()
const port = 3000


app.use(bodyParser.urlencoded({extended:true}))

app.set("view engine", "ejs");
//routes
app.get("/", (req, res) =>{
    res.render("index.ejs")
});

app.post("/submit", (req, res) => {
    const details = req.body
    const { name, email } = req.body;
    const newDetails = new usermodel(details);
    newDetails.save();

    sendMail(name, email);
    res.send("Your response has been submitted.")
})

app.listen(port, ()=> {
    console.log(`Your server is working in ${port}`)
});


