// global variables
const markform = document.getElementById('markform');
const formInputs = document.querySelectorAll('#markform input');
const formLabels = document.querySelectorAll('#markform label');
//const submitButton = document.querySelector('#markform button');

const marksheet = document.getElementById('marksheet');

let testScore = {
  name: '',
  math: 0,
  phys: 0,
  chem: 0,
}

let formError = {
  math: '',
  phys: '',
  chem: '',
}

// score input validator, which check if input is a valid number
// and in the range from 0 to 10
function validateInputScore(value) {
  if (typeof value != 'string' && typeof value != 'number') return false;
  return !isNaN(value)
    && !isNaN(parseFloat(value))
    && parseFloat(value) <= 10
    && parseFloat(value) >= 0;
}

// form handler
function handleSubmit(e) {
  // prevent default action of form submitting
  // which would refresh the browser
  e.preventDefault();

  //// loop through the form inputs and validate their values
  //let hasError = false;
  //formInputs.forEach(item => {
  //  const { parentNode, name, value } = item; // object destructuring
  //  const errorNode = parentNode.children[2];
  //  
  //  // don't validate name field
  //  if (name == 'name') return;

  //  if (!validateInputScore(value)) {
  //    parentNode.classList.add('error');
  //    errorNode.innerText = 'Hãy nhập số điểm hợp lệ';
  //    hasError = true;
  //  } else {
  //    parentNode.classList.remove('error');
  //    errorNode.innerText = '';
  //  }
  //})
  //// stop the function if there is any error
  //if (hasError) return;

  // loop through the form inputs and assign their
  // values to testScore object
  formInputs.forEach(item => {
    const { name, value } = item; // object destructuring
    testScore[name] = name == 'name'
                        ? value
                        : parseFloat(parseFloat(value).toFixed(1));
  })

  console.log(testScore);

  // insert new row into table
  const newRow = marksheet.children[1].insertRow();

  // fill index cell appropriately
  (function (){
    const newCell = newRow.insertCell();
    newCell.appendChild(document.createTextNode((marksheet.rows.length - 1).toString()));
  })();

  // fill table with form data
  const fields = ['name', 'math', 'phys', 'chem'];
  fields.forEach(item => {
    const newCell = newRow.insertCell();
    newCell.appendChild(document.createTextNode(testScore[item]));
  });

  // average score would have a default value of '?'
  (function (){
    const newCell = newRow.insertCell();
    newCell.appendChild(document.createTextNode('?'));
  })();

  // simple 'X' character for delete icon
  (function (){
    const newCell = newRow.insertCell();
    newCell.appendChild(document.createTextNode('X'));
    newCell.classList.add('delete-btn');
  })();

  // reset form state
  //formInputs.forEach(item => {
  //  item.value = '';
  //  item.parentNode.classList.remove('error');
  //  item.parentNode.children[2].innerText = '';
  //})
}

// event listeners
markform.addEventListener('submit', handleSubmit)
