export default {
  routes: [
    {
      method: "GET",
      path: "/captcha",
      handler: "captcha.getCaptchaImage",
      config: {
        policies: [],
      },
    },
    {
      method: "POST",
      path: "/captcha",
      handler: "captcha.checkCaptcha",
      config: {
        policies: [],
      },
    },
  ],
}
