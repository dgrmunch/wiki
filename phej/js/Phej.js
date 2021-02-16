
//Global variables

let playing = false;
var currentColumn = 0;
var previousColumn = null;
var numCharacters = 400;
var maxColumns = 20;
var loop;
var defaultSong = "----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------";
var defaultCommands = "plugin: synth\nmode: diatonic\nosc_type: triangle\nvolume: 1\nreverb: 0.9\ntempo: 2n"


// Initialization

$('document').ready(function(){

    initializeGrid();
    loadProgram();
    loadPlugin(getConf('plugin'));

});


//Interface functions

function loadProgram(){

    if(window.location.hash.includes("#@")){            
        var hash = window.location.hash.split("#@")[1];
        console.log(hash);
        fetch('programs/'+hash+'_grid.phej')
    .then(response => response.text())
    .then(text =>   $('#loopContent').val(text.replaceAll("\n","")));

    fetch('programs/'+hash+'_conf.phej')
    .then(response => response.text())
    .then(text =>  $('#commands').val(text));

    }

}

function addListeners(){

    // Add button to play/stop loop (and load Tone.js in browser)
    document.getElementById('playstop')?.addEventListener('click', async () => {
        await Tone.start()
        console.log('audio is ready')
        playStop();

    })

    $("#commands").change(function(){
        executeLoopLogic();
      }); 
}

function loadPlugin(plugin){

    $.getScript( 'js/plugins/'+plugin+'.js', function( data, textStatus, jqxhr ) {
        if(loop != null) loop.stop();
        executeLoopLogic();
        addListeners();
      });
}

function executeLoopLogic(){
    initializeLoop();
    renderLandmarks();
}

function toLandmarks(rows){

    var landmarksContent = "";
    for(i = 0; i < 20; i++){
        landmarksContent += rows[i % rows.length];
        if(i < 19){
            landmarksContent +="\n";
        }
    }

    return landmarksContent;
}

function initializeGrid(){

    // Load default song
    $('#loopContent').val(defaultSong.replaceAll("\n",""));
    $('#commands').val(defaultCommands);
    
    var input = document.getElementById('loopContent');

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
function getGrid(){
   return stringChop($('#loopContent').val(),20);
}

function stringChop(str, size){
    if (str == null) return [];
    str = String(str);
    size = ~~size;
    return size > 0 ? str.match(new RegExp('.{1,' + size + '}', 'g')) : [str];
}

function getConf(conf){

    var commands = $('#commands').val().split("\n");
    
    for (const command of commands) {
        if(command.includes(conf+":")){
            return (command.split(":"))[1].trim();
        }
    }

    return '';

}

    

