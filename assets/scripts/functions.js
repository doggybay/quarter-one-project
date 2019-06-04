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
  claimNumberModal.value = `${claim.id}`;
  memberNameModal.value = `${claim.memberName}`;
  policyNumModal.value = `${claim.policyNumber}`;
  vehicleModal.value = `${claim.vehicle}`;
  atFaultModal.value = `${claim.atFault}`;
  claimantNameModal.value = `${claim.opName}`;
  claimantVehicleModal.value = `${claim.opVehicle}`;
  claimantInsuranceModal.value = `${claim.opInsurance}`;
}

function updateClaim(claim) {
  axios.patch(`http://localhost:3000/claims/${claim.id}`, {
    policyNumber: policyNumModal.value,
    memberName: memberNameModal.value,
    atFault: atFaultModal.value,
    opInsurance: claimantInsuranceModal.value,
    opName: claimantNameModal.value,
    opVehicle: claimantVehicleModal.value,
    vehicle: vehicleModal.value
  });
}

/********** New Claim Form Validate and Submit Function **********/

function validateAndSubmit(event, newClaimForm) {
  let policyNum = newClaimForm[1].value;
  let memberName = newClaimForm[0].value;
  let atFault = newClaimForm[3].value;
  let vehicle = newClaimForm[2].value;
  let opName = newClaimForm[4].value;
  let opVehicle = newClaimForm[5].value;
  let opInsurance = newClaimForm[6].value;

  if (memberName === "") {

    alert("Please fill in member name");
    event.preventDefault();

  } else if (policyNum === "") {

    alert("Please fill in policy number");
    event.preventDefault();

  } else if (vehicle === "") {

    alert("Please fill in vehicle");
    event.preventDefault();

  } else if (opName === "") {

    alert("Please fill in claimant name");
    event.preventDefault();

  } else if (opVehicle === "") {

    alert("Please fill in claimant vehicle");
    event.preventDefault();

  } else if (opInsurance === "") {

    alert("Please fill in claimant insurance");
    event.preventDefault();

  } else if (atFault === "Please make a selection" || opInsurance === "Please make a selection") {

    alert("Please make a selection");
    event.preventDefault();

  } else {

    axios.post(`http://localhost:3000/claims`, {

        policyNumber: `${newClaimForm[1].value}`,
        memberName: `${newClaimForm[0].value}`,
        atFault: `${newClaimForm[3].value}`,
        vehicle: `${newClaimForm[2].value}`,
        opName: `${newClaimForm[4].value}`,
        opVehicle: `${newClaimForm[5].value}`,
        opInsurance: `${newClaimForm[6].value}`

      })
      .then(response => console.log(response.data))
      .catch(error => console.log(error));
  }
}