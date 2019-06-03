# Quarter One Project - Claims Intake

## Getting Started

Fork the repository and then run the following commands in the terminal

```shell
git clone https://github.com/<your-github-handle>/usaa-phx-quarter-one-project.git
cd usaa-phx-quarter-one-project
npm install # to install json-server
npm run server # to run the json-server that will give you access to the "claims" routes
code . # or open in your code editor of choice
```

## Overview

You have been tasked to create a claims intake app that will allow you to intake a new claim and manage any existing claims. Remember that it doesn't have to look exactly like it, but after you make sure that all the functionality works, try to get as close as you can.

## User Stories

### Layout

<!-- - As a user, when I land on ^any page^, I see a 
  *navbar on the top and the 
    *area below contains a 
      *left and right section. 

The left section is the 
  *sidebar navigation that has the 
    *two links we can click on to take us to different pages. 

The right section is the 
  *main content area. (See diagrams below for a visual representation)

- As a user, when I click on the "Create New Claim" link on the left side, it takes me to `/new-claim.html`

- As a user, when I click on the "Manage Claims" link on the left side, it takes me to `/index.html` or just `/` for short -->

### Create Claim Form

![create claims](/create-claim.png)

- As a user, when I land on the add claim form page, there is a form in the main content area (the right side). The form will have the following fields:
  - "Member Name"
  - "Policy Number"
  - "Vehicle"
  - "Fault"
  - "Other party name"
  - "Other party vehicle"
  - "Other party insurance"

- As a user, when I submit the add claim form, it makes a POST request to `http://localhost:3000/claims` with the form data, then it will redirect the page to `/index.html` or just `/` for short. When the new page loads, the new data that you added should appear.

  - STRETCH: As a user, when I submit the form, it will validate the fields to make sure that all forms fields are filled out
  - STRETCH: As a user, when I submit the form, if the policyholder is at fault, a funny sad GIF will appear below the form for 5 seconds before it redirects. If the policyholder is not at fault, a funny celebration GIF will show below the form for 5 seconds before it redirects

### Manage Claims View

![manage claims](/manage-claims.png)

- As a user, when I land on the manage claims page, there is a table in the main content area with the following columns:
  - "Member Name"
  - "Policy Number"
  - "Vehicle"
  - "Fault"
  - "Other party name"
  - "Other party vehicle"
  - "Other party insurance"
  - "Manage" (The "Manage" column will contain a "Delete" button)
- As a user, when I click the "Delete" button, a DELETE request will be made to the following address: `http://localhost:3000/claims/whatever-claim-id`

- STRETCH: Create an input field above the table somewhere that filters the table by policyholder's name. There should not be a submit button, though. It should be filtered as the user types.

### MAJOR STRETCH: Editing Claims

- As a user, when I arrive at the "Manage Claims" page, in the "Manage" column of the claims table, there is also an "Edit Claim" button.
- As a user, when I click the "Edit Claim" button, a modal pops up with a form containing all the fields from that table row that are prepopulated with the row data.
- As a user, when I submit the edit form, the modal will close and the data on the page will reflect the changes made in the edit form

You can use the above suggestion to use a modal OR you can just put a form on another page and navigate back to the "Manage Claims" after submitting the edit form.
