console.log("connected")

const main = document.querySelector("main");


window.addEventListener('DOMContentLoaded', (event) => {
    fetch("http://localhost:3000/tops")
    .then(function(response){
        return response.json();
    })
    .then(function(tops){
        // console.log(tops);
        // loadTops(tops);
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
            div.appendChild(title);
            main.appendChild(div);
    
            top.loadOptions(div)
        }
    }

    loadOptions(div){
    let ul = document.createElement("ul")
    for (let option of this.options){
        let li = document.createElement("li")
        let votes = document.createElement("span")

        li.textContent = option["content"]
        votes.textContent = option["votes"]
        li.appendChild(votes)
        ul.appendChild(li)

    }
    div.appendChild(ul);
  }
}

