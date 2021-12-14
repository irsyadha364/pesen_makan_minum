const BuyerAuth = require('./handler')
const routes = require('./routes');

module.exports = {
  name: 'buyer_auth',
  version: '1.0.0',
  register: async (server, {
    authenticationsService,
    buyerService,
    tokenManager,
    validator,
  }) => {
    const authenticationsHandler = new BuyerAuth(
      authenticationsService ,
      buyerService,
      tokenManager,
      validator,
    );
    server.route(routes(authenticationsHandler));
  },
};