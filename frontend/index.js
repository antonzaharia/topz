console.log("connected")

const main = document.querySelector("main");


window.addEventListener('DOMContentLoaded', (event) => {
    fetch("http://localhost:3000/tops")
    .then(function(response){
        return response.json();
    })
    .then(function(tops){
        allTops = Top.createTops(tops)
        Top.loadTops(allTops);
    })
});

class Top {
    constructor(title, options){
        this.title = title;
        this.options = options;
    }
    static createTops(tops){
        let allTops = [];
        for(let top of tops){
            let newTop = new Top(top["title"], top["options"])
            allTops.push(newTop);
        }
        return allTops;
    }
    
    static loadTops(tops){
        for(let top of tops){
            let div = document.createElement("div");
            let title = document.createElement("h3");
            
            title.textContent = top.title;
            div.className = "list-group"
            div.appendChild(title);
            main.appendChild(div);
    
            Option.loadOptions(top.options, div);
        }
    }

}

class Option {
    constructor(content, votes) {
        this.content = content;
        this.votes = votes;
    }
    static loadOptions(topOptions, whereTo) {
        let div = document.createElement("div")
        for (let option of topOptions){
            let a = document.createElement("a")
    
            a.href = "#"
            a.textContent = option["content"]
            a.className = "list-group-item list-group-item-action list-group-item-secondary"
    
            div.appendChild(a)
    
        }
        whereTo.appendChild(div);
    }
}

// class createHTML {
//     static button(appendTo, content){
//         let button = document.createElement('button');
//         button.textContent = content;
//         appendTo.appendChild(button);
//     }
// }

