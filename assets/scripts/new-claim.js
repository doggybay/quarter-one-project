let newClaimForm = document.getElementById('new-claim-form');

newClaimForm.addEventListener('submit', () => {
  
  validateAndSubmit(event, newClaimForm);
});

