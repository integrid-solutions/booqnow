const mix = require('laravel-mix');
const path = require('path');

mix.setPublicPath(path.normalize('assets'));
mix.setResourceRoot(path.normalize('src'));
mix.setResourceRoot('./../');

if (mix.inProduction()) {
  mix.options({
    terser: {
      terserOptions: {
        compress: {
          drop_console: true,
        },
      },
    },
  });
} else {
  mix.webpackConfig({ devtool: 'inline-source-map' }).sourceMaps();
}

function resolve(dir) {
  return path.join(__dirname, dir);
}

mix.webpackConfig({
  resolve: {
    alias: {
      '@': resolve('src/js'),
    },
  },
  
  output: {
    publicPath: path.normalize('/'),
    chunkFilename: '[name].js',
  },
  
  watchOptions: {
    ignored: /node_modules/,
  },
});

mix.js('src/js/app.js', 'js/app.js').version();

mix.extract([
  'jquery',
]);

mix.autoload({
  jquery: ['$', 'jQuery', 'window.jQuery'],
});

mix.sass('src/sass/app.scss', 'css').version();

mix.combine([
  'src/sass/vendor/web/assets/mobirise-icons-bold/mobirise-icons-bold.css',
  'src/sass/vendor/web/assets/mobirise-icons/mobirise-icons.css',
  'src/sass/vendor/tether/tether.min.css',
  'src/sass/vendor/bootstrap/css/bootstrap.min.css',
  'src/sass/vendor/bootstrap/css/bootstrap-grid.min.css',
  'src/sass/vendor/bootstrap/css/bootstrap-reboot.min.css',
  'src/sass/vendor/facebook-plugin/style.css',
  'src/sass/vendor/animatecss/animate.min.css',
  'src/sass/vendor/dropdown/css/style.css',
  'src/sass/vendor/web/assets/gdpr-plugin/gdpr-styles.css',
  'src/sass/vendor/socicon/css/styles.css',
  'src/sass/vendor/theme/css/style.css',
  'src/sass/vendor/mobirise/css/mbr-additional.css',
], 'assets/css/vendor.css').version();

mix.combine([
  'src/js/vendor-js/popper/popper.min.js',
  'src/js/vendor-js/tether/tether.min.js',
  'src/js/vendor-js/bootstrap/js/bootstrap.min.js',
  'src/js/vendor-js/facebook-plugin/facebook-script.js',
  'src/js/vendor-js/smoothscroll/smooth-scroll.js',
  'src/js/vendor-js/web/assets/cookies-alert-plugin/cookies-alert-core.js',
  'src/js/vendor-js/web/assets/cookies-alert-plugin/cookies-alert-script.js',
  'src/js/vendor-js/viewportchecker/jquery.viewportchecker.js',
  'src/js/vendor-js/touchswipe/jquery.touch-swipe.min.js',
  'src/js/vendor-js/theme/js/script.js',
], 'assets/js/vendor-other.js');
