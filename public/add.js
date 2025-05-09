
isValidDate = (dateString) => {
    const dateList = dateString.split("/"); // Split the datestring in to an array of strings
    if (dateList.length !== 3) return false; // Check if the date string has exactly 3 parts

    // make 3 variables for the day, month and year
    const day = parseInt(dateList[0], 10);
    const month = parseInt(dateList[1], 10);
    const year = parseInt(dateList[2], 10); 

    const date = new Date(year, month - 1, day); // Month is 0-based in JavaScript date object (e.g, January is 0, February is 1, etc.)
    // Check if the date is valid by comparing the input values with the date object values
    return (date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day); 
}

const regex = /^([0]?[1-9]|[12][0-9]|[3][0-1])[/]([0]?[1-9]|[1][0-2])[/]([0-9]{4})$/;

document.getElementById('submitbutton').addEventListener('click', function(event) {
    const textInput = document.getElementById("textbox").value.toString();
    const priorityInput = document.getElementById("priority").value.toString();
    const deadlineInput = document.getElementById("deadline").value.toString();

    if (textInput === "" || priorityInput === "" || deadlineInput === "") {
        window.alert('Please fill in all the fields'); // Show an alert if any field is empty
        return; // Stop the function execution
    }
    if (!regex.test(deadlineInput) || !isValidDate(deadlineInput)) {
        window.alert('Please enter a valid date in the format dd/mm/yyyy'); // Show an alert if the date is invalid
        return; // Stop the function execution
    }
    fetch ("/create-todo", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            text: document.getElementById("textbox").value,
            priority: document.getElementById("priority").value,
            deadline: document.getElementById("deadline").value
        })
    })
    .then(res => {
        if (res.ok) {
            window.alert("Todo Added Successfully!"); // Show a success message
            window.location.href = "/"; // Redirect to the home page
        } else {
            console.error("Failed To Add Your Todo :(", res.statusText); // Show an error message
        }
    })
});