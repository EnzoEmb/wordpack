<?php 
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
