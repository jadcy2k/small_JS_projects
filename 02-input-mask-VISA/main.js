// Variables
let current = "";
let cardNumber = [];
let dateNumber = [];
let cvvdNumber = [];

// Get references:
const $ = (selector) => document.querySelector(selector);

// Create masks:
const maskNumber = '####-####-####-####';
const maskDate = '##/##';
const maskCVV = '###';
// --------------------------------------------------------

// Keydown event for 'CARD Nr':
$('#inputCard').addEventListener ("keydown", e =>{
  if (e.key === 'Tab') return;
  e.preventDefault();
  handleInput (maskNumber, e.key, cardNumber);
  $('#inputCard').value = cardNumber.join('');
});
// --------------------------------------------------------
// Keydown event for 'DATE':
$('#inputDate').addEventListener ("keydown", e =>{
  if (e.key === 'Tab') return;
  e.preventDefault();
  handleInput (maskDate, e.key, dateNumber);
  $('#inputDate').value = dateNumber.join('');
});
// --------------------------------------------------------
// Keydown event for 'CVV':
$('#inputCVV').addEventListener ("keydown", e =>{
  if (e.key === 'Tab') return;
  e.preventDefault();
  handleInput (maskCVV, e.key, cvvdNumber);
  $('#inputCVV').value = cvvdNumber.join('');
});
// --------------------------------------------------------

// Handle the input key:
const handleInput = (mask, key, arr) => {
  let allowedChars = ['1','2','3','4','5','6','7','8','9','0'];
  if (key === 'Backspace' && arr.length > 0){
    arr.pop();
    return;
  }

  if (allowedChars.includes(key) && arr.length + 1 <= mask.length ){
    if (mask[arr.length] === '-' || mask[arr.length] === '/'){
      arr.push(mask[arr.length], key); //two elements.
    }else{
      arr.push(key); // only one element.
    }
  }  
}
// --------------------------------------------------------

// Clear button:
$("#clearBtn").addEventListener('click', () => {
  $('#inputCard').value = "";
  $('#inputDate').value = "";
  $('#inputCVV').value = "";
  cardNumber = [];
  dateNumber = [];
  cvvdNumber = [];
});

