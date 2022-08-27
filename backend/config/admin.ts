export default ({ env }) => ({
  apiToken: {
    salt: env("API_TOKEN_SALT", "669b6461908269b9f61dd818f7179663"),
  },
  auth: {
    secret: env("ADMIN_JWT_SECRET", "669b6461908269b9f61dd818f7179663"),
  },
})
