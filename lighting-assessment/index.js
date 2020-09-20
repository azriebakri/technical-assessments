var ddlIndex = 0;
var rowIndex = 0;
var data = null
    
$.get 
  ( "https://lightingassessment.free.beeceptor.com/data", function( response ){ // Get API response on the data
    console.log(response); 
    data = JSON.parse(response); //Parse to JSON and store in global variable
    document.getElementById("checkout").innerHTML = newCheckout(0, data); //Initialize default/first dropdownlist
  });

function newCheckout(index, data){ // Create dropdownlist based on the API data
  
  var option = ""; 
  data.map(val => {
    var temp = `<option value="${val.sku}">${val.name}</option>`;
    option = option + temp;
  });
  
  return `<select id=ddl_index_${index} name="ddl" style="margin-right:5px;">` + option + `</select>`;
}

function newRow(index, itemList, itemValue){ // Generate new row of checkout item on click
  return `
  <div id="row_${index}">
    <div style="padding-bottom: 10px;">
      <span>SKUs Scanned: </span>
      <input id="input_id_${index}" type="text" style="width: 400px;" disabled>
    </div>
    <div>
      <span>Total Expected:</span> <span id="value_id_${index}">Not Available</span>
    </div>
  <hr>
  </div>`;
}


function incrementIndex() {
  ddlIndex = ddlIndex + 1;
  $('#checkout').append(newCheckout(ddlIndex,data));
}


function checkout() { // Function to submit item for checkout
  tempDdlIndex = ddlIndex; // Temp copy of dropdownlist count
  ddlIndex = 0; // Reset dropdownlist
  rowIndex = rowIndex + 1; 
  var allSelect = $("select[name='ddl']"); // Select all element with name = ddl
  var selectedItem = [];
  var freeVga = [];
  var selectedItemFinal = '';
  var totalValue = 0;
  
  for(var i = 0; i <= tempDdlIndex; i++){ // Get all select element value and store in an array
    var ddlVal = $('#checkout').children()[i].value;
    selectedItem.push(ddlVal);
  }
  
  data.map(obj => {
    
    var itemPrice = obj.price;  // SKU price
    var tempSelectedItem = selectedItem.filter(filterObj => filterObj === obj.sku); // Filter SKU based on current SKU object
    
    switch(obj.sku) {
      case 'ipd':
        
        if(tempSelectedItem.length > 3) // Apply discount item if item > 3 
          itemPrice = 499.99;
        
        totalValue = totalValue + (itemPrice * tempSelectedItem.length);
        
        break;
      case 'mbp':
        
        var selectedVGA = selectedItem.filter(filterObj => filterObj === 'vga');
        var vgaObj = data.find(findObj => findObj.sku === 'vga');
        var count = tempSelectedItem.length - selectedVGA.length;
        
        if(count > 0){ // Check if mbp count > vga count
          for(var i = 0; i < count; i++){
            freeVga.push('vga'); // Add vga free vga
          }
        } else {
          count = Math.abs(count);
          totalValue = totalValue + (count * vgaObj.price); // Add charges for leftover vga
        }
        
        totalValue = totalValue + (itemPrice * tempSelectedItem.length); // Add mbp total
            
        break;
        
      case 'atv':
        var count = Math.floor(tempSelectedItem.length / 3); // Check if multiplication of 3
        
        if(count > 0){ //
          var calculate = tempSelectedItem.length - count // Subtract the count with the total of atv
          totalValue = totalValue + (itemPrice * calculate);
        } else {
          totalValue = totalValue + (itemPrice * tempSelectedItem.length);
        }     
        
        break;
    }
    
  })  
  
  selectedItem.concat(freeVga).map(obj => {
    selectedItemFinal = selectedItemFinal + ', ' + obj;
  });
  
  
  $('#checkout').empty(); // Remove all dropdownlist
  $('#checkout').append(newCheckout(ddlIndex,data)); // Add default/first dropdownlist
  $('#app').append(newRow(rowIndex)); // Add new checkout row 
  
  $('#input_id_' + rowIndex).val(selectedItemFinal.substr(1)); // Display all scanned item
  $('#value_id_' + rowIndex).text('$' + totalValue); // Display total item
}

