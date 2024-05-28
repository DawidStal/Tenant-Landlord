//routes for landlord
import express from 'express';
import { landlord } from "./models.js";

const router=express.Router();
/*tenant routes
http://localhost:5555/landlord create
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
    },
    "dateOfBirth":"1990-01-01",
    "permissionToRent":true,
    "permissionToContact":true
}
http://localhost:5555/landlord/ retrieve
http://localhost:5555/landlord/id update
http://localhost:5555/landlord/id delete
*/
//route for getting all landlord information
router.get('/',async(request,response)=>{
    try{
        const information=await landlord.find({});

        return response.status(200).json(information);
    }
    catch(error)
    {
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});
//route for getting one landlord information
router.get('/:id',async(request,response)=>{
    try{
        const {id}=request.params
        const information=await landlord.findById(id);

        return response.status(200).json(information);
    }
    catch(error)
    {
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});

//route for creating landlord information
router.post('/', async(request,response)=>{
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
            !request.body.homeAddress.countyCity ||
            !request.body.dateOfBirth ||
            !"permissionToRent" in request.body ||
            !"permissionToContact" in request.body
        ){
            console.log("Send all request fields");
            return response.status(400).send({
                message: 'Send all request fields'
            });
        }
        const newLandlord={
            title: request.body.title,
            otherTitle: request.body.otherTitle,
            firstName: request.body.firstName,
            surname: request.body.surname,
            mobile: request.body.mobile,
            email: request.body.email,
            homeAddress: request.body.homeAddress,
            dateOfBirth: request.body.dateOfBirth,
            permissionToRent: request.body.permissionToRent,
            permissionToContact: request.body.permissionToContact,
        };

        const information=await landlord.create(newLandlord);
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
            !request.body.homeAddress.countyCity ||
            !request.body.dateOfBirth ||
            !"permissionToRent" in request.body ||
            !"permissionToContact" in request.body
        ){
            return response.status(400).send({
                message: 'Send all request fields'
            });
        }

        const {id}=request.params;

        const result= await landlord.findByIdAndUpdate(id,request.body);

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
        const result=await landlord.findByIdAndDelete(id);

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