/**
 * ownCloud - mistrabajos
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later. See the COPYING file.
 *
 * @author IvonneBurgos <irburgos@espol.edu.ec>
 * @copyright IvonneBurgos 2016
 */

(function ($, OC) {

	$(document).ready(function () {

		$.getJSON("/templates/part.content.php",function(data){
			console.log("ok");
			$.each(data,function(){
				var name_job = this["name"];

				$('#echo-result').append(name_job);
				
			})
		});

		$('#hello').click(function () {
			alert('Hello from your script file');
		});

		$('#echo').click(function () {
			var url = OC.generateUrl('/apps/mistrabajos/echo');
			var data = {
				echo: $('#echo-content').val()
			};

			$.post(url, data).success(function (response) {
				$('#echo-result').text(response.echo);
			});

		});
	});

})(jQuery, OC);