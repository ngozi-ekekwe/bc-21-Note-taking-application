# NOTE TAKING APPLICATION

### INTRODUCTION
Notes is a console application that has the following commands
- createnote <note> <author> <title> to add a new note
- viewnote <note_id> to view a note
- deletenote <note_id>  deletes a note 
- searchnotes <query_string> [limit] to search for a note
- listnotes [limit] to lists all notes


#### DEPENDENCIES

In your package.json you will find the lists of necessary packages
```sh
$ npm init
$ npm install commander
$ npm install chalk
$ npm install firebase
```
noteapp starts your application automatically and the notes created are stored in Firebase where data is stored as JSON and synchronized in realtime to every connected client.


 












 
 

