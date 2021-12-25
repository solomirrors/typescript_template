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
                filename: "asset/static/[name].html",
            })
        ];
        if (isProd) {
            plugins.push(new MiniCssExtractPlugin({
                filename: isProd ? 'asset/style/[name]-[hash:8].css' : undefined
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
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    use: 'ts-loader',
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
                        filename: 'asset/image/[name]-[hash:7][ext][query]'
                    }
                },
                {
                    //Loading Fonts
                    test: /\.(ttf|otf|eot|woff|woff2)$/,
                    type: 'asset/resource',
                    generator: {
                        filename: 'asset/font/[name]-[hash:7][ext][query]'
                    }
                }
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dist'),
        },
        plugins: getPlugins()
        //plugins: [new BundleAnalyzerPlugin()]
    }
};