

function createTable() {
    /* These lines of code are selecting the HTML elements with the IDs "form2" and "table-container"
    respectively and assigning them to the variables `form` and `tableContainer`. This allows the
    JavaScript code to interact with these elements and manipulate their contents. */
    /* This code is creating a table based on the user's input and displaying it on the webpage. */
    let form = document.querySelector('#form2');
    const tableContainer = document.querySelector('#table-container');
    form.addEventListener('submit', function (event) {
        const selectedSize = document.querySelector('input[name="gender"]:checked').value;
        const numRows = selectedSize;
        const numCols = selectedSize;
        let table = "<table>";
        for (let i = 0; i < numRows; i++) {
            table += "<tr>";
            for (let j = 0; j < numCols; j++) {
                table += "<td style='background-color: gray'></td>";
            }
            table += "</tr>";
        }
        table += "</table>";


        tableContainer.innerHTML = table;
        /* `event.preventDefault();` is preventing the default behavior of the form submission. In this
        case, it is preventing the page from reloading when the form is submitted. */
        event.preventDefault();
    });


}


