<?php include($_SERVER['DOCUMENT_ROOT'] . "/includes/headers.php"); ?>
<!DOCTYPE html>
<html>
<head>
	<title>Tellraw Generator</title>
	<meta name="description" content="Tellraw Coder and Generator for Minecraft 1.7+"> 
	<?php $modernizer = true; $jscolor = true; include($_SERVER['DOCUMENT_ROOT'] . "/includes/head.php"); ?>
	<link rel="stylesheet" type="text/css" href="tellraw.css">
	<script src="minecraftLanguageStrings.js"></script>
	<script src="lang.js"></script>
	<script src="tellraw.js"></script>
	<meta charset="UTF-8">
</head>
<body class="minecraft">
	<?php if (!@$_GET['condensed']) { include($_SERVER['DOCUMENT_ROOT'] . "/includes/navbar.php"); ?>
	<div class="row">
		<div class="col-md-5 col-xs-12">
			<h4 class="language_area" id="page_header_edit">
				Tellraw Generator for Minecraft 1.7+
			</h4>
		</div>
		<div class="col-md-1 col-xs-12 row-margin-top row-margin-bottom">
			<div class="btn-group btn-block">
				<button type="button" class="btn btn-block btn-xs btn-default dropdown-toggle" data-toggle="dropdown">
					<span class="glyphicon glyphicon-share-alt"></span>
				</button>
				<ul class="dropdown-menu" role="menu">
					<li><a href="https://twitter.com/intent/tweet?original_referer=http%3A%2F%2Fezekielelin.com%2Fminecraft%2Ftellraw%2F&amp;text=%2Ftellraw%20generator%20for%20minecraft&amp;tw_p=tweetbutton&amp;url=http%3A%2F%2Fezekielelin.com%2Fminecraft%2Ftellraw%2F&amp;via=ezekielfe">Tweet</a></li>
				</ul>
			</div>
		</div>
		<div class="col-md-4 col-xs-12 row-margin-top row-margin-bottom">
			<a href="http://www.minecraftforum.net/topic/1980545-" id="receive_updates_edit" class="language_area btn btn-block btn-xs btn-success">Receive updates here ("Follow" the topic)</a>
		</div>
		<div class="col-md-2 col-xs-12 row-margin-top row-margin-bottom">
			<div class="btn-group btn-block">
				<button type="button" class="btn btn-block btn-xs btn-default dropdown-toggle" data-toggle="dropdown">
					<span class="language_area" id="language_button_text_edit">Language</span> <span class="caret"></span>
				</button>
				<ul class="dropdown-menu" role="menu" id="language_keys_edit">
				</ul>
			</div>
		</div>
	</div>
	<div class="alerts">
	</div>
	<br><br>
	<?php } else { ?>
	<div style="padding:20px">
		<?php } ?>
		<div class="forms">
			<div class="row">
				<div class="col-md-2 col-xs-12 row-margin-top row-margin-bottom">
					<span class="language_area" id="player_header_edit"></span><br>
					<span class="language_area" id="player_description_edit"></span>
				</div>
				<div class="col-md-10 col-xs-12 row-margin-top row-margin-bottom">
					<input value="@a" id="player_edit" type="text" class="form-control">
				</div>
			</div>
			<div class="well">
				<div class="row">
					<div class="col-md-4">
						<h4 class="language_area" id="textsnippets_header_edit"></h4>
					</div>
				</div>
				<div class="extraContainer">
					<div class="row">
						<div class="col-md-12">
							<h4 class="language_area" id="textsnippets_nosnippets_edit"></h4>
						</div>
					</div>
				</div>
				<div class="row row-margin-top row-margin-bottom">
					<div class="col-md-4 col-md-offset-2">
						<button id="addExtraButton_edit" class="btn btn-primary btn-block" data-toggle="modal" data-target="#addExtraModal">
							<span class="language_area" id="textsnippets_addsnippet_edit"></span> <span class="glyphicon glyphicon-plus-sign"></span>
						</button>
					</div>
					<div class="col-md-4">
						<button class="btn btn-danger btn-block" id="deleteAllBtn_edit" onclick="deleteAll()">
							<span class="language_area" id="textsnippets_deleteall_edit"></span> <span class="glyphicon glyphicon-remove-sign"></span>
						</button>
					</div>
				</div>
			</div>
			<div style="display:none;" id="addExtraModalData_edit">
				<div class="row" class="modal_banners">
				</div>
				<div class="row row-margin-top row-margin-bottom">
					<div class="btn-group col-md-10">
						<button type="button" id="fmtExtraRaw_edit" tellrawType="raw" class="fmtExtra language_area active btn btn-default">Raw</button>
						<button type="button" id="fmtExtraTrn_edit" tellrawType="trn" class="fmtExtra language_area btn btn-default">Translated</button>
						<button type="button" id="fmtExtraObj_edit" tellrawType="obj" class="fmtExtra language_area btn btn-default">Objective</button>
					</div>
				</div>
				<div class="row row-margin-top row-margin-bottom">
					<div class="col-md-7" id="obj_extra_container_edit">
						<div>
							<input placeholder="Player" id="obj_player_edit" type="text" class="form-control">
						</div>
						<div class="row-margin-top">
							<input placeholder="Objective" id="obj_score_edit" type="text" class="form-control">
						</div>
					</div>
					<div class="col-md-7" id="text_extra_container_edit">
						<input placeholder="Text" id="text_extra_edit" type="text" class="form-control">
					</div>
					<div class="col-md-7" id="translate_selector_container_edit">
						<select class="form-control" id="translate_selector_edit"></select>
					</div>
					<div class="col-md-4">
						<div class="row">
							<div class="col-md-10">
								<select class="form-control" onchange="refreshOutput()" id="color_extra_edit">
									<option class="language_area" id="color_black_edit" value="black">color_black</option>
									<option class="language_area" id="color_dark_blue_edit" value="dark_blue">color_dark_blue</option>
									<option class="language_area" id="color_dark_green_edit" value="dark_green">color_dark_green</option>
									<option class="language_area" id="color_dark_aqua_edit" value="dark_aqua">color_dark_aqua</option>
									<option class="language_area" id="color_dark_red_edit" value="dark_red">color_dark_red</option>
									<option class="language_area" id="color_dark_purple_edit" value="dark_purple">color_dark_purple</option>
									<option class="language_area" id="color_gold_edit" value="gold">color_gold</option>
									<option class="language_area" id="color_gray_edit" value="gray">color_gray</option>
									<option class="language_area" id="color_dark_gray_edit" value="dark_gray">color_dark_gray</option>
									<option class="language_area" id="color_blue_edit" value="blue">color_blue</option>
									<option class="language_area" id="color_green_edit" value="green">color_green</option>
									<option class="language_area" id="color_aqua_edit" value="aqua">color_aqua</option>
									<option class="language_area" id="color_red_edit" value="red">color_red</option>
									<option class="language_area" id="color_light_purple_edit" value="light_purple">color_light_purple</option>
									<option class="language_area" id="color_yellow_edit" value="yellow">color_yellow</option>
									<option class="language_area" id="color_white_edit" value="white" selected="true">color_white</option>
								</select>
							</div>
							<div class="col-md-2">
								<div id="colorPreview_edit" class="colorPreview">
									<div id="colorPreviewColor_edit" class="colorPreviewColor">
									</div>
								</div>
							</div>
						</div>
						<label><input type="checkbox" id="bold_text_extra_edit"> <span class="language_area" id="textsnippets_bold_edit"></span></label>
						<label><input type="checkbox" id="italic_text_extra_edit"> <span class="language_area" id="textsnippets_italic_edit"></span></label>
						<label><input type="checkbox" id="underlined_text_extra_edit"> <span class="language_area" id="textsnippets_underlined_edit"></span></label>
						<label><input type="checkbox" id="strikethrough_text_extra_edit"> <span class="language_area" id="textsnippets_strikethrough_edit"></span></label>
						<label><input type="checkbox" id="obfuscated_text_extra_edit"> <span class="language_area" id="textsnippets_obfuscated_edit"></span></label>
					</div>
				</div>
				<div class="extraTranslationParameterRow row row-margin-top row-margin-bottom" id="parameter0row_edit">
					<div class="col-md-4 language_area" id="parameter0_edit">

					</div>
					<div class="col-md-8">
						<input type="text" class="form-control" class="extraTranslationParameter" id="extraTranslationParameter0_edit">
					</div>
				</div>
				<div class="extraTranslationParameterRow row row-margin-top row-margin-bottom" id="parameter1row_edit">
					<div class="col-md-4 language_area" id="parameter1_edit">

					</div>
					<div class="col-md-8">
						<input type="text" class="form-control" class="extraTranslationParameter" id="extraTranslationParameter1_edit">
					</div>
				</div>
				<div class="extraTranslationParameterRow row row-margin-top row-margin-bottom" id="parameter2row_edit">
					<div class="col-md-4 language_area" id="parameter2_edit">

					</div>
					<div class="col-md-8">
						<input type="text" class="form-control" class="extraTranslationParameter" id="extraTranslationParameter2_edit">
					</div>
				</div>
				<div class="extraTranslationParameterRow row row-margin-top row-margin-bottom" id="parameter3row_edit">
					<div class="col-md-4 language_area" id="parameter3_edit">

					</div>
					<div class="col-md-8">
						<input type="text" class="form-control" class="extraTranslationParameter" id="extraTranslationParameter3_edit">
					</div>
				</div>
				<div class="extraTranslationParameterRow row row-margin-top row-margin-bottom" id="parameter4row_edit">
					<div class="col-md-4 language_area" id="parameter4_edit">

					</div>
					<div class="col-md-8">
						<input type="text" class="form-control" class="extraTranslationParameter" id="extraTranslationParameter4_edit">
					</div>
				</div>
				<div class="extraTranslationParameterRow row row-margin-top row-margin-bottom" id="parameter5row_edit">
					<div class="col-md-4 language_area" id="parameter5_edit">

					</div>
					<div class="col-md-8">
						<input type="text" class="form-control" class="extraTranslationParameter" id="extraTranslationParameter5_edit">
					</div>
				</div>
				<div class="extraTranslationParameterRow row row-margin-top row-margin-bottom" id="parameter6row_edit">
					<div class="col-md-4 language_area" id="parameter6_edit">

					</div>
					<div class="col-md-8">
						<input type="text" class="form-control" class="extraTranslationParameter" id="extraTranslationParameter6_edit">
					</div>
				</div>
				<div class="row">
					<div class="col-md-12">
						<h4 class="language_area" id="textsnippets_clickevent_header_edit"></h4>
					</div>
				</div>
				<div class="row">
					<div class="col-md-4">
						<select onchange="refreshOutput()" class="form-control" id="clickEvent_edit">
							<option class="language_area" id="clickevent_none_edit" value="none" selected="true"></option>
							<option class="language_area" id="clickevent_runcommand_edit" value="run_command"></option>
							<option class="language_area" id="clickevent_suggestcommand_edit" value="suggest_command"></option>
							<option class="language_area" id="clickevent_openurl_edit" value="open_url"></option>
						</select>
					</div>
					<div class="col-md-8">
						<input id="clickEventText_edit" type="text" class="form-control">
					</div>
				</div>
				<div class="row row-margin-top row-margin-bottom">
					<div class="col-md-4 col-md-offset-4 tooltipObject" id="click_selector_container_edit" data-toggle="tooltip" data-placement="top" title="This text will be inserted into the textbox">
						<select class="form-control" onchange="refreshOutput()" id="click_selector_edit" disabled></select>
					</div>
					<div class="col-md-4">
						<button id="insertClick_edit" onclick="$('#clickEventText').val(getSelected('click_selector'));" class="btn btn-info btn-block" disabled><span class="language_area" id="textsnippets_insert_edit">Insert</span> <span class="glyphicon glyphicon-plus-sign"></span></button>
					</div>
				</div>
				<div class="row">
					<div class="col-md-12">
						<h4 class="language_area" id="textsnippets_hoverevent_header_edit"></h4>
					</div>
				</div>
				<div class="row">
					<div class="col-md-4">
						<select onchange="refreshOutput()" class="form-control" id="hoverEvent_edit">
							<option class="language_area" id="hoverevent_none_edit" value="none" selected="true"></option>
							<option class="language_area" id="hoverevent_show_text_edit" value="show_text"></option>
							<option class="language_area" id="hoverevent_show_item_edit" value="show_item"></option>
							<option class="language_area" id="hoverevent_show_entity_edit" value="show_entity"></option>
							<option class="language_area" id="hoverevent_show_achievement_edit" value="show_achievement"></option>
						</select>
					</div>
					<div class="hovertext_default">
						<div class="col-md-8">
							<input id="hoverEventText_edit" type="text" class="form-control">
						</div>
					</div>
					<div class="hovertext_entity">
						<div class="col-md-2 language_area" id="hoverevent_entity_name_edit">
							_name
						</div>
						<div class="col-md-6">
							<input id="hoverEventEntityName_edit" type="text" class="form-control">
						</div>
					</div>
				</div>
				<div class="hovertext_entity row row-margin-top row-margin-bottom">
					<div class="col-md-2 col-md-offset-4 language_area" id="hoverevent_entity_id_edit">
						_id
					</div>
					<div class="col-md-6">
						<input id="hoverEventEntityID_edit" type="text" class="form-control">
					</div>
				</div>
				<div class="hovertext_entity row row-margin-top row-margin-bottom">
					<div class="col-md-2 col-md-offset-4 language_area" id="hoverevent_entity_type_edit">
						_type
					</div>
					<div class="col-md-6">
						<input id="hoverEventEntityType_edit" type="text" class="form-control">
					</div>
				</div>

				<div class="row row-margin-top row-margin-bottom hovertext_default">
					<div class="col-md-4 col-md-offset-4 tooltipObject" id="hover_selector_container_edit" data-toggle="tooltip" data-placement="top" title="This text will be inserted into the textbox">
						<select class="form-control" id="hover_selector_edit" disabled></select>
					</div>
					<div class="col-md-4">
						<button id="insertHover_edit" onclick="document.getElementById('hoverEventText').value = getSelected('hover_selector');" class="btn btn-info btn-block" disabled><span class="language_area" id="textsnippets_insert_edit">Insert</span> <span class="glyphicon glyphicon-plus-sign"></span></button>
					</div>
				</div>
				<div class="row" style="height:39px">
				</div>
				<div class="row row-margin-top row-margin-bottom">
					<div class="col-md-4">
						<h4 class="language_area" id="textsnippets_insertion_header_edit"></h4>
					</div>
					<div class="col-md-8">
						<input id="insertion_text_edit" type="text" class="form-control">
					</div>
				</div>
			</div>
			<div style="display:none;" id="editModalData_edit">
				<div class="row" class="modal_banners">
				</div>
				<div class="row row-margin-top row-margin-bottom">
					<div class="col-md-7" id="obj_extra_container_edit_edit">
						<div>
							<input placeholder="Player" id="obj_player_edit_edit" type="text" class="form-control">
						</div>
						<div class="row-margin-top">
							<input placeholder="Objective" id="obj_score_edit_edit" type="text" class="form-control">
						</div>
					</div>
					<div class="col-md-7" id="text_extra_container_edit_edit">
						<input placeholder="Text" id="text_extra_edit_edit" type="text" class="form-control">
					</div>
					<div class="col-md-7" id="translate_selector_container_edit_edit">
						<select class="form-control" id="translate_selector_edit_edit"></select>
					</div>
					<div class="col-md-4">
						<div class="row">
							<div class="col-md-10">
								<select class="form-control" onchange="refreshOutput()" id="color_extra_edit">
									<option class="language_area" id="color_black_edit_edit" value="black">color_black</option>
									<option class="language_area" id="color_dark_blue_edit_edit" value="dark_blue">color_dark_blue</option>
									<option class="language_area" id="color_dark_green_edit_edit" value="dark_green">color_dark_green</option>
									<option class="language_area" id="color_dark_aqua_edit_edit" value="dark_aqua">color_dark_aqua</option>
									<option class="language_area" id="color_dark_red_edit_edit" value="dark_red">color_dark_red</option>
									<option class="language_area" id="color_dark_purple_edit_edit" value="dark_purple">color_dark_purple</option>
									<option class="language_area" id="color_gold_edit_edit" value="gold">color_gold</option>
									<option class="language_area" id="color_gray_edit_edit" value="gray">color_gray</option>
									<option class="language_area" id="color_dark_gray_edit_edit" value="dark_gray">color_dark_gray</option>
									<option class="language_area" id="color_blue_edit_edit" value="blue">color_blue</option>
									<option class="language_area" id="color_green_edit_edit" value="green">color_green</option>
									<option class="language_area" id="color_aqua_edit_edit" value="aqua">color_aqua</option>
									<option class="language_area" id="color_red_edit_edit" value="red">color_red</option>
									<option class="language_area" id="color_light_purple_edit_edit" value="light_purple">color_light_purple</option>
									<option class="language_area" id="color_yellow_edit_edit" value="yellow">color_yellow</option>
									<option class="language_area" id="color_white_edit_edit" value="white" selected="true">color_white</option>
								</select>
							</div>
							<div class="col-md-2">
								<div id="colorPreview_edit_edit" class="colorPreview">
									<div id="colorPreviewColor_edit_edit" class="colorPreviewColor">
									</div>
								</div>
							</div>
						</div>
						<label><input type="checkbox" id="bold_text_extra_edit_edit"> <span class="language_area" id="textsnippets_bold_edit_edit"></span></label>
						<label><input type="checkbox" id="italic_text_extra_edit_edit"> <span class="language_area" id="textsnippets_italic_edit_edit"></span></label>
						<label><input type="checkbox" id="underlined_text_extra_edit_edit"> <span class="language_area" id="textsnippets_underlined_edit_edit"></span></label>
						<label><input type="checkbox" id="strikethrough_text_extra_edit_edit"> <span class="language_area" id="textsnippets_strikethrough_edit_edit"></span></label>
						<label><input type="checkbox" id="obfuscated_text_extra_edit_edit"> <span class="language_area" id="textsnippets_obfuscated_edit_edit"></span></label>
					</div>
				</div>
				<div class="extraTranslationParameterRow row row-margin-top row-margin-bottom" id="parameter0row_edit">
					<div class="col-md-4 language_area" id="parameter0_edit">

					</div>
					<div class="col-md-8">
						<input type="text" class="form-control" class="extraTranslationParameter" id="extraTranslationParameter0_edit">
					</div>
				</div>
				<div class="extraTranslationParameterRow row row-margin-top row-margin-bottom" id="parameter1row_edit">
					<div class="col-md-4 language_area" id="parameter1_edit">

					</div>
					<div class="col-md-8">
						<input type="text" class="form-control" class="extraTranslationParameter" id="extraTranslationParameter1_edit">
					</div>
				</div>
				<div class="extraTranslationParameterRow row row-margin-top row-margin-bottom" id="parameter2row_edit">
					<div class="col-md-4 language_area" id="parameter2_edit">

					</div>
					<div class="col-md-8">
						<input type="text" class="form-control" class="extraTranslationParameter" id="extraTranslationParameter2_edit">
					</div>
				</div>
				<div class="extraTranslationParameterRow row row-margin-top row-margin-bottom" id="parameter3row_edit">
					<div class="col-md-4 language_area" id="parameter3_edit">

					</div>
					<div class="col-md-8">
						<input type="text" class="form-control" class="extraTranslationParameter" id="extraTranslationParameter3_edit">
					</div>
				</div>
				<div class="extraTranslationParameterRow row row-margin-top row-margin-bottom" id="parameter4row_edit">
					<div class="col-md-4 language_area" id="parameter4_edit">

					</div>
					<div class="col-md-8">
						<input type="text" class="form-control" class="extraTranslationParameter" id="extraTranslationParameter4_edit">
					</div>
				</div>
				<div class="extraTranslationParameterRow row row-margin-top row-margin-bottom" id="parameter5row_edit">
					<div class="col-md-4 language_area" id="parameter5_edit">

					</div>
					<div class="col-md-8">
						<input type="text" class="form-control" class="extraTranslationParameter" id="extraTranslationParameter5_edit">
					</div>
				</div>
				<div class="extraTranslationParameterRow row row-margin-top row-margin-bottom" id="parameter6row_edit">
					<div class="col-md-4 language_area" id="parameter6_edit">

					</div>
					<div class="col-md-8">
						<input type="text" class="form-control" class="extraTranslationParameter" id="extraTranslationParameter6_edit">
					</div>
				</div>
				<div class="row">
					<div class="col-md-12">
						<h4 class="language_area" id="textsnippets_clickevent_header_edit"></h4>
					</div>
				</div>
				<div class="row">
					<div class="col-md-4">
						<select onchange="refreshOutput()" class="form-control" id="clickEvent_edit">
							<option class="language_area" id="clickevent_none_edit" value="none" selected="true"></option>
							<option class="language_area" id="clickevent_runcommand_edit" value="run_command"></option>
							<option class="language_area" id="clickevent_suggestcommand_edit" value="suggest_command"></option>
							<option class="language_area" id="clickevent_openurl_edit" value="open_url"></option>
						</select>
					</div>
					<div class="col-md-8">
						<input id="clickEventText_edit" type="text" class="form-control">
					</div>
				</div>
				<div class="row row-margin-top row-margin-bottom">
					<div class="col-md-4 col-md-offset-4 tooltipObject" id="click_selector_container_edit" data-toggle="tooltip" data-placement="top" title="This text will be inserted into the textbox">
						<select class="form-control" onchange="refreshOutput()" id="click_selector_edit" disabled></select>
					</div>
					<div class="col-md-4">
						<button id="insertClick_edit" onclick="$('#clickEventText').val(getSelected('click_selector'));" class="btn btn-info btn-block" disabled><span class="language_area" id="textsnippets_insert_edit">Insert</span> <span class="glyphicon glyphicon-plus-sign"></span></button>
					</div>
				</div>
				<div class="row">
					<div class="col-md-12">
						<h4 class="language_area" id="textsnippets_hoverevent_header_edit"></h4>
					</div>
				</div>
				<div class="row">
					<div class="col-md-4">
						<select onchange="refreshOutput()" class="form-control" id="hoverEvent_edit">
							<option class="language_area" id="hoverevent_none_edit" value="none" selected="true"></option>
							<option class="language_area" id="hoverevent_show_text_edit" value="show_text"></option>
							<option class="language_area" id="hoverevent_show_item_edit" value="show_item"></option>
							<option class="language_area" id="hoverevent_show_entity_edit" value="show_entity"></option>
							<option class="language_area" id="hoverevent_show_achievement_edit" value="show_achievement"></option>
						</select>
					</div>
					<div class="hovertext_default">
						<div class="col-md-8">
							<input id="hoverEventText_edit" type="text" class="form-control">
						</div>
					</div>
					<div class="hovertext_entity">
						<div class="col-md-2 language_area" id="hoverevent_entity_name_edit">
							_name
						</div>
						<div class="col-md-6">
							<input id="hoverEventEntityName_edit" type="text" class="form-control">
						</div>
					</div>
				</div>
				<div class="hovertext_entity row row-margin-top row-margin-bottom">
					<div class="col-md-2 col-md-offset-4 language_area" id="hoverevent_entity_id_edit">
						_id
					</div>
					<div class="col-md-6">
						<input id="hoverEventEntityID_edit" type="text" class="form-control">
					</div>
				</div>
				<div class="hovertext_entity row row-margin-top row-margin-bottom">
					<div class="col-md-2 col-md-offset-4 language_area" id="hoverevent_entity_type_edit">
						_type
					</div>
					<div class="col-md-6">
						<input id="hoverEventEntityType_edit" type="text" class="form-control">
					</div>
				</div>

				<div class="row row-margin-top row-margin-bottom hovertext_default">
					<div class="col-md-4 col-md-offset-4 tooltipObject" id="hover_selector_container_edit" data-toggle="tooltip" data-placement="top" title="This text will be inserted into the textbox">
						<select class="form-control" id="hover_selector_edit" disabled></select>
					</div>
					<div class="col-md-4">
						<button id="insertHover_edit" onclick="document.getElementById('hoverEventText').value = getSelected('hover_selector');" class="btn btn-info btn-block" disabled><span class="language_area" id="textsnippets_insert_edit">Insert</span> <span class="glyphicon glyphicon-plus-sign"></span></button>
					</div>
				</div>
				<div class="row" style="height:39px">
				</div>
				<div class="row row-margin-top row-margin-bottom">
					<div class="col-md-4">
						<h4 class="language_area" id="textsnippets_insertion_header_edit"></h4>
					</div>
					<div class="col-md-8">
						<input id="insertion_text_edit" type="text" class="form-control">
					</div>
				</div>
			</div>

			<div class="row row-margin-top row-margin-bottom">
				<div class="col-md-2" id="output_label_edit">
					<span class="language_area" id="command_edit"></span> <span onclick="refreshOutput()" class="glyphicon glyphicon-refresh"></span><br>
					<span class="language_area" id="commandblock_edit"></span>
				</div>
				<div class="col-md-10">
					<textarea onkeyup="refreshOutput()" id="outputtextfield_edit" class="form-control"></textarea>
				</div>
			</div>
			<div class="row row-margin-top row-margin-bottom">
				<div class="col-md-10 col-md-offset-2">
					<pre id="nicelookingoutput_edit">

					</pre>
				</div>
			</div>
			<div class="row row-margin-top row-margin-bottom">
				<div class="col-md-2">
					<span class="language_area" id="settings_edit"></span>
				</div>
				<div class="col-md-4 col-xs-12">
					<button class="btn btn-block btn-default language_area" id="import_edit"></button>
				</div>
				<div class="col-md-4 col-xs-12">
					<div class="col-md-8 col-xs-12">
						<span class="language_area" id="previewcolorlabel_edit"></span>
					</div>
					<div class="col-md-4 col-xs-12">
						<input onchange="refreshOutput()" id="previewcolor_edit" class="color form-control" value="F5774A">
					</div>
				</div>
				<input id="previewFontSize_edit" type="hidden" onkeyup="refreshOutput()" value="13" class="form-control">
			</div>
		</div>
		<div class="row">
			<div class="col-md-2 col-xs-12 row-margin-top row-margin-bottom language_area" id="output_header_edit">
			</div>
			<div class="col-xs-12 row-margin-top row-margin-bottom col-md-10">
				<pre id="jsonPreview_edit" class="language_area"></pre>
			</div>
		</div>
		<br><br>
		<span style="color:grey;font-size:10px" id="lang_credit_edit" class="language_area"></span>
		<br>
		<?php include($_SERVER['DOCUMENT_ROOT'] . "/includes/foot.php"); ?>
	</body>
	</html>