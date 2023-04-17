<?php

namespace AttatchmentRevisions\Helper;

class CacheBust
{
    /**
     * Returns the revved/cache-busted file name of an asset.
     * @param string $name Asset name (array key) from rev-mainfest.json
     * @param boolean $returnName Returns $name if set to true while in dev mode
     * @return string filename of the asset (including directory above)
     */
    public static function name($name, $returnName = true)
    {
        if ($returnName == true && defined('DEV_MODE') && DEV_MODE == true) {
            //return $name;
        }

        $revManifest = self::getRevManifest();
        
        if (!isset($revManifest[$name])) {
            return;
        }

        return $revManifest[$name];
    }

    /**
     * Decode assets json to array
     * @return array containg assets filenames
     */
    public static function getRevManifest()
    {
        $jsonPath = ATTACHMENT_REVISIONS_PATH . apply_filters('/AttatchmentRevisions/Helper/CacheBust/RevManifestPath', 'dist/manifest.json');

        if (file_exists($jsonPath)) {
            //var_dump(json_decode(file_get_contents($jsonPath), true));
            return json_decode(file_get_contents($jsonPath), true);
        } elseif (WP_DEBUG) {
            echo '<div style="color:red">Error: Assets not built. Go to ' . ATTACHMENT_REVISIONS_PATH . ' and run gulp. See '. ATTACHMENT_REVISIONS_PATH . 'README.md for more info.</div>';
        }
    }
}