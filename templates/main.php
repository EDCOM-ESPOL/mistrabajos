<?php
vendor_script('mistrabajos', array('paging' , 'list.min' ));
script('mistrabajos', 'script');
style('mistrabajos', array('bootstrap', 'font-awesome.min', 'style'));
?>

<div id="app">
	 <div id="app-content" class="row" >
		<div id="app-content-wrapper" class="col-xs-12 col-sm-12 col-md-12">
			<div id="job-nav" class="sidenav-left">
				<!-- <div class="user-image">
					<i class="fa fa-user-circle" aria-hidden="true"></i>
				</div>
            	<p id="userNameFront"><?php p($_['user']);?></p> -->
            	<?php print_unescaped($this->inc('part.navigation')); ?>
			</div>
         <div class="job-content">
             <?php print_unescaped($this->inc('part.content')); ?>
         </div>
		</div>
	</div>
</div>
