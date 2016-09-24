const elixir = require('laravel-elixir');

require('laravel-elixir-vue');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(mix => {
    //mix.sass('app.scss')
    //   .sass('app_2.scss','public/css/app_2.css')
    mix.webpack('app.js')
       .browserSync({
       		proxy: 'lara.dev/vue'
       });
});

