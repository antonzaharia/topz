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
            option.loadOption(div)
        }
        whereTo.appendChild(div);
    }

    static removeOption(id, top, deleteBtn){
        let allOptions = top.getElementsByClassName("vote-button");
        let optionHtml = Array.from(allOptions).find( option => option.id === id )
        optionHtml.remove();
        deleteBtn.remove();
        Error.notice(`Option Removed`)
    }

    static deleteOption(event) {
        let optionId = event.path[0].attributes[0].value
        let top = event.path[2]
        let deleteBtn = event.path[0]
        const body = { "option_id": optionId }
        let link = `http://localhost:3000/options/${optionId}`
        Fetch.complex("DELETE", body, link, function(){ Option.removeOption(optionId, top, deleteBtn) })
    }

    createOption(top) {
        let allOptions = top.querySelectorAll("button");
        let lastOption = allOptions[allOptions.length -1]
        let newOption = new Option(this.id, this.content, this.votes)
        newOption.loadOption(top, lastOption)
    }

    loadOption(div, elementBefore) {
        let button = document.createElement("button")
    
        button.textContent = this.content
        button.className = "list-group-item list-group-item-action list-group-item-secondary vote-button"
        button.setAttribute("id", this.id)
        button.setAttribute("onmouseover", "Vote.voteThisOn(this)")
        button.setAttribute("onmouseout", "Vote.voteThisOut(this)")
        button.setAttribute("onclick", "Vote.voteThis(this)")
        
        if(elementBefore){
            elementBefore.parentNode.insertBefore(button, elementBefore.nextSibling);
        } else {
            div.appendChild(button)
        }

        if (this.votes <= 0 ) {
            let deleteOption = document.createElement("button")
            deleteOption.textContent = "X"
            deleteOption.setAttribute("option-id", this.id)
            deleteOption.className = "btn btn-danger delete-button"
            deleteOption.setAttribute("onclick", "Option.deleteOption(event)")
            button.parentNode.insertBefore(deleteOption, button.nextSibling);
        }
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
            optionDiv.setAttribute("option-id", votedOption.id)
            progBar.setAttribute("class", "progress-bar bg-danger")
            let undo = document.createElement("button")
            undo.setAttribute("href", "#")
            undo.style.float = "right"
            undo.className = "btn btn-danger"
            undo.textContent = "Remove Vote"
            undo.setAttribute("onclick", "Vote.undoVote(event)")
            optionDiv.appendChild(undo)
        }
    }

    static updateOptions(top, votedOption) {
        let optionsSorted = top.options.sort((a, b) => (parseInt(a.votes) < parseInt(b.votes)) ? 1 : -1)
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