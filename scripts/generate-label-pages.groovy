
@Grab(group='commons-io', module='commons-io', version='2.6')
import groovy.io.FileType
import org.apache.commons.io.FileUtils


//Clean existing tag pages

File tagsFolder = new File("tags")
FileUtils.cleanDirectory(tagsFolder)

File tagsFile = new File("tags.md")
FileUtils.deleteQuietly(tagsFile)
tagsFile.createNewFile()

// Create new tag pages and fill them
def list = []


tagsFile << "# Tags \n \n tags: "

def dir = new File(".")
dir.eachFileRecurse (FileType.FILES) { file ->
  list << file
}

for(def file: list.sort{it.lastModified()}.reverse()){
   if(file.toString().contains('.md') && !file.toString().contains('tags.md')) {
     
        def line;
        fileContent = ""
        fileTitle = ""
        file.withReader { reader ->
            while ((line = reader.readLine()) != null) {
                if(line.contains("# ")){
                    if(line.contains("##")){
                        fileContent += line.replace("##","###") +"\n"
                    } else {
                        fileTitle += line
                    }
                }else if(!line.contains("tags:")){
                    fileContent += line +"\n"
                }
            }
        }

        file.withReader { reader ->
            while ((line = reader.readLine()) != null) {
                if(line.contains("tags:")  && !line.contains("* tags:")){
                    tags = line.replace("tags:","").split(",")

                    for(def tag : tags){
                        File tagFile = new File("tags/"+tag.trim()+".md")

                        if(!tagFile.exists()){
                            tagsFile << tag.trim()+ ", ";
                            tagFile.createNewFile();
                            tagFile << "\n# tag: "+tag.trim()+"\n"
                        }

                        if(tag.trim().contains("microblog") && !file.toString().equals(tagFile.toString())){
                            tagFile << "\n<div class=\"micropost\">\n"
                            tagFile << "<a href=\"../1x#@"+fileTitle.trim().replace("# 1x#@","")+"\">`"+fileTitle.replace("# ","")+"`</a><br>"
                            tagFile << "<br>\n"+fileContent + "\n\n<br><br>"
                            for(def tag2 : tags){
                                if(tag2.trim() != 'microblog') tagFile << '<a class="tag" href="#!tags/'+tag2.trim()+'.md">'+tag2.trim()+'</a>'
                            }
                            tagFile << "\n</div>\n"
                            
                            
                        } else if(tag.trim().contains("-notes") && !file.toString().equals(tagFile.toString())){
                            tagFile << "\n\n#"                            
                            tagFile << fileTitle 
                            //tagFile << "\n\n Published at "+getSections(file)+" ["+getTitle(file)+"](../"+file.toString().replace("./","")+")\n\n"
                            tagFile << "\n\n"
                            for(def tag2 : tags){
                                tagFile << '  <a class="tag" href="#!tags/'+tag2.trim()+'.md">'+tag2.trim()+'</a>'
                            }
                            tagFile << "\n\n  --- \n"+fileContent + "\n\n --- \n"
                            
                        } else {

                            //tagFile << "\n * "+getSections(file)+" ["+getTitle(file)+"](../"+file.toString().replace("./","")+")\n\n"
                            tagFile << "\n * **["+getTitle(file)+"](../"+file.toString().replace("./","")+")**\n\n"

                            tagFile << "  * Tags:"
                            for(def tag2 : tags){
                                tagFile << '  <a class="tag" href="#!tags/'+tag2.trim()+'.md">'+tag2.trim()+'</a>'
                            }
                        }
    

                    }
                }
            }
        }
   }
}

// Retrieves the title of a given md file
def getTitle(File file){

        def line;

        file.withReader { reader ->
            while ((line = reader.readLine()) != null) {
                if(line.contains("#")){
                    return line.replace("#","").trim();
                }
            }
        } 
}

// Returns the tags of a given md file
def getTags(File file){

        def line;

        file.withReader { reader ->
            while ((line = reader.readLine()) != null) {
                if(line.contains("tags:")){
                   return line.replace("tags:","").split(",")
                }
            }
        } 
}

// Returns the tags of a given md file
def getSections(file){

    if(!file.toString().contains('/')) return ""

    String[] sections = file.toString().split("/");

    String result = "";
    String incremental = "";
    
    for(def section : sections){

        if(!section.equals(".") && !section.equals("content") && !section.equals(sections[sections.length-1])){
            result +="["+section+"](../content/"+incremental + section+".md)" + " > ";
            incremental += section+"/"
        }
    }

    return result;

}

tagsFile << ""