const getController = (name) => {
  return strapi.plugins["users-permissions"].controller(name)
}

export default getController
