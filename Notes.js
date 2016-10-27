var program = require('commander');
var json2csv = require('json2csv');
var fs = require('fs');
var firebase = require('firebase');
var chalk = require('chalk')
require("firebase/app");
require("firebase/database");


/*
  initialize Application
*/
firebase.initializeApp({
   apiKey: "AIzaSyBnf_AclGwXgPrinEnaEgSDJWTJ2VcjPu4",
  databaseURL: "https://note-taking-application.firebaseio.com/"
});

const db = firebase.database();
const ref = db.ref("notes");
var data ={};

/*
  createnote command adds a new note and passes the note to a createnote function,
  which saves to firebase
  creanote takes in three parameters: note, author and title. 
*/
program
  .command('createnote <note> <author> <title>')
  .option('-n, --note', 'Note')
  .option('-a, --author', 'Author')
  .option('-t, --title', 'Title')
  .description('Adds a new note')
  .action(function(note, author, title, command){
    /*
      assigns the parameters to an object 
    */
    console.log(chalk.red('You just added: ' + ' ' + chalk.blue(note) + ' ' + "to notes"));
    data.noteContent = note;
    data.author = author;
    data.title = title;
    /*
    passes data to a createnote function
    */
    createNote(data);
  })

/*
  viewnote command takes in an ID as parameter and passes the ID to a viewnote function,
  that returns the note associated with the ID
*/ 
program
  .command('viewnote <note_id>')
  .option('-i, --note_id', 'view note')
  .description('View a note')
  .action(function(note_id){
     viewnote(note_id)
  })

/*

*/
program
  .command('deletenote <del>')
  .option('-d, --del', 'delete')
  .description('delete note')
  .action(function(del){
      deletenote(del);
  })

//list all notes
program
  .command('listnotes [limit]')
  .option('--limit', 'limit')
  .description('List all notes')
  .action(function(limit){
    listnotes(limit);

  })

// searchnote command
program
   .command('searchnotes <query_string> [limit]')
   .option('-s,--search', 'Search')
   .option('-l, --limit', 'Limit')
   .description('Search notes using query string')
   .action(function(query_string, limit){
      searchNotes(query_string, limit);
   })

program.parse(process.argv)






/*
createnote function takes in an object containg information about a note as parameter and saves to firebase
*/
function createNote(noteObject){
  /*
    checks the database and returns the snapshot
  */
  ref.once("value", function(snapshot) {
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

/*
  searchNotes function searches for a particular note
*/
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
    console.log(chalk.red('Note does not exist'));
  }
  else{
    for(var key in notes_id){
      if(notes_id.hasOwnProperty(key)){
        console.log(chalk.green('[ID] =>'+ ' ' + notes_id[key].ID)),
        console.log(chalk.green('[Author] =>'+ ' ' + notes_id[key].author)),
        console.log(chalk.green('[Note Content] =>'+ ' ' + notes_id[key].note)),
        console.log(chalk.green('[Title] =>'+ ' ' + notes_id[key].title))


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







