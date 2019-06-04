//Claim insertion
axios.get(`http://localhost:3000/claims`)
  .then(response => {
    let claims = response.data;
    let tbodyEntry = document.getElementById('tbody-entry');

    //console.log('claims: ', claims);

    claims.forEach(claim => {
      let newClaim = document.createElement('tr');
      
      newClaim.innerHTML = `
      <tr>
        <td id="claim-num">${claim.id}</td>
        <td id="member-name">${claim.memberName}</td>
        <td id="policy-num">${claim.policyNumber}</td>
        <td id="vehicle">${claim.vehicle}</td>
        <td id="fault">${claim.atFault}</td>
        <td id="claimant-name">${claim.opName}</td>
        <td id="claimant-vehicle">${claim.opVehicle}</td>
        <td id="claimant-insurance">${claim.opInsurance}</td>
        <td id="manage">
          <button type="button" class="btn-sm btn btn-danger">Delete</button>
          <button type="button" class="ml-2 btn btn-sm btn-warning">Edit</button>
        </td>
      </tr>
      `;

      //Insert new claim into the claim view
      tbodyEntry.appendChild(newClaim);

      
      
      //start of button listener
      newClaim.addEventListener('click', () => {
        let buttonType = event.srcElement.innerText;
        
        if (buttonType === 'Delete') {
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
        } else if (buttonType === 'Edit') {
          console.dir(buttonType);
        }
        
        
      }); //end of delete button listener


      //TODO possible button hide
      //let buttons = newClaim.children[8].children;
      // let manageHead = document.getElementById('manage-head');
      //manageHead.classList.add('invisible');
      //buttons.classList.add('invisible');
      //TODO possible button hide
      // let linkContainer = document.getElementById('link-container');

      // linkContainer.addEventListener('click', () => {
      //   let buttonType = event.srcElement.innerText;

      //   if (buttonType === 'View Claims') {

      //     let buttons = newClaim.children[7];
      //     let manageHead = document.getElementById('manage-head');
      //     manageHead.classList.add('invisible');
      //     buttons.classList.add('invisible');

      //   } else if (buttonType === 'Manage Claims') {

      //     let buttons = newClaim.children[7];
      //     let manageHead = document.getElementById('manage-head');
      //     manageHead.classList.remove('invisible');
      //     buttons.classList.remove('invisible');

      //   }
      // });

    }); //end of forEach

    /*------------ Search Filter -------------*/

    let table = tbodyEntry.children;
    let input = document.getElementById('name-filter');

    //Listening to the keys
    input.addEventListener('keyup', () => {
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
    });

  })
  .catch(error => console.log('Error: ', error));

  