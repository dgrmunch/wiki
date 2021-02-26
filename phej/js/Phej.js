
//Global variables
var context;
var loopContent;
var playing = false;
var currentColumn = 0;
var previousColumn = null;
var numCharacters = 439;
var maxColumns = 20;
var loop;
var defaultSong = "";
var defaultCommands = "p: midi"


// Initialization

$('document').ready(function(){

    context = new AudioContext();
  
    initializeGrid();
    loadProgram();
    

});


//Interface functions

function loadProgram(){

    var hash = '001';

    if(window.location.hash.includes("#@"))         
        hash = window.location.hash.split("#@")[1];

        fetch('programs/'+hash+'.md')
    .then(response => response.text())
    .then(text =>   parseProgram(text));

}

function parseProgram(text){

  var blocks = text.split("```");
  var gridContent = "";
  var configuration = "";
  var landmarks = "";

  for(const block of blocks){
      if (block.includes('phej-configuration')){
          configuration = block.replace('phej-configuration\n','');
        } else if (block.includes('phej-grid')){
          gridContent = block.split('phej-grid\n')[1];
     } else if (block.includes('phej-landmarks')){
          landmarks = block.split('phej-landmarks\n')[1];
 }
  }


  $('#loopContent').html(gridContent.trim()) ;
  $('#commands').val(configuration.trim());
  $('#landmarks').val(landmarks.trim());

  loopContent = $('#loopContent').html();
  $('section').html($('section').html().replaceAll('-','<dark>-</dark>'))

  loadPlugin(getConf('p'));

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
 // download("loop.phej",loopContent+"\n$\n"+$('#commands').val());
  

function addListeners(){

    // Add button to play/stop loop (and load Tone.js in browser)
    document.getElementById('playstop')?.addEventListener('click', async () => {
        context.resume().then(() => {
            console.log('Playback resumed successfully');
          });
        playStop();

    })

    $("#commands").change(function(){
        executeWhenCommandsChange();
      }); 
}

function loadPlugin(plugin){

    $.getScript( 'js/plugins/'+plugin+'.js', function( data, textStatus, jqxhr ) {
        
        midiLoop = false;
        addListeners();
        executeWhenCommandsChange();
      });
}

function removeGridStyles(){
  $('section').html($('section').html()
                                        .replaceAll('<dark>-</dark>','-')
                                        .replaceAll('<cell-value-1>1</cell-value-1>','1')
                                        .replaceAll('<cell-value-2>2</cell-value-2>','2')
                                        .replaceAll('<cell-value-3>3</cell-value-3>','3')
                                        .replaceAll('<cell-value-4>4</cell-value-4>','4')
                                        .replaceAll('<cell-value-5>5</cell-value-5>','5')
                                        .replaceAll('<cell-value-6>6</cell-value-6>','6')
                                        .replaceAll('<cell-value-7>7</cell-value-7>','7')
                                        .replaceAll('<cell-value-8>8</cell-value-8>','8')
                                        .replaceAll('<cell-value-9>9</cell-value-9>','9')
                                        .replaceAll('<cell-value-0>0</cell-value-0>','0')
  
  
  );
}


function addGridStyles(){
  $('section').html($('section').html()
                                    .replaceAll('-','<dark>-</dark>')                                    
                                    .replaceAll('1','<cell-value-1>1</cell-value-1>')
                                    .replaceAll('2','<cell-value-2>2</cell-value-2>')
                                    .replaceAll('3','<cell-value-3>3</cell-value-3>')
                                    .replaceAll('4','<cell-value-4>4</cell-value-4>')
                                    .replaceAll('5','<cell-value-5>5</cell-value-5>')
                                    .replaceAll('6','<cell-value-6>6</cell-value-6>')
                                    .replaceAll('7','<cell-value-7>7</cell-value-7>')
                                    .replaceAll('8','<cell-value-8>8</cell-value-8>')
                                    .replaceAll('9','<cell-value-9>9</cell-value-9>')
                                    .replaceAll('0','<cell-value-0>0</cell-value-0>')
  );
  $('section').blur();
}

function initializeGrid(){

    // Load default song
    $('#loopContent').html(defaultSong);
    $('#commands').val(defaultCommands);
    
    var input = document.getElementById('loopContent');
      
    input.onmouseover = function(){
      removeGridStyles();
    }

    input.onmouseleave = function(){
      loopContent = $('#loopContent').html();
      addGridStyles();
    }


    //Replace current character and move to the next  one
    input.onkeydown = function() {

     
        var key = event.keyCode || event.charCode;
        
        if( (key > 58 || key < 47) && key != 173 && key != 109 && key != 189 && key != 37 && key != 38 && key != 39 && key != 40  ){
            return false;
        }
        
        var s = getCaretPosition(this);

        if(key != 37 && key != 38 && key != 39 && key != 40 ){//Do not allow add more characters than the fixed number
            if(s >= 440   || s == 20 
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
                                    || s == 419
                                    || s == 440) {
                return false;
            }

            var character = String.fromCharCode(event.keyCode);


            if(key == 189){
                character = '-';
            }

            $('#loopContent').html($('#loopContent').html().substr(0, s) + character + $('#loopContent').html().substr(s + 1));
             var el = document.getElementById("loopContent")
                var range = document.createRange()
                var sel = window.getSelection()
                
                range.setStart(el.childNodes[0], s+1) // sumo uno para ir al carácter siguiente
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

function playStop(){
    
    if (!playing) {

        playLoop();    
        $('#playstop').attr('style','color:white');

    } else {

        stopLoop();
        $('#playstop').attr('style','color:#2b2b2b');

    }
}
    
//Aux functions
function getGrid(){
  return stringChop(loopContent,21);
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

function getScale(){

  var scale = [];
  var pitches = $('#landmarks').val().split("\n");
  
  for (const pitch of pitches) {
       scale.push(pitch.split(":")[0].trim());
  }

  return scale;

}

