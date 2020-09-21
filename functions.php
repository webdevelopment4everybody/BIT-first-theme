<?php
add_action('wp_enqueue_scripts', function () {
	wp_enqueue_style('style', get_stylesheet_uri('style.css'));
});
add_action('wp_footer', function () {
	wp_enqueue_script('app', get_theme_file_uri('main.js'));
	wp_enqueue_script('axios', 'https://unpkg.com/axios/dist/axios.min.js');
});
