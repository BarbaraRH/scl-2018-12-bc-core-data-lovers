/* al apretar en el logo se refresca la página */
document.getElementById("pokemon-go").addEventListener("click", function(){
    location.reload();
})

let table = document.getElementById("myTable"); 
/* table es la tabla inicial que despliega toda la Data, 
aquí se conecta su espacio con el html */

function arrayToTable(arr, table){
/* se define función para hacer tablas con los parametros indicados dentro de la tabla
link del método https://www.w3schools.com/jsref/met_table_insertrow.asp */
    table.innerHTML = "";
    for (let i = arr.length-1; i >= 0; i--){  
        const row = table.insertRow(0);
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        const cell4 = row.insertCell(3);
        const cell5 = row.insertCell(4);
        const cell6 = row.insertCell(5);
        cell1.innerHTML = arr[i]["id"];
        cell2.innerHTML = arr[i]["name"];
        cell3.innerHTML = '<img id="img" src="'+arr[i]["img"]+'"/>'; 
        cell4.innerHTML = arr[i]["type"];
        cell5.innerHTML = arr[i]["weaknesses"];
        cell6.innerHTML = arr[i]["spawn_time"];
    }
}

/* se declara variable que guarda arreglo de objetos pokemon */
let data = (window.POKEMON).pokemon;

/* con esta sentencia se pide el despliegue de la tabla con toda la data */  
arrayToTable(data, table); 

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
    let percent = document.getElementById("percent")
    document.getElementById(condition).addEventListener("click", function(){ 
        if (filterButton.background === "white"){          
            refreshButtons(arrTypes); 
            refreshButtons(arrProperties);             
            filterButton.background = "lightgrey"; 
            percent.style.display = "block"
            percent.innerHTML = window.processData.percentageFilteredData(filteredData, data) + "% de los pokemones son de tipo " + condition + ".";                      
            iterate(displaySorting, arrProperties, filteredData);                     
            return arrayToTable(filteredData, table);                                     
        } else {          
            filterButton.background = "white";
            percent.style.display = "none";         
            refreshButtons(arrProperties);
            iterate(displaySorting, arrProperties, data); 
            return arrayToTable(data, table);
        }                  
    })      
} 

iterate(displaySorting, arrProperties, data);
iterate(displayFilter, arrTypes, data);  