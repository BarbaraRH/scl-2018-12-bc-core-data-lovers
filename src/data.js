

function sortData(data, sortBy, sortOrder){
  let arr = [];
  let value = Object.values(data)[0];
  for (let i = 0; i < value.length; i++){
    arr.push(value[i]);
  }
  if (typeof arr[0][sortBy] == "number") {
    if (sortOrder == "ascendente"){
      return arr.sort(function(a, b){return a[sortBy] - b[sortBy]});
    } else if (sortOrder == "descendente"){
      return arr.sort(function(a, b){return b[sortBy] - a[sortBy]});
    } 
  } else if (typeof arr[0][sortBy] == "string") {    
    if (sortOrder == "ascendente"){
      return arr.sort(function(a, b){ 
        var x = a[sortBy].toLowerCase();
        var y = b[sortBy].toLowerCase();       
        if (x < y) {
          return -1;
        } if (x > y) {
          return 1;
        } else {
          return 0;
        }
      });
    } else if (sortOrder == "descendente"){
      return arr.sort(function(a, b){ 
        var x = a[sortBy].toLowerCase();
        var y = b[sortBy].toLowerCase();       
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


// puedes ver como agregamos la función a nuestro objeto global window

/* const example = () => {
  return 'example';
};

window.example = example; */
