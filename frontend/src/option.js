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

    updateOption(top, votedOption, whereTo) {
        let percentage = Math.floor((parseInt(this.votes) * 100)/top.totalVotes())
        let optionDiv = document.createElement("div");
        let p = document.createElement("p");
        let progDiv = document.createElement("div");
        let progBar = document.createElement("div");
        
        optionDiv.setAttribute("class","list-group-item")
        progDiv.className = "progress"
        progBar.className = `progress-bar`
        progBar.setAttribute("role", "progressbar")
        progBar.setAttribute("style", `width:${percentage}%`)
        progBar.setAttribute("aria-valuenow", `${percentage}`)
        progBar.setAttribute("aria-valuemin", "0")
        progBar.setAttribute("aria-valuemax", "100")
        progBar.textContent = `${percentage} %`
        p.textContent = this.content

        progDiv.appendChild(progBar)
        optionDiv.appendChild(p)
        optionDiv.appendChild(progDiv)
        whereTo.appendChild(optionDiv)

        if( this.id === votedOption.id ){
            optionDiv.style.color = "red"
            progBar.setAttribute("class", "progress-bar bg-danger")
        }
    }

    static updateOptions(top, votedOption) {
        let optionsSorted = top.options.sort((a, b) => (a.votes < b.votes) ? 1 : -1)
        let htmlTops = document.getElementsByClassName("card-header")
        let div = Array.from(htmlTops).find(function(t){
            return parseInt(t.id) === top.id
        })
        div.innerHTML = "";
        
        let title = document.createElement("h3");
        title.textContent = top.title;
        div.appendChild(title)
        div.setAttribute("class", "list-group")

        let options = this.createOptions(optionsSorted)
        for( let option of options) {
            option.updateOption(top, votedOption, div)
        }
        
    }

}