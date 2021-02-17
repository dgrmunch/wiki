var sampler;
var reverb;


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
                var pitch = diatonicScale[pitch%diatonicScale.length]+mod;
              
            }
            if(mode == 'chromatic'){
                var diatonicScale = getChromaticScale();
                var pitch = diatonicScale[pitch%diatonicScale.length]+mod;
            }

            pitches.push(pitch);
        }

        return pitches;
}

function initializeLoop(){
    
    loop = new Tone.Loop(function(time) {
            
        var synthType = getConf('type');
       
        
        //Play synth

            var pitches = getPitches();

            if(synthType == 'sampler'){
                
                reverb = new Tone.Freeverb();
                reverb.roomSize.value = getConf('reverb');
                sampler.chain(reverb).toDestination();
                sampler.triggerAttackRelease(pitches, getConf('tempo'));
               // sampler.dispose();
    
            }
    
            sampler.volume.value = getConf('volume');
           
            /*synth.options.envelope.attack.value = $('#osc_attack').val();
            synth.options.envelope.decay.value = $('#osc_decay').val();
            synth.options.envelope.sustain.value = $('#osc_sustain').val();
            synth.options.envelope.release.value = $('#osc_release').val();
            */
          

      
        //Update interface
        if(previousColumn != null){
            $('#col'+previousColumn).attr('style','background-color:black');
        }
        
        $('#col'+currentColumn).attr('style','background-color:white');

        //Update column trackers
        previousColumn = currentColumn;
        currentColumn = (currentColumn + 1) % maxColumns;
        
    }, getConf('tempo')).start(0);

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
    if(sampler != null) sampler.dispose()
    
    var samplerPath = getConf('sampler')
    sampler  = new Tone.Sampler({
        urls: {
            C2: "C2.wav",
            C3: "C3.wav",
            C4: "C4.wav",
            C5: "C5.wav",
        },
        baseUrl: "samples/"+samplerPath+"/",
        onload: () => {
          // 
        }
    });

   /* 
   sampler  = new Tone.Sampler({
        urls: {
            A1: "tom1.mp3",
        },
        //baseUrl: "https://tonejs.github.io/audio/casio/",
        baseUrl: "https://tonejs.github.io/audio/drum-samples/Techno/",
        onload: () => {
          // 
        }
    });

    */
}
