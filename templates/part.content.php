<p>Hello World <?php p($_['user']) ?></p>

<p><button id="hello">click me</button></p>

<p><button id="echo">Send ajax request</button></p>

Ajax response: <div id="echo-result"></div>

<!--<p><button id="jobDone">Send ajax request</button></p>

<div id="echo-result"></div>-->

<?php



   /* jobList();


function jobList(){

	$data = array("get" => array("type"=>"jobs"));  
	$data_string = json_encode($data);  
	//$ch = curl_init("http://200.126.7.204:51000/");
	$ch = curl_init("http://192.168.100.3:51000/");


	curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST"); 
	curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
	curl_setopt($ch, CURLOPT_HTTPHEADER, array(  
	'AFANASY: 23',     
	'Content-Type: application/json')                                                                      
	);                                                                  
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);                                                                                                        
	$result = curl_exec($ch);
	curl_close($ch);

	//echo "<pre>".$result."</pre>";
	$result_json = json_decode($result);
    echo $globaluser;
	for($i=0;$i<count($result_json->jobs);$i++){ 
		if ($username_job == OC_User::getUser()){
			$name_job=$result_json->jobs[$i]->name;
			$state_job=$result_json->jobs[$i]->state;
			$username_job=$result_json->jobs[$i]->user_name;
			$percentage_job=$result_json->jobs[$i]->blocks[0]->p_percentage;
		//Print list of user jobs
			echo $username_job." ".$name_job." ".$state_job." ".$percentage_job;
			echo "<br>";
		}
	}
}*/
?>