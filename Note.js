var firebase = require("firebase");

// Initialize the app with no authentication
firebase.initializeApp({
  databaseURL: "https://note-taking-application.firebaseio.com/"
});

var db = firebase.database();
var ref = db.ref('/')

// The app only has access to public data as defined in the Security Rules
var NoteApplication = function(){
	this.createnote = function(note){
		if(typeof note === 'string' && note.length > 0){
			
			//code
		}
	}

	this.viewnote = function(note_id){
		//code
	}
}



