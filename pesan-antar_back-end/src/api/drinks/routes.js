const routes = (handler) => [
    {
      method: 'POST',
      path: '/shops/{id}/drink',
      handler: handler.postDrinkHandler,
      options: {
        auth: 'pesan_antar_jwt',
      },
    },
    {
      method: 'GET',
      path: '/shops/{id}/drink',
      handler: handler.getDrinkHandler,
      options: {
        auth: 'pesan_antar_jwt',
      },
    },
    {
      method: 'PUT',
      path: '/shops/{id}/drink',
      handler: handler.putDrinkHandler,
      options: {
        auth: 'pesan_antar_jwt',
      },
    },
    {
      method: 'DELETE',
      path: '/shops/{id}/drinks',
      handler: handler.deleteDrinksHandler,
      options: {
        auth: 'pesan_antar_jwt',
      },
    },
  ];
  
  module.exports = routes;