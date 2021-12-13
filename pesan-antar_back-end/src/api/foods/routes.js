const routes = (handler) => [
    {
      method: 'POST',
      path: '/shops/{id}/food',
      handler: handler.postFoodHandler,
      options: {
        auth: 'pesan_antar_jwt',
      },
    },
    {
      method: 'GET',
      path: '/shops/{id}/food',
      handler: handler.getFoodsHandler,
      options: {
        auth: 'pesan_antar_jwt',
      },
    },
    {
      method: 'PUT',
      path: '/shops/{id}/food',
      handler: handler.putShopHandler,
      options: {
        auth: 'pesan_antar_jwt',
      },
    },
    {
      method: 'DELETE',
      path: '/shops/{id}/food',
      handler: handler.deleteFoodHandler,
      options: {
        auth: 'pesan_antar_jwt',
      },
    },
  ];
  
  module.exports = routes;