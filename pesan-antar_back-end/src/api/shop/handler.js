const ClientError = require('../../exception/ClientError')

class ShopHandler {
    constructor(service, validator) {
        this._service = service
        this._validator = validator

        this.postShopHandler = this.postShopHandler.bind(this)
        this.getShopHandler = this.getShopHandler.bind(this)
        this.getShopByIdHandler = this.getShopByIdHandler.bind(this)
        this.putShopByIdHandler = this.postShopHandler.bind(this)
        this.deleteShopByIdHandler = this.deleteShopByIdHandler.bind(this)
    }
    async postShopHandler(request, h) {
        try {
            this._validator.validateShopPayload(request.payload);
            const { name, address, no_phone } = request.payload;
            const { id: credentialId } = request.auth.credentials;

            const shopId = await this._service.addShop({
                name, address, no_phone, owner: credentialId,
            });

            const response = h.response({
                status: 'success',
                message: 'Toko berhasil ditambahkan',
                data: {
                    shopId,
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

    async getShopHandler(request) {
        const { id: credentialId } = request.auth.credentials;
        const notes = await this._service.getShops(credentialId);
        return {
            status: 'success',
            data: {
                notes,
            },
        };
    }
    async getShopByIdHandler() {

    }
    async putShopByIdHandler() {

    }
    async deleteShopByIdHandler() {

    }
}
module.exports = ShopHandler