export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {
    /*     strapi.config.set("plugin.email", {
      provider: "nodemailer",
      providerOptions: {
        host: "smtp.yandex.ru",
        port: 465,
        secure: true,
        auth: {
          user: "a.platya",
          pass: "fataiapnkuyrlvab",
        },
        // ... any custom nodemailer options
      },
    }) */
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/*{ strapi }*/) {},
}
