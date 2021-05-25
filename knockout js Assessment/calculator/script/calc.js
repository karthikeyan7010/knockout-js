var CalculatorViewModel = function () {
  this.calculatorDisplay = ko.observable("");
  this.updateCalculatorDisplay = function (value) {
    var res = this.calculatorDisplay().toString();
    var operator;
    if (value == '+' || value == '-' || value == '*' || value == '/' || value == '%') {
      if (res[(res.length) - 1] == '+' || res[(res.length) - 1] == '-' || res[(res.length) - 1] == '*' || res[(res.length) - 1] == '/' || res[(res.length) - 1] == '%') {
        operator = res.substring(0, (res.length) - 1);
        this.calculatorDisplay(operator + value);
      }
      else
        this.calculatorDisplay(this.calculatorDisplay() + value);
    }
    else
      this.calculatorDisplay(this.calculatorDisplay() + value);
  };

  this.clearDisplay = function () {
    this.calculatorDisplay("");
  }

  this.backspace = function () {
    if (this.calculatorDisplay().length) {
      this.calculatorDisplay(this.calculatorDisplay().substring(0, this.calculatorDisplay().length - 1));
    }
  }

  this.evaluateDisplay = function () {
    this.calculatorDisplay(eval(this.calculatorDisplay()).toString());
  }
}
 function restrictCharacters(evt) {

            evt = (evt) ? evt : window.event;
            var charCode = (evt.which) ? evt.which : evt.keyCode;
            if (((charCode >= '48') && (charCode <= '57')) || (charCode == '44')) {
                return true;
            }
            else {
                return false;
            }
        }      
ko.applyBindings(new CalculatorViewModel());