
//Global variables

let playing = false;
var currentColumn = 0;
var previousColumn = null;
var numCharacters = 400;
var maxColumns = 20;
var loop;
var defaultSong = "----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------";
var freeverb = new Tone.Freeverb().toMaster();
var synth = new Tone.PolySynth(Tone.Synth).connect(freeverb);   //var chorus = new Tone.Chorus(4, 2.5, 0.5);
      

// Initialization

$('document').ready(function(){

    addListeners();
    initializeGrid();

});


//Interface functions


function addListeners(){

    // Add button to play/stop loop (and load Tone.js in browser)
    document.getElementById('playstop')?.addEventListener('click', async () => {
        await Tone.start()
        console.log('audio is ready')
        playStop();

    })

    $("input").change(function(){
        if(loop != null) loop.stop();
        initializeLoop();
      }); 
}

function initializeGrid(){

    // Load default song
    $('#q').val(defaultSong);
    
    var input = document.getElementById('q');

    // Disable forbiden keys
    input.onkeydown = function() {

        var key = event.keyCode || event.charCode;
        
        if( (key > 58 || key < 47) && key != 173 && key != 109 && key != 189 && key != 37 && key != 38 && key != 39 && key != 40  ){
            return false;
        }
        var s = this.selectionStart;

        //Do not allow add more characters than the fixed number
        if(s >= numCharacters) {
            return false;
        }

    };

    //Replace current character and move to the next  one
    input.addEventListener('keypress', function(event){
            
        var s = this.selectionStart;
        this.value = this.value.substr(0, s) + this.value.substr(s + 1);
        this.selectionEnd = s;
        
    }, false);
}

function playStop(){
    
    if (!playing) {

        Tone.Transport.start();
        playing = true;
        initializeLoop();
        $('#playstop').attr('style','color:white');

    } else {
        loop.stop();
        playing= false;
        $('#playstop').attr('style','color:#2b2b2b');
        Tone.Transport.stop();

    }
}
    

//Aux functions
function stringChop(str, size){
    if (str == null) return [];
    str = String(str);
    size = ~~size;
    return size > 0 ? str.match(new RegExp('.{1,' + size + '}', 'g')) : [str];
}


//Musical functions


function initializeLoop(){
    
    loop = new Tone.Loop(function(time) {
            
        //Set configuration
        freeverb.roomSize.value= $('#reverb').val(); 
        freeverb.dampening.value = 3000;
        synth.volume.value = $('#volume').val();
        synth.options.oscillator.type = $('#osc_type').val();
        /*synth.options.envelope.attack.value = $('#osc_attack').val();
        synth.options.envelope.decay.value = $('#osc_decay').val();
        synth.options.envelope.sustain.value = $('#osc_sustain').val();
        synth.options.envelope.release.value = $('#osc_release').val();
        */
        //Get current notes
        var notes = getCurrentNotes();
        
        //Play synth
        for (const note of notes) {
            var pitch = note.split('_')[0];
            var mod = note.split('_')[1];
            synth.triggerAttackRelease(pitch, mod+"n");//"2n");

        }
        
        //Update interface
        if(previousColumn != null){
            $('#col'+previousColumn).attr('style','background-color:black');
        }
        
        $('#col'+currentColumn).attr('style','background-color:white');

        //Update column trackers
        previousColumn = currentColumn;
        currentColumn = (currentColumn + 1) % maxColumns;
        
    }, $('#tempo').val()).start(0);

}


function getCurrentNotes(){

    var rows = stringChop($('textarea').val(),20);
    var currentNotes = [];
    
    for(var i = 0; i < rows.length; i++){
        if(rows[i][currentColumn] != '-'){
            currentNotes.push((i*40)+"_"+rows[i][currentColumn]);
        }

    }
    
    return currentNotes;
}

    

