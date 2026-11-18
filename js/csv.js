async function getData() {
    const response = await fetch('../data/test.csv');   // .. moves you up one file level
    const data = await response.text(); 
    // console.log(data);

    // \n - new line character
    // split('\n') - will seperate the table into an array of individual rows
    // slice(Start, end) - return a new array starting at the index "start" up to "end"

    const table = data.split('\n').slice(1); // Split by line and remove the first row
    // console.log(table)

    table.forEach(row => {
        const columns = row.split(','); // Split each row into columns at each comma
        const year = columns[0];        // assign the year (type: string)
        const temp = columns[1];        // global temp (type: string)
        const nhTemp = columns[2];      // northern hemisphere temp (type: string)
        const shTemp = columns[3];      // southern hemisphere temp (type: string)
        console.log(year, temp, nhTemp, shTemp);
        // Will you parseFloat() all string values to work with them numerically?
    })
}

getData()