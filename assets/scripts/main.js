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
    //Listening to the keys to filter
    input.addEventListener('keyup', () => {
      filterNames(input, table);
    });

  })
  .catch(error => console.log('Error: ', error));