


let midiOutput = null;
let currentSequenceId = -1;
var midiLoop = false;

var playingNotes;

function getNoteOn(channel){
  switch(channel){
    case "1":
      return 0x90;
    case "2":
      return 0x91;
    case "3":
      return 0x92;
    case "4":
      return 0x93;
    case "5":
      return 0x94;
    case "6":
      return 0x95;
    case "7":
      return 0x97;
    case "8":
      return 0x98;
    case "9":
      return 0x99;
  }

}

function getNoteOff(channel){

  switch(channel){
    case "1":
      return 0x80
    case "2":
      return 0x81
    case "3":
      return 0x82
    case "4":
      return 0x83
    case "5":
      return 0x84
    case "6":
      return 0x85
    case "7":
      return 0x87
    case "8":
      return 0x88
    case "9":
      return 0x89
  }
}

function playNote() {

  if(!midiLoop) return 0;
 
  var notes = getNotes(); 

  for(const note of notes){
    console.log(note);
  midiOutput.send([getNoteOn(note.channel), note.pitch, 0x7f]);
  console.log("|ON|Ch"+note.channel+"| <"+getNoteOn(note.channel)+", "+ note.pitch+ ', 0x7f>');  // note on, note pitch, full velocity
 
  }


      //Update interface
      if(previousColumn != null){
        $('#col'+previousColumn).attr('style','background-color:black');
    }
    
    $('#col'+currentColumn).attr('style','background-color:white');


    playingNotes = notes;
  setTimeout(stopNote, getNoteDuration());

    //Update column trackers
    previousColumn = currentColumn;
    currentColumn = (currentColumn + 1) % maxColumns;

   setTimeout(playNote, getConf('t'));
}

function getNoteDuration(){
  getConf('n'); //TODO: make it compatible with cell duration
}

function stopNote(){
  for(const note of playingNotes){

    midiOutput.send([getNoteOff(note.channel), note.pitch, 0x7f]);
    console.log("|OFF|Ch"+note.channel+"| <"+getNoteOff(note.channel)+", "+ note.pitch + ', 0x7f>');
  
  }


}


function getNotes(){
 
  var dialect = getConf('d');
      var cells = getCurrentCells();
      var notes = [];

      for (const cell of cells) {
          
          var note = {}
          var y = cell.split('_')[0];
          var mod = cell.split('_')[1];

          var cellConfig = getConf('c');

          if(cellConfig == 'v'){
            note.velocity = mod;
            //note.channel = getConf('ch');
          } else if (cellConfig == 'channel'){
            note.channel = mod;
            note.velocity = getConf('v');;
          }

          scale = getScale();
          note.pitch = scale[y];

          notes.push(note);
      }

      return notes;
}

function initializeLoop(){
    
      playNote();

}

function getCurrentCells(){

  var rows = getGrid();
  var currentCells = [];
  
  for(var i = 0; i < rows.length; i++){
      if(rows[i][currentColumn] != '-'){
        currentCells.push((i)+"_"+rows[i][currentColumn]);
      }

  }
  
  return currentCells;
}

function executeWhenCommandsChange(){
  
}


function playLoop(){
  navigator.requestMIDIAccess()
        .then(function(midiAccess) {
          const outputs = midiAccess.outputs.values();
          console.log(outputs);
           for(const output of outputs){ 
          midiOutput = output;
          break;
           }   

           console.log(midiOutput);
           midiLoop = true;
           playing = true;
           initializeLoop();         
        });  
}


function stopLoop(){
  midiLoop = false;
  playing= false;
}

