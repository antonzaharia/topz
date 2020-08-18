console.log("connected")

let showForm = false;
const main = document.querySelector("main");
const addTop = document.getElementById("add-top");
const addTopForm = document.getElementById("add-top-form")
const addOptionButton = addTopForm.querySelector("a")

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
    fetch("http://localhost:3000/tops")
    .then(function(response){
        return response.json();
    })
    .then(function(tops){
        allTops = Top.createTops(tops)
        Top.loadTops(allTops);
    })
});

addTopForm.addEventListener('submit', function(e){
    e.preventDefault()
    let configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            "top_title": e.path[0][0].value,
            "option_1": e.path[0][1].value,
            "option_2": e.path[0][2].value
        })
    }
    fetch("http://localhost:3000/tops", configObj)
    .then(response => response.json())
    .then(top => {
        let newTopOptions = Option.createOptions(top["options"])
        let newTop = new Top(top["id"], top["title"], newTopOptions)
        newTop.loadTop()
        showForm = false;
    })
    
})
let loadTop = function(top){
console.log(top)
}

// addOptionButton.addEventListener('click', function(e){
//     e.preventDefault()
    
// })

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
    let configObj = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            "option_id": btn.id
        })
    }
    fetch(`http://localhost:3000/options/${btn.id}`, configObj)
    .then(response => response.json())
    .then(option => voteTop(option))
}
const voteTop = function(data) {
    let top = new Top(data['top']['id'], data['top']['title'], data['topOptions'])
    let votedOption = new Option(data['updatedOption']['id'], data['updatedOption']['content'], data['updatedOption']['votes'])

    Option.updateOptions(top, votedOption)
}



// class createHTML {
//     static button(appendTo, content){
//         let button = document.createElement('button');
//         button.textContent = content;
//         appendTo.appendChild(button);
//     }
// }

