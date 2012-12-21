<?php


function homepage_content()
{
	global $language;
	$lang = $language->language;
	
	module_invoke('nmtam', 'safemode');	
	

	
	return theme($theme, $vars);
}

