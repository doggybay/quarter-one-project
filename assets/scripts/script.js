//Claim insertion
axios.get(`http://localhost:3000/claims`)
  .then(response => {
    let claims = response.data;
    let bodyEntryPoint = document.getElementById('body-entry-point')
    console.log('claims: ', claims)

    claims.forEach(claim => {
      let newClaim = document.createElement('tr');
      newClaim.innerHTML = `
      <td id="member-name">${claim.memberName}</td>
      <td id="policy-num">${claim.id}</td>
      <td id="vehicle">${claim.vehicle}</td>
      <td id="fault">${claim.atFault}</td>
      <td id="claimant-name">${claim.opName}</td>
      <td id="claimant-vehicle">${claim.opVehicle}</td>
      <td id="claimant-insurance">${claim.opInsurance}</td>
      <td id="manage">
        <button type="button" class="btn btn-danger">Delete</button>
      </td>
      `;
      //Insert new claim into the claim view
      bodyEntryPoint.appendChild(newClaim);

      let buttons = newClaim.children[7];
      let manageHead = document.getElementById('manage-head');
      manageHead.classList.add('invisible');
      buttons.classList.add('invisible');
      
      //start of delete button listener
      newClaim.addEventListener('click', () => {
        axios.delete(`http://localhost:3000/claims/${claim.id}`, {
          data: {
            atFault: `${claim.atFault}`,
            id: `${claim.id}`,
            memberName: `${claim.memberName}`,
            opInsurance: `${claim.opInsurance}`,
            opName: `${claim.opName}`,
            opVehicle: `${claim.opVehicle}`,
            vehicle: `${claim.vehicle}`
          }
        });
        
      }); //end of delete button listener

      let linkContainer = document.getElementById('link-container');
      linkContainer.addEventListener('click', () => {
        let buttonType = event.srcElement.innerText;

        if (buttonType === 'View Claims') {

          let buttons = newClaim.children[7];
          let manageHead = document.getElementById('manage-head');
          manageHead.classList.add('invisible');
          buttons.classList.add('invisible');

        } else if (buttonType === 'Manage Claims') {

          let buttons = newClaim.children[7];
          let manageHead = document.getElementById('manage-head');
          manageHead.classList.remove('invisible');
          buttons.classList.remove('invisible');

        }
        

        console.dir(event.srcElement.innerText);
        
      });

    }); //end of forEach
    

  })
  .catch(error => console.log('Error: ', error));

  //Claim creation
  