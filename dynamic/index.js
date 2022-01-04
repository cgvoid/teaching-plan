/* replaced by your json data from database */
var olddata =  {"hash table":{"week":2,"desc":"hash table example"},"linked list":{"week":4,"desc":"linked list example"}} 

var newdata = [{"uri":"new1", "desc": "new1 example"},{"uri":"new2", "desc": "new2 example"}];


function createDiv(content){
    var createDiv = document.createElement("div");
    createDiv.className = "list";  
    createDiv.draggable = "true"; 
    createDiv.contentEditable = "true";
    createDiv.innerHTML = content;
    return createDiv;
}

function constructTimetable(olddata, newdata){
    var timeSlot = null, entity = null;
    for(var uri in olddata){
        for (var key in olddata[uri]){
            if(key == "week"){
                timeSlot = document.getElementById('week'+olddata[uri][key]);
            }
            else{
                entity = createDiv(olddata[uri][key]);
            }          
        }
        timeSlot.appendChild(entity); 
    }

    for(var id in newdata){
        for(var key in newdata[id])
        timeSlot = document.getElementById('week13');
        if(key == "desc") {
            entity = createDiv(newdata[id][key]);
        }         
        timeSlot.appendChild(entity); 
    }

    /* blank for add */
    for(var i = 1; i <= 13 ;i++){
        timeSlot = document.getElementById('week'+i);
        entity = createDiv("");
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
