class Option {
    constructor(id, content, votes) {
        this.id = id;
        this.content = content;
        this.votes = votes;
    }
    static createOptions(options) {
        let allOptions = [];
        for (let option of options) {
            let newOption = new Option(option.id, option.content, option.votes)
            if(newOption.votes === null){
                newOption.votes = 0;
            }
            allOptions.push(newOption);
        }
        return allOptions;
    }
    static loadOptions(topOptions, whereTo) {
        let div = document.createElement("div")
        for (let option of topOptions){
            let button = document.createElement("button")
    
            button.textContent = option.content
            button.className = "list-group-item list-group-item-action list-group-item-secondary"
            button.setAttribute("id", option.id)
            button.setAttribute("onmouseover", "voteThisOn(this)")
            button.setAttribute("onmouseout", "voteThisOut(this)")
            button.setAttribute("onclick", "voteThis(this)")
    
            div.appendChild(button)
    
        }
        whereTo.appendChild(div);
    }

    static updateOptions(top, votedOption) {
        let htmlTops = document.getElementsByClassName("card-header")
        let div = Array.from(htmlTops).find(function(t){
            return parseInt(t.id) === top.id
        })
        div.innerHTML = "";
        
        let title = document.createElement("h3");
        title.textContent = top.title;
        div.appendChild(title)
        
        for( let option of top.options) {
            
            let optionDiv = document.createElement("div");
            let p = document.createElement("p");

            p.textContent = option['content'];

            optionDiv.appendChild(p)
            div.appendChild(optionDiv)
        }
    }
}