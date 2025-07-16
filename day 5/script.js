document.getElementById("registerForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const age = document.getElementById("age").value.trim();
    let hasError = 0;
    clearErrors();
    if (name.length < 2 || name === "") {
        document.getElementById("nameError").textContent = "Name must be at least 2 characters.";
        hasError = 1;
    } else if (/\d/.test(name)) {
        document.getElementById("nameError").textContent = "Name must not contain numbers.";
        hasError = 1;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.getElementById("emailError").textContent = "Please enter a valid email address.";
        hasError = 1;
    }
    if (age < 1 || age > 150) {
        document.getElementById("ageError").textContent = "Enter a valid age";
        hasError = 1;
    }
    if (hasError === 0) {
        const table = document.querySelector("#userTable tbody");
        const newRow = table.insertRow();
        const idCell = newRow.insertCell();
        const nameCell = newRow.insertCell();
        const emailCell = newRow.insertCell();
        const ageCell = newRow.insertCell();
        idCell.textContent = table.rows.length;
        nameCell.textContent = name;
        emailCell.textContent = email;
        ageCell.textContent = age;
        alert("User registered successfully!");
        document.getElementById("registerForm").reset();
    }
});
function allowOnlyNumbers(e) {
    let key = e.key;
    if (key < '0' || key > '9') {
        e.preventDefault();
    }
}
function clearErrors() {
    document.getElementById("nameError").textContent = "";
    document.getElementById("emailError").textContent = "";
    document.getElementById("ageError").textContent = "";
}
