import mongoose from "mongoose";
const tenantSchema=mongoose.Schema({
    title:{
        type:String,
        enum:["Mx", "Ms", "Mr", "Mrs", "Miss", "Dr", "Other (specify)"],
        required:true,
    },
    otherTitle:{
        type:String,
        required:false,
    },
    firstName:{
        type:String,
        required:true,
    },
    surname:{
        type:String,
        required:true,
    },
    mobile:{
        type:Number,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    homeAddress:{
        address1:{
            type:String,
            required:true,
        },
        address2:{
            type:String,
            required:false,
        },
        town:{
            type:String,
            required:true,
        },
        countyCity:{
            type:String,
            required:true,
        },
        eircode:{
            type:String,
            required:false,
        }
    }
});
const landlordSchema=mongoose.Schema({
    title:{
        type:String,
        enum:["Mx", "Ms", "Mr", "Mrs", "Miss", "Dr", "Other (specify)"],
        required:true,
    },
    otherTitle:{
        type:String,
        required:false,
    },
    firstName:{
        type:String,
        required:true,
    },
    surname:{
        type:String,
        required:true,
    },
    mobile:{
        type:Number,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    homeAddress:{
        address1:{
            type:String,
            required:true,
        },
        address2:{
            type:String,
            required:false,
        },
        town:{
            type:String,
            required:true,
        },
        countyCity:{
            type:String,
            required:true,
        },
        eircode:{
            type:String,
            required:false,
        }
    },
    dateOfBirth:{
        type:Date,
        required:true,
    },
    permissionToRent:{
        type:Boolean,
        required:true,
    },
    permissionToContact:{
        type:Boolean,
        required:true,
    }
});

const contractSchema=mongoose.Schema({
    contractDate: {
        type:Date,
        default: Date.now,
        required:false,
    },
    propertyAddress: {
        type:String,
        required:true,
    },
    tenants: {
        type:[String],
        required:true,
    },
    landlord:{
        type:[String],
        required:true,
    },
    fee: {
        type:Number,
        required:true,
    },
    propertyDoorNumber: {
        type:Number,
        require:true,
    },
    contractLength: {
        type:String,
        enum:["Month","Year","Permanent"],
        require:true,
    },
    propertyType:{
        type:String,
        enum:["Apartment", "Semi-Detached", "Detached", "Other (specify)"],
        required:true,
    },
    otherPropertyType:{
        type:String,
        required:false,
    }
})

export const tenant=mongoose.model('tenant',tenantSchema);
export const landlord=mongoose.model('landlord',landlordSchema);
export const contract=mongoose.model('contract',contractSchema);