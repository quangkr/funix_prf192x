// vim: set ft=javascript foldmethod=marker :
// global variables{{{
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

// Handle form submit event {{{
$('#markform').submit(function(e) {
  // prevent default action of form submitting
  // which would refresh the browser
  e.preventDefault();

  // loop through the form inputs and validate their values
  let hasError = false;
  $('#markform label').each(function() {
    const fieldName = $(this).children('input').attr('name');
    const value = $(this).children('input').val();
    const errorNode = $(this).children('.error-message');

    // assign the values to testScore object
    testScore[fieldName] = fieldName == 'name'
                        ? value
                        : parseFloat(parseFloat(value).toFixed(1));
    
    // don't validate name field
    if (fieldName == 'name') return;

    // append 'error' class and set error message if input is invalid
    if (!validateInputScore(value)) {
      $(this).addClass('error');
      errorNode.text('Hãy nhập số điểm hợp lệ');
      hasError = true;
    } else {
      $(this).removeClass('error');
      errorNode.text('');
    }
  })
  // stop the function if there is any error
  if (hasError) return;

  // create a new row with jquery
  const newRow = $('<tr></tr>');
  newRow.append($('<td></td>').text($('#marksheet tbody tr').length + 1)); // index cell

  // fill table with form data
  const fields = ['name', 'math', 'phys', 'chem'];
  fields.forEach(item => {
    const newCell = $('<td></td>').text(testScore[item])
    newRow.append(newCell);
  });

  // average score would have a default value of '?'
  newRow.append($('<td></td>').text('?'));

  // simple 'X' character for delete icon
  (function (){
    const deleteButton = $('<button></button').text('X');
    deleteButton.addClass('btn');
    deleteButton.addClass('btn--small');
    deleteButton.attr('style', '--btn-bg: var(--color-secondary);');
    deleteButton.on('click', handleDeleteRow);
    const newCell = $('<td></td>');
    newCell.append(deleteButton);
    newRow.append(newCell);
  })();

  // lastly, append the new row to the tbody
  $('#marksheet tbody').append(newRow);

  // reset form state
  $('#markform label').each(function() {
    $(this).children('input').val('');
    $(this).removeClass('error');
    $(this).children('.error-message').text('');
  })
  // set focus on form's first input
  $('#markform input')[0].focus();
  // also reset testScore object
  //testScore = { ...initialTestScore };
});
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

// event listeners{{{
averageScoreButton.addEventListener('click', () => { handleCalculateAverageScore(marksheetBody) });
excellentStudentButton.addEventListener('click', () => { handleDetermineExcellentStudent(marksheetBody) });
//}}}
