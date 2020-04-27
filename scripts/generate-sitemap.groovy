
import groovy.io.FileType

//Global variables
nodeNumber = 0
nodes = new HashMap()
nodeLinks = new HashMap()
edges = new HashMap()
absolutePath = '/Users/diego.gonzalez/Desktop/Commonplace/'

//Functions declaration
void crawlMarkdownFile(String filePath){

println filePath;
    File file = new File(filePath)
    def clearFilePath = filePath
    String[] parts = clearFilePath.split("/")
    if(parts != null){
        clearFilePath = parts[parts.length-1]
    } 

    nodeLinks.put(clearFilePath,file.getAbsolutePath())

    String text = ""

    def line;
    file.withReader { reader ->
        while ((line = reader.readLine()) != null) {
            text += line+" "
        }
    }

    String[] links = text.replace('../','').split("]")
    for(String string : links){
        if(string != null){
            try{
                String pattern = string.substring(string.indexOf("](")+1,string.indexOf(".md)")).replace('(','');
                if (pattern != null && !pattern.contains('http')) {
                    String link = pattern + ".md" 
                    String nodeKey = link
                    String[] parts2 = nodeKey.split("/")
                    if(parts2 != null){
                        nodeKey = parts2[parts2.length-1]
                    } 
                    
                    if(nodes.get(nodeKey) == null){
                        nodeNumber++
                        nodes.put(nodeKey,nodeNumber)
                        println "$nodeKey : $nodeNumber"
                        String edgeKey = "$clearFilePath>$nodeKey"
                        if(edges.get(edgeKey) == null){
                            edges.put(edgeKey,edgeKey)
                            //println edges.get(edgeKey)
                        }
                        //crawlMarkdownFile(link)
                    }

                }
            } catch(Exception e){
                //e.printStackTrace()
            }   
       }
    } 
}

//Execution

def list = []

def dir = new File(".")
dir.eachFileRecurse (FileType.FILES) { file ->
  list << file
}

println list

for(def file: list){
   if(file.toString().contains('.md')) crawlMarkdownFile(file.toString());
}


//indexFile = "index.md"
//nodes.put(indexFile,nodeNumber)
//nodeLinks.put(indexFile,indexFile)
//crawlMarkdownFile(indexFile);

File file = new File("js/sitemap.js")

/*
file.write ""
//file << "\$(document).ready(function() {"
//file << "sleep(500).then(() => {"

file << "var nodes = new vis.DataSet(["

for(def node: nodes){
    file << "\n{id: ${node.getValue()}, label: '${node.getKey()}', url: window.location.host + window.location.pathname+'/#!${nodeLinks.get(node.getKey()).replaceAll(absolutePath,'')}', shape: 'dot', size: 10, color: '#000' },"
}

file << "]);"

file << "var edges = new vis.DataSet(["
for(def edge: edges){
    from = edge.key.split(">")[0]
    to = edge.key.split(">")[1]
    file << "{from: ${nodes.get(from)}, to: ${nodes.get(to)}},"   
}

file << "]);"

 
 file << "   var container = document.getElementById('mynetwork');"
 file << "   var data = {"
 file << "       nodes: nodes,"
 file << "       edges: edges"
 file << "   };"
 file << "   var options = var options = {  width: '1000px', height: '600px' };"
 file << "   var network = new vis.Network(container, data, options);"

 file << "   network.on('selectNode', function (params) {"
 file << "       if (params.nodes.length === 1) {"
 file << "           var node = nodes.get(params.nodes[0]);"
 file << "           window.open(node.url, '_blank');"
 file << "       }"
 file << "   });"

 //file << " });});"


*/




file.write ""
file <<  "var graphDefinition = ` \n"
file <<  "graph TD \n"


println nodes.size();
println edges.size();

for(def node: nodes){
    file << "${node.getKey().replace('.md','')}\n"
}
// file << "\n{id: ${node.getValue()}, label: '${node.getKey()}', url: window.location.host + window.location.pathname+'/#!${nodeLinks.get(node.getKey()).replaceAll(absolutePath,'')}', shape: 'dot', size: 10, color: '#000' },"

for(def edge: edges){
    from = edge.key.split(">")[0]
    to = edge.key.split(">")[1]
    file << "${from.replace('.md','')} --> ${to.replace('.md','')} \n"   
}

file << "\n `;"



