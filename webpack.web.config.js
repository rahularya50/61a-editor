const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: {
        app: "./src/renderer/index.js",
        pythonWorker: "./src/web/pythonWorker.js",
    },
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist/web"),
        // publicPath: "dist/web",
    },
    devtool: "source-map",
    devServer: {
        contentBase: ".",
    },
    module: {
        noParse: /monaco-editor\/min\/vs\/loader\.js|jquery\.jsPlumb-1\.3\.10-all-min\.js/,
        rules: [
            {
                test: /.jsx?$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                query: {
                    presets: ["@babel/react"],
                },
            },
            {
                test: /\.css$/,
                use: [{ loader: "style-loader" }, { loader: "css-loader" }],
            },
            {
                test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/,
                loader: "url-loader",
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin(),
        new webpack.DefinePlugin({
            ELECTRON: false,
            __static: JSON.stringify("./dist/web/static"),
        }),
        new MonacoWebpackPlugin({
            languages: ["python", "scheme", "sql"],
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            jquery: "jquery",
        }),
        new CopyWebpackPlugin([{
            from: "static",
            to: "static",
        }]),
    ],

};
