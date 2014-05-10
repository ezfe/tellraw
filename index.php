<?php include($_SERVER['DOCUMENT_ROOT'] . "/includes/headers.php"); ?>
<!DOCTYPE html>
<html>
<head>
	<title>Tellraw Generator</title>
	<meta name="description" content="Tellraw Coder and Generator for Minecraft 1.7+"> 
	<?php $modernizer = true; $jscolor = true; include($_SERVER['DOCUMENT_ROOT'] . "/includes/head.php"); ?>
	<link rel="stylesheet" type="text/css" href="tellraw.css">
	<script src="lang.js"></script>
	<script src="tellraw.js"></script>
	<meta charset="UTF-8">
</head>
<body class="minecraft">
	<?php include($_SERVER['DOCUMENT_ROOT'] . "/includes/navbar.php"); ?>
	<div id="loading-container" style="text-align:center;">
	<h4>Loading...</h4>
	</div>
	<div id="tellraw-container" style="display:none;">
		<div class="row">
			<div class="col-md-3 col-xs-12">
				<h4 class="language_area" lang="header">
					Tellraw Command Generator for Minecraft 1.7+
				</h4>
			</div>
			<div class="col-md-1 col-md-offset-1 col-xs-12 row-margin-top row-margin-bottom">
				<div class="btn-group btn-block">
					<button type="button" class="btn btn-block btn-xs btn-default dropdown-toggle" data-toggle="dropdown">
						<span class="glyphicon glyphicon-share-alt"></span>
					</button>
					<ul class="dropdown-menu" role="menu">
						<li><a href="https://twitter.com/intent/tweet?original_referer=http%3A%2F%2Fezekielelin.com%2Fminecraft%2Ftellraw%2F&amp;text=%2Ftellraw%20generator%20for%20minecraft&amp;tw_p=tweetbutton&amp;url=http%3A%2F%2Fezekielelin.com%2Fminecraft%2Ftellraw%2F&amp;via=ezekielfe">Tweet</a></li>
					</ul>
				</div>
			</div>
			<div class="col-md-5 col-xs-12 row-margin-top row-margin-bottom">
				<a href="http://www.minecraftforum.net/topic/1980545-" lang="alert.receiveupdates" class="language_area btn btn-block btn-xs btn-success">Receive updates here ("Follow" the topic)</a>
			</div>
			<div class="col-md-2 col-xs-12 row-margin-top row-margin-bottom">
				<div class="btn-group btn-block">
					<button type="button" class="btn btn-block btn-xs btn-default dropdown-toggle" data-toggle="dropdown">
						<span class="language_area" lang="language.header"></span> <span class="caret"></span>
					</button>
					<ul class="dropdown-menu" role="menu" id="language_keys">
					</ul>
				</div>
			</div>
		</div>
		<div class="alerts">
		</div>
		<br><br>
		<div>
			<div class="row">
				<div class="col-md-2 col-xs-12 row-margin-top row-margin-bottom">
					<span class="language_area" lang="player.header"></span><br>
					<span class="language_area" lang="player.description"></span>
				</div>
				<div id="commandDiv" class="col-md-5 col-xs-12 row-margin-top row-margin-bottom player_container">
					<input value="/tellraw" id="command" type="text" class="form-control">
				</div>
				<div id="playerDiv" class="col-md-5 col-xs-12 row-margin-top row-margin-bottom player_container">
					<input value="@a" id="player" type="text" class="form-control">
				</div>
			</div>
			<div class="well" id="snippetsWell">
				<div class="row">
					<div class="col-md-4">
						<h4 class="language_area" lang="textsnippets.header"></h4>
					</div>
				</div>
				<div class="extraContainer">
					<div class="row">
						<div class="col-md-12">
							<h4 class="language_area" lang="textsnippets.nosnippets"></h4>
						</div>
					</div>
				</div>
				<div class="row row-margin-top row-margin-bottom">
					<div class="col-md-4 col-md-offset-2">
						<button id="addExtraButton" class="btn btn-primary btn-block">
							<span class="language_area" lang="textsnippets.addsnippet"></span> <span class="glyphicon glyphicon-plus-sign"></span>
						</button>
					</div>
					<div class="col-md-4">
						<button class="btn btn-danger btn-block" id="deleteAllBtn" onclick="deleteAll()">
							<span class="language_area" lang="settings.deleteall.yes"></span> <span class="glyphicon glyphicon-remove-sign"></span>
						</button>
					</div>
				</div>
			</div>
			<div style="display:none;" class="well" id="addExtraModalData">
				<div class="row" class="modal_banners">
				</div>
				<div class="row row-margin-top row-margin-bottom">
					<div class="btn-group col-md-10">
						<button type="button" lang="textsnippets.raw" id="fmtExtraRaw" tellrawType="raw" class="fmtExtra language_area active btn btn-default">Raw</button>
						<button type="button" lang="textsnippets.trn" id="fmtExtraTrn" tellrawType="trn" class="fmtExtra language_area btn btn-default">Translated</button>
						<button type="button" lang="textsnippets.obj" id="fmtExtraObj" tellrawType="obj" class="fmtExtra language_area btn btn-default">Objective</button>
					</div>
				</div>
				<div class="row row-margin-top row-margin-bottom">
					<div class="col-md-7" id="obj_extra_container">
						<div>
							<input placeholder="Player" id="obj_player" type="text" class="form-control">
						</div>
						<div class="row-margin-top">
							<input placeholder="Objective" id="obj_score" type="text" class="form-control">
						</div>
					</div>
					<div class="col-md-7" id="text_extra_container">
						<input id="text_extra" type="text" class="form-control">
					</div>
					<div class="col-md-7" id="translate_selector_container">
						<select class="form-control" id="translate_selector"></select>
					</div>
					<div class="col-md-4">
						<div class="row">
							<div class="col-md-10">
								<select class="form-control" onchange="$('#colorPreviewColor').css('background-color',getCSSHEXFromWord($('#color_extra').val()));" id="color_extra">
									<option class="language_area" lang="color.color_black" id="color_black" value="black">color_black</option>
									<option class="language_area" lang="color.color_dark_blue" id="color_dark_blue" value="dark_blue">color_dark_blue</option>
									<option class="language_area" lang="color.color_dark_green" id="color_dark_green" value="dark_green">color_dark_green</option>
									<option class="language_area" lang="color.color_dark_aqua" id="color_dark_aqua" value="dark_aqua">color_dark_aqua</option>
									<option class="language_area" lang="color.color_dark_red" id="color_dark_red" value="dark_red">color_dark_red</option>
									<option class="language_area" lang="color.color_dark_purple" id="color_dark_purple" value="dark_purple">color_dark_purple</option>
									<option class="language_area" lang="color.color_gold" id="color_gold" value="gold">color_gold</option>
									<option class="language_area" lang="color.color_gray" id="color_gray" value="gray">color_gray</option>
									<option class="language_area" lang="color.color_dark_gray" id="color_dark_gray" value="dark_gray">color_dark_gray</option>
									<option class="language_area" lang="color.color_blue" id="color_blue" value="blue">color_blue</option>
									<option class="language_area" lang="color.color_green" id="color_green" value="green">color_green</option>
									<option class="language_area" lang="color.color_aqua" id="color_aqua" value="aqua">color_aqua</option>
									<option class="language_area" lang="color.color_red" id="color_red" value="red">color_red</option>
									<option class="language_area" lang="color.color_light_purple" id="color_light_purple" value="light_purple">color_light_purple</option>
									<option class="language_area" lang="color.color_yellow" id="color_yellow" value="yellow">color_yellow</option>
									<option class="language_area" lang="color.color_white" id="color_white" value="white" selected="true">color_white</option>
								</select>
							</div>
							<div class="col-md-2">
								<div id="colorPreview" class="colorPreview">
									<div id="colorPreviewColor" class="colorPreviewColor">
									</div>
								</div>
							</div>
						</div>
						<label><input type="checkbox" id="bold_text_extra"> <span class="language_area" lang="textsnippets.format.bold"></span></label>
						<label><input type="checkbox" id="italic_text_extra"> <span class="language_area" lang="textsnippets.format.italic"></span></label>
						<label><input type="checkbox" id="underlined_text_extra"> <span class="language_area" lang="textsnippets.format.underlined"></span></label>
						<label><input type="checkbox" id="strikethrough_text_extra"> <span class="language_area" lang="textsnippets.format.strikethrough"></span></label>
						<label><input type="checkbox" id="obfuscated_text_extra"> <span class="language_area" lang="textsnippets.format.obfuscated"></span></label>
					</div>
				</div>
				<div class="extraTranslationParameterRow row row-margin-top row-margin-bottom" id="parameter0row">
					<div class="col-md-4 language_area" lang="textsnippets.parameter"></div>
					<div class="col-md-8">
						<input type="text" class="form-control" class="extraTranslationParameter" id="extraTranslationParameter0">
					</div>
				</div>
				<div class="extraTranslationParameterRow row row-margin-top row-margin-bottom" id="parameter1row">
					<div class="col-md-4 language_area" lang="textsnippets.parameter"></div>
					<div class="col-md-8">
						<input type="text" class="form-control" class="extraTranslationParameter" id="extraTranslationParameter1">
					</div>
				</div>
				<div class="extraTranslationParameterRow row row-margin-top row-margin-bottom" id="parameter2row">
					<div class="col-md-4 language_area" lang="textsnippets.parameter"></div>
					<div class="col-md-8">
						<input type="text" class="form-control" class="extraTranslationParameter" id="extraTranslationParameter2">
					</div>
				</div>
				<div class="extraTranslationParameterRow row row-margin-top row-margin-bottom" id="parameter3row">
					<div class="col-md-4 language_area" lang="textsnippets.parameter"></div>
					<div class="col-md-8">
						<input type="text" class="form-control" class="extraTranslationParameter" id="extraTranslationParameter3">
					</div>
				</div>
				<div class="extraTranslationParameterRow row row-margin-top row-margin-bottom" id="parameter4row">
					<div class="col-md-4 language_area" lang="textsnippets.parameter"></div>
					<div class="col-md-8">
						<input type="text" class="form-control" class="extraTranslationParameter" id="extraTranslationParameter4">
					</div>
				</div>
				<div class="extraTranslationParameterRow row row-margin-top row-margin-bottom" id="parameter5row">
					<div class="col-md-4 language_area" lang="textsnippets.parameter"></div>
					<div class="col-md-8">
						<input type="text" class="form-control" class="extraTranslationParameter" id="extraTranslationParameter5">
					</div>
				</div>
				<div class="extraTranslationParameterRow row row-margin-top row-margin-bottom" id="parameter6row">
					<div class="col-md-4 language_area" lang="textsnippets.parameter"></div>
					<div class="col-md-8">
						<input type="text" class="form-control" class="extraTranslationParameter" id="extraTranslationParameter6">
					</div>
				</div>
				<div class="row">
					<div class="col-md-12">
						<h4 class="language_area" lang="textsnippets.clickevent.header"></h4>
					</div>
				</div>
				<div class="row">
					<div class="col-md-4">
						<select onchange="refreshOutput()" class="form-control" id="clickEvent">
							<option class="language_area" lang="textsnippets.clickevent.none" value="none" selected="true"></option>
							<option class="language_area" lang="textsnippets.clickevent.runcommand" value="run_command"></option>
							<option class="language_area" lang="textsnippets.clickevent.suggestcommand" value="suggest_command"></option>
							<option class="language_area" lang="textsnippets.clickevent.openurl" value="open_url"></option>
						</select>
					</div>
					<div class="col-md-8">
						<input id="clickEventText" type="text" class="form-control">
					</div>
				</div>
				<div class="row row-margin-top row-margin-bottom">
					<div class="col-md-4 col-md-offset-4 tooltipObject" id="click_selector_container" data-toggle="tooltip" data-placement="top" title="This text will be inserted into the textbox">
						<select class="form-control" onchange="refreshOutput()" id="click_selector" disabled></select>
					</div>
					<div class="col-md-4">
						<button id="insertClick" onclick="$('#clickEventText').val(getSelected('click_selector'));" class="btn btn-info btn-block" disabled><span class="language_area" lang="textsnippets.insert">Insert</span> <span class="glyphicon glyphicon-plus-sign"></span></button>
					</div>
				</div>
				<div class="row">
					<div class="col-md-12">
						<h4 class="language_area" lang="textsnippets.hoverevent.header"></h4>
					</div>
				</div>
				<div class="row">
					<div class="col-md-4">
						<select onchange="refreshOutput()" class="form-control" id="hoverEvent">
							<option class="language_area" lang="textsnippets.hoverevent.none" value="none" selected="true"></option>
							<option class="language_area" lang="textsnippets.hoverevent.showtext" value="show_text"></option>
							<option class="language_area" lang="textsnippets.hoverevent.showitem" value="show_item"></option>
							<option class="language_area" lang="textsnippets.hoverevent.showentity" value="show_entity"></option>
							<option class="language_area" lang="textsnippets.hoverevent.showachievement" value="show_achievement"></option>
						</select>
					</div>
					<div class="hovertext_default">
						<div class="col-md-8">
							<input id="hoverEventText" type="text" class="form-control">
						</div>
					</div>
					<div class="hovertext_entity">
						<div class="col-md-2 language_area" lang="textsnippets.hoverevent.name"></div>
						<div class="col-md-6">
							<input id="hoverEventEntityName" type="text" class="form-control">
						</div>
					</div>
					<div class="hovertext_entity row row-margin-top row-margin-bottom">
						<div class="col-md-2 col-md-offset-4 language_area" lang="textsnippets.hoverevent.id"></div>
						<div class="col-md-6">
							<input id="hoverEventEntityID" type="text" class="form-control">
						</div>
					</div>
				</div>
				<div class="hovertext_entity row row-margin-top row-margin-bottom">
					<div class="col-md-2 col-md-offset-4 language_area" lang="textsnippets.hoverevent.type"></div>
					<div class="col-md-6">
						<input id="hoverEventEntityType" type="text" class="form-control">
					</div>
				</div>
				<div class="row row-margin-top row-margin-bottom hovertext_default">
					<div class="col-md-4 col-md-offset-4 tooltipObject" id="hover_selector_container" data-toggle="tooltip" data-placement="top" title="This text will be inserted into the textbox">
						<select class="form-control" id="hover_selector" disabled></select>
					</div>
					<div class="col-md-4">
						<button id="insertHover" onclick="document.getElementById('hoverEventText').value = getSelected('hover_selector');" class="btn btn-info btn-block" disabled><span class="language_area" lang="textsnippets.insert">Insert</span> <span class="glyphicon glyphicon-plus-sign"></span></button>
					</div>
				</div>
				<div class="row" style="height:39px">
				</div>
				<div class="row row-margin-top row-margin-bottom">
					<div class="col-md-4">
						<h4 class="language_area" lang="textsnippets.insertion.header"></h4>
					</div>
					<div class="col-md-8">
						<input id="insertion_text" type="text" class="form-control">
					</div>
				</div>
				<div class="row row-margin-top row-margin-bottom">
					<div class="col-md-offset-8 col-md-2">
						<button class="btn btn-default btn-block language_area" id="textsnippets-close-button" lang="textsnippets.close" onclick="cancelAddExtra()"></button>
					</div>
					<div class="col-md-2">
						<button class="btn btn-primary btn-block language_area" id="textsnippets-add-button" lang="textsnippets.addsnippet" onclick="addExtra()"></button>
					</div>
				</div>
			</div>
			<div style="display:none;" id="editModalData">
				<div class="row" class="modal_banners">
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
								<select class="form-control" onchange="$('#colorPreviewColor_edit').css('background-color',getCSSHEXFromWord($('#color_extra_edit').val()));" id="color_extra_edit">
									<option class="language_area" lang="color.color_black" id="color_black_edit" value="black">color_black</option>
									<option class="language_area" lang="color.color_dark_blue" id="color_dark_blue_edit" value="dark_blue">color_dark_blue</option>
									<option class="language_area" lang="color.color_dark_green" id="color_dark_green_edit" value="dark_green">color_dark_green</option>
									<option class="language_area" lang="color.color_dark_aqua" id="color_dark_aqua_edit" value="dark_aqua">color_dark_aqua</option>
									<option class="language_area" lang="color.color_dark_red" id="color_dark_red_edit" value="dark_red">color_dark_red</option>
									<option class="language_area" lang="color.color_dark_purple" id="color_dark_purple_edit" value="dark_purple">color_dark_purple</option>
									<option class="language_area" lang="color.color_gold" id="color_gold_edit" value="gold">color_gold</option>
									<option class="language_area" lang="color.color_gray" id="color_gray_edit" value="gray">color_gray</option>
									<option class="language_area" lang="color.color_dark_gray" id="color_dark_gray_edit" value="dark_gray">color_dark_gray</option>
									<option class="language_area" lang="color.color_blue" id="color_blue_edit" value="blue">color_blue</option>
									<option class="language_area" lang="color.color_green" id="color_green_edit" value="green">color_green</option>
									<option class="language_area" lang="color.color_aqua" id="color_aqua_edit" value="aqua">color_aqua</option>
									<option class="language_area" lang="color.color_red" id="color_red_edit" value="red">color_red</option>
									<option class="language_area" lang="color.color_light_purple" id="color_light_purple_edit" value="light_purple">color_light_purple</option>
									<option class="language_area" lang="color.color_yellow" id="color_yellow_edit" value="yellow">color_yellow</option>
									<option class="language_area" lang="color.color_white" id="color_white_edit" value="white" selected="true">color_white</option>
								</select>
							</div>
							<div class="col-md-2">
								<div id="colorPreview_edit" class="colorPreview">
									<div id="colorPreviewColor_edit" class="colorPreviewColor">
									</div>
								</div>
							</div>
						</div>
						<label><input type="checkbox" id="bold_text_extra_edit"> <span class="language_area" lang="textsnippets.format.bold" ></span></label>
						<label><input type="checkbox" id="italic_text_extra_edit"> <span class="language_area" lang="textsnippets.format.italic" ></span></label>
						<label><input type="checkbox" id="underlined_text_extra_edit"> <span class="language_area" lang="textsnippets.format.underlined" ></span></label>
						<label><input type="checkbox" id="strikethrough_text_extra_edit"> <span class="language_area" lang="textsnippets.format.strikethrough" ></span></label>
						<label><input type="checkbox" id="obfuscated_text_extra_edit"> <span class="language_area" lang="textsnippets.format.obfuscated" ></span></label>
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
						<h4 class="language_area" lang="textsnippets.clickevent.header"></h4>
					</div>
				</div>
				<div class="row">
					<div class="col-md-4">
						<select onchange="refreshOutput()" class="form-control" id="clickEvent_edit">
							<option class="language_area" lang="textsnippets.clickevent.none" value="none" selected="true"></option>
							<option class="language_area" lang="textsnippets.clickevent.runcommand" value="run_command"></option>
							<option class="language_area" lang="textsnippets.clickevent.suggestcommand" value="suggest_command"></option>
							<option class="language_area" lang="textsnippets.clickevent.openurl" value="open_url"></option>
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
						<button id="insertClick_edit" onclick="$('#clickEventText_edit').val(getSelected('click_selector_edit'));" class="btn btn-info btn-block" disabled><span class="language_area" lang="textsnippets.insert">Insert</span> <span class="glyphicon glyphicon-plus-sign"></span></button>
					</div>
				</div>
				<div class="row">
					<div class="col-md-12">
						<h4 class="language_area" lang="textsnippets.hoverevent.header"></h4>
					</div>
				</div>
				<div class="row">
					<div class="col-md-4">
						<select onchange="refreshOutput()" class="form-control" id="hoverEvent_edit">
							<option class="language_area" lang="textsnippets.hoverevent.none" value="none" selected="true"></option>
							<option class="language_area" lang="textsnippets.hoverevent.showtext" value="show_text"></option>
							<option class="language_area" lang="textsnippets.hoverevent.showitem" value="show_item"></option>
							<option class="language_area" lang="textsnippets.hoverevent.showentity" value="show_entity"></option>
							<option class="language_area" lang="textsnippets.hoverevent.showachievement" value="show_achievement"></option>
						</select>
					</div>
					<div class="hovertext_default_edit">
						<div class="col-md-8">
							<input id="hoverEventText_edit" type="text" class="form-control">
						</div>
					</div>
					<div class="hovertext_entity_edit">
						<div class="col-md-2 language_area" lang="textsnippets.hoverevent.name"></div>
						<div class="col-md-6">
							<input id="hoverEventEntityName_edit" type="text" class="form-control">
						</div>
					</div>
				</div>
				<div class="hovertext_entity_edit row row-margin-top row-margin-bottom">
					<div class="col-md-2 col-md-offset-4 language_area" lang="textsnippets.hoverevent.id"></div>
					<div class="col-md-6">
						<input id="hoverEventEntityID_edit" type="text" class="form-control">
					</div>
				</div>
				<div class="hovertext_entity_edit row row-margin-top row-margin-bottom">
					<div class="col-md-2 col-md-offset-4 language_area" lang="textsnippets.hoverevent.type"></div>
					<div class="col-md-6">
						<input id="hoverEventEntityType_edit" type="text" class="form-control">
					</div>
				</div>

				<div class="row row-margin-top row-margin-bottom hovertext_default_edit">
					<div class="col-md-4 col-md-offset-4 tooltipObject" id="hover_selector_container_edit" data-toggle="tooltip" data-placement="top" title="This text will be inserted into the textbox">
						<select class="form-control" id="hover_selector_edit" disabled></select>
					</div>
					<div class="col-md-4">
						<button id="insertHover_edit" onclick="document.getElementById('hoverEventText_edit').value = getSelected('hover_selector_edit');" class="btn btn-info btn-block" disabled><span class="language_area" lang="textsnippets.insert">Insert</span> <span class="glyphicon glyphicon-plus-sign"></span></button>
					</div>
				</div>
				<div class="row" style="height:39px">
				</div>
				<div class="row row-margin-top row-margin-bottom">
					<div class="col-md-4">
						<h4 class="language_area" lang="textsnippets.insertion.header"></h4>
					</div>
					<div class="col-md-8">
						<input id="insertion_text_edit" type="text" class="form-control">
					</div>
				</div>
			</div>
			<div class="row row-margin-top row-margin-bottom">
				<div class="col-md-2" id="output_label">
					<span class="language_area" lang="command"></span> <span onclick="refreshOutput()" class="glyphicon glyphicon-refresh"></span><br>
					<span class="language_area" lang="commandblock"></span>
				</div>
				<div class="col-md-10">
					<textarea onkeyup="refreshOutput()" id="outputtextfield" class="form-control"></textarea>
				</div>
			</div>
			<div class="row row-margin-top row-margin-bottom">
				<div class="col-md-10 col-md-offset-2">
					<pre id="nicelookingoutput">

					</pre>
				</div>
			</div>
			<div class="row row-margin-top row-margin-bottom">
				<div class="col-md-2">
					<span class="language_area" lang="settings.header"></span>
				</div>
				<div class="col-md-4 col-xs-12">
					<button class="btn btn-block btn-default language_area" id="import" lang="settings.import"></button>
				</div>
				<div class="col-md-4 col-xs-12">
					<div class="col-md-8 col-xs-12">
						<span class="language_area" lang="settings.previewcolor"></span>
					</div>
					<div class="col-md-4 col-xs-12">
						<input onchange="refreshOutput()" id="previewcolor" class="color form-control" value="F5774A">
					</div>
				</div>
				<input id="previewFontSize" type="hidden" onkeyup="refreshOutput()" value="13" class="form-control">
			</div>
		</div>
		<div class="row">
			<div class="col-md-2 col-xs-12 row-margin-top row-margin-bottom language_area" id="output_header" lang="output.header">
			</div>
			<div class="col-xs-12 row-margin-top row-margin-bottom col-md-10">
				<pre id="jsonPreview" class="language_area" lang="output.nothing"></pre>
			</div>
		</div>
		<br><br>
		<span style="color:grey;font-size:10px" lang="language.credit" class="language_area"></span>
		<br>
	</div>
	<?php include($_SERVER['DOCUMENT_ROOT'] . "/includes/foot.php"); ?>
</body>
</html>