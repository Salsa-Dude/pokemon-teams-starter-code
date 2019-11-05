class TrainersController < ApplicationController
    def index 
        trainers = Trainer.all
        render json: trainers.to_json(serializerTrainer)
    end


    
    private 
    
    def serializerTrainer
        {
            :include => { :pokemons => {
                            :except => [:created_at, :updated_at]  
                        }
            },
            :only => [:name, :id]
        }
    end
end
