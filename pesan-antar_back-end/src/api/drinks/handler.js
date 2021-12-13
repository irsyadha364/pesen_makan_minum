const ClientError = require('../../exception/ClientError')


class DrinkHandler{
    constructor(service_shop, service_drink, validator) {
        this._service_shop = service_shop
        this._service_drink = service_drink
        this._validator = validator
        
        this.postDrinkHandler = this.postDrinkHandler.bind(this)
        this.getDrinkHandler = this.getDrinkHandler.bind(this)
        this.putDrinkHandler = this.putDrinkHandler.bind(this)
        this.deleteDrinksHandler = this.deleteDrinksHandler.bind(this)
    
    }

    async postDrinkHandler(request , h){
        try {
            this._validator.validateDrinkPayload(request.payload)

            const { name, price } = request.payload
            const { id: credentialId } = request.auth.credentials;
            const { id: shops_id } = request.params

            await this._service_shop.verifyShopOwner(shops_id, credentialId)

            const foodId = await this._service_drink.addDrink({ name, price, shops_id })

            const response = h.response({
                status: 'success',
                message: 'Makanan berhasil ditambahkan',
                data: {
                    foodId,
                },
            });
            response.code(201);
            return response;
        } catch (error) {
            if (error instanceof ClientError) {
                const response = h.response({
                    status: 'fail',
                    message: error.message,
                });
                response.code(error.statusCode);
                return response;
            }

            // Server ERROR!
            const response = h.response({
                status: 'error',
                message: 'Maaf, terjadi kegagalan pada server kami.',
            });
            response.code(500);
            console.error(error);
            return response; 
        }
    }
    async getDrinkHandler(request , h){
        try {
            const { id: credentialId } = request.auth.credentials;
            const { id: shops_id } = request.params
    
            await this._service_shop.verifyShopOwner(shops_id, credentialId)
    
            const food = await this._service_drink.getDrink(credentialId);
            return {
                status: 'success',
                data: {
                    food,
                },
            };
        } catch (error) {
            if (error instanceof ClientError) {
                const response = h.response({
                    status: 'fail',
                    message: error.message,
                });
                response.code(error.statusCode);
                return response;
            }
            const response = h.response({
                status: 'fail',
                message: 'Maaf, terjadi kegagalan pada server kami.',
            });
            response.code(400);
            console.error(error);
        }
    }
    async putDrinkHandler(){

    }
    async deleteDrinksHandler(){

    }
}
module.exports = DrinkHandler