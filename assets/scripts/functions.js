/********** Creating Claim View **********/
function makeClaimView(data, element) {
  let fault = '';
  `${data.atFault}` === 'true' ? fault = 'At-Fault' : fault = 'No-Fault';

    //creating new claim
  return element.innerHTML = `
      <td id="claim-num">${data.id}</td>
      <td id="member-name">${data.memberName}</td>
      <td id="policy-num">${data.policyNumber}</td>
      <td id="vehicle">${data.vehicle}</td>
      <td id="fault">${fault}</td>
      <td id="claimant-name">${data.opName}</td>
      <td id="claimant-vehicle">${data.opVehicle}</td>
      <td id="claimant-insurance">${data.opInsurance}</td>
      <td id="manage">
        <button type="button" class="btn-sm btn btn-danger">Delete</button>
        <button type="button" class="ml-2 btn btn-sm btn-warning" data-toggle="modal" data-target="#update-claim-modal">Edit</button>
      </td>
    `;
}


/********** Filter by Name Function **********/
function filterNames(input, table) {
  let nameFilter = input.value.toLowerCase();

  //Looping through the table rows
  for (let i = 0; i < table.length; i++) {

    //Targeting the member name table body tag
    let allMemName = table[i].cells[1];

    //Check if the table body tag exist
    if (allMemName) {

      //Setting variable for names with no tags
      let fullNames = allMemName.innerText.toLowerCase();

      //Takes the key pressed and filters the letters that exist 
      if (fullNames.indexOf(nameFilter) > -1) {
        table[i].style.display = "";
      } else {
        table[i].style.display = "none";
      }
    }
  }
}

/********** Delete a Claim Function **********/
function deleteClaim(claim) {
  axios.delete(`http://localhost:3000/claims/${claim.id}`, {
    data: {
      id: `${claim.id}`,
      policyNumber: `${claim.policyNumber}`,
      memberName: `${claim.memberName}`,
      atFault: `${claim.atFault}`,
      opInsurance: `${claim.opInsurance}`,
      opName: `${claim.opName}`,
      opVehicle: `${claim.opVehicle}`,
      vehicle: `${claim.vehicle}`
    }
  });
}

/********** Update Claim Variables and Functions **********/

let claimNumberModal = document.getElementById('claim-number-modal');
let memberNameModal = document.getElementById('member-name-modal');
let policyNumModal = document.getElementById('policy-num-modal');
let vehicleModal = document.getElementById('vehicle-modal');
let atFaultModal = document.getElementById('at-fault-modal');
let claimantNameModal = document.getElementById('claimant-name-modal');
let claimantVehicleModal = document.getElementById('claimant-vehicle-modal');
let claimantInsuranceModal = document.getElementById('claimant-insurance-modal');

function fillUpdateForm(claim) {
  let fault = '';
  `${claim.atFault}` === 'true' ? fault = 'At-Fault' : fault = 'No-Fault';

  claimNumberModal.value = `${claim.id}`;
  memberNameModal.value = `${claim.memberName}`;
  policyNumModal.value = `${claim.policyNumber}`;
  vehicleModal.value = `${claim.vehicle}`;
  atFaultModal.value = `${fault}`;
  claimantNameModal.value = `${claim.opName}`;
  claimantVehicleModal.value = `${claim.opVehicle}`;
  claimantInsuranceModal.value = `${claim.opInsurance}`;
}

function updateClaim(claim) {
  let fault = '';
  atFaultModal.value === 'At-Fault' ? fault = 'true' : fault = 'false'; 
  
  axios.patch(`http://localhost:3000/claims/${claim.id}`, {
    policyNumber: policyNumModal.value,
    memberName: memberNameModal.value,
    atFault: fault,
    opInsurance: claimantInsuranceModal.value,
    opName: claimantNameModal.value,
    opVehicle: claimantVehicleModal.value,
    vehicle: vehicleModal.value
  });
}

/********** New Claim Form Validate and Submit Function **********/

function validateAndSubmit(event, newClaimForm) {
  [policyNum, memberName, atFault, vehicle, opName, opVehicle, opInsurance] = [newClaimForm[1].value, newClaimForm[0].value, newClaimForm[3].value, newClaimForm[2].value, newClaimForm[4].value, newClaimForm[5].value, newClaimForm[6].value]
  
  // let policyNum = newClaimForm[1].value;
  // let memberName = newClaimForm[0].value;
  // let atFault = newClaimForm[3].value;
  // let vehicle = newClaimForm[2].value;
  // let opName = newClaimForm[4].value;
  // let opVehicle = newClaimForm[5].value;
  // let opInsurance = newClaimForm[6].value;

  event.preventDefault();
  if (memberName === "") {
    alert("Please fill in member name");

  } else if (policyNum === "") {

    alert("Please fill in policy number");

  } else if (vehicle === "") {

    alert("Please fill in vehicle");
    

  } else if (opName === "") {

    alert("Please fill in claimant name");

  } else if (opVehicle === "") {

    alert("Please fill in claimant vehicle");

  } else if (opInsurance === "") {

    alert("Please fill in claimant insurance");

  } else if (atFault === "Please make a selection" || opInsurance === "Please make a selection") {

    alert("Please make a selection");

  } else {
    let statusPic = document.getElementById('status-pic');
    if (atFault === 'At-Fault') {
      statusPic.setAttribute('src', '/assets/images/sad.png');
      window.setTimeout(() => {
        postNewClaim();
        location.assign('/index.html')
      }, 5000)
    } else {
      statusPic.setAttribute('src', '/assets/images/thumbs-up.png');
      window.setTimeout(() => {
        postNewClaim();
        location.assign('/index.html')
      }, 5000)
    }
    
  }
}

function postNewClaim() {
  let fault = '';
  newClaimForm[3].value === 'At-Fault' ? fault = 'true' : fault = 'false';
  

  axios.post(`http://localhost:3000/claims`, {

    policyNumber: `${newClaimForm[1].value}`,
    memberName: `${newClaimForm[0].value}`,
    atFault: `${fault}`,
    vehicle: `${newClaimForm[2].value}`,
    opName: `${newClaimForm[4].value}`,
    opVehicle: `${newClaimForm[5].value}`,
    opInsurance: `${newClaimForm[6].value}`

  })
    .then(response => console.log(response.data))
    .catch(error => console.log(error));
}