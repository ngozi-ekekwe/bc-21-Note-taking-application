var program = require('commander');
var readline = require('readline');
var firebase = require("firebase");
require("firebase/app");
require("firebase/database");

firebase.initializeApp({
   apiKey: "AIzaSyBnf_AclGwXgPrinEnaEgSDJWTJ2VcjPu4",
  databaseURL: "https://note-taking-application.firebaseio.com/"

});

var db = firebase.database();

program
  .command('createnote <note_content><author><title>')
  .option('-n, --note', 'Note')
  .option('-a, --author', 'Author')
  .option('-t, --title', 'Title')
  .description('Add a new note')
  .action(function(note_content, author, title){
    var data ={};
    data.note_content = note_content;
    data.author = author;
    data.title = title;
    createNote(data);
  })

program
  .command(viewnote<note_id>)
  .option('-i, --note_id', 'view note')
  .description('View a note')
  .action(function(note_id){

  })

program
  .command('deletenote <note_id>')
  .option('-d, --del', 'delete')
  .description('delete note')
  .action(function(note_id){

  })

program
  .command('listnotes [limit]')
  .option('--limit', 'limit')
  .description('List all notes')
  .action(function(limit){

  })

program
   .command('searchnotes <query_string>')
   .option('-src,--search', 'Search')
   .description('Search notes using query string')
   .action(function(query_string){

   })

function createNote(note_id){

}


program.parse(process.argv)
