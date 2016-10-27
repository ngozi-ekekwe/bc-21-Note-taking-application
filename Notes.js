var program = require('commander');
var json2csv = require('json2csv');
var fs = require('fs');
var firebase = require('firebase');
var chalk = require('chalk')
require("firebase/app");
require("firebase/database");

firebase.initializeApp({
   apiKey: "AIzaSyBnf_AclGwXgPrinEnaEgSDJWTJ2VcjPu4",
  databaseURL: "https://note-taking-application.firebaseio.com/"

});

const db = firebase.database();
const ref = db.ref("notes");
var count = 0;
var data ={};

//createnote command to add a new note
program
  .command('createnote <note> <author> <title>')
  .option('-n, --note', 'Note')
  .option('-a, --author', 'Author')
  .option('-t, --title', 'Title')
  .description('Adds a new note')
  .action(function(note, author, title, command){
    
    console.log(chalk.red('You just added: ' + ' ' + chalk.blue(note)));
    data.noteContent = note;
    data.author = author;
    data.title = title;
    //data.ID = count
    createNote(data);
    //exportfile(data);

  })

//viewnote command to view a note 
program
  .command('viewnote <note_id>')
  .option('-i, --note_id', 'view note')
  .description('View a note')
  .action(function(note_id){
     viewnote(note_id)
  })

//delete command to delete a note
program
  .command('deletenote <del>')
  .option('-d, --del', 'delete')
  .description('delete note')
  .action(function(del){
      deletenote(del);
  })

program
  .command('listnotes [limit]')
  .option('--limit', 'limit')
  .description('List all notes')
  .action(function(limit){
    listnotes(limit);

  })

program
   .command('searchnotes <query_string> [limit]')
   .option('-s,--search', 'Search')
   .option('-l, --limit', 'Limit')
   .description('Search notes using query string')
   .action(function(query_string, limit){
      searchNotes(query_string, limit);
   })

program.parse(process.argv)

function createNote(noteObject){
   ref.once("value", function(snapshot) {
    //console.log(snapshot.val());
    var id = 0
    if (snapshot.val() == null || snapshot.val() == undefined)
    {
      
    }
    else {
     id = Object.keys(snapshot.val()).length;
    }
   ref.push({
        ID: ++id,
        note: noteObject.noteContent,
        title: noteObject.title,
        author: noteObject.author
        });
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});
   
}

function searchNotes(query, limit) {
  console.log("limlit is:" + limit);
  if(limit > 0){
    console.log("I got here");
    ref.orderByChild('title').equalTo(query).limitToLast(parseInt(limit)).on("value", function(snapshot){
      console.log(snapshot.val());

    })
  }
  else {
   ref.orderByChild('title').equalTo(query).on('value', function(snap) {
       callback( snap.val() );
   });
 }
}

function viewnote(note_id){
  ref.orderByChild('ID').equalTo(parseInt(note_id)).on('value', function(snap) {
       callback(snap.val() );
   });
  
}

function callback(notes_id) {
  if(notes_id === null){
    console.log('note does not exist');
  }
  else{
    for(var key in notes_id){
      if(notes_id.hasOwnProperty(key)){
        console.log(chalk.red(notes_id[key].ID)),
        console.log(chalk.red(notes_id[key].author)),
        console.log(chalk.red(notes_id[key].note)),
        console.log(chalk.red(notes_id[key].title))


      }
    }
  }
}

function listnotes(limit) {

  if(limit > 0) {
    ref.limitToLast(parseInt(limit)).on("value", function(snapshot) {
      console.log(snapshot.val());
    })
  }
  else{
  ref.on("value", function(snapshot) {
  console.log(snapshot.val());
  
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});
}
  
}


function deletenote(note_id){
  ref.orderByChild('ID').equalTo(parseInt(note_id)).on('value', function(snap) {
       deletes( snap.val() );
   });
   
}







