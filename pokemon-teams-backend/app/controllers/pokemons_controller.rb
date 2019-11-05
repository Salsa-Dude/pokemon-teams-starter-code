class PokemonsController < ApplicationController

    def create 
        name = Faker::Name.first_name
        species = Faker::Games::Pokemon.name
        trainerId = params[:trainer_id]

        pokemon = Pokemon.create(nickname: name, species: species, trainer_id: trainerId)
        render json: pokemon
    end

    def destroy 
        pokemon = Pokemon.find(params[:id])
        pokemon.destroy
    end
end
