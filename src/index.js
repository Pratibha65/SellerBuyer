const express=require('express')
// const user=require('./model/user')
const path=require('path')
const bcrypt=require('bcrypt')
const collection1=require('./config.js')
const collection2=require('./seller.js')
const Model1=require('./config.js');
const Model2=require('./seller.js');

const app=express();

app.use(express.json())

app.use(express.urlencoded({ extended:false}))

app.set("view engine","ejs");
app.use(express.static("public"));

app.get("/",(req,res)=>{
    res.render("login");
});

app.get("/signup",(req,res)=>{
    res.render("signup");
});

app.get("/seller",(req,res)=>{
    res.render("seller")
});

app.get('/buyer', async (req, res) => {
    try {
      const properties = await collection2.find();
      res.render('buyer', { properties });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

  app.get('/buyer/filter', async (req, res) => {

    const data3 = {
        place:req.body.place,
        area:req.body.area,
        bedrooms:req.body.bedrooms,
        bathroom:req.body.bathroom,
        hospital:req.body.hospital,
        colleges:req.body.colleges
    } 
    console.log("filter")

    const FilteredObj = await collection2.findOne({place:data.place});
    if(FilteredObj){
        console.log("yes")
    }
    else{
        console.log("no")
    }    
    
  });



app.post("/seller", async (req,res)=>{
    const data2 = {
        place:req.body.place,
        area:req.body.area,
        bedrooms:req.body.bedrooms,
        bathroom:req.body.bathroom,
        hospital:req.body.hospital,
        colleges:req.body.colleges
    } 

    const userdata2 = await new Model2(data2).save();
    console.log(userdata2);
});

app.post("/signup",async (req,res)=>{
    const data = {
        name:req.body.username,
        password:req.body.password,
        email:req.body.email,
        phoneno:req.body.phoneno,
        status:req.body.status
    } 

    const existingUser = await collection1.findOne({name:data.name});
    if(existingUser){
        res.send("User already exists. Please choose a different username.");
    }
    else{
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);

        data.password = hashedPassword;
        const userdata = await new Model1(data).save();
        console.log(userdata);
    }
});
    
        
        //Login

        app.post("/login",async (req,res)=>{
            try{
                const check= await collection1.findOne({name:req.body.username});
                if(!check){
                    res.send("user name not found");
                }

                //const isPasswordMatch = await bcrypt.compare(req.body.password,check.password);
                if(req.body.password,check.password){
                    res.render("home");
                }
                else{
                    console.error("Error logging in :",error);
                    req.send("wrong password")
                }
            }
            catch(err){
                res.send("wrong details")
            }
        });
    


const port=5000;
console.log(`Server starting on port: ${port}`);
app.listen(port,()=>{
    console.log(`Server running on port: ${port}`);
})
