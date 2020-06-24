<?php

namespace Antares\Plugin;

add_action( 'init', __NAMESPACE__ . '\register_blocks', 40 );
/**
 * Enqueue block editor only JavaScript and CSS.
 */
function register_blocks() {	

    // Fail if block editor is not supported
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

    // List all of the blocks for your plugin
    $blocks = [
        "antaresplugin/gallery",
    ];

    // Register each block with same CSS and JS
    foreach( $blocks as $block ) {
        if( "antaresplugin/gallery" === $block ) {            
            register_block_type( $block, [
                'editor_script' => 'antares-plugin-editor-js',
                'editor_style'  => 'antares-plugin-editor-css',
                'style' => 'antares-plugin-css',
                'attributes' => [                    
                    'images' => [
                        'type' => "array",
                        'default' => []
                    ],
                    'direction' => [
                        'type'=> "string",
                        'default' => "row"
                    ],
                    'isLightboxEnabled' => [
                        'type' => "boolean",
                        'default' => true
                    ]
                ]
             ] );	  
        }
        else {            
            register_block_type( $block, [
                'editor_script' => 'antares-plugin-editor-js',
                'editor_style'  => 'antares-plugin-editor-css',
                'style' => 'antares-plugin-css'
             ] );	  
        }
    }

}



