  
//Fill the renderLandmarks function with the content you want to include in the left column  
function renderLandmarks(){

    var mode = getConf('mode');
         
    //Use same name that the file. For example, for "test.js" would be "test"
    if(mode == '<your_plugin_name_here>'){

        // The array should contain 20 items, one for each line of the grid
        $('#landmarks').val(toLandmarks(['item','item','item','item','item',
                                         'item','item','item','item','item',
                                         'item','item','item','item','item',
                                         'item','item','item','item','item']));
    }


}

function initializeLoop(){
    //do something 
}