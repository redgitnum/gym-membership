## GYM MEMBERSHIP PLATFORM

### intro

First project with a backend to use CRUD functions on a database in MongoDB, used mongoose for model creation and data management. App functions are self explanatory but for more information read below.

### overview

App to be used to manage memberships in a gym, should contain most of the functionality that is needed for these sort of tasks.
You can add or delete members, extend the memberships or change/upgrade the membership option(like more/less benefits).

* START
  * The app starts with fetching the list of members from database (MongoDB), 
  * Used axios for getting the data from backend that is on heroku
  
* ADD  
  * Add member with basic information,
  * choose the option and membership length,
  * all fields are required, 
  * some fields are pre-filled
  
* MANAGE
  * click the manage button to see all the details about the member,
  * you can extend the membership or change the option,
  * delete button works as a toggle to not accidentally delete a member, after clicking once you can see the button change to 'Marked for deletion', click again to toggle back,
  * to delete a member you have to first toggle the button to show 'Marked for deletion' and after that click the button 'Save changes', otherwise you will not delete the record
