let expression = ""; // هنجمع فيه الأرقام والعمليات

function EnterNumber(val) {
    expression += val;
    document.getElementById("Answer").value = expression;
}

function EnterOperator(op) {
    // نتأكد إن آخر عنصر مش عملية حسابية
    if (expression.length > 0 && !"+-*/".includes(expression.slice(-1))) {
        expression += op;
        document.getElementById("Answer").value = expression;
    }
}

function EnterEqual() {
    try {
        let result = eval(expression);
        document.getElementById("Answer").value = result;
        expression = result.toString(); // علشان تقدر تكمل الحساب
    } catch {
        document.getElementById("Answer").value = "Error";
        expression = "";
    }
}

function EnterClear() {
    expression = "";
    document.getElementById("Answer").value = "";
}
