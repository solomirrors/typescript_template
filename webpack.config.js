const path = require('path');
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (env = {}) => {
    const { mode = 'development' } = env;
    const isProd = mode === 'production';
    const isDev = mode === 'development'

    const getStyleLoaders = () => {
        return [
            isProd ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader'
        ]
    }

    const getPlugins = () => {
        const plugins = [
            new HtmlWebpackPlugin({
                title: "Webpack World",
                buildTime: new Date().toString(),
                template: "public/index.html",
                filename: "index.html",
            })
        ];
        if (isProd) {
            plugins.push(new MiniCssExtractPlugin({
                filename: isProd ? 'style/main.css' : undefined
            }));
        };

        return plugins;
    };


    return{
        mode: isProd ? 'production' : isDev && 'development',
        entry: './src/index.tsx',
        module: {
            rules: [
                {
                    //Loading TypeScript
                    test: /\.(ts|tsx)?$/,
                    exclude: /node_modules/,
                    use: ['ts-loader'],
                },
                {
                    //Loading CSS
                    test: /\.(css)$/,
                    use: getStyleLoaders()
                },
                {
                    //Loading SASS/SCSS
                    test: /\.(s[ca]ss)$/,
                    use: [ ...getStyleLoaders(), "sass-loader"]
                },
                {
                    // Loading Images

                    test: /\.(png|jpg|jpeg|svg|gif|ico)$/,
                    type: 'asset/resource',
                    generator: {
                        filename: 'image/[name]-[hash:7][ext][query]'
                    }
                },
                {
                    //Loading Fonts
                    test: /\.(ttf|otf|eot|woff|woff2)$/,
                    type: 'asset/resource',
                    generator: {
                        filename: 'font/[name][ext][query]'
                    }
                }
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'script/main.js'
        },
        plugins: getPlugins()
        //plugins: [new BundleAnalyzerPlugin()]
    }
};