/*=========================================================================================
  File Name: vue.config.js
  Description: configuration file of vue
  ----------------------------------------------------------------------------------------
==========================================================================================*/

const path = require('path')
module.exports = {
    pwa: {
        name: 'Santa Factory',
        themeColor: '#7367F0',
        msTileColor: '#7367F0',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'default',
        manifestOptions: {
            background_color: "#7367F0"
        },
        // configure the workbox plugin
        workboxPluginMode: 'InjectManifest',
        workboxOptions: {
            // swSrc is required in InjectManifest mode.
            swSrc: 'src/registerServiceWorker.js',
            // ...other Workbox options...
        }
    },
    configureWebpack: {
        module: {
            rules: [
                {
                    test: /\.(pdf)(\?.*)?$/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                name: 'files/[name].[hash:8].[ext]'
                            }
                        }
                    ]
                }
            ]
        }
    },

    transpileDependencies: [
        'vue-echarts',
        'resize-detector'
    ],

    outputDir: 'dist',
    assetsDir: 'static',
    // baseUrl: IS_PRODUCTION
    // ? 'http://cdn123.com'
    // : '/',
    // For Production, replace set baseUrl to CDN
    // And set the CDN origin to `yourdomain.com/static`
    // Whitenoise will serve once to CDN which will then cache
    // and distribute


    // uncomment before executing 'npm run build'
    // css: {
    //     extract: {
    //         filename: "bundle.css",
    //         chunkFilename: "bundle.css",
    //     },
    // },
    devServer: {
        overlay: {
            warnings: true,
            errors: true
        },
        // proxy: {
        //     '/api*': {
        //         // Forward frontend dev server request for /api to django dev server
        //         target: 'http://localhost:8000/',
        //     }
        // }
    }
}

