const yargs = require('yargs');
const note = require('./notes.js');

//Customizes app version
yargs.version('1.0.0');

//ADD command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder:{
        title:{
            describe:'title of your note',
            demandOption: true,
            type: 'string'
        },
        body:{
            describe:'the note body',
            demandOption: true,
            type:'string'
        }
    },
    handler(argv){
        debugger
        note.addNote(argv);
    }
});

//REMOVE command
yargs.command({
    command:'remove',
    describe:'removes a note',
    builder: {
        title:{
            describe:'the title of the list entry to remove',
            demandOption:true,
            type:'string'
        }
    },
    handler(argv){ 
        note.removeNote(argv.title);
    }
});

//LIST command
yargs.command({
    command:'list',
    describe:'prints out the list of notes',
    handler() {
        note.listNotes();
    }
});

//READ command
yargs.command({
    command:'read',
    describe:'reads a specific note',
    builder: {
        title:{
            describe: 'title of note to read',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        note.readNote(argv.title)
    }
});

yargs.parse();