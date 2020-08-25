console.log("connected")

let showForm = false;
const main = document.querySelector("main");
const addTop = document.getElementById("add-top");
const addTopForm = document.getElementById("add-top-form")
const addOptionButton = addTopForm.querySelector("a")
const topDivs = document.getElementsByClassName("card-header")
const year = document.getElementById("year")
// Defining variables

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
    // Toggle add new top form
    let link = "http://localhost:3000/tops"
    Fetch.basic(link, function(tops){
        let allTops = Top.createTops(tops)
        Top.loadTops(allTops);
    })
    // Fetch call to load all the tops on the page
    let date = new Date();
    year.innerHTML = date.getFullYear();
    // Footer year show
});
// Page load event

addTopForm.addEventListener('submit', function(e){
    e.preventDefault()
    let body = {
        "top_title": e.path[0][0].value,
        "option_1": e.path[0][1].value,
        "option_2": e.path[0][2].value
    }
    let link = "http://localhost:3000/tops"
    Fetch.complex("POST", body, link, function(top){
            // let newTopOptions = Option.createOptions(top["options"])
            // let newTop = new Top(top["id"], top["title"], newTopOptions)
            let newTop = new Top(...Object.values(top))
            newTop.loadTop()
    })
    addTopForm.querySelector("form").reset();
    // Add new top event handler
})



