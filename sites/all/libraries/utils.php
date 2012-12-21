<?php 
/* CONSTANT */



function __deal_with_ie()
{
	$tpath = drupal_get_path('theme', 'geotec2013');
	return '
		<!--[if lt IE 7]>
		<meta HTTP-EQUIV="REFRESH" content="0; url=http://'.$_SERVER['HTTP_HOST'].'/old-browser.html">
		<![endif]-->
		<!--[if lt IE 9]>
		<script src="/'.$tpath.'/js/html5.js"></script>
		<![endif]-->	
	';
}

function __get_param($index, $default='', $source='')
{
	if ($source == '') $source = $_REQUEST;
	if (@array_key_exists($index, $source)) return $source[$index];
	else return $default;
}
function __get_current_language_ver($nid, $lang)
{
	$sql = 'Select tnid From node Where nid = '.$nid;
	$res = db_query($sql);
	$item = db_fetch_object($res);
	
	$tnid = $item->tnid;
	
	if (!empty($tnid)) 
	{
		$sql = 'Select nid From node Where tnid ='.$tnid.' And language = "'.$lang.'"';
		$res = db_query($sql);
		$item = db_fetch_object($res);
		
		$lnid = $item->nid;
		if (!empty($lnid)) return $lnid;
		else return $nid;
	}
	else 
	{
		return $nid;
	}
}

?>
