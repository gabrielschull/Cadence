import path from 'path';
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyPlugin from "copy-webpack-plugin";
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'dist'), // path for the build
        filename: '[name].js',
    },
    mode: 'development',
    devtool: 'inline-source-map', 
    module: {
        rules: [
            {
                test: /\.js|jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            ['@babel/preset-react', {"runtime": "automatic"}]
                        ],
                    }
                }
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            },
            {
                test: /\.svg$/i,
                use: [
                    {
                        loader: 'svg-url-loader',
                        options: {
                            limit: 10000,
                        },
                    },
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: '../public/index.html',
            filename: 'sidebar.html',
        }),
        new MiniCssExtractPlugin(),
        new CopyPlugin({
            patterns: [
                {
                    from: "../public",
                },
            ],
        }),
    ],
};