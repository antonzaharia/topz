class OptionsController < ApplicationController
    def create
        top = Top.find_by(id: params["top_id"])
        top.options.build(content: params["option_content"], votes: 0)

        if top.save
            render json: top.options.last
        else
            render json: { message: "Option cannot be empty."}
        end
    end
    
    def update
        option = Option.find(params[:option_id])
        if params["message"] == "undo"
            option.votes = option.votes.to_i - 1
        else
            option.votes = option.votes.to_i + 1
        end
        option.save
        topOption = { top: option.top, updatedOption: option, topOptions: option.top.options }

        render json: topOption
        
    end

    def destroy
        option = Option.find_by(id: params["option_id"])
        option.destroy

        render json: { message: "Option deleted."}
    end
end
