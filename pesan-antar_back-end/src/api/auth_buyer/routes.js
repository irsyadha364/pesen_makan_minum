const routes = (handler) => [
    {
      method: 'POST',
      path: '/buyer/authentications',
      handler: handler.postBuyerAuthenticationHandler,
    },
    {
      method: 'PUT',
      path: '/buyer/authentications',
      handler: handler.putBuyerAuthenticationHandler,
    },
    {
      method: 'DELETE',
      path: '/buyer/authentications',
      handler: handler.deleteBuyerAuthenticationHandler,
    },
  ];
  
  module.exports = routes;