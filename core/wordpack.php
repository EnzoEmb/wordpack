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