<?php

namespace Derweili\Plugin_Starter;


add_filter( 'block_categories', function( $categories, $post ) {
	return array_merge(
		$categories,
		[
			[
                'slug' => 'gutenbergpluginstarter',
                'icon' => 'wordpress-alt',
				'title' => __( 'JS for WP - Advanced Blocks', 'gutenbergpluginstarter' ),
			],
		]
	);
}, 10, 2 );