//Google Chrome Version 124.0.6367.201 (Official Build) (64-bit)
//Windows 11

import express from "express";
import cors from "cors";

const app=express();
const PORT=5555;
const mongoDBURL="mongodb+srv://root:123@cluster0.8jfux1u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
import mongoose from "mongoose";
import tenantRoute from "./tenantRoute.js";
import landlordRoute from "./landlordRoute.js";
import contractRoute from "./contractRoute.js";


app.use(express.json());
app.use(cors());


app.get('/',(request,response)=>{
    console.log(request);
    return response.status(234).send("Welcome");
});

//routes for different collections
app.use('/tenant',tenantRoute); //http://localhost:5555/tenant
app.use('/landlord',landlordRoute); //http://localhost:5555/landlord
app.use('/contract',contractRoute); //http://localhost:5555/contract

//connecting to database
mongoose
    .connect(mongoDBURL)
    .then(()=>{
        console.log("Connected to database");
        app.listen(PORT, ()=>{
            console.log(`App is listening to port: ${PORT}`);
        })
    })
    .catch((error)=>{
        console.log(error);
    });