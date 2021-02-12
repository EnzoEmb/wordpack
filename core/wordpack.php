<?php 
/**
 * 
 * Disable emojis
 */
function wordpack_disable_emojis() {
	remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
	remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
	remove_action( 'wp_print_styles', 'print_emoji_styles' );
	remove_action( 'admin_print_styles', 'print_emoji_styles' );	
	remove_filter( 'the_content_feed', 'wp_staticize_emoji' );
	remove_filter( 'comment_text_rss', 'wp_staticize_emoji' );	
	remove_filter( 'wp_mail', 'wp_staticize_emoji_for_email' );
	
	// Remove from TinyMCE
	add_filter( 'tiny_mce_plugins', 'wordpack_disable_emojis_tinymce' );
}
add_action( 'init', 'wordpack_disable_emojis' );




/**
 * 
 * Disable wp-embed.js
 */
function wordpack_disable_embed_js(){
  wp_deregister_script( 'wp-embed' );
}
add_action( 'wp_footer', 'wordpack_disable_embed_js' );




/**
 * 
 * Defer scripts
 */
function wordpack_defer_scripts($tag, $handle) {
  $exclude = [];
  if(!in_array($handle, $exclude)){
    $tag = str_replace(' src', ' defer src', $tag);
  }
  return $tag;

}
add_filter('script_loader_tag', 'wordpack_defer_scripts', 10, 2);




/**
 * 
 * Async styles
 */
function wordpack_async_styles($tag, $handle) {
  $include = ["main", "wp-block-library"];
  if(in_array($handle, $include)){
    $tag = str_replace(" media='all'", ' media="print" onload="this.media=\'all\'; this.onload=null;"', $tag);
  }
  return $tag;
  
}
add_filter('style_loader_tag', 'wordpack_async_styles', 10, 2);




/**
 * 
 * Load the appropiate scripts for the specified route
 */
function wordpack_load_chunk($chunk_name){  
  $chunks = file_get_contents( get_template_directory() . "/assets/chunks-manifest.json");
  $chunks_json = json_decode($chunks, true);
  $my_chunks = $chunks_json[$chunk_name]["scripts"];

  $last_time_modified_manifest  = date("ymd-Gis", filemtime(get_template_directory() . '/assets/chunks-manifest.json'));


  foreach ($my_chunks as $key => $value) {
    wp_enqueue_script(
      $chunk_name.'-'.$key,
      get_template_directory_uri() . '/assets/'. substr($value, 2),
      null,
      $last_time_modified_manifest,
      true
    );
  }
}


/**
 * 
 * Register inline script w/ ajax nonce
 */
function wordpack_ajax($ajax_name, $key){
  
  $script_name = uniqid();
	wp_register_script( $script_name, '' );
	wp_enqueue_script( $script_name );
	wp_add_inline_script( $script_name, 'const '.$ajax_name.' = "'.wp_create_nonce('MY_NONCE_KEY').'"');


	// wp_register_script( 'my-ajax-nonce-script', '' );
	// wp_enqueue_script( 'my-ajax-nonce-script' );
	// wp_add_inline_script( 'my-ajax-nonce-script', 'const MY_ACTION_NONCE = "'.wp_create_nonce('MY_NONCE_KEY').'"');
}


/**
 * 
 * Check if is in dev
 */
function wordpack_is_dev()
{
  // check if is in localhost and debug is true
	$whitelist = array(
		'127.0.0.1',
		'::1'
	);
	if (WP_DEBUG && in_array($_SERVER['REMOTE_ADDR'], $whitelist)) {
		return true;
	}
}


/**
 * 
 * Wordpack Image
 */
function wordpack_img($name, $alt){
  $file_path = get_template_directory() . '/assets/img/' . $name;
  $file_type = mime_content_type($file_path);
  $file_name = pathinfo($name, PATHINFO_FILENAME);;
  $file_path_webp = get_template_directory() . '/assets/img/' . $file_name . '.webp';
  $file_size = getimagesize($file_path);



  if(file_exists($file_path)){
    $original_url = get_template_directory_uri() . '/assets/img/' . $name;
    // return '<img src="'.$url.'" alt="'.$alt.'" />';
  }
  if(file_exists($file_path_webp)){
    $webp_url = get_template_directory_uri() . '/assets/img/' . $file_name . '.webp';
  }
  
  return '<picture>
  '.($webp_url ? '<source srcset="'.$webp_url.'" type="image/webp">' : '').'
  '.($original_url ? '<source srcset="'.$original_url.'" type="'.$file_type.'"> ' : '').'
  '.($original_url ? '<img src="'.$original_url.'" '.$file_size[3].'>' : '').'
  </picture>';
}