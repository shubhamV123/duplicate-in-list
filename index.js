let arr = [7000, 7001, 7002, 7003, 7004, 7005];
//Validate input values
const validateRegex = (val) => {
    let regex = /^\d+(-\d+)?(,\d+(-\d+)?)*$/;
    return regex.test(val);
}
//Check to see if number exist or not. If exist in default arr add it to duplicate otherwise add to unique array
const processNumber = (val, uniqueArr, duplicateArr, { type }) => {
    if (type === "range") {
        let [minVal, maxVal] = val.split('-');
        minVal = Number(minVal);
        maxVal = Number(maxVal);
        for (let i = minVal; i <= maxVal; i++) {
            if (!checkInArr(i, duplicateArr)) {
                uniqueArr.push(i)
            }
        }
    }
    else {
        let inputValue = Number(val);
        if (!checkInArr(inputValue, duplicateArr)) {
            uniqueArr.push(inputValue)
        }
    }

}
//Check to see if value exist in original array if exist push into duplicate one
const checkInArr = (inputVal, duplicateArray) => {
    if (arr.includes(inputVal)) {
        duplicateArray.push(inputVal);
        return true;
    }
    return false;

}
const submitInput = () => {
    let uniqueArr = [];
    let duplicateArr = [];
    let inputValue = document.getElementById('numberInput').value.trim();
    //Check for empty strings
    if (!inputValue) {
        alert("Input cannot be empty");
    }
    //Check for bad inputs
    if (validateRegex(inputValue)) {
        let inputsAre = inputValue.split(',');
        inputsAre.forEach(input => {
            if (input.indexOf('-') !== -1) {
                processNumber(input, uniqueArr, duplicateArr, { type: 'range' });
            }
            else {
                processNumber(input, uniqueArr, duplicateArr, { type: 'number' })
            }
        });
        //remove 
        uniqueArr = [...uniqueArr, ...arr.filter(data => !duplicateArr.includes(data))];
        var uniqueInfo = document.getElementById('uniqueArray');
        var duplicateInfo = document.getElementById('duplicateArray');
        uniqueInfo.innerHTML = uniqueArr.join(',');
        duplicateInfo.innerHTML = duplicateArr.join(',');

    }
    else {
        // Number is not valid
        alert("Please enter valid number")
    }

}