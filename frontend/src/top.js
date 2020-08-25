class Top {
    constructor(id, title, options){
        this.id = id;
        this.title = title;
        this.options = options;
    }
    static createTops(tops){
        let allTops = [];
        for(let top of tops){
            let newTop = new Top(top["id"], top["title"], top["options"])
            allTops.push(newTop);
        }
        return allTops;
    }
    // Creates an array of instances (argument an array of objects)
    
    static loadTops(tops){
        for(let top of tops){
            top.loadTop()
        }
    }
    // Takes one array of instances and uses loadTop() method to create HTML 

    loadTop() {
        let div = document.createElement("div");
            let title = document.createElement("h3");
            
            title.textContent = this.title;
            div.className = "card-header"
            div.setAttribute("id", this.id)
            div.appendChild(title);
            // Title of the top 
            let allOptions = Option.createOptions(this.options)
            Option.loadOptions(allOptions, div);
            // Options of the top
            let form = document.createElement("form");
            let input = document.createElement("input");
            let submit = document.createElement("input");

            input.setAttribute("type", "text");
            input.setAttribute("name", "option-content");
            input.setAttribute("placeholder", "Enter New Option")
            input.className = "form-control add-option-input"
            submit.setAttribute("type", "submit");
            submit.value = "Add Option"
            submit.className = "btn btn-primary add-option-button"
            form.setAttribute("onsubmit", "Top.addOption(event)")
            form.className = "form-group"

            form.appendChild(input);
            form.appendChild(submit);
            div.appendChild(form);
            // Add new option form

            main.insertBefore(div, main.firstChild);
    }
    // Takes an instance of a top and creates HTML

    totalVotes() {
        let allVotes = this.options.map( option => parseInt(option.votes) )
        return allVotes.reduce((memo, votes) => memo + votes)
    }
    // Returns the total of the votes of the top

    static addOption(event){
        event.preventDefault();
        let top = event.path[1]
        let link = "http://localhost:3000/options"
        let body = { "option_content": event.target[0].value,
                     "top_id": top.id }
    
        Fetch.complex("POST", body, link, function(option){ 
            if(option["message"]) {
                let error = new Error(option["message"])
                error.show();
            } else {
                let newOption = new Option(option["id"], option["content"], option["votes"])
                newOption.createOption(top)
            } 
        })
        top.querySelector("form").reset();
    }
    // Function triggered when Add option button is pressed





}