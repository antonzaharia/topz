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
            Error.notice("Vote Removed")
        })
    }

    static voteThisOn(btn){
        let span = document.createElement("span")
        span.textContent = "Vote!"
        span.style.float = "right"
        btn.appendChild(span)
    }

    static voteThisOut(btn){
        let span = btn.querySelector("span")
        span.parentNode.removeChild(span)
    }

    static voteThis(btn){
        let body = { "option_id": btn.id }
        let link = `http://localhost:3000/options/${btn.id}`
        Fetch.complex("PATCH", body, link, this.voteTop)
    }

    static voteTop(data) {
        let top = new Top(data['top']['id'], data['top']['title'], data['topOptions'])
        let votedOption = new Option(data['updatedOption']['id'], data['updatedOption']['content'], data['updatedOption']['votes'])
    
        Option.updateOptions(top, votedOption)
        Error.notice(`You voted for ${votedOption.content} !`)
    }
}