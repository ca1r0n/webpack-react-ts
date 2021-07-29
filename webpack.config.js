const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const autoprefixer = require("autoprefixer")

var config = {
    resolve: {
        extensions: [".js", ".ts", ".jsx", ".tsx", ".json"],
    },
    entry: "./src/index.tsx",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "index.js",
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 3000,
        open: true,
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.[tj]sx?$/,
                use: ["ts-loader"],
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            modules: {
                                mode: "local",
                                localIdentName:
                                    "[name]__[local]--[hash:base64:5]",
                            },
                        },
                    },
                    {
                        loader: "postcss-loader",
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },
            {
                test: /\.css?$/,
                use: ["style-loader", "css-loader", "postcss-loader"],
            },
            {
                test: /\.(png|jpg|svg)$/i,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 8192,
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src/index.html"),
        }),
        require("autoprefixer"),
    ],
}

module.exports = (mode, argv) => {
    
    if (mode == "development") {
        // DEVELOPMENT
        config.mode = "development"
        config.devServer.hot = true
        devtool = "eval"
    } else if (mode == "production") {
        // PRODUCTION
        ;(config.mode = "production"), (devtool = false)
    }

    return config
}
