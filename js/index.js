$(document).ready(function() {
  
  /* TO-DO
      fix eg. 2.3.4 being able to be input
  */
  
  // variable for when an operator button has been pressed
  var operatorPressed = true;
  //variable for when decimal point has been pressed
  var decimalPressed = false;

  // set display on load    
  $("#display").val("0");
  
  // limit the display to 10 digits
  function displayLength(number) {
    if (number.length > 9) {
      $("#display").val(number.substr(0, number.length - 8));
    }
  };

  // when clicking a number
  $(".number").click(function() {
    if (calc.answer.value === "0") {
      calc.answer.value = "";
      calc.answer.value += this.value;
      operatorPressed = false;
      decimalPressed = false;
      displayLength(calc.answer.value);
    } else {
      calc.answer.value += this.value;
      operatorPressed = false;
      decimalPressed = false;
      displayLength(calc.answer.value);
    }
  });
  
  // when clicking the decimal point
  $(".decimal").click(function() {
    if (calc.answer.value === "0" && decimalPressed == false) {
      calc.answer.value = "";
      calc.answer.value += "0.";
      operatorPressed = false;
      decimalPressed = true;
      displayLength(calc.answer.value);
    } else if (calc.answer.value !== "0" && operatorPressed == false && decimalPressed == false) {
      calc.answer.value += this.value;
      operatorPressed = false;
      decimalPressed = true;
      displayLength(calc.answer.value);
    } else if (operatorPressed == true) {
      calc.answer.value += "0.";
      operatorPressed = false;
      decimalPressed = true;
      displayLength(calc.answer.value);
    } 
    
  });

  // when clicking an operator
  $(".operator").click(function() {
    if (operatorPressed == false && decimalPressed == false) {
      calc.answer.value += this.value;
      operatorPressed = true;
      decimalPressed = true;
      displayLength(calc.answer.value);
    } else {
      // display error if operator was last button pressed
      // or no numbers have been entered
      calc.answer.value = "Err";
    }
  });
 
  // calculate the answer
  $("#equals").click(function() {
    // replace 'x' with '*'
    calc.answer.value = calc.answer.value.replace(/[x]+/g, "*");
    calc.answer.value = eval(calc.answer.value);
    displayLength(calc.answer.value);
  });

  // clear the display
  $("#clearall").click(function() {
    $("#display").val("0");
  });

  // undo the last button press
  $("#clear").click(function() {
    var c = calc.answer.value;
    c = c.slice(0, -1);
    $("#display").val(c);
  });

  // +/- toggle button to make calculations negative
  // or remove negation
  $("#minus").click(function() {
    var c = calc.answer.value;
    var minus = "-";
    if (c.startsWith('-')) {

      c = c.slice(1, c.length);
      $("#display").val(c);

    } else {

      c = minus.concat(c);
      $("#display").val(c);
    }
  });
});