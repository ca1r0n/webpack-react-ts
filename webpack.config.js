const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const autoprefixer = require("autoprefixer")

var config = {
    resolve: {
        extensions: [".js", ".ts", ".jsx", ".tsx", ".json"],
    },
    entry: "./src/app.tsx",
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
            //загрузчик для jsx
            {
                test: /\.[tj]sx?$/, // определяем тип файлов
                use: ["ts-loader"],
            },
            {
                test: /\.scss$/,
                // use: ['css-loader','style-loader']
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
                        loader: 'postcss-loader',
                        
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
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
