const fs = require('fs');
   
const data = "\nLearn Node.js";
   
// Append data to file

fs.appendFile(__dirname+'/input.txt', data, 'utf8', (err) => {
    if (err) return console.error(err)
    console.log("Data was asynchonously appended to the file successfully")
});

try {
    fs.appendFileSync(__dirname+'/input.txt', data, 'utf8')
    console.log("Data was synchonously appended to the file successfully")
} catch(err) {
    console.error(err)
}
