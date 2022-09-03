export default {
  routes: [
    {
      method: "GET",
      path: "/release-link",
      handler: "release-link.getReleaseLink",
      config: {
        policies: [],
      },
    },
  ],
}
