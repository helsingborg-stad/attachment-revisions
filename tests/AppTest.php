<?php

declare(strict_types=1);

use AttatchmentRevisions\App;
use PHPUnit\Framework\Attributes\RunInSeparateProcess;
use PHPUnit\Framework\TestCase;
use WpService\Implementations\NativeWpService;
use WpUtilService\WpUtilService;

final class AppTest extends TestCase
{
    #[RunInSeparateProcess]
    public function testAdminAssetsUseNativeWpService(): void
    {
        function add_action(...$args)
        {
            $GLOBALS['wp_test_actions'][$args[0]] = $args[1];
            return true;
        }

        function add_filter(...$args)
        {
            $GLOBALS['wp_test_calls']['filter'][] = $args;
            return true;
        }

        function plugins_url(...$args)
        {
            return 'https://example.test/plugins/attachment-revisions';
        }

        function wp_cache_get(...$args)
        {
            return [
                'css/attachment-revisions.css' => 'css/attachment-revisions.hash.css',
                'js/attachment-revisions.js' => 'js/attachment-revisions.hash.js',
            ];
        }

        function wp_register_style(...$args)
        {
            $GLOBALS['wp_test_calls']['style'] = $args;
            return true;
        }

        function wp_enqueue_style(...$args)
        {
            $GLOBALS['wp_test_calls']['enqueue_style'] = $args;
        }

        function wp_register_script(...$args)
        {
            $GLOBALS['wp_test_calls']['script'] = $args;
            return true;
        }

        function wp_enqueue_script(...$args)
        {
            $GLOBALS['wp_test_calls']['enqueue_script'] = $args;
        }

        function wp_localize_script(...$args)
        {
            $GLOBALS['wp_test_calls']['localize'] = $args;
            return true;
        }

        function __($text, $domain = 'default')
        {
            return $text;
        }

        $GLOBALS['wp_test_actions'] = [];
        $GLOBALS['wp_test_calls'] = [];
        $wpUtilService = new WpUtilService(new NativeWpService());
        new App($wpUtilService->enqueue('/var/www/wp-content/plugins/attachment-revisions'));
        $GLOBALS['wp_test_calls'] = [];

        $GLOBALS['current_screen'] = (object) ['id' => 'dashboard'];
        $GLOBALS['wp_test_actions']['admin_enqueue_scripts']();
        self::assertSame([], $GLOBALS['wp_test_calls']);

        $GLOBALS['current_screen']->id = 'upload';
        $GLOBALS['wp_test_actions']['admin_enqueue_scripts']();
        $calls = $GLOBALS['wp_test_calls'];
        self::assertSame(
            ['css-attachment-revisionscss', 'https://example.test/plugins/attachment-revisions/assets/dist/css/attachment-revisions.hash.css', [], false, 'all'],
            $calls['style'],
        );
        self::assertSame(['css-attachment-revisionscss', '', [], false, 'all'], $calls['enqueue_style']);
        self::assertSame(
            ['js-attachment-revisionsjs', 'https://example.test/plugins/attachment-revisions/assets/dist/js/attachment-revisions.hash.js', [], false, true],
            $calls['script'],
        );
        self::assertSame(['js-attachment-revisionsjs', '', [], false, []], $calls['enqueue_script']);
        self::assertSame(
            ['js-attachment-revisionsjs', 'mediaReplacer', ['newImage' => 'Upload new image', 'replace' => 'Replace image']],
            $calls['localize'],
        );
        self::assertSame('script_loader_tag', $calls['filter'][0][0]);
    }
}
