

let newClaimForm = document.getElementById('new-claim-form');
let submitButton = document.getElementById('submit-button');

submitButton.addEventListener('click', () => {
  let policyNum = newClaimForm[1].value;
  let memberName = newClaimForm[0].value;
  let atFault = newClaimForm[3].value;
  let vehicle = newClaimForm[2].value;
  let opName = newClaimForm[4].value;
  let opVehicle = newClaimForm[5].value;
  let opInsurance = newClaimForm[6].value;

  if (policyNum === "" || memberName === "" || vehicle === "" || opName === "" || opVehicle === "") {
    alert("Please fill in missing fields");
    return false;
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

});
