class Vote {
    static undoVote(event) { 
        let optionId = event.path[1].attributes[1].value
        let votedTop = event.path[2]
        let link = `http://localhost:3000/options/${optionId}`
        let body = { "option_id": optionId, "message": "undo" }
        Fetch.complex("PATCH", body, link, function(result){
            let options = Option.createOptions(result["topOptions"])
            let top = new Top(result["top"]["id"], result["top"]["title"], options)
            top.loadTop();
            votedTop.remove();
            let error = new Error("Vote Removed")
            error.notice();
        })
    }
    // Function triggered when remove Vote button is clicked

    static voteThisOn(btn){
        let span = document.createElement("span")
        span.textContent = "Vote!"
        span.style.float = "right"
        btn.appendChild(span)
    }
    // Function triggered when cursor is over one option

    static voteThisOut(btn){
        let span = btn.querySelector("span")
        span.parentNode.removeChild(span)
    }
    // Function triggered when cursor is off one option

    static voteThis(btn){
        let body = { "option_id": btn.id }
        let link = `http://localhost:3000/options/${btn.id}`
        Fetch.complex("PATCH", body, link, this.voteTop)
    }
    // Fetch triggered when option is clicked

    static voteTop(data) {
        let top = new Top(data['top']['id'], data['top']['title'], data['topOptions'])
        let votedOption = new Option(data['updatedOption']['id'], data['updatedOption']['content'], data['updatedOption']['votes'])
    
        Option.updateOptions(top, votedOption)
        let error = new Error(`You voted for ${votedOption.content} !`)
        error.notice();
    }
    // Function triggered after fetch call when option is clicked
}