//variable to store id for updating
var currentID;
//event listeners for displaying other title input field
document.getElementById("propertyType").addEventListener('click',function(){
    if(document.getElementById("propertyType").value==="Other (specify)"){
        document.getElementById("otherPropertyType").style.display="block";
    }
    else{
        document.getElementById("otherPropertyType").style.display="none";
    }
})
document.getElementById("tenantTitle").addEventListener('click',function(){
    if(document.getElementById("tenantTitle").value==="Other (specify)"){
        document.getElementById("otherTenantTitle").style.display="block";
    }
    else{
        document.getElementById("otherTenantTitle").style.display="none";
    }
})
document.getElementById("landlordTitle").addEventListener('click',function(){
    if(document.getElementById("landlordTitle").value==="Other (specify)"){
        document.getElementById("otherLandlordTitle").style.display="block";
    }
    else{
        document.getElementById("otherLandlordTitle").style.display="none";
    }
})
//display tenant entries
async function filltenantTable(){
    fetch('http://localhost:5555/tenant')
        .then(response=>response.json())
        .then(data=>{
            console.log(data);
            var table = document.getElementById("tenantTable");
            var tbody = table.getElementsByTagName("tbody")[0];
            
            data.forEach(function(item) {
                var row = document.createElement("tr");
                row.innerHTML = "<td>" + item.title + "</td>"
                if(item.otherTitle){
                    row.innerHTML +="<td>" + item.otherTitle + "</td>"
                }
                else{
                    row.innerHTML +="<td></td>"
                } 
                row.innerHTML+="<td>" + item.firstName + "</td><td>" + item.surname + "</td><td>" + item.mobile + "</td><td>" + item.email + "</td><td>" + item.homeAddress.address1 +"</td>";
                if(item.homeAddress && item.homeAddress.address2){
                    row.innerHTML +="<td>" + item.homeAddress.address2 + "</td>"
                }
                else{
                    row.innerHTML +="<td></td>"
                } 
                row.innerHTML+="<td>" + item.homeAddress.town + "</td><td>" + item.homeAddress.countyCity + "</td>";
                if(item.homeAddress && item.homeAddress.eircode){
                    row.innerHTML+="<td>" + item.homeAddress.eircode + "</td>";
                }
                else{
                    row.innerHTML +="<td></td>";
                }
                //insert a delete button that deletes the enty on click
                var cell = row.insertCell();
                cell.innerText = "Delete";
                cell.style="cursor: pointer; color:blue; text-decoration:underline";
                cell.onclick = async function() {
                    await fetch(`http://localhost:5555/tenant/${item._id}`,{
                        method:'DELETE',
                    }).catch(err => {
                        console.error('Error deleting personal information: ', err);
                    });
                    window.location.reload();
                }
                tbody.appendChild(row);
                //insert a edit button that enables updating and changes the currentID value
                var cell = row.insertCell();
                cell.innerText = "Edit";
                cell.style="cursor: pointer; color:blue; text-decoration:underline";
                cell.onclick = async function() {
                    currentID=item._id;
                    document.getElementById('createTen').disabled=true;
                    document.getElementById('createLand').disabled=true;
                    document.getElementById('createCon').disabled=true;
                    document.getElementById('updateTen').disabled=false;
                    document.getElementById('updateLand').disabled=true;
                    document.getElementById('updateCon').disabled=true;
                }
                tbody.appendChild(row);
            });
        });
}
//create tenant
async function createTenant(){
    var homeAddress={
        address1:document.getElementById('tenantAddress1').value,
        address2:document.getElementById('tenantAddress2').value,
        town:document.getElementById('tenantTown').value,
        countyCity:document.getElementById('tenantCountyCity').value,
        eircode:document.getElementById('tenantEircode').value
    }
    var titleSelect = document.getElementById('tenantTitle');
    var selectedOption = titleSelect.options[titleSelect.selectedIndex];
    var titleValue = selectedOption.value;
    await fetch('http://localhost:5555/tenant',{
        method: 'POST',
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify({
            'title':titleValue,
            'otherTitle':document.getElementById('otherTenantTitle').value,
            'firstName':document.getElementById('tenantFirstName').value,
            'surname':document.getElementById('tenantSurname').value,
            'mobile':document.getElementById('tenantMobile').value,
            'email':document.getElementById('tenantEmail').value,
            'homeAddress':homeAddress
        })
    })
    if(document.getElementById('tenantForm').checkValidity())
    {
        window.location.reload();
    }
}
//update tenant
async function updateTenant(){
    var homeAddress={
        address1:document.getElementById('tenantAddress1').value,
        address2:document.getElementById('tenantAddress2').value,
        town:document.getElementById('tenantTown').value,
        countyCity:document.getElementById('tenantCountyCity').value,
        eircode:document.getElementById('tenantEircode').value
    }
    await fetch(`http://localhost:5555/tenant/${currentID}`,{
        method: 'PUT',
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify({
            'title':document.getElementById('tenantTitle').value,
            'otherTitle':document.getElementById('otherTenantTitle').value,
            'firstName':document.getElementById('tenantFirstName').value,
            'surname':document.getElementById('tenantSurname').value,
            'mobile':document.getElementById('tenantMobile').value,
            'email':document.getElementById('tenantEmail').value,
            'homeAddress':homeAddress
        })
    })
    if(document.getElementById('tenantForm').checkValidity())
    {
            window.location.reload();
    }
}
//display landlord entries
async function filllandlordTable(){
    fetch('http://localhost:5555/landlord')
        .then(response=>response.json())
        .then(data=>{
            console.log(data);
            var table = document.getElementById("landlordTable");
            var tbody = table.getElementsByTagName("tbody")[0];
            
            data.forEach(function(item) {
                var row = document.createElement("tr");
                row.innerHTML = "<td>" + item.title + "</td>"
                if(item.otherTitle){
                    row.innerHTML +="<td>" + item.otherTitle + "</td>"
                }
                else{
                    row.innerHTML +="<td></td>"
                } 
                row.innerHTML+="<td>" + item.firstName + "</td><td>" + item.surname + "</td><td>" + item.mobile + "</td><td>" + item.email + "</td><td>" + item.homeAddress.address1 +"</td>";
                if(item.homeAddress && item.homeAddress.address2){
                    row.innerHTML +="<td>" + item.homeAddress.address2 + "</td>"
                }
                else{
                    row.innerHTML +="<td></td>"
                } 
                row.innerHTML+="<td>" + item.homeAddress.town + "</td><td>" + item.homeAddress.countyCity + "</td>";
                if(item.homeAddress && item.homeAddress.eircode){
                    row.innerHTML+="<td>" + item.homeAddress.eircode + "</td>";
                }
                else{
                    row.innerHTML +="<td></td>";
                }
                row.innerHTML += "<td>" + item.dateOfBirth + "</td><td>" + item.permissionToRent + "</td><td>" + item.permissionToContact + "</td>";
                var cell = row.insertCell();
                cell.innerText = "Delete";
                cell.style="cursor: pointer; color:blue; text-decoration:underline";
                cell.onclick = async function() {
                    await fetch(`http://localhost:5555/landlord/${item._id}`,{
                        method:'DELETE',
                    }).catch(err => {
                        console.error('Error deleting personal information: ', err);
                    });
                    window.location.reload();
                }
                tbody.appendChild(row);
                var cell = row.insertCell();
                cell.innerText = "Edit";
                cell.style="cursor: pointer; color:blue; text-decoration:underline";
                cell.onclick = async function() {
                    currentID=item._id;
                    document.getElementById('createTen').disabled=true;
                    document.getElementById('createLand').disabled=true;
                    document.getElementById('createCon').disabled=true;
                    document.getElementById('updateTen').disabled=true;
                    document.getElementById('updateLand').disabled=false;
                    document.getElementById('updateCon').disabled=true;
                }
                tbody.appendChild(row);
            });
        });
}
//create landlord entry
async function createLandlord(){
    var homeAddress={
        address1:document.getElementById('landlordAddress1').value,
        address2:document.getElementById('landlordAddress2').value,
        town:document.getElementById('landlordTown').value,
        countyCity:document.getElementById('landlordCountyCity').value,
        eircode:document.getElementById('landlordEircode').value
    }
    //check the checkboxes
    var permissionToRent;
    if(document.getElementById('permissionToRent').checked)
    {
        permissionToRent=true;
    }
    else{
        permissionToRent=false;
    }
    var permissionToContact;
    if(document.getElementById('permissionToContact').checked)
    {
        permissionToContact=true;
    }
    else{
        permissionToContact=false;
    }
    await fetch('http://localhost:5555/landlord',{
        method: 'POST',
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify({
            'title':document.getElementById('landlordTitle').value,
            'otherTitle':document.getElementById('otherLandlordTitle').value,
            'firstName':document.getElementById('landlordFirstName').value,
            'surname':document.getElementById('landlordSurname').value,
            'mobile':document.getElementById('landlordMobile').value,
            'email':document.getElementById('landlordEmail').value,
            'homeAddress':homeAddress,
            'dateOfBirth':document.getElementById('dateOfBirth').value,
            'permissionToRent':permissionToRent,
            'permissionToContact':permissionToContact
        })
    })
    if(document.getElementById('landlordForm').checkValidity())
        {
            window.location.reload();
        }
}
//update landlord entry
async function updateLandlord(){
    var homeAddress={
        address1:document.getElementById('landlordAddress1').value,
        address2:document.getElementById('landlordAddress2').value,
        town:document.getElementById('landlordTown').value,
        countyCity:document.getElementById('landlordCountyCity').value,
        eircode:document.getElementById('landlordEircode').value
    }
    //check the checkboxes
    var permissionToRent;
    if(document.getElementById('permissionToRent').checked)
    {
        permissionToRent=true;
    }
    else{
        permissionToRent=false;
    }
    var permissionToContact;
    if(document.getElementById('permissionToContact').checked)
    {
        permissionToContact=true;
    }
    else{
        permissionToContact=false;
    }
    await fetch(`http://localhost:5555/landlord/${currentID}`,{
        method: 'PUT',
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify({
            'title':document.getElementById('tenantTitle').value,
            'otherTitle':document.getElementById('otherLandlordTitle').value,
            'firstName':document.getElementById('tenantFirstName').value,
            'surname':document.getElementById('tenantSurname').value,
            'mobile':document.getElementById('tenantMobile').value,
            'email':document.getElementById('tenantEmail').value,
            'homeAddress':homeAddress,
            'dateOfBirth':document.getElementById('dateOfBirth').value,
            'permissionToRent':permissionToRent,
            'permissionToContact':permissionToContact
        })
    })
    if(document.getElementById('landlordForm').checkValidity())
        {
            window.location.reload();
        }
}
//display contract entries
async function fillcontractTable(){
    fetch('http://localhost:5555/contract')
        .then(response=>response.json())
        .then(data=>{
            console.log(data);
            var table = document.getElementById("contractTable");
            var tbody = table.getElementsByTagName("tbody")[0];
            
            data.forEach(function(item) {
                var row = document.createElement("tr");
                row.innerHTML="<td>" + item.contractDate + "</td><td>" + item.propertyAddress + "</td><td>" + JSON.stringify(item.tenants) + "</td><td>" + item.landlord + "</td><td>" + item.fee +"</td><td>" + item.propertyDoorNumber + "</td><td>" +item.contractLength+ "</td><td>"+item.propertyType+"</td>" ;
                if(item.otherPropertyType){
                    row.innerHTML+="<td>" + item.otherPropertyType + "</td>";
                }
                else{
                    row.innerHTML +="<td></td>";
                }
                var cell = row.insertCell();
                cell.innerText = "Delete";
                cell.style="cursor: pointer; color:blue; text-decoration:underline";
                cell.onclick = async function() {
                    await fetch(`http://localhost:5555/contract/${item._id}`,{
                        method:'DELETE',
                    }).catch(err => {
                        console.error('Error deleting personal information: ', err);
                    });
                    window.location.reload();
                };
                tbody.appendChild(row);
                var cell = row.insertCell();
                cell.innerText = "Edit";
                cell.style="cursor: pointer; color:blue; text-decoration:underline";
                cell.onclick = async function() {
                    currentID=item._id;
                    document.getElementById('createTen').disabled=true;
                    document.getElementById('createLand').disabled=true;
                    document.getElementById('createCon').disabled=true;
                    document.getElementById('updateTen').disabled=true;
                    document.getElementById('updateLand').disabled=true;
                    document.getElementById('updateCon').disabled=false;
                }
                tbody.appendChild(row);
            });
        });
}
//create contract entry
async function createContract(){
    var tenants=[document.getElementById("tenant1").value];
    if(document.getElementById("tenant2").value!="")
    {
        tenants.push(document.getElementById("tenant2").value)
    }
    if(document.getElementById("tenant3").value!="")
        {
            tenants.push(document.getElementById("tenant3").value)
        }
    if(!document.getElementById('contractDate').value)
        {
        await fetch('http://localhost:5555/contract',{
            method: 'POST',
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify({
                'propertyAddress':document.getElementById('propertyAddress').value,
                'tenants':tenants,
                'landlord':document.getElementById('landlord').value,
                'fee':document.getElementById('fee').value,
                'propertyDoorNumber':document.getElementById('propertyDoorNumber').value,
                'contractLength':document.getElementById('contractLength').value,
                'propertyType':document.getElementById('propertyType').value,
                'otherPropertyType':document.getElementById('otherPropertyType').value,
            })
        })
    }
    else{
        await fetch('http://localhost:5555/contract',{
            method: 'POST',
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify({
                'contractDate':document.getElementById('contractDate').value,
                'propertyAddress':document.getElementById('propertyAddress').value,
                'tenants':tenants,
                'landlord':document.getElementById('landlord').value,
                'fee':document.getElementById('fee').value,
                'propertyDoorNumber':document.getElementById('propertyDoorNumber').value,
                'contractLength':document.getElementById('contractLength').value,
                'propertyType':document.getElementById('propertyType').value,
                'otherPropertyType':document.getElementById('otherPropertyType').value,
            })
        })
    }
    if(document.getElementById('contractForm').checkValidity())
        {
            window.location.reload();
        }
}
//update contract entry
async function updateContract(){
    var tenants=[document.getElementById("tenant1").value];
    if(document.getElementById("tenant2").value!="")
    {
        tenants.push(document.getElementById("tenant2").value)
    }
    if(document.getElementById("tenant3").value!="")
        {
            tenants.push(document.getElementById("tenant3").value)
        }
    await fetch(`http://localhost:5555/contract/${currentID}`,{
        method: 'PUT',
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify({
            'contractDate':document.getElementById('contractDate').value,
            'propertyAddress':document.getElementById('propertyAddress').value,
            'tenants':tenants,
            'landlord':document.getElementById('landlord').value,
            'fee':document.getElementById('fee').value,
            'propertyDoorNumber':document.getElementById('propertyDoorNumber').value,
            'contractLength':document.getElementById('contractLength').value,
            'propertyType':document.getElementById('propertyType').value,
            'otherPropertyType':document.getElementById('otherPropertyType').value,
        })
    })
    if(document.getElementById('contractForm').checkValidity())
        {
            window.location.reload();
        }
}
filltenantTable();
filllandlordTable();
fillcontractTable();