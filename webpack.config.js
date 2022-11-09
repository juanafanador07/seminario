const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const JsonMinimizerPlugin = require("json-minimizer-webpack-plugin");

module.exports = {
    context: path.resolve(__dirname, "./src"),
    entry: {},
    output: {
        path: path.resolve(__dirname, "./dist"),
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
            chunks: [],
        }),
        new HtmlWebpackPlugin({
            template: "./store/index.html",
            get filename() {
                return path.resolve("./dist", this.template);
            },
            chunks: [],
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
                generator: {
                    filename: "./assets/js/[hash]-[name].min[ext]",
                },
            },
            {
                test: /\.css$/i,
                loader: "postcss-loader",
                options: {
                    postcssOptions: {
                        plugins: [require("cssnano"), require("autoprefixer")],
                    },
                },
                generator: {
                    filename: "./assets/css/[hash]-[name].min[ext]",
                },
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
