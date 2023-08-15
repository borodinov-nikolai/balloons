export default ({ env }) => ({
  email: {
    config: {
      provider: "sendgrid",
      providerOptions: {
        apiKey:
          "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",
      },
      settings: {
        defaultFrom: "a.platya@yandex.ru",
        defaultReplyTo: "a.platya@yandex.ru",
      },
    },
  },
})
