


let midiOutput = null;
let currentSequenceId = -1;
var midiLoop = false;
const START = 41;

let intervals = [];

const NOTE_ON = 0x90;
const NOTE_OFF = 0x80;

const NOTE_DURATION = 300;

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

 
  intervals = getPitches();      ;
  sequence =  intervals.map(x => x + START);

  console.log(currentColumn);
  console.log(sequence);

  if (currentSequenceId >= 0) {
    midiOutput.send([NOTE_OFF, sequence[currentSequenceId], 0x7f]);
    console.log("NOTE_OFF: "+ sequence[currentSequenceId]+ ' 0x7f');
  }

  currentSequenceId++;
  if (currentSequenceId >= sequence.length) {
    currentSequenceId = 0;
  }
  midiOutput.send([NOTE_ON, sequence[currentSequenceId], 0x7f]);
  console.log("NOTE_ON: "+ sequence[currentSequenceId]+ ' 0x7f');

      //Update interface
      if(previousColumn != null){
        $('#col'+previousColumn).attr('style','background-color:black');
    }
    
    $('#col'+currentColumn).attr('style','background-color:white');

    //Update column trackers
    previousColumn = currentColumn;
    currentColumn = (currentColumn + 1) % maxColumns;

  setTimeout(playNote, NOTE_DURATION);
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

