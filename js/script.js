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

		var timer// = false;
		$('#endJob').click(function () {
			ajaxRequestDon();
			if (timer !== false){
				clearInterval(timer);
				timer = false;
			}
		});

		$('#processJob').click(function () {
			timer = setInterval(ajaxRequestProcess, 1000);

		});

		
	});

	function ajaxRequestDon(){
		var jobsArray = [];
		var url = OC.generateUrl('/apps/mistrabajos/echo');
			var data = {
				type: "jobs"
			};
			$.post(url, data).success(function (response) {
				var completeData = JSON.parse(response.get);
				var count = Object.keys(completeData.jobs).length;

				for (var i = 0; i < count; i++) {
					    if (completeData.jobs[i].state === " DON" && completeData.jobs[i].user_name === $('#expandDisplayName').text()){
					    	
							var utcSeconds = completeData.jobs[i].time_started;
							var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
							d.setUTCSeconds(utcSeconds);
					
					    
							jobsArray.push("<div class='col-md-10'><div class ='col-md-2'>"+completeData.jobs[i].name+"</div><div class ='col-md-2'>"+completeData.jobs[i].state +"</div><div class ='col-md-2'>"+ completeData.jobs[i].blocks[0].p_percentage+"</div><div class ='col-md-2'>"+completeData.jobs[i].user_name+"</div><div class ='col-md-2'>"+d+"</div></div>")
					}	
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
			$.post(url, data).done(function (response) {
			    var completeData = JSON.parse(response.get);
				var count = Object.keys(completeData.jobs).length;
				for (var i = 0; i < count; i++) {
					if (completeData.jobs[i].state !== " DON" && completeData.jobs[i].user_name === $('#expandDisplayName').text()){
					    	jobsArray.push("<div>"+completeData.jobs[i].name+" "+completeData.jobs[i].state +" "+ completeData.jobs[i].blocks[0].p_percentage+" "+completeData.jobs[i].user_name+"</div>");  
						}
					}	
				$('#echo-result').html(jobsArray);
			});
	};

})(jQuery, OC);