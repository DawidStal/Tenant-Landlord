//routes for contract
import express from 'express';
import { contract } from "./models.js";

const router=express.Router();
/*tenant routes
http://localhost:5555/contract create
{
    "propertyAddress":"lane 1",
    "tenants":["Jack Smith"],
    "landlord":"Jack Smith",
    "fee":"1200",
    "propertyDoorNumber":1,
    "contractLength": "Year",
    "propertyType":"Apartment"
}
http://localhost:5555/contract/ retrieve
http://localhost:5555/contract/id update
http://localhost:5555/contract/id delete
*/
//route for getting all contract information
router.get('/',async(request,response)=>{
    try{
        const information=await contract.find({});

        return response.status(200).json(information);
    }
    catch(error)
    {
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});
//route for getting one contract information
router.get('/:id',async(request,response)=>{
    try{
        const {id}=request.params
        const information=await contract.findById(id);

        return response.status(200).json(information);
    }
    catch(error)
    {
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});

//route for creating contract information
router.post('/', async(request,response)=>{
    try{
        if(
            !request.body.propertyAddress ||
            !request.body.tenants ||
            !request.body.fee ||
            !request.body.landlord ||
            !request.body.propertyDoorNumber ||
            !request.body.contractLength ||
            !request.body.propertyType
        ){
            console.log('Send all request fields');
            return response.status(400).send({
                message: 'Send all request fields'
            });
        }
        else if(request.body.tenants.length<1 || request.body.tenants.length>3){
            return response.status(400).send({
                message: 'The number of tenants must be between 1 and 3'
            });
        }
        const newContract={
            contractDate: request.body.contractDate,
            propertyAddress: request.body.propertyAddress,
            tenants: request.body.tenants,
            landlord: request.body.landlord,
            fee: request.body.fee,
            propertyDoorNumber: request.body.propertyDoorNumber,
            contractLength: request.body.contractLength,
            propertyType: request.body.propertyType,
            otherPropertyType: request.body.otherPropertyType,
        };

        const information=await contract.create(newContract);
        return response.status(201).send(information);

    }catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});

//route for updating contract information
router.put('/:id', async(request,response)=>{
    try{
        if(
            !request.body.propertyAddress ||
            !request.body.tenants ||
            !request.body.fee ||
            !request.body.landlord ||
            !request.body.propertyDoorNumber ||
            !request.body.contractLength ||
            !request.body.propertyType
        ){
            return response.status(400).send({
                message: 'Send all request fields'
            });
        }

        const {id}=request.params;

        const result= await contract.findByIdAndUpdate(id,request.body);

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

//route for deleting contract information
router.delete('/:id',async(request,response)=>{
    try{
        const{id}=request.params;
        const result=await contract.findByIdAndDelete(id);

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