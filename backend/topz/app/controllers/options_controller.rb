class OptionsController < ApplicationController
    def update
        option = Option.find(params[:option_id])
        option.votes = option.votes.to_i + 1
        option.save
        topOption = {top: option.top, updatedOption: option, topOptions: option.top.options}
        render json: topOption
    end
end
