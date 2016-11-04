<?php

/**
 * Plugin Name:       Attatchment Revisions
 * Plugin URI:
 * Description:       Replace media files and keep revisions
 * Version:           1.0.0
 * Author:            Kristoffer Svanmark
 * Author URI:
 * License:           MIT
 * License URI:       https://opensource.org/licenses/MIT
 * Text Domain:       media-replacer
 * Domain Path:       /languages
 */

 // Protect agains direct file access
if (! defined('WPINC')) {
    die;
}

define('ATTACHMENT_REVISIONS_PATH', plugin_dir_path(__FILE__));
define('ATTACHMENT_REVISIONS_URL', plugins_url('', __FILE__));
define('ATTACHMENT_REVISIONS_TEMPLATE_PATH', ATTACHMENT_REVISIONS_PATH . 'templates/');

load_plugin_textdomain('media-replacer', false, plugin_basename(dirname(__FILE__)) . '/languages');

require_once ATTACHMENT_REVISIONS_PATH . 'source/php/Vendor/Psr4ClassLoader.php';
require_once ATTACHMENT_REVISIONS_PATH . 'Public.php';

// Instantiate and register the autoloader
$loader = new AttatchmentRevisions\Vendor\Psr4ClassLoader();
$loader->addPrefix('AttatchmentRevisions', ATTACHMENT_REVISIONS_PATH);
$loader->addPrefix('AttatchmentRevisions', ATTACHMENT_REVISIONS_PATH . 'source/php/');
$loader->register();

// Start application
new AttatchmentRevisions\App();
