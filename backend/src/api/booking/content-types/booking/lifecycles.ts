export default {
  async afterCreate(event) {
    const {
      result: { message, artistName, userName, phone, email, date },
    } = event
    try {
      await strapi.plugins["email"].services.email.send({
        to: `link@linkmusic.ru`,
        from: "hello@linkmusic.ru", // e.g. single sender verification in SendGrid
        subject: `Заказ выступления ${artistName}`,
        text: `${message}

Контактная информация:

Имя: ${userName}
Телефон: ${phone}
E-mail: ${email}
Дата: ${date}`,
      })
    } catch (err) {
      console.error("afterCreate", err)
    }
  },
}
