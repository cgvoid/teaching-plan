/* replaced by your json data from database */
var olddata =  {"hash table":{"week":2,"desc":"hash table example"},"linked list":{"week":4,"desc":"linked list example"}} 

var newdata = [{"uri":"new1", "desc": "new1 example"},{"uri":"new2", "desc": "new2 example"}];


function createDiv(content, uri){
    var createDiv = document.createElement("div");
    createDiv.className = "list";  
    createDiv.draggable = "true"; 
    createDiv.contentEditable = "true";
    createDiv.innerHTML = content;
    createDiv.dataset.uri = uri;
    return createDiv;
}

function constructTimetable(olddata, newdata){
    var timeSlot = null, entity = null;
    for(var uri in olddata){
        //console.log(uri);
        for (var key in olddata[uri]){
            if(key == "week"){
                timeSlot = document.getElementById('week'+olddata[uri][key]);
            }
            else{
                entity = createDiv(olddata[uri][key], uri);
            }          
        }
        timeSlot.appendChild(entity); 
    }

    for(var id in newdata){
        var uri = null, content = null;
        for(var key in newdata[id]){
            if(key = "uri"){
                uri = newdata[id][key];
            }
            else{
                content = newdata[id][key];
            }

        }
        timeSlot = document.getElementById('week13');
        entity = createDiv(uri, content);        
        timeSlot.appendChild(entity); 
    }

    /* blank for add */
    for(var i = 1; i <= 13 ; i++){
        timeSlot = document.getElementById('week'+i);
        entity = createDiv("","");
        timeSlot.appendChild(entity); 
    }
}

constructTimetable(olddata, newdata);


var iosDragDropShim = { enableEnterLeave: true };               
var source = document.querySelectorAll('.list'),
    recycle = document.getElementById('recycle'),
    dragElement = null,                                     
    lock = true;                                               

for(var i = 0; i < source.length; i++){
    source[i].addEventListener('dragstart',function(ev){
        dragElement = this;                                     
        this.style.backgroundColor = '#f8f8f8';                
    },false);

    source[i].addEventListener('dragend',function(ev){
        ev.target.style.backgroundColor = '#fff';               
        ev.preventDefault();
    },false)

    source[i].addEventListener('dragenter', function(ev){
        if(dragElement != this){
            this.parentNode.insertBefore(dragElement,this);     
        }
    }, false)

    source[i].addEventListener('dragleave', function(ev){
        console.log(111);
        if(dragElement != this){
            if(lock && (this == this.parentNode.lastElementChild || this == this.parentNode.lastChild)){    
                this.parentNode.appendChild(dragElement);      
                lock = false;
            }else{
                lock = true;
            }
        }
    }, false)
};

recycle.addEventListener('drop', function(ev){              
    dragElement.parentNode.removeChild(dragElement);
}, false)

document.ondragover = function(e){e.preventDefault();}        
document.ondrop = function(e){e.preventDefault();}




function createItem(div, day){
    var item = {"name":"", "displayName": "", "day": 0, "courseCode": ""};
    item["name"] = div.dataset.uri;
    item["displayName"] = div.innerHTML;
    item["day"] = day;
    item["courseCode"] = "";
    return item;
}

function uploadTeachplan() {
    for(var day = 1; day<= 13; day++){
        var weeklyDivlist = document.getElementById('week'+day).querySelectorAll('.list');
        var item = null;
        for(let i = 0; i < weeklyDivlist.length; i++){
            if(weeklyDivlist[i].innerHTML){
                item = createItem(weeklyDivlist[i], day);
                //updateItem(item); 
            }
            
        }
    }
}

document.querySelector('#upJS').addEventListener('click', uploadTeachplan);
