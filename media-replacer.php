<?php

/**
 * Plugin Name:       Attatchment Revisions
 * Plugin URI:
 * Description:       Replace media files and keep revisions
 * Version: 3.0.11
 * Author:            Kristoffer Svanmark
 * Author URI:
 * License:           MIT
 * License URI:       https://opensource.org/licenses/MIT
 * Text Domain:       media-replacer
 * Domain Path:       /languages
 */
use WpService\Implementations\NativeWpService;
use WpUtilService\WpUtilService;

 // Protect agains direct file access
if (! defined('WPINC')) {
    die;
}

define('ATTACHMENT_REVISIONS_PATH', plugin_dir_path(__FILE__));
define('ATTACHMENT_REVISIONS_URL', plugins_url('', __FILE__));
define('ATTACHMENT_REVISIONS_TEMPLATE_PATH', ATTACHMENT_REVISIONS_PATH . 'templates/');

load_plugin_textdomain('media-replacer', false, plugin_basename(dirname(__FILE__)) . '/languages');

// Autoload from plugin
if (file_exists(ATTACHMENT_REVISIONS_PATH . 'vendor/autoload.php')) {
    require_once ATTACHMENT_REVISIONS_PATH . 'vendor/autoload.php';
}
require_once ATTACHMENT_REVISIONS_PATH . 'Public.php';

$wpService = new NativeWpService();
$wpUtilService = new WpUtilService($wpService);

// Start application
new AttatchmentRevisions\App($wpUtilService->enqueue(__DIR__));
