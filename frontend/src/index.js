console.log("connected")

let showForm = false;
const main = document.querySelector("main");
const addTop = document.getElementById("add-top");
const addTopForm = document.getElementById("add-top-form")
const addOptionButton = addTopForm.querySelector("a")
const topDivs = document.getElementsByClassName("card-header")

window.addEventListener('DOMContentLoaded', () => {
    addTop.addEventListener("click", function(){
        showForm = !showForm;
        if(showForm){
            addTopForm.style.display = "block";
            addTop.querySelector("svg").style.transform = "rotateZ(180deg)";
        } else {
            addTopForm.style.display = "none";
            addTop.querySelector("svg").style.transform = "rotateY(180deg)";
        }
    })
    let link = "http://localhost:3000/tops"
    Fetch.basic(link, function(tops){
        allTops = Top.createTops(tops)
        Top.loadTops(allTops);
    })
});

addTopForm.addEventListener('submit', function(e){
    e.preventDefault()
    let body = {
        "top_title": e.path[0][0].value,
        "option_1": e.path[0][1].value,
        "option_2": e.path[0][2].value
    }
    let link = "http://localhost:3000/tops"
    Fetch.complex("POST", body, link, function(top){
        if(option["message"]) {
            Error.show(option["message"])
        } else {
            let newTopOptions = Option.createOptions(top["options"])
            let newTop = new Top(top["id"], top["title"], newTopOptions)
            newTop.loadTop()
        }
    })
    addTopForm.querySelector("form").reset();
})

const voteThisOn = function(btn){
    let span = document.createElement("span")
    span.textContent = "Vote!"
    span.style.float = "right"
    btn.appendChild(span)
}
const voteThisOut = function(btn){
    let span = btn.querySelector("span")
    span.parentNode.removeChild(span)
}
const voteThis = function(btn){
    let body = { "option_id": btn.id }
    let link = `http://localhost:3000/options/${btn.id}`
    Fetch.complex("PATCH", body, link, voteTop)

}
const voteTop = function(data) {
    let top = new Top(data['top']['id'], data['top']['title'], data['topOptions'])
    let votedOption = new Option(data['updatedOption']['id'], data['updatedOption']['content'], data['updatedOption']['votes'])

    Option.updateOptions(top, votedOption)
    Error.notice(`You voted for ${votedOption.content} !`)
}

const addOption = function(event){
    event.preventDefault();
    let top = event.path[1]
    let link = "http://localhost:3000/options"
    let body = { "option_content": event.target[0].value,
                 "top_id": top.id }

    Fetch.complex("POST", body, link, function(option){ 
        if(option["message"]) {
            Error.show(option["message"])
        } else {
            createOption(option, top)
        } 
    })
    top.querySelector("form").reset();
}

const createOption = function(option, top) {
    let allOptions = top.querySelectorAll("button");
    let lastOption = allOptions[allOptions.length -1]
    let newOption = new Option(option.id, option.content, option.votes)
    newOption.loadOption(top, lastOption)

}

const deleteOption = function(event) {
    let optionId = event.path[0].attributes[0].value
    let top = event.path[2]
    let deleteBtn = event.path[0]
    body = { "option_id": optionId }
    link = `http://localhost:3000/options/${optionId}`
    Fetch.complex("DELETE", body, link, function(result){ removeOption(optionId, top, deleteBtn) })
}

const removeOption = function(id, top, deleteBtn){
    let allOptions = top.getElementsByClassName("vote-button");
    let option = Array.from(allOptions).find( option => option.id === id )
    option.remove();
    deleteBtn.remove();
    Error.notice(`Option Removed`)
}

const undoVote = function(event) {
    let optionId = event.path[1].attributes[1].value
    let votedTop = event.path[2]
    link = `http://localhost:3000/options/${optionId}`
    body = { "option_id": optionId, "message": "undo" }
    Fetch.complex("PATCH", body, link, function(result){
        let options = Option.createOptions(result["topOptions"])
        let top = new Top(result["top"]["id"], result["top"]["title"], options)
        top.loadTop();
        votedTop.remove();
        Error.notice("Vote Removed")
    })
    
    
}

