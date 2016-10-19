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

		//setInterval(ajaxRequest, 1000);

		$('#endJob').click(function () {
			ajaxRequestDon();
		});
	});

	function ajaxRequestDon(){
		var jobsArray = [];
		var url = OC.generateUrl('/apps/mistrabajos/echo');
			var data = {
				type: "jobs"
			};

			$.post(url, data).success(function (response) {
				completeData = JSON.parse(response.get);
				var count = Object.keys(completeData.jobs).length;
				for (var i = 0; i < count; i++) {
						jobsArray.push("<div>" + completeData.jobs[i].name+" "+completeData.jobs[i].state +" "+ completeData.jobs[i].blocks[0].p_percentage+ "</div>");
				}	
				$('#echo-result').html(jobsArray);
			});

			//http://codepen.io/alassetter/full/cyrfB/
	};

	function ajaxRequestProcess(){
		var jobsArray = [];
		var url = OC.generateUrl('/apps/mistrabajos/echo');
			var data = {
				type: "jobs"
			};

			$.post(url, data).success(function (response) {
				completeData = JSON.parse(response.get);
				var count = Object.keys(completeData.jobs).length;
				for (var i = 0; i < count; i++) {
						jobsArray.push(completeData.jobs[i].name+" "+completeData.jobs[i].state +" "+ completeData.jobs[i].blocks[0].p_percentage);
				}	
				$('#echo-result').html(jobsArray);
			});
		
	};

})(jQuery, OC);