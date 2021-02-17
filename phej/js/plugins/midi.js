


let midiOutput = null;
let currentSequenceId = -1;
var midiLoop = false;

var playingPitches;
const START = 41;

let intervals = [];

const NOTE_ON = 0x9;
const NOTE_OFF = 0x8;

function getNoteOn(){
  var channel = getConf('channel');
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

function getNoteOff(){
  var channel = getConf('channel');
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

function renderLandmarks(){

  var mode = getConf('mode');
         
  if(mode == 'hz'){
      
  }

  if(mode == 'diatonic'){
     $('#landmarks').val(toLandmarks(getDiatonicScale()));        
  }

  if(mode == 'chromatic'){
      $('#landmarks').val(toLandmarks(getChromaticScale()));
  }

}


function playNote() {

  if(!midiLoop) return 0;
 
  pitches = getPitches(); 

  for(const pitch of pitches){

    console.log(getNoteOn());
  midiOutput.send([getNoteOn(), pitch, 0x7f]);
  console.log(getNoteOn()+" {"+ pitch+ '} 0x7f');  // note on, note pitch, full velocity
 
  }

      //Update interface
      if(previousColumn != null){
        $('#col'+previousColumn).attr('style','background-color:black');
    }
    
    $('#col'+currentColumn).attr('style','background-color:white');

    playingPitches = pitches;
  setTimeout(stopNote, getConf('note_duration'));


   //Update column trackers
   previousColumn = currentColumn;
   currentColumn = (currentColumn + 1) % maxColumns;

   setTimeout(playNote, getConf('tempo'));
}

function stopNote(){
  for(const pitch of playingPitches){

    midiOutput.send([getNoteOff(), pitch, 0x7f]);
    console.log(getNoteOff()+" {"+ pitch + '} 0x7f');
  
  }


}


function getPitches(){
 
  var mode = getConf('mode');
      var notes = getCurrentNotes();
      var pitches = [];

      for (const note of notes) {
          
          var pitch = note.split('_')[0];
          var mod = note.split('_')[1];
         
          if(mode == 'hz'){
              synth.triggerAttackRelease(pitch, mod+"n");
          }
          if(mode == 'diatonic'){
              var diatonicScale = getDiatonicScale();
              var pitch = toMidiNumber(diatonicScale[pitch%diatonicScale.length])+(12*mod);
            
          }
          if(mode == 'chromatic'){
              var diatonicScale = getChromaticScale();
              var pitch = diatonicScale[pitch%diatonicScale.length]+(12*mod);
          }

          pitches.push(pitch);
      }

      console.log("Pitches:");
      console.log(pitches);

      return pitches;
}

function toMidiNumber(letter){

  switch(letter){
    case 'C': return 0; break;
    case 'C#': return 1; break;
    case 'D': return 2; break;
    case 'D#': return 3; break;
    case 'E': return 4; break;
    case 'F': return 5; break;
    case 'F#': return 6; break;
    case 'G': return 7; break;
    case 'G#': return 8; break;
    case 'A': return 9; break;
    case 'A#': return 10; break;
    case 'B': return 11; break;

  }

}

function initializeLoop(){
    
      playNote();

}

function getDiatonicScale(){
  return ['C','D','E','F','G','A','B']
}

function getChromaticScale(){
  return ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
}


function getCurrentNotes(){

  var rows = getGrid();
  var currentNotes = [];
  
  for(var i = 0; i < rows.length; i++){
      if(rows[i][currentColumn] != '-'){
          currentNotes.push((i)+"_"+rows[i][currentColumn]);
      }

  }
  
  return currentNotes;
}

function executeWhenCommandsChange(){
  
}

