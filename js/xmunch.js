$(document).ready(function() {

console.log("ready");

console.log("Rendered");

 sleep(1100).then(() => {

          console.log("loaded");

          createTags();
          createTree();
          //addSections();
         

     });

});


function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function createTags(){

  if($( ".md-text:contains('tags:')" ).html() != undefined) {

    console.log('create tags');

    var tagsSelector =  ".md-text:contains('tags:')";
    var tags = $(tagsSelector).html().replace('tags:','').split(",");

    $(tagsSelector).html('');

    $('#md-content-container').prepend('<div class="tags md-text"></div>');      

    for(i = 0; i < tags.length; i++){
      if(tags[i]!='' && tags[i]!=' '){
        $('.tags').html($('.tags').html()+'<a class="tag" href="'+window.location.toString().split('#!')[0]+'#!tags/'+tags[i].trim()+'.md">'+tags[i].trim()+'</a>  ');
      }
   }

    $('tags').hide();
  }

}


function createTree(){

  if($('tree').html() != undefined) {

    console.log('create tree');
      
    var edges = $('tree').html().split(";");

    $('treeview').html('<div id="graph"></div>');      

    var tree = 'graph LR \n';

    for(i = 0; i < edges.length; i++){
      edge = edges[i].replace('.','---');
      tree =  tree + edge.trim() + '\n';
    }

    mermaid.mermaidAPI.initialize({
      startOnLoad:false
  });

  $(function(){

      console.log("Mermaid Initialized");

      if(tree != undefined){
        // Example of using the API
        var element = document.querySelector("#graph");

        var insertSvg = function(svgCode, bindFunctions){
            element.innerHTML = svgCode;
        };

        var graph = mermaid.mermaidAPI.render('tree', tree, insertSvg);
    }
  });

    $('tree').hide();

  }
}

function addSections(){

      if(window.location.toString().includes('photography/')){
        $('.page-header').html('<a href="#!content/photography.md" class="concepts">PHOTOGRAPHY</a>' + $('.page-header').html())
      }

      if(window.location.toString().includes('concepts/')){
        $('.page-header').html('<a href="#!content/concepts.md" class="concepts">CONCEPTS</a>' + $('.page-header').html())
      }

      if(window.location.toString().includes('notebook/')){
        $('.page-header').html('<a href="#!content/notebook.md" class="concepts">NOTEBOOK</a>' + $('.page-header').html())
      }


      if(window.location.toString().includes('recipes/')){
        $('.page-header').html('<a href="#!content/recipes.md" class="concepts">RECIPES</a>' + $('.page-header').html())
      }

      if(window.location.toString().includes('articles/')){
        $('.page-header').html('<a href="#!content/articles.md" class="concepts">ARTICLES</a>' + $('.page-header').html())
      }

      if(window.location.toString().includes('projects/')){
        $('.page-header').html('<a href="#!content/projects.md" class="concepts">PROJECTS</a>' + $('.page-header').html())
      }

      if(window.location.toString().includes('content/')){
        $('.page-header').html('<a href="#!content.md" class="concepts">CONTENT</a>' + $('.page-header').html())
      }
}
