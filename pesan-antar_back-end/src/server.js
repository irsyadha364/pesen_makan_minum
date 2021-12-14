

require('dotenv').config()

const Hapi = require('@hapi/hapi')
const Jwt = require('@hapi/jwt')


//Users
const users = require('./api/users')
const UsersService = require('./services/postgres/UsersService')
const UsersValidator = require('./validator/users')

// authentications
const authentications = require('./api/authentications')
const AuthenticationsService = require('./services/postgres/AuthenticationsService')
const TokenManager = require('./tokenize/TokenManager')
const AuthenticationsValidator = require('./validator/authentications');

//Shops
const shops = require('./api/shop')
const ShopsService = require('./services/postgres/ShopsService')
const ShopValidator = require('./validator/shops')


// food
const foods = require('./api/foods')
const FoodService = require('./services/postgres/FoodService')
const FoodValidator = require('./validator/food')


//drink
const drinks = require('./api/drinks')
const DrinkService = require('./services/postgres/DrinksService')
const DrinkValidator = require('./validator/drink')

//Buyer
const buyer = require('./api/buyer')
const BuyersService = require('./services/postgres/BuyerService')
const BuyerValidator = require('./validator/buyer')


//Auth Buyer
const authBuyer = require('./api/auth_buyer')


const init = async () => {

    const userService = new UsersService()
    const shopService = new ShopsService()
    const foodService = new FoodService()
    const drinkService = new DrinkService()
    const buyerService = new BuyersService()
    const authenticationsService = new AuthenticationsService();

    const server = Hapi.server({
        port: process.env.PORT,
        host: process.env.HOST,
        routes: {
            cors: {
                origin: ['*'],
            }
        }

    })

    await server.register([
        {
            plugin: Jwt
        }
    ])

    server.auth.strategy('pesan_antar_jwt', 'jwt', {
        keys: process.env.ACCESS_TOKEN_KEY,
        verify: {
            aud: false,
            iss: false,
            sub: false,
            maxAgeSec: process.env.ACCESS_TOKEN_AGE,
        },
        validate: (artifacts) => ({
            isValid: true,
            credentials: {
                id: artifacts.decoded.payload.id,
            },
        }),
    })


    await server.register([
        {
            plugin: buyer,
            options: {
                service: buyerService,
                validator: BuyerValidator
            }
        },
        {
            plugin: users,
            options: {
                service: userService,
                validator: UsersValidator
            }
        },

        {
            plugin: shops,
            options: {
                service: shopService,
                validator: ShopValidator
            }
        },
        {
            plugin: foods,
            options: {
                service_shop: shopService,
                service_food: foodService,
                validator: FoodValidator
            }
        },
        {
            plugin: drinks,
            options: {
                service_shop: shopService,
                service_drink: drinkService,
                validator: DrinkValidator
            }
        },
        {
            plugin: authBuyer,
            options: {
                authenticationsService,
                buyerService,
                tokenManager: TokenManager,
                validator: AuthenticationsValidator,
            },
        },
        {
            plugin: authentications,
            options: {
                authenticationsService,
                userService,
                tokenManager: TokenManager,
                validator: AuthenticationsValidator,
            },
        },


    ]);
    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
}
init()