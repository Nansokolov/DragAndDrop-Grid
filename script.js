const createTable = () => {
    let createdTable = [];
    // Очищаем текущую таблицу перед созданием новой.
    createdTable = [];
    const rowValue = document.getElementById("row").value;
    const colValue = document.getElementById("col").value;
    const tablePlace = document.getElementById("tablePlace");
    tablePlace.innerHTML = "";
  
    let comp = document.createElement("div")
    comp.className = "container";
    comp.style.display = "grid";
    comp.style.gridTemplateColumns = "repeat("+colValue+", 1fr)";

    for (let i = 0; i < rowValue; i++) {
      for (let j = 0; j < colValue; j++) {
        comp.innerHTML += `<div class="defaultBlock" pw="1" ph="1" posx="${i}" posy="${j}">data ${i} ${j}</div>`;
      }
    }
    tablePlace.appendChild(comp);
    allowDrop();
    // localStorage.setItem("createdTable", JSON.stringify(createdTable));
  };

  const allowDrop = () => {
    const table = document.getElementById("tablePlace");
  
    table.addEventListener("dragover", (event) => {
      event.preventDefault();
      
    //   console.log(event.target.getAttribute("posx"))
    //   console.log(event.target.getAttribute("posy"))
    });
    table.addEventListener("drop", (event, target) => {
      event.preventDefault();
    //   console.log(event)
    //   console.log(target)
    //   console.log(event.target)
    //   console.log(event.srcElement.getAttribute("pw"))
    //   console.log(event.target.getAttribute("posx"))
    //   console.log(event.target.getAttribute("posy"))

    //   console.log(event.target.getAttribute("data-cell-id"));
    //   let dropPosition = event.target.getAttribute("data-cell-id").split("_");
    //   let componentData = JSON.parse(event.dataTransfer.getData("text"));
    //   console.log(dropPosition, componentData.data);
    //   placeComponent(dropPosition, componentData.data);
    });
  };

let items = document.querySelectorAll('.draggable');
items.forEach(function (item) {
  item.addEventListener('dragstart', handleDragStart);
  item.addEventListener('dragend', handleDragEnd);
//   item.addEventListener('dragenter', handleDragEnter);
//   item.addEventListener('dragleave', handleDragLeave);
});
function handleDragStart(e) {
  this.style.opacity = '0.4';
  this.style.background = 'green';
  // console.log(e.target)
  // console.log(target)
  // console.log( document.elementFromPoint(e.clientX, e.clientY))
}
function handleDragEnter(e) {
//   this.style.opacity = '0.4';
  this.style.background = 'orange';
  console.log(e.target)
}
function handleDragLeave(e) {
//   this.style.opacity = '0.4';
  this.style.background = 'pink';
  console.log(e.target)
}
function handleDragEnd(e) {
  this.style.opacity = '1';
  this.style.background = 'red';
  
  if(document.elementFromPoint(e.clientX, e.clientY).className == "defaultBlock"){
      insertElement( document.elementFromPoint(e.clientX, e.clientY).getAttribute("posx"), document.elementFromPoint(e.clientX, e.clientY).getAttribute("posy"),this.getAttribute("pw"), this.getAttribute("ph"))
  }else{
      console.log("missed")
  }
}

function insertElement(x,y, width, height){
    let comp = document.createElement("div")
    comp.className = "createdElement";
    // comp.style.display = "block";
    comp.style.background = "red";
    let xend = +x+1 + +height;
    let yend = +y+1 + +width;    
    let xstart = +x+1;
    let ystart = +y+1;
    console.log("width: "+width)
    console.log("x: "+x)
    console.log("height: " + height)
    console.log("y: " + y)
    console.log(xend)
    console.log(yend)
    comp.style.gridRow = xstart+" / "+xend;
    comp.style.gridColumn = ystart+" / "+yend;

    const container = document.getElementsByClassName("container")[0];
    container.append(comp)
    // Removing existing blocks
    let existing = container.getElementsByClassName("defaultBlock");
    let toRemove = [];
    for(let i = 0; i<existing.length; i++){
        if(existing[i].getAttribute("posx") >= x && existing[i].getAttribute("posx") <= xend-2 ){
            if(existing[i].getAttribute("posy") >= y && existing[i].getAttribute("posy") <= yend-2 ){
                console.log(existing[i]);
                toRemove.push(existing[i])
            }
        }
    }
    console.log(toRemove);
    toRemove.forEach(element => {
        element.style.display = "none";
    });
    // console.log(x)
    // console.log(y)
}
