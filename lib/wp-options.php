<?php

namespace Antares\Plugin;

$option_name = "jsforwpadvgb_block_setting";

if( get_option( $option_name ) === false ) {
    update_option( $option_name, "" );
}

