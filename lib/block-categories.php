<?php

namespace Antares\Plugin;


add_filter( 'block_categories', function( $categories, $post ) {
	return array_merge(
		$categories,
		[
			[
                'slug' => 'antaresplugin',
                'icon' => 'wordpress-alt',
				'title' => __( 'JS for WP - Advanced Blocks', 'antaresplugin' ),
			],
		]
	);
}, 10, 2 );