//routes for tenant
import express from 'express';
import { tenant } from "./models.js";

const router=express.Router();
/*tenant routes
http://localhost:5555/tenant create
body:
{
    "title":"Mr",
    "firstName":"Jack",
    "surname":"Smith",
    "mobile":"0987654321",
    "email":"jacksmith@example.com",
    "homeAddress":{
        "address1":"road 1",
        "town":"Maynooth",
        "countyCity":"Kildare"
    }
}
http://localhost:5555/tenant/ retrieve
http://localhost:5555/tenant/id update
http://localhost:5555/tenant/id delete
*/
//route for getting all tenant information
router.get('/',async(request,response)=>{
    try{
        const information=await tenant.find({});

        return response.status(200).json(information);
    }
    catch(error)
    {
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});
//route for getting one tenant information
router.get('/:id',async(request,response)=>{
    try{
        const {id}=request.params
        const information=await tenant.findById(id);

        return response.status(200).json(information);
    }
    catch(error)
    {
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});

//route for creating tenant information
router.post('/', async(request,response)=>{
    try{
        if(
            !request.body.firstName ||
            !request.body.surname ||
            !request.body.mobile ||
            !request.body.email ||
            !request.body.homeAddress ||
            !request.body.homeAddress.address1 ||
            !request.body.homeAddress.town ||
            !request.body.homeAddress.countyCity
        ){
            console.log("Send all request fields");
            return response.status(400).send({
                message: 'Send all request fields'
            });
        }
        const newTenant={
            title: request.body.title,
            otherTitle: request.body.otherTitle,
            firstName: request.body.firstName,
            surname: request.body.surname,
            mobile: request.body.mobile,
            email: request.body.email,
            homeAddress: request.body.homeAddress,
        };

        const information=await tenant.create(newTenant);
        return response.status(201).send(information);

    }catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});

//route for updating personal information
router.put('/:id', async(request,response)=>{
    try{
        if(
            !request.body.title ||
            !request.body.firstName ||
            !request.body.surname ||
            !request.body.mobile ||
            !request.body.email ||
            !request.body.homeAddress ||
            !request.body.homeAddress.address1 ||
            !request.body.homeAddress.town ||
            !request.body.homeAddress.countyCity
        ){
            return response.status(400).send({
                message: 'Send all request fields'
            });
        }

        const {id}=request.params;

        const result= await tenant.findByIdAndUpdate(id,request.body);

        if(!result)
        {
            response.status(401).json({message:"entry not found"});
        }

        return response.status(200).send({message: "entry updated"});

    }catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});

//route for deleting tenant information
router.delete('/:id',async(request,response)=>{
    try{
        const{id}=request.params;
        const result=await tenant.findByIdAndDelete(id);

        if(!result){
            response.status(404).json({message:"entry not found"});
        }
        return response.status(200).send({message: "entry deleted"});

    }catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});

export default router;