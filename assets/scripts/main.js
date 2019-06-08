//get request for claims db
axios.get(`http://localhost:3000/claims`)
  .then(response => {
    let claims = response.data;
    let tbodyEntry = document.getElementById('tbody-entry');

    //looping through claims
    claims.forEach(claim => {
      //creating new table row
      let newClaim = document.createElement('tr');
      
      makeClaimView(claim, newClaim);

      //insert new claim into the table
      tbodyEntry.appendChild(newClaim);

      //start of new claim row button listener
      newClaim.addEventListener('click', () => {

        //setting variable for the button text
        let buttonType = event.srcElement.innerText;

        //setting variables for the modal inputs and update button
        let updateButton = document.getElementById('update-button');
        
        //condition to check the button text and execute corresponding task
        if (buttonType === 'Delete') {
          deleteClaim(claim);
        }
        else if (buttonType === 'Edit') {

          fillUpdateForm(claim);

        }

        //modal update button listener
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

  })
  .catch(error => console.log('Error: ', error));