<?php
vendor_script('mistrabajos', 'paging');
script('mistrabajos', 'script');
style('mistrabajos', array('bootstrap', 'style'));
?>

<div id="app">
	 <div id="app-content" class="row" >
		<div id="app-content-wrapper" class="col-xs-12 col-sm-12 col-md-12">
            <div id="job-nav" class="col-xs-12 col-sm-2 col-md-2 sidenav">
                <?php print_unescaped($this->inc('part.navigation')); ?>
            </div>
            <div id="job-content" class="col-xs-12 col-sm-10 col-md-10">
                <?php print_unescaped($this->inc('part.content')); ?>
            </div>
		</div>
	</div>
</div>
