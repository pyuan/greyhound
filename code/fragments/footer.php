<div class="footer">
	<p>
		
		<!--[if lte IE 8]><span style="filter: FlipH; -ms-filter: "FlipH"; display: inline-block;"><![endif]-->
		<span style="-moz-transform: scaleX(-1); -o-transform: scaleX(-1); -webkit-transform: scaleX(-1); transform: scaleX(-1); display: inline-block;">
		    &copy;
		</span>
		<!--[if lte IE 8]></span><![endif]-->
		
		<?php 
			
			date_default_timezone_set('America/Chicago');
			$startYear = "2013";
			$currentYear = date("Y");
			echo $startYear . ($currentYear!=$startYear ? " - $currentYear" : ""); 
			
		?>
	</p>
</div>