const path = require("path")

module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  
  mode: "development",

  // Enable sourcemaps for debugging webpack"s output.
  devtool: "source-map",

  resolve: {
    // Add ".ts" and ".tsx" as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json"]
  },

  module: {
    rules: [
      // All files with a ".ts" or ".tsx" extension will be handled by "awesome-typescript-loader".
      {
        test: /\.tsx?$/,
        loader: "ts-loader"
      },
      
      // All output ".js" files will have any sourcemaps re-processed by "source-map-loader".
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },

      {
        test: /\.(scss)$/,
        use: [
          { loader: "style-loader" }, // inject CSS to page
          { loader: "css-loader" }, // translates CSS into CommonJS modules
          {
            loader: "postcss-loader", // Run post css actions
            options: {
              postcssOptions: {
                plugins: [
                  require.resolve('autoprefixer')
                ]
              }
            }
          },
          { loader: "sass-loader" } // compiles Sass to CSS
        ]
      },

      { test: /\.png$/, loader: "url-loader" }

    ]
  }
};