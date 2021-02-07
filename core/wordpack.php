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
