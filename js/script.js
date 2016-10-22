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

		var timer = false;
		ajaxRequestDon();    
        $('#endJob').attr("class", "selectedOption");
		$('#endJob').click(function () {
			$('#endJob').attr("class", "selectedOption");
			$('#processJob').attr("class", " ");
			ajaxRequestDon();
			if (timer !== false){
				clearInterval(timer);
				timer = false;
			}
		});

		$('#processJob').click(function () {
			$('#processJob').attr("class", "selectedOption");
			$('#endJob').attr("class", " ");
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
				var listnum=0;
				var completeData = JSON.parse(response.get);
				var count = Object.keys(completeData.jobs).length;
				for (var i = 0; i < count; i++) {
					    if (completeData.jobs[i].state === " DON" && completeData.jobs[i].user_name === $('#expandDisplayName').text()){
					    	listnum+=1;
							var utcSeconds = completeData.jobs[i].time_started;
							var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
							d.setUTCSeconds(utcSeconds);
							var date = formatDate(d);
							//jobsArray.push("<div class='jobInside col-xs-12 col-sm-12 col-md-12'><div class='col-xs-3 col-sm-3 col-md-3'>"+completeData.jobs[i].name+" </div><div class='col-xs-2 col-sm-2 col-md-2'> "+date+" </div><div class='col-xs-3 col-sm-3 col-md-3'> "+ completeData.jobs[i].blocks[0].p_percentage+" </div><div class='col-xs-2 col-sm-2 col-md-2'>Completo</div><div class='col-xs-2 col-sm-2 col-md-2'><a href='#'>link</div></div>");
							jobsArray.push("<tr><td>"+listnum+"</td><td>"+completeData.jobs[i].name+" </td><td> "+date+" </td><td> "+ completeData.jobs[i].blocks[0].p_percentage+" </td><td>Completo</td><td><a href='#'>link<td></tr>");
					}	
				}
				$(".table tbody").html(jobsArray);
			});
	};

	function ajaxRequestProcess(){
		var jobsArray = [];
		var url = OC.generateUrl('/apps/mistrabajos/echo');
			var data = {
				type: "jobs"
			};
			$.post(url, data).done(function (response) {
				var listnum=0;
			    var completeData = JSON.parse(response.get);
				var count = Object.keys(completeData.jobs).length;
				for (var i = 0; i < count; i++) {
					if (completeData.jobs[i].state !== " DON" && completeData.jobs[i].user_name === $('#expandDisplayName').text()){
						    listnum+=1;
					    	var utcSeconds = completeData.jobs[i].time_started;
							var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
							d.setUTCSeconds(utcSeconds);
							var date = formatDate(d);
					    	//jobsArray.push("<div class='jobInside col-xs-12 col-sm-12 col-md-12'><div class='col-xs-3 col-sm-3 col-md-3'>"+completeData.jobs[i].name+" </div><div class='col-xs-2 col-sm-2 col-md-2'> "+date+" </div><div class='col-xs-3 col-sm-3 col-md-3'> "+ completeData.jobs[i].blocks[0].p_percentage+" </div><div class='col-xs-2 col-sm-2 col-md-2'>Completo</div><div class='col-xs-2 col-sm-2 col-md-2'><a href='#'>link</div></div>");
							jobsArray.push("<tr><td>"+listnum+"</td><td>"+completeData.jobs[i].name+" </td><td> "+date+" </td><td> "+ completeData.jobs[i].blocks[0].p_percentage+" </td><td>Renderizando</td><td><a href='#'>link<td></tr>");
						}
					}	
				$(".table tbody").html(jobsArray);
			});
	};

	function formatDate(d){
		date = new Date(d)
		var dd = date.getDate(); 
		var mm = date.getMonth()+1;
		var yyyy = date.getFullYear(); 
		if(dd<10){dd='0'+dd} 
		if(mm<10){mm='0'+mm};
		return d = dd+'/'+mm+'/'+yyyy
	};


})(jQuery, OC);