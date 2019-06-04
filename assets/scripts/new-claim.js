let newClaimForm = document.getElementById('new-claim-form');

//event listener for the submit on the form
newClaimForm.addEventListener('submit', () => {
  validateAndSubmit(event, newClaimForm);
});

