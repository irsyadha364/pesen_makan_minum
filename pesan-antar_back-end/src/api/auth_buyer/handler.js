

const ClientError = require('../../exception/ClientError')

class BuyerAuth {

    constructor(authenticationsService, usersService, tokenManager, validator) {
        this._authenticationsService = authenticationsService;
        this._usersService = usersService;
        this._tokenManager = tokenManager;
        this._validator = validator;

        this.postBuyerAuthenticationHandler = this.postBuyerAuthenticationHandler.bind(this);
        this.putBuyerAuthenticationHandler = this.putBuyerAuthenticationHandler.bind(this);
        this.deleteBuyerAuthenticationHandler = this.deleteBuyerAuthenticationHandler.bind(this);
    }


    async postBuyerAuthenticationHandler(request, h) {
        try {
            console.log(typeof this._authenticationsService)
            this._validator.validatePostAuthenticationPayload(request.payload);

            const { username, password } = request.payload;

            const id = await this._usersService.verifyUserCredential(username, password);

            const accessToken = this._tokenManager.generateAccessToken({ id });
            const refreshToken = this._tokenManager.generateRefreshToken({ id });

            await this._authenticationsService.addRefreshToken(refreshToken);

            const response = h.response({
                status: 'success',
                message: 'Authentication berhasil ditambahkan',
                data: {
                    accessToken,
                    refreshToken,
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
    async putBuyerAuthenticationHandler(request, h) {
        try {
            this._validator.validatePutAuthenticationPayload(request.payload);

            const { refreshToken } = request.payload;
            await this._authenticationsService.verifyRefreshToken(refreshToken);
            const { id } = this._tokenManager.verifyRefreshToken(refreshToken);

            const accessToken = this._tokenManager.generateAccessToken({ id });
            return {
                status: 'success',
                message: 'Access Token berhasil diperbarui',
                data: {
                    accessToken,
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

    async deleteBuyerAuthenticationHandler(request, h) {
        try {
            this._validator.validateDeleteAuthenticationPayload(request.payload);

            const { refreshToken } = request.payload;
            await this._authenticationsService.verifyRefreshToken(refreshToken);
            await this._authenticationsService.deleteRefreshToken(refreshToken);

            return {
                status: 'success',
                message: 'Refresh token berhasil dihapus',
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

}
module.exports = BuyerAuth