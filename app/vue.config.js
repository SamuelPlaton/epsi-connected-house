module.exports = {
  lintOnSave: false,
  publicPath: process.env.NODE_ENV === "production" ? "/vue-app-2/" : "/",
  outputDir: "docs",

  transpileDependencies: [
    'vuetify'
  ]
};
