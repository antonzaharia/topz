class Error {
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
    static show(message) {
        this.create("alert alert-danger", message)
    }
    static notice(message) {
        this.create("alert alert-primary", message)
    }
}