export default ({ env }) => ({
  email: {
    config: {
      provider: "sendgrid",
      providerOptions: {
        apiKey: env("SENDGRID_API_KEY"),
      },
      settings: {
        defaultFrom: "hello@linkmusic.ru",
        defaultReplyTo: "hello@linkmusic.ru",
      },
    },
  },
})
