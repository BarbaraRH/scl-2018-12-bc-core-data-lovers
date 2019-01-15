
window.processData = {

  filterData: (data, condition) => {  
    let filteredData = [];
    for (let i = 0; i < data.length; i++){
      if(data[i].egg === condition) {
        filteredData.push(data[i]);
      }
      for (let j=0; j < data[i]["type"].length; j++){
        if (data[i].type[j] === condition){
          filteredData.push(data[i]);
        }
      }   
    }
    return filteredData;
  },

  percentageFilteredData: (filteredData, data) => {  
    return ((filteredData.length*100)/data.length).toFixed(2); 
  },

  sortData: (data, sortBy, sortOrder) => { 
    /* se utiliza metodo sort() aprendido aquí https://www.w3schools.com/js/js_array_sort.asp para números y strings */
    /* lo siguiente ordena según valor numérico, dividiendose en ascendente(true) y descendente(false) */
    if (typeof data[0][sortBy] === "number") {
      if (sortOrder === true){
        return data.sort(function(a, b){return a[sortBy] - b[sortBy]});
      } else if (sortOrder == false){
        return data.sort(function(a, b){return b[sortBy] - a[sortBy]});
      } 
    /* lo siguiente ordena según valor string, dividiendose en ascendente(true) y descendente(false) */
    } else if (typeof data[0][sortBy] === "string") {    
      if (sortOrder === true){
        return data.sort(function(a, b){ 
          let x = a[sortBy].toLowerCase();
          let y = b[sortBy].toLowerCase();       
          if (x < y) {
            return -1;
          } if (x > y) {
            return 1;
          } else {
            return 0;
          }
        });
      } else if (sortOrder == false){
        return data.sort(function(a, b){ 
          let x = a[sortBy].toLowerCase();
          let y = b[sortBy].toLowerCase();       
          if (x < y) {
            return 1;
          } if (x > y) {
            return -1;
          } else {
            return 0;
          }
        }); 
      }  
    }
  }
}
