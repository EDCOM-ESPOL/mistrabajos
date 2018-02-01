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
	var timer = false;
	
	$(document).ready(function () {
		ajaxRequestDon();
		$( window ).resize(function() {
			if($(window).width() <= 770) {
				$( ".jobnav-top" ).show();
				$("#job-nav").height("45px");
			} else {
				$( "#job-nav ul" ).show();
				$( ".jobnav-top" ).hide();
				$("#job-nav").height("100%");
			}
		});
		$(document).on('click', '.folderPath', function (){
			$('#loading-state').show();
			var url = OC.generateUrl('/apps/mistrabajos/cp');
			var data = {
				folder: $(this).attr("nameFolder"),
				id_job: $(this).attr("id_job"),
				host_name :$(this).attr("host_name"),
			};

			$.post(url, data).success(function (response) {
				$('#loading-state').hide();
				window.location.href = 'owncloud/apps/files?dir=//Documents';
			});
		});

		$('#endjobmessage').hide();
		$('#processjobmessage').hide();

        $('#endJob').attr("class", "selectedOption");

        if(localStorage.getItem('id') == '#endJob') {
        	localStorage.setItem('id', '');
			showEndJob();
		} else if(localStorage.getItem('id') == '#processJob') {
			localStorage.setItem('id', '');
			showProcessJob();
		}

		$('#endJob').click(function () {
			$('#endJob').attr("class", "selectedOption");
			$('#processJob').attr("class", " ");
			if (timer !== false){
				clearInterval(timer);
				timer = false;
				ajaxRequestDon();
			}
		});

		$('#processJob').click(function () {
			$('#bigCont').empty();
			$('#processJob').attr("class", "selectedOption");
			$('#endJob').attr("class", " ");
            if (timer !== false){
				clearInterval(timer);
			}
			else
			{
				timer = setInterval(ajaxRequestProcess, 1000);
			}
		});
		$('#closeNav').click(function() {
			document.getElementById("job-nav").style.height = "45px";
			$('#openNav').css('display', 'block');
			$('#job-nav ul').css('display', 'none');
			$(this).hide();
		});
		$('#openNav').click(function() {
			document.getElementById("job-nav").style.height = "auto";
			$('#closeNav').css('display', 'block');
			$('#job-nav ul').css('display', 'block');
			$(this).hide();
		});


		$("#search").on("keyup", function() {
			var value = $(this).val();

			$("table tr").each(function(index) {
				if (index !== 0) {

					$row = $(this);

					var id = $row.find("#nami").text();

				if (id.indexOf(value) !== 0) {
					$row.hide();
				}
				else {
					$row.show();
				}
				}
			});
		});
	});

	function showEndJob() {
		// $('#endJob').attr("class", "selectedOption");
		// $('#processJob').attr("class", " ");
		// $('#endjobmessage').show();
		// $('#processjobmessage').hide();
		// $('#bigCont').show();
		$('#endJob').attr("class", "selectedOption");
			$('#processJob').attr("class", " ");
			if (timer !== false){
				clearInterval(timer);
				timer = false;
				ajaxRequestDon();
			}
	}

	function showProcessJob() {
		// $('#search').hide();
		// $('#bigCont').hide();
		// $('#processjobmessage').show();
		// $('#processJob').attr("class", "selectedOption");
		// $('#endJob').attr("class", " ");
		$('#bigCont').empty();
			$('#processJob').attr("class", "selectedOption");
			$('#endJob').attr("class", " ");
            if (timer !== false){
				clearInterval(timer);
			}
			else
			{
				timer = setInterval(ajaxRequestProcess, 1000);
			}
	}

	function ajaxRequestDon(){
 		$('#processjobmessage').hide();
		var jobsArray = { "data" :[]};
		var url = OC.generateUrl('/apps/mistrabajos/echo');
			var data = {
				type: "jobs"
			};
			$.post(url, data).success(function (response) {
				$('#bigCont').empty();
				var listnum=0;
				var completeData = JSON.parse(response.get);
				var count = Object.keys(completeData.jobs).length;
				for (var i = 0; i < count; i++) {
					    if (completeData.jobs[i].state === " DON" && completeData.jobs[i].user_name === $('#userNameFront').text()){
					    	listnum+=1;
					    	/*Formato para presentar fecha*/
							var utcSeconds = completeData.jobs[i].time_started;
							var d = new Date(0);
							d.setUTCSeconds(utcSeconds);
							var date = formatDate(d);

							/*Formato para presentar hora inicio*/

							var utcSecondsInicio = completeData.jobs[i].time_started;
							var d_Inicio = new Date(0);
							d_Inicio.setUTCSeconds(utcSecondsInicio);
							var horaInicio = formatHour(d_Inicio);


							/*Formato para presentar hora fin*/
							var utcSecondsFin = completeData.jobs[i].time_done;
							var d_Fin = new Date(0);
							d_Fin.setUTCSeconds(utcSecondsFin);
							var horaFin = formatHour(d_Fin);

							var percentage = "<div class='progress-bar' role='progressbar' aria-valuenow= '60' aria-valuemin='0' aria-valuemax='100' style='width:100%;'>"+ completeData.jobs[i].blocks[0].p_percentage+"%</div>";
							jobsArray.data.push({"id_job":completeData.jobs[i].id, "host_name": completeData.jobs[i].host_name, "listnum":listnum, "name":completeData.jobs[i].name, "date": date, "horaInicio": horaInicio, "horaFin": horaFin, "percentage":percentage});
					}
				}
				if(listnum >= 1){
					$('#endjobmessage').hide();
					$('#search').show();
					addData(jobsArray.data.sort(comp));
					$('#job-progress').show();
				} else {
					$('#endjobmessage').show();
					$('#search').hide();
					$('#job-progress').hide();
				}
			});
		};

	function ajaxRequestProcess(){
        $('#endjobmessage').hide();
		var jobsArray = [];
		var url = OC.generateUrl('/apps/mistrabajos/echo');
		var data = {
			type: "jobs"
		};
		$.post(url, data).done(function (response) {
			$('#bigCont').empty();
			var listnum=0;
			var completeData = JSON.parse(response.get);
			var count = Object.keys(completeData.jobs).length;
			console.log(completeData);
			for (var i = 0; i < count; i++) {
				if ((completeData.jobs[i].state === " RDY RUN" && completeData.jobs[i].user_name === $('#userNameFront').text()) || (completeData.jobs[i].state === " RDY" && completeData.jobs[i].user_name === $('#userNameFront').text())){
					listnum+=1;
					var utcSeconds = completeData.jobs[i].time_started;
					var d = new Date(0);
					d.setUTCSeconds(utcSeconds);
					var date = formatDate(d);
					if (completeData.jobs[i].blocks[0].p_percentage != null) {
						jobsArray.push('<div class="row panel panel-default"><div class=" progress-icon"><img class="icon" src="/owncloud/apps/mistrabajos/img/Blenderlogo.svg"></img></div><div class=" progress-card-body panel-body"><div class="panel body-head"><h4>'+completeData.jobs[i].name+'</h4></div><div class="panel body-info"><div class="panel row-info"><p class="info-label">Fecha: </p><p class="info-text">'+date+'</p></div><div class="progress"><div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: '+completeData.jobs[i].blocks[0].p_percentage+'%;">'+completeData.jobs[i].blocks[0].p_percentage+'%</div></div></div></div></div>');
					}
					else {
						jobsArray.push('<div class="row panel panel-default"><div class=" progress-icon"><img class="icon" src="/owncloud/apps/mistrabajos/img/Blenderlogo.svg"></img></div><div class=" progress-card-body panel-body"><div class="panel body-head"><h4>'+completeData.jobs[i].name+'</h4></div><div class="panel body-info"><div class="panel row-info"><p class="info-label">Fecha: </p><p class="info-text">'+date+'</p></div><div class="progress"><div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 1%;"> 1% </div></div></div></div></div>');

					}
				}
			}

			if(listnum >= 1){
				$('#processjobmessage').hide();
				$('#search').show();
				$('#bigCont').html(jobsArray);
				$('#job-progress').show();
			}
			else {
				$('#processjobmessage').show();
				$('#search').hide();
				$('#job-progress').hide();
			}
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

	function addZero(i) {
	    if (i < 10) {
	        i = "0" + i;
	    }
    	return i;
	}

	function formatHour(d) {
	    var hour = new Date(d);
	    var h = addZero(hour.getHours());
	    var m = addZero(hour.getMinutes());
	    var s = addZero(hour.getSeconds());
	    return hour = h + ":" + m + ":" + s;
	}

	function addData(jobsArray){
		var cont = 0;
		// $('#bigCont').append('<table class="table"><thead><tr><th>#</th><th>Nombre de Escena</th><th>Fecha</th><th>Hora Inicio</th><th>Hora Fin</th><th>Porcentaje de Progreso</th><th>Estado</th><th>Ver Archivos</th></tr></thead><tbody id="tbodyid"></tbody></table>');
		$('#bigCont').append('<table class="table"><thead><tr><th>#</th><th>Nombre de Escena</th><th>Fecha</th><th>Tiempo de renderizado</th><th>Descargar</th></tr></thead><tbody id="tbodyid"></tbody></table>');
		$.each(jobsArray, function (index, value) {
			cont+=1;
			$(".table tbody").append("<tr><td>"+ cont +"</td><td id='nami'>"+ value.name +" </td><td> "+ value.date +" </td><td>30 min</td><td><a host_name="+ value.host_name +" id_job=" + value.id_job +" nameFolder='"+value.name+"' href='#' class='folderPath'><i class='fa fa-floppy-o fa-2x'></i></a><td></tr>");
		});
		$('.table').paging({
			limit:5
		});
	};

	function comp(a, b) {
    return parseFloat(b.listnum) - parseFloat(a.listnum);
};

})(jQuery, OC);
