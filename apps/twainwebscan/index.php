<?php
\OCP\User::checkLoggedIn();
\OCP\App::checkAppEnabled('twainwebscan');

$tpl = new OCP\Template("twainwebscan", "scan", "user");
$tpl->printPage();
