import routes from "./server/routes"
import { updateMe } from "./server/controllers"

export default (plugin) => {
  plugin.controllers.user.updateMe = updateMe

  plugin.routes["content-api"].routes = routes.concat(
    plugin.routes["content-api"].routes
  )
  return plugin
}
