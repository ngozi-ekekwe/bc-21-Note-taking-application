var program = require('commander');
var readline = require('readline');

program
  .command(createnote <note_content> <author> <title>)
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


