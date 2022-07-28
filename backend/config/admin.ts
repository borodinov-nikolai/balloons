export default ({ env }) => ({
  auth: {
    secret: env("ADMIN_JWT_SECRET", "669b6461908269b9f61dd818f7179663"),
  },
})
