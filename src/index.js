"use strict";

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {
    let userRoutes =
      strapi.plugins["users-permissions"].routes["content-api"].routes;
    let policy = "global::alwaysFalse";

    const findOneUser = userRoutes.findIndex(
      (route) => route.handler === "user.findOne" && route.method === "GET"
    );

    const findUser = userRoutes.findIndex(
      (route) => route.handler === "user.find" && route.method === "GET"
    );

    function initializeRoute(routes, index) {
      routes[index].config.policies = routes[index].config.policies || [];
    }

    if (findOneUser) {
      initializeRoute(userRoutes, findOneUser);
      userRoutes[findOneUser].config.policies.push(policy);
    }

    if (findUser) {
      initializeRoute(userRoutes, findUser);
      userRoutes[findUser].config.policies.push(policy);
    }
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/*{ strapi }*/) {},
};
