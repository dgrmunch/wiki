var freeverb = new Tone.Freeverb().toMaster();
var synth = new Tone.PolySynth(Tone.Synth).connect(freeverb);   //var chorus = new Tone.Chorus(4, 2.5, 0.5);
      
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


function initializeLoop(){
    
    loop = new Tone.Loop(function(time) {

        console.log('loop:'+currentColumn);
            
        //Set configuration
        var mode = getConf('mode');
        freeverb.roomSize.value= getConf('reverb');
        freeverb.dampening.value = 3000;
        synth.volume.value = getConf('volume');
        synth.options.oscillator.type = getConf('osc_type');
        /*synth.options.envelope.attack.value = $('#osc_attack').val();
        synth.options.envelope.decay.value = $('#osc_decay').val();
        synth.options.envelope.sustain.value = $('#osc_sustain').val();
        synth.options.envelope.release.value = $('#osc_release').val();
        */
        //Get current notes
        var notes = getCurrentNotes();
        console.log(notes);
        
        //Play synth
        for (const note of notes) {
            
            var pitch = note.split('_')[0];
            var mod = note.split('_')[1];
           
            if(mode == 'hz'){
                synth.triggerAttackRelease(pitch, mod+"n");
            }
            if(mode == 'diatonic'){
                var diatonicScale = getDiatonicScale();
                var pitch = diatonicScale[pitch%diatonicScale.length]+mod;
                synth.triggerAttackRelease(pitch, "2n");
            }
            if(mode == 'chromatic'){
                var diatonicScale = getChromaticScale();
                var pitch = diatonicScale[pitch%diatonicScale.length]+mod;
                synth.triggerAttackRelease(pitch, getConf('tempo'));
            }

        }
      
        //Update interface
        if(previousColumn != null){
            $('#col'+previousColumn).attr('style','background-color:black');
        }
        
        $('#col'+currentColumn).attr('style','background-color:white');

        //Update column trackers
        previousColumn = currentColumn;
        currentColumn = (currentColumn + 1) % maxColumns;
        
    }, "2n").start(0);

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
