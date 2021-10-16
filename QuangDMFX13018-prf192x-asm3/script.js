// vim: set ft=javascript foldmethod=marker :
// global variables{{{
const marksheetBody = $('#marksheet tbody');

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
    deleteButton.click(function() {
      $(this).parent().parent().remove();
    });
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
  $('#markform label:first-child input').focus();
  // also reset testScore object
  testScore = { ...initialTestScore };
});
//}}}

// Handle calculate average score button {{{
$('#avg-score-btn').click(function() {
  $('#marksheet tbody tr').each(function() {
    // use array destructuring
    const [ , , math, phys, chem ] = $(this).children().map(function() {
      return $(this).text();
    }).toArray();

    const sumScore = [ math, phys, chem ].reduce((avg, score) => avg + parseFloat(score), 0)
    const avgScore = (sumScore / 3).toFixed(1);

    $(this).children(":nth-child(6)").text(avgScore);
  });
});
//}}}

// Handle excellent student button {{{
$('#excel-student-btn').click(function() {
  $('#marksheet tbody tr').each(function() {
    const avgScore = $(this).children(":nth-child(6)").text();

    if ( parseFloat(avgScore) >= 8 ) {
      $(this).addClass('excel-std');
    } else {
      $(this).removeClass('excel-std');
    }
  });
});
//}}}

// Handle recalculate indices event {{{
$('#recalc-idx-btn').click(function() {
  $('#marksheet tbody tr td:first-child').text(function(index) {
    return index + 1;
  });
});
//}}}
