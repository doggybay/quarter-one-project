//get request for claims db
axios.get(`http://localhost:3000/claims`)
  .then(response => {
    let claims = response.data;
    let tbodyEntry = document.getElementById('tbody-entry');

    claims.forEach(claim => {
      let newClaim = document.createElement('tr');
      makeClaimView(claim, newClaim);
      tbodyEntry.appendChild(newClaim);

      newClaim.addEventListener('click', () => {
        let buttonType = event.srcElement.innerText;
        let updateButton = document.getElementById('update-button');
        if (buttonType === 'Delete') {
          deleteClaim(claim);
        }else if (buttonType === 'Edit') {
          fillUpdateForm(claim);
        }
        updateButton.addEventListener('click', () => {
          updateClaim(claim);
        }); //end of modal update button click listener
      }); //end of new claim row button listener
    }); //end of forEach

    /*------------ Search Filter -------------*/
    let table = tbodyEntry.children;
    let input = document.getElementById('name-filter');
    //Listening to the keys to filter
    input.addEventListener('keyup', () => {
      filterNames(input, table);
    });
  }).catch(error => console.log('Error: ', error));