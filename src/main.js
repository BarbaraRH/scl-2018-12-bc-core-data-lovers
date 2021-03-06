
const strengths = {
    "Normal":["None"], 
    "Fighting":["Normal", "Rock", "Steel", "Ice", "Dark"],
    "Flying":["Fighting", "Bug", "Grass"],
    "Poison":["Grass", "Fairy"],
    "Ground":["Poison", "Rock", "Steel", "Fire", "Electric"],
    "Rock":["Flying", "Bug", "Fire", "Ice"],
    "Bug":["Grass", "Psychic", "Dark"],
    "Ghost":["Ghost", "Psychic"],
    "Fire":["Bug", "Steel", "Grass", "Ice"],
    "Water":["Ground", "Rock", "Fire"],
    "Grass":["Ground", "Rock", "Water"],
    "Electric":["Flying", "Water"],
    "Psychic":["Fighting", "Poison"],
    "Ice":["Flying", "Ground", "Grass", "Dragon"],
    "Dragon":["Dragon"]
}

function addStrength(data, obj) {
    let strengthAdded = data;
    for (let i = 0; i< strengthAdded.length; i++) {
        strengthAdded[i].strengths = [];  
        for (let j = 0; j< strengthAdded[i]["type"].length; j++){
            for(let strength in obj) {
                if(strengthAdded[i].type[j] === strength){
                    for(let k=0; k < obj[strength].length; k++){                        
                        if((strengthAdded[i].strengths).includes(obj[strength][k]) == false){
                            (strengthAdded[i].strengths).push(obj[strength][k]);
                        }
                    }                    
                }
            }
        }        
    }
    return strengthAdded;
}

/* al apretar en el logo se refresca la página */
document.getElementById("pokemon-go").addEventListener("click", function(){
    location.reload();
})

let table = document.getElementById("myTable"); 
/* table es la tabla inicial que despliega toda la Data, 
aquí se conecta su espacio con el html */

function arrayToTable(arr, table){
    table.innerHTML = "";
    for (let i = arr.length-1; i >= 0; i--){  
        const row = table.insertRow(0);
        row.innerHTML = 
        `<tr>    
            <td>${arr[i]["id"]}<div class="mobile"><img class="mobile img" src="${arr[i]["img"]}"><br>tipo:<br>${arr[i]["type"].join('<br>')}<br></div></td>
            <td><strong>${arr[i]["name"]}</strong><br><div class="mobile"><br>debilidades:<br>${arr[i]["weaknesses"].join('<br>')}</div></td>
            <td class="large"><img class="img" src="${arr[i]["img"]}"></td>
            <td class="large">${arr[i]["type"].join('<br>')}</td>
            <td class="large">${arr[i]["strengths"].join('<br>')}</td>
            <td class="large"><div class="laptop">${arr[i]["weaknesses"].join('<br>')}</div></td>
            <td>${arr[i]["spawn_time"]}<div class="mobile"><br>fortalezas:<br>${arr[i]["strengths"].join('<br>')}</div></td>            
        </tr>`
    }
}

/* se declara variable que guarda arreglo de objetos pokemon */
let updatedData = addStrength((window.POKEMON).pokemon, strengths);

/* con esta sentencia se pide el despliegue de la tabla con toda la data */  
arrayToTable(updatedData, table); 

/* se declara arreglo con id de botones para ordenar, que son los mismos que tomaran el parámetro "sortBy" 
en las funciones displaySorting(en main.js) y sortData(en data.js)*/
const arrProperties = ["id", "name", "spawn_time"];

/* se declara arreglo con id de botones para filtrar, que son los mismos que tomaran el parámetro "condition" 
en las funciones displayFilter(en main.js) y filterData(en data.js)*/
const arrTypes = ["Fire", "Dragon", "Electric", "Fighting", "Bug", "Flying", "Ghost", "Grass", "Ground", "Ice", "Normal", "Poison", "Psychic", "Rock", "Water", "2 km", "5 km", "10 km", "Not in Eggs"];

/* función que permitirá llamar a los 2 arreglos anteriores para que cada elemento pase como un argumento de las funciones displaySorting y DisplayFilter*/
function iterate(display, keyArray, objectArray){
    for (let i = 0; i< keyArray.length; i++){        
        display(keyArray[i],objectArray);
    }
}

/* función para dejar todos los botones en formato "reseteado", como al inicio */
function refreshButtons(buttonArray){
    for (let i = 0; i< buttonArray.length; i++){        
        document.getElementById(buttonArray[i]).style.background = "white";  
    }
}

/* se llama a refrescar los botones de ordenado y filtrado utilizando la función anterior*/
refreshButtons(arrTypes);
refreshButtons(arrProperties);

/* función que llama a sortData.js(en data.js) cuando se apreten los botones de ordenado */
function displaySorting(sortBy,objectArray){
    const sortButton = document.getElementById(sortBy).style;   
    let counter = 0; 
    document.getElementById(sortBy).addEventListener("click", function(){ 
        let sortOrder = true; 
        if (counter % 2 === 0){ 
            refreshButtons(arrProperties); 
            sortButton.background = "lightblue";  
            counter += 1    
            return arrayToTable(window.processData.sortData(objectArray, sortBy, sortOrder), table);             
        } else { 
            counter += 1  
            refreshButtons(arrProperties);
            sortButton.background = "lightblue";  
            sortOrder = false;         
            return arrayToTable(window.processData.sortData(objectArray, sortBy, sortOrder), table);                     
        }                  
    })  
}

/* función que llama a filterData.js(en data.js) cuando se apreten los botones de filtrado */
function displayFilter(condition,objectArray){
    const filteredData = window.processData.filterData(objectArray, condition); 
    const filterButton = document.getElementById(condition).style; 
    let percent = document.getElementById("percent");
    document.getElementById(condition).addEventListener("click", function(){ 
        if (filterButton.background === "white"){          
            refreshButtons(arrTypes); 
            refreshButtons(arrProperties);             
            filterButton.background = "lightgrey"; 
            percent.style.display = "block"
            percent.innerHTML = `${window.processData.percentageFilteredData(filteredData, updatedData)} % de los pokemones son de tipo ${condition}`;                      
            iterate(displaySorting, arrProperties, filteredData);                     
            return arrayToTable(filteredData, table);                                     
        } else {          
            filterButton.background = "white";
            percent.style.display = "none";         
            refreshButtons(arrProperties);
            iterate(displaySorting, arrProperties, updatedData); 
            return arrayToTable(updatedData, table);
        }                  
    })      
} 

iterate(displaySorting, arrProperties, updatedData);
iterate(displayFilter, arrTypes, updatedData);  
