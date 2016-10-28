# NOTE TAKING APPLICATION WITH FIREBASE

### INTRODUCTION
Notes is a console application that has the following commands
- createnote  to add a new note
- viewnote to view a note
- deletenote  deletes a note 
- searchnotes   to search for a note
- listnotes to lists all notes


#### DEPENDENCIES

In your package.json you will find the lists of necessary packages
```sh
$ npm init
$ npm install commander
$ npm install chalk
$ npm install firebase
```
noteapp starts your application automatically and the notes created are stored in Firebase where data is stored as JSON and synchronized in realtime to every connected client.

### INSTALLATION
- Clone repo
- Run 'npm link'
- run 'noteapp'

