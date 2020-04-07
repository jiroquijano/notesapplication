const fs = require('fs');
const chalk = require('chalk');

const loadNote = ()=>{
    const bufferData = fs.readFileSync('./notes.json');
    return bufferData.toString().length > 0 ? JSON.parse(bufferData) : [];
};

const saveNote = (notes) =>{
    fs.writeFileSync('./notes.json', JSON.stringify(notes));
};

const addNote = function (argv){
    const notes = loadNote();
    const newNote = {title:argv.title, body:argv.body};
    if (notes.findIndex(curr=>curr.title === argv.title) == -1){
        notes.push(newNote);
        saveNote(notes);
        console.log(chalk.bgGreen(`${argv.title} added to notes`));
    }else{
        console.log(chalk.bgRed('Note with the same title already exists!'));
    };  
};

const removeNote = function (title){
    const notes = loadNote();
    const indexOfItem = notes.findIndex(curr=>curr.title === title);
    if(indexOfItem != -1) {
        notes.splice(indexOfItem,1);
        saveNote(notes);
        console.log(chalk.bgGreen(`${title} removed from the list`));
    }else{
        console.log(chalk.bgRed(`${title} does not exist in the notes!`));
    };
};

const listNotes = () => {
    const notes = loadNote();
    console.log(chalk.yellow(`===Your notes===`));
    notes.forEach(note=>console.log(`- ${note.title}`));
    console.log(chalk.yellow(`=================`));
};

const readNote = (title) =>{
    const notes = loadNote();
    const indexOfTitle = notes.findIndex(note => note.title === title);
    if(indexOfTitle != -1){
        console.log(`${chalk.black.bgGreen(notes[indexOfTitle].title)}:${notes[indexOfTitle].body}`);
    }else{
        console.log(chalk.bgRed(`note with [${title}] title does not exist!`));
    }
};

module.exports = {
    removeNote,
    addNote,
    listNotes,
    readNote
};