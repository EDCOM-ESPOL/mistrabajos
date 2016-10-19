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

		setInterval(ajaxRequest, 1000);

		$('#hello').click(function () {
			alert('Hello from your script file');
		});
	});

	function ajaxRequest(){
		var url = OC.generateUrl('/apps/mistrabajos/echo');
			var data = {
				type: "jobs"
			};

			$.post(url, data).success(function (response) {
				completeData = JSON.parse(response.get);
				var count = Object.keys(completeData.jobs).length;
				var jobsArray = [];
				for (var i = 0; i < count; i++) {
					jobsArray.push(completeData.jobs[i].name+" "+completeData.jobs[i].state +" "+ completeData.jobs[i].blocks[0].p_percentage + "<br>");
				}	

				$('#echo-result').html(jobsArray);
			});
	};

})(jQuery, OC);