class TopsController < ApplicationController
    def index
        tops = Top.all
        render json: tops
    end

    def create
        top = Top.new(title: params["top_title"])
        top.options.build(content: params["option_1"], votes: 0)
        top.options.build(content: params["option_2"], votes: 0)

        if top.save
            render json: top
        else
            render json: { message: "Top title cannot be empty."}
        end
    end


end
