<?php include($_SERVER['DOCUMENT_ROOT'] . "/includes/headers.php"); ?>
<!DOCTYPE html>
<html>
<head>
	<title>Translation</title>
	<?php include($_SERVER['DOCUMENT_ROOT'] . "/includes/head.php"); ?>
</head>
<body class="minecraft">
	<?php include($_SERVER['DOCUMENT_ROOT'] . "/includes/navbar.php"); ?>
	<?php
	$languageJSON = json_decode(file_get_contents('../lang.json'),true);
	function getLanguageString($language,$string,$jsonObject) {
		$string = explode('.',$string);
		switch (count($string)) {
			case 0:
			return false;
			break;

			case 1:
			return @$jsonObject[$language][$string[0]];
			break;

			case 2:
			return @$jsonObject[$language][$string[0]][$string[1]];
			break;

			case 3:
			return @$jsonObject[$language][$string[0]][$string[1]][$string[2]];
			break;

			case 4:
			return @$jsonObject[$language][$string[0]][$string[1]][$string[2]][$string[3]];
			break;

			default:
			return 'An error occured';
			break;
		}
	}
	?>
	<div class="row">
		<div class="col-md-6">
			<div class="well" style="height:300px">
				<h4>en_us</h4>
				<?php echo getLanguageString('en_us',@$_GET['string'],$languageJSON); ?>
			</div>
		</div>
		<div class="col-md-6">
			<div class="well" style="height:300px">
				<h4><?php echo @$_GET['lang']; ?></h4>
				<form action="submit.php">
					<input type="hidden" value="<?php echo @$_GET['lang']; ?>" name="lang">
					<input type="hidden" value="<?php echo @$_GET['string']; ?>" name="string">
					<textarea name="translate" name="translated" class="form-control" style="height:180px" placeholder="Type the correct translation here. Do not worry about mistakes, your submisison will be verified by a human before use."></textarea><br>
					<input type="submit" class="btn btn-success" value="Submit">
				</form>
			</div>
		</div>
	</div>
	<?php include($_SERVER['DOCUMENT_ROOT'] . "/includes/foot.php"); ?>
</body>
</html>
