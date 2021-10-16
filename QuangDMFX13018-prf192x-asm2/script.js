// vim: set ft=javascript foldmethod=marker :
// global variables{{{
const markform = document.getElementById('markform');
const formInputs = document.querySelectorAll('#markform input');
const formLabels = document.querySelectorAll('#markform label');
const marksheet = document.getElementById('marksheet');
const marksheetBody = document.querySelector('#marksheet tbody')
const averageScoreButton = document.getElementById('avg-score-btn');
const excellentStudentButton = document.getElementById('excel-student-btn');

const initialTestScore = {
  name: '',
  math: 0,
  phys: 0,
  chem: 0,
};

let testScore = { ...initialTestScore };
//}}}

/** @description Validate score inputs{{{
  * @param {string} value - input value to be validated
  * @returns {boolean} Whether input value is a valid number
  * and is in the range from 0 to 10
  */
function validateInputScore(value) {
  if (typeof value != 'string' && typeof value != 'number') return false;
  return !isNaN(value)
    && !isNaN(parseFloat(value))
    && parseFloat(value) <= 10
    && parseFloat(value) >= 0;
}
//}}}

/** @description Recalculate row indices{{{
  * @param {HTMLTableElement} table - the table element to work on
  * @param {number} startRow - only update indices from this row
  * @param {number} indexCol - specify indices' column
  */
function recalculateRowIndices(table, startRow = 0, indexCol = 0) {
  // Array.from() is necessary because table.rows is an HTMLTableElement
  Array.from(table.rows).forEach(row => {
    if (row.rowIndex - 1 < startRow) {
      return
    } else {
      row.cells[indexCol].innerText = row.rowIndex;
    }
  });
}
//}}}

/** @description Handle delete row event{{{
  * @param {Event} e - this event should be emitted from a row inside a table
  */
function handleDeleteRow(e) {
  e.preventDefault();
  const row = e.target.parentNode.parentNode;
  const table = e.target.parentNode.parentNode.parentNode;

  table.deleteRow(row.rowIndex - 1);
  recalculateRowIndices(table, row.rowIndex);
}
//}}}

/** @description Handle form submit event{{{
  * @param {Event} e - this event should be emitted from a form
  */
function handleSubmit(e) {
  // prevent default action of form submitting
  // which would refresh the browser
  e.preventDefault();

  // loop through the form inputs and validate their values
  let hasError = false;
  formInputs.forEach(item => {
    const { parentNode, name, value } = item; // object destructuring
    const errorNode = parentNode.children[2];
    
    // don't validate name field
    if (name == 'name') return;

    if (!validateInputScore(value)) {
      parentNode.classList.add('error');
      errorNode.innerText = 'Hãy nhập số điểm hợp lệ';
      hasError = true;
    } else {
      parentNode.classList.remove('error');
      errorNode.innerText = '';
    }
  })
  // stop the function if there is any error
  if (hasError) return;

  // loop through the form inputs and assign their
  // values to testScore object
  formInputs.forEach(item => {
    const { name, value } = item; // object destructuring
    testScore[name] = name == 'name'
                        ? value
                        : parseFloat(parseFloat(value).toFixed(1));
  })

  // insert new row into table
  const newRow = marksheetBody.insertRow();

  // fill index cell appropriately
  (function (){
    const newCell = newRow.insertCell();
    newCell.appendChild(document.createTextNode((marksheetBody.rows.length).toString()));
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
    const button = document.createElement('button');
    button.classList.add('btn');
    button.classList.add('btn--small');
    button.style = '--btn-bg: var(--color-secondary);'
    button.innerText = 'X';
    button.addEventListener('click', handleDeleteRow);

    newCell.appendChild(button);
  })();

  // reset form state
  formInputs.forEach(item => {
    item.value = '';
    item.parentNode.classList.remove('error');
    item.parentNode.children[2].innerText = '';
  })
  // set focus on form's first input
  formInputs[0].focus();
  // also reset testScore object
  testScore = { ...initialTestScore };
}
//}}}

/** @description Handle calculate average score button{{{
  * @param {HTMLTableElement} table - the table that contains the data to work on
  */
function handleCalculateAverageScore(table) {
  Array.from(table.rows).forEach(row => {
    const [ , , math, phys, chem ] = Array.from(row.cells);

    const sumScore = [ math, phys, chem ].reduce((avg, score) => avg + parseFloat(score.innerText), 0)
    const avgScore = (sumScore / 3).toFixed(1);

    row.cells[5].innerText = avgScore;
  });
}
//}}}

/** @description Handle excellent student button{{{
  * @param {HTMLTableElement} table - the table that contains the data to work on
  */
function handleDetermineExcellentStudent(table) {
  Array.from(table.rows).forEach(row => {
    const avgScore = row.cells[5].innerText;

    if ( parseFloat(avgScore) >= 8 ) {
      row.classList.add('excel-std');
    } else {
      row.classList.remove('excel-std');
    }
  });
}
//}}}

// event listeners{{{
markform.addEventListener('submit', handleSubmit);
averageScoreButton.addEventListener('click', () => { handleCalculateAverageScore(marksheetBody) });
excellentStudentButton.addEventListener('click', () => { handleDetermineExcellentStudent(marksheetBody) });
//}}}
