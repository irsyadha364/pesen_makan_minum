const ClientError = require('../../exception/ClientError')


class FoodsHandler {
    constructor(service_shop, service_food, validator) {
        this._service_shop = service_shop
        this._service_food = service_food
        this._validator = validator


        this.postFoodHandler = this.postFoodHandler.bind(this)
        this.getFoodsHandler = this.getFoodsHandler.bind(this)
        this.putShopHandler = this.putShopHandler.bind(this)
        this.deleteFoodHandler = this.deleteFoodHandler.bind(this)
    }

    async postFoodHandler(request, h) {
        try {
            this._validator.validateFoodPayload(request.payload)

            const { name, price } = request.payload
            const { id: credentialId } = request.auth.credentials;
            const { id: shops_id } = request.params

            console.log(typeof this._service_shop)
            await this._service_shop.verifyShopOwner(shops_id, credentialId)

            const foodId = await this._service_food.addFood({ name, price, shops_id })

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


    async getFoodsHandler(request , h ) {

        try {
            const { id: credentialId } = request.auth.credentials;
            const { id: shops_id } = request.params
    
            await this._service_shop.verifyShopOwner(shops_id, credentialId)
    
            const food = await this._service_food.getFood(credentialId);
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

    async putShopHandler() {

    }
    async deleteFoodHandler() {

    }
}
module.exports = FoodsHandler