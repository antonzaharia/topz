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
    
    static loadTops(tops){
        for(let top of tops){
            top.loadTop()
        }
    }

    loadTop() {
        let div = document.createElement("div");
            let title = document.createElement("h3");
            
            title.textContent = this.title;
            div.className = "card-header"
            div.setAttribute("id", this.id)
            div.appendChild(title);
            
            let allOptions = Option.createOptions(this.options)
            Option.loadOptions(allOptions, div);

            let form = document.createElement("form");
            let input = document.createElement("input");
            let submit = document.createElement("input");

            input.setAttribute("type", "text");
            input.setAttribute("name", "option-content");
            input.className = "form-control add-option-input"
            submit.setAttribute("type", "submit");
            submit.value = "Add Option"
            submit.className = "btn btn-primary add-option-button"
            // form.setAttribute("onsubmit", "addOption(event)")
            form.setAttribute("onsubmit", "Top.addOption(event)")
            form.className = "form-group"

            form.appendChild(input);
            form.appendChild(submit);
            div.appendChild(form);
            

            main.insertBefore(div, main.firstChild);
    }

    totalVotes() {
        let allVotes = this.options.map( option => parseInt(option.votes) )
        return allVotes.reduce((memo, votes) => memo + votes)
    }

    static addOption(event){
        event.preventDefault();
        let top = event.path[1]
        let link = "http://localhost:3000/options"
        let body = { "option_content": event.target[0].value,
                     "top_id": top.id }
    
        Fetch.complex("POST", body, link, function(option){ 
            if(option["message"]) {
                Error.show(option["message"])
            } else {
                let newOption = new Option(option["id"], option["content"], option["votes"])
                newOption.createOption(top)
            } 
        })
        top.querySelector("form").reset();
    }





}