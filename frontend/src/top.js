class Top {
    constructor(id, title, options){
        this.id = id;
        this.title = title;
        this.options = options;
    }
    static createTops(tops){
        let allTops = [];
        for(let top of tops){
            let newTop = new Top(top["id"], top["title"], top["options"])
            allTops.push(newTop);
        }
        return allTops;
    }
    
    static loadTops(tops){
        for(let top of tops){
            top.loadTop()
        }
    }

    loadTop() {
        let div = document.createElement("div");
            let title = document.createElement("h3");
            
            title.textContent = this.title;
            div.className = "card-header"
            div.setAttribute("id", this.id)
            div.appendChild(title);
            main.appendChild(div);
    
            let allOptions = Option.createOptions(this.options)
            Option.loadOptions(allOptions, div);
    }

    totalVotes() {
        let allVotes = this.options.map( option => parseInt(option.votes) )
        return allVotes.reduce((memo, votes) => memo + votes)
    }




}