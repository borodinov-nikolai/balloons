import routes from "./server/routes"
import { updateMe } from "./server/controllers"

const {
  getPaginationInfo,
  transformPaginationResponse,
} = require("@strapi/strapi/lib/core-api/service/pagination")
const utils = require("@strapi/utils")

export default (plugin) => {
  plugin.controllers.user.updateMe = updateMe

  plugin.controllers.user.find = async (ctx) => {
    const uid = "plugin::users-permissions.user"
    const { pagination = {}, ...restOfCtxQueries } = ctx.query
    const params = { ...restOfCtxQueries, ...pagination }
    const query = utils.convertQueryParams.transformParamsToQuery(uid, params)

    const { results: users, pagination: pageResult } = await strapi.db
      .query(uid)
      .findPage(query)

    ctx.body = {
      data: users,
      meta: { pagination: pageResult },
    }
  }

  plugin.routes["content-api"].routes = routes.concat(
    plugin.routes["content-api"].routes
  )
  return plugin
}
