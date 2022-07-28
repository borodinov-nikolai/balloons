declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production" | "test"
      DATABASE_CLIENT: "postgresql" | "sqlite"
      DATABASE_HOST: string
      DATABASE_PORT: number
      DATABASE_NAME: string
      DATABASE_USERNAME: string
      DATABASE_PASSWORD: string
      DATABASE_SSL: boolean
      HOST: string
      PORT: number
      NODE_PORT: number
      APP_KEYS: string
      API_TOKEN_SALT: string
      ADMIN_JWT_SECRET: string
      JWT_SECRET: string
      NEXT_PUBLIC_API_URL: string
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
