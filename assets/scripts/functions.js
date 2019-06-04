function validateAndPost() {
  if (policyNum === "" || memberName === "" || vehicle === "" || opName === "" || opVehicle === "") {
    alert("Please fill in missing fields");
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