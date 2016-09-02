<?php

/**
 * Plugin Name:       Attachment Revisions
 * Plugin URI:        http://github.com/helsingborg-stad/attachment-revisions
 * Description:       Enables document revisions and media swapping for the attachment post type
 * Version:           1.0.0
 * Author:            Kristoffer Svanmark
 * Author URI:        http://github.com/helsingborg-stad
 * License:           MIT
 * License URI:       https://opensource.org/licenses/MIT
 * Text Domain:       attachment-revisions
 * Domain Path:       /languages
 */

 // Protect agains direct file access
if (! defined('WPINC')) {
    die;
}

define('ATTACHMENTREVISIONS_PATH', plugin_dir_path(__FILE__));
define('ATTACHMENTREVISIONS_URL', plugins_url('', __FILE__));
define('ATTACHMENTREVISIONS_TEMPLATE_PATH', ATTACHMENTREVISIONS_PATH . 'templates/');

load_plugin_textdomain('attachment-revisions', false, plugin_basename(dirname(__FILE__)) . '/languages');

require_once ATTACHMENTREVISIONS_PATH . 'source/php/Vendor/Psr4ClassLoader.php';
require_once ATTACHMENTREVISIONS_PATH . 'Public.php';

// Instantiate and register the autoloader
$loader = new AttachmentRevisions\Vendor\Psr4ClassLoader();
$loader->addPrefix('AttachmentRevisions', ATTACHMENTREVISIONS_PATH);
$loader->addPrefix('AttachmentRevisions', ATTACHMENTREVISIONS_PATH . 'source/php/');
$loader->register();

// Start application
new AttachmentRevisions\App();
