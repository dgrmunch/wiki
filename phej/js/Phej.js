
//Global variables

var playing = false;
var currentColumn = 0;
var previousColumn = null;
var numCharacters = 400;
var maxColumns = 20;
var loop;
var defaultSong = "";
var defaultCommands = "plugin: synth\nmode: diatonic\nosc_type: triangle\nvolume: 1\nreverb: 0.9\ntempo: 2n"


// Initialization

$('document').ready(function(){

    initializeGrid();
    loadProgram();
    loadPlugin(getConf('plugin'));

});


//Interface functions

function loadProgram(){

    var hash = '001';

    if(window.location.hash.includes("#@"))         
        hash = window.location.hash.split("#@")[1];

        fetch('programs/'+hash+'.phej')
    .then(response => response.text())
    .then(text =>   $('#loopContent').html(text.split('\n$\n')[0].trim()) 
                    && $('#commands').val(text.split('\n$\n')[1])  
                    && renderLandmarks());

}

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }
  
  // Start file download.
  //download("loop.phej",getGridInText()+"\n$\n"+$('#commands').val());
  

function addListeners(){

    // Add button to play/stop loop (and load Tone.js in browser)
    document.getElementById('playstop')?.addEventListener('click', async () => {
        await Tone.start()
        console.log('audio is ready')
        playStop();

    })

    $("#commands").change(function(){
        renderLandmarks();
      }); 
}

function loadPlugin(plugin){

    $.getScript( 'js/plugins/'+plugin+'.js', function( data, textStatus, jqxhr ) {
        if(loop != null) loop.stop();
        renderLandmarks();
        addListeners();
      });
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
    $('#loopContent').html(defaultSong);
    $('#commands').val(defaultCommands);
    
    var input = document.getElementById('loopContent');



    //Replace current character and move to the next  one
    input.onkeydown = function() {

        var key = event.keyCode || event.charCode;
        
        if( (key > 58 || key < 47) && key != 173 && key != 109 && key != 189 && key != 37 && key != 38 && key != 39 && key != 40  ){
            return false;
        }
        
        var s = getCaretPosition(this);
        console.log(s);

        if(key != 37 && key != 38 && key != 39 && key != 40 ){//Do not allow add more characters than the fixed number
            if(s >= 419   || s == 20 
                                    || s == 41 
                                    || s == 62 
                                    || s == 83 
                                    || s == 104
                                    || s == 125
                                    || s == 146
                                    || s == 167
                                    || s == 188
                                    || s == 209
                                    || s == 230
                                    || s == 251
                                    || s == 272
                                    || s == 293
                                    || s == 314
                                    || s == 335
                                    || s == 356
                                    || s == 377
                                    || s == 398
                                    || s == 419) {
                return false;
            }
            $('#loopContent').html($('#loopContent').html().substr(0, s) + String.fromCharCode(event.keyCode) + $('#loopContent').html().substr(s + 1));
             var el = document.getElementById("loopContent")
                var range = document.createRange()
                var sel = window.getSelection()
                
                range.setStart(el.childNodes[0], s)
                range.collapse(true)
                
                sel.removeAllRanges()
                sel.addRange(range)
            
            return false;
        }

        
    }


}

function getCaretPosition(editableDiv) {
    var caretPos = 0,
      sel, range;
    if (window.getSelection) {
      sel = window.getSelection();
      if (sel.rangeCount) {
        range = sel.getRangeAt(0);
        if (range.commonAncestorContainer.parentNode == editableDiv) {
          caretPos = range.endOffset;
        }
      }
    } else if (document.selection && document.selection.createRange) {
      range = document.selection.createRange();
      if (range.parentElement() == editableDiv) {
        var tempEl = document.createElement("span");
        editableDiv.insertBefore(tempEl, editableDiv.firstChild);
        var tempRange = range.duplicate();
        tempRange.moveToElementText(tempEl);
        tempRange.setEndPoint("EndToEnd", range);
        caretPos = tempRange.text.length;
      }
    }
    return caretPos;
  }

var algo;

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
    //TODO: Aqui pasar a texto
   return stringChop($('#loopContent').html(),20);
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

    

