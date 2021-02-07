<?php 
include_once "core/wordpack.php";
include_once "core/wordpack-functions.php";



function add_theme_assets()
{

	// cache bust
	// $my_js_ver  = date("ymd-Gis", filemtime(plugin_dir_path(__FILE__) . '/assets/js/app.js'));
	// $my_css_ver = date("ymd-Gis", filemtime(plugin_dir_path(__FILE__) . '/assets/css/style.css'));

	// Styles
	// wp_enqueue_style('bootstrap', get_template_directory_uri() . '/vendor/bootstrap/css/bootstrap.min.css', array(), $my_css_ver);
	// wp_enqueue_style('main', get_template_directory_uri() . '/assets/css/style.css', array(), $my_css_ver);

	// Scripts
	// wp_enqueue_script('jquery', get_template_directory_uri() . '/vendor/jquery/jquery.min.js', array(), $my_js_ver);
	// wp_enqueue_script('bootstrap', get_template_directory_uri() . '/vendor/bootstrap/js/bootstrap.bundle.min.js', array('jquery'), '1.0.0');
	// wp_enqueue_script('swiper', get_template_directory_uri() . '/vendor/swiper/swiper-bundle.min.js', array(), $my_js_ver);

	// wp_enqueue_script('app', get_template_directory_uri() . '/assets/js/app.js', array(), $my_js_ver);

  if(is_home()){
    wordpack_load_chunk('app');
  }
  if(is_page(5)){
    wordpack_load_chunk('page_2');

  }


	// Ajax
	// wp_localize_script('app', 'ajax_var', array(
	// 	'url'    => admin_url('admin-ajax.php'),
	// 	'nonce'  => wp_create_nonce('my-ajax-nonce'),
	// 	'action' => 'checkForm'
	// ));
}
add_action('wp_enqueue_scripts', 'add_theme_assets');