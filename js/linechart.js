/* 
    this script file will demonstrate how to create a scatter plot
    Values are temperature differences from the mean of 14 deg-C.
*/

async function getData() {
    const response = await fetch('data/data.csv'); // .. to move up one folder
    const data  = await response.text();
    // console.log(data);

    const times = [];  // x-axis labels = years
    const white_value = [];  // y-axis labels = global temperatures
    const dark_value = [];// y-axis = Norhtern Hemisphere temps
    const red_value = [];// y-axis = Southern Hemisphere temps
    const green_value = [];// y-axis = Southern Hemisphere temps
    const blue_value = [];// y-axis = Southern Hemisphere temps

    // \n - new line character
    const table = data.split('\n').slice(1); // split the data into rows and remove the first row (header)
    // console.log(table);

    table.forEach(row => {
        const columns = row.split(',');         // split each row into columns
        const time = parseFloat(columns[0]);    // assign year value
        times.push(time);                      // push year value to times array

        const white = parseFloat(columns[1]);   // assign global temperature value
        white_value.push(white);                  // push the global data value to white_value

        const dark = parseFloat(columns[2]); // assign Northern Hemisphere temperature value
        dark_value.push(dark);               // push the Northern Hemisphere data value to dark

        const red = parseFloat(columns[3]); // assign Southern Hemisphere temperature value
        red_value.push(red);               // push the Southern Hemisphere data value to red

        const green = parseFloat(columns[4]); // assign Southern Hemisphere temperature value
        green_value.push(green);               // push the Southern Hemisphere data value to green

        const blue = parseFloat(columns[5]); // assign Southern Hemisphere temperature value
        blue_value.push(blue);               // push the Southern Hemisphere data value to blue
        console.log(time, white, dark, red, green, blue);
    });
    return {times, white_value, dark_value, red_value, green_value, blue_value};// Use {} to return multiple values as an object
}

async function createChart() {
    const data = await getData();       // Wait until getData() processes
    const lineChart = document.getElementById('lineChart');     // Get the html element that will hold the chart
    const degreeSymbol = String.fromCharCode(172); // Unicode for degree symbol
    const myChart = new Chart(lineChart, {  // Construct the chart    
        type: 'line',
        data: {                         // Define data
            labels: data.times,        // x-axis labels
            datasets: [                 // Each object describes one dataset of y-values
                                        //  including display properties.  To add more datasets, 
                                        //  place a comma after the closing curly brace of the last
                                        //  data set object and add another dataset object. 
                {
                    label:    `Dissolved Oxygen Value for white color`,     // Dataset label for legend
                    data:     data.white_value,    // Reference to array of y-values
                    fill:     false,           // Fill area under the linechart (true = yes, false = no)
                    borderColor:      'rgb(169, 155, 162)',      // Color for data marker border
                    borderWidth:      1   // Data marker border width
                },
                {
                    label:    `Dissolved Oxygen Value for dark color`,     // Dataset label for legend
                    data:     data.dark_value,    // Reference to array of y-values
                    fill:     false,           // Fill area under the linechart (true = yes, false = no)
                    borderColor:      'rgb(0, 0, 0)',      // Color for data marker border
                    borderWidth:      1,   // Data marker border width
                    tension: 0.4           // Smoothness of line.
                },
                {
                    label:    `Dissolved Oxygen Value for red color`,     // Dataset label for legend
                    data:     data.red_value,    // Reference to array of y-values
                    fill:     false,           // Fill area under the linechart (true = yes, false = no)
                    borderColor:      'rgba(255, 0, 0, 1)',      // Color for data marker border
                    borderWidth:      1,   // Data marker border width
                },
                {
                    label:    `Dissolved Oxygen Value for green color`,     // Dataset label for legend
                    data:     data.blue_value,    // Reference to array of y-values
                    fill:     false,           // Fill area under the linechart (true = yes, false = no)
                    borderColor:      'rgb(0, 123, 0)',      // Color for data marker border
                    borderWidth:      1,   // Data marker border width
                },
                {
                    label:    `Dissolved Oxygen Value for blue color`,     // Dataset label for legend
                    data:     data.green_value,    // Reference to array of y-values
                    fill:     false,           // Fill area under the linechart (true = yes, false = no)
                    borderColor:      'rgba(0, 0, 255, 1)',      // Color for data marker border
                    borderWidth:      1,   // Data marker border width
                }
        ]
        },
        options: {                        // Define display chart display options 
            responsive: true,             // Re-size based on screen size
            maintainAspectRatio: false,
            scales: {                     // Display options for x & y axes
                x: {                      // x-axis properties
                    title: {
                        display: true,
                        text: 'Seconds (s)',     // x-axis title
                        font: {                   // font properties
                            size: 14
                        },
                    },
                    ticks: {                      // x-axis tick mark properties
                    min: 0,                     // starting value      
                    font: {
                        size: 14  
                    },
                    },
                    grid: {                       // x-axis grid properties
                        color: '#6c767e'
                    }
                },
                y: {                              // y-axis properties
                    title: {
                        display: true,                          
                        text: 'Dissolved Oxygen (mg/L)',     // y-axis title
                        font: {
                            size: 14
                        },
                    },
                    ticks: {
                        min: 0,                   
                        maxTicksLimit: 14,        // Limit # of tick marks to 1/10 of the number of data points.  Actual value can be set dynamically
                        font: {
                            size: 12
                        }
                    },
                    grid: {                       // y-axis gridlines
                        color: '#6c767e'
                    }
                }
            },
            plugins: {                  // Display options for title and legend
                title: {
                    display: true,
                    text: 'Dissolved Oxygen Levels Over Time',
                    font: {
                        size: 24,
                    },
                    color: '#black',
                    padding: {
                        top: 10,
                        bottom: 30
                    }
                },
                legend: {
                    display: true,
                    align: 'start',
                    position: 'bottom',
                    labels: {
                        font: {
                            size: 14
                        }
                    }
                }
            }
        }       
    })
    

}

createChart();