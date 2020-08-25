class Error {
    constructor(message) {
        this.message = message
    }
    static create(type, message) {
        let anyError = document.getElementById("error")
        let error = document.createElement("div")
        error.textContent = message
        error.setAttribute("id", "error")
        error.setAttribute("role", "alert")
        error.className = `${type}`
        if (anyError) {
            anyError.innerHTML = error.innerText
        } else {
            main.insertBefore(error, main.firstChild);
        }
        setTimeout(function(){ error.remove(); }, 5000);
    }
    // Class method that creates html
    show() {
        Error.create("alert alert-danger", this.message)
    }
    // Instance method that creates a red styled error
    notice() {
        Error.create("alert alert-primary", this.message)
    }
    // Instance method that creates a blue styled error
}