const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const JsonMinimizerPlugin = require("json-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    context: path.resolve(__dirname, "./src"),
    entry: {
        home: {
            import: [
                "./assets/js/scroll.js",
                "./assets/js/aos.js",
                "./assets/js/header.js",
                "./assets/js/loader.js",
                "./assets/css/main.css",
            ],
        },
        store: {
            import: ["./assets/js/store.js"],
        },
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "./assets/js/[name]-[contenthash].js",
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: [
                {
                    from: "*.json",
                    to: "../dist",
                },
            ],
        }),
        new HtmlWebpackPlugin({
            template: "index.html",
            get filename() {
                return path.resolve("./dist", this.template);
            },
            chunks: ["home"],
        }),
        new HtmlWebpackPlugin({
            template: "./store/index.html",
            get filename() {
                return path.resolve("./dist", this.template);
            },
            chunks: ["store"],
        }),
        new MiniCssExtractPlugin({
            filename: "./assets/css/[name]-[contenthash].css",
        }),
    ],
    module: {
        rules: [
            {
                test: /\.html$/,
                loader: "html-loader",
            },
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                    },
                },
            },
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    require("cssnano"),
                                    require("autoprefixer"),
                                ],
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(jpe?g|png|webp)$/i,
                oneOf: [
                    {
                        resourceQuery: /size/,
                        loader: "responsive-loader",
                        options: {
                            name: "[name]-[width]w.[ext]",
                            outputPath: "./assets/img/",
                        },
                    },
                    {
                        loader: "responsive-loader",
                        options: {
                            name: "[name].[ext]",
                            outputPath: "./assets/img/",
                        },
                    },
                ],
                generator: {
                    filename: (pathData) => {
                        let query = pathData.module.resourceResolveData.query;
                        if (query.length > 0) {
                            let size = query.match(/size=([^&]*)/)[1];
                            return `./assets/img/[name]-${size}w[ext]`;
                        } else {
                            return `./assets/img/[name][ext]`;
                        }
                    },
                    emit: false,
                },
            },
        ],
    },
    optimization: {
        minimize: true,
        minimizer: [`...`, new JsonMinimizerPlugin()],
        realContentHash: false,
    },
};
