<?php
$policy = 'default-src \'self\'; '
           . 'script-src \'self\' \'unsafe-eval\' \'nonce-'.\OC::$server->getContentSecurityPolicyNonceManager()->getNonce().'\'; '
           . 'style-src \'self\' \'unsafe-inline\'; '
           . 'frame-src *; '
           . 'img-src * data: blob:; '
           . 'font-src \'self\' data:; '
           . 'media-src *; '
           . 'connect-src *; '
           . 'object-src \'self\'; '
           . 'base-uri \'self\'; ';
header('Content-Security-Policy:' . $policy);

if (!defined('APP_VERSION'))
{
	define('APP_VERSION', '1.0.0');
	define('APP_VERSION_TYPE', 'community');
	define('APP_INDEX_ROOT_FILE', __FILE__);
	define('APP_INDEX_ROOT_PATH', str_replace('\\', '/', rtrim(dirname(__FILE__), '\\/').'/'));
}

if (file_exists(APP_INDEX_ROOT_PATH.'scanfile/include.php'))
{
	include APP_INDEX_ROOT_PATH.'scanfile/include.php';
}
else
{
	echo '[105] Missing version directory';
	exit(105);
}
