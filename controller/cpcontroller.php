<?php
/**
 * ownCloud - renderedcom
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later. See the COPYING file.
 *
 * @author IvonneBurgos <irburgos@espol.edu.ec>
 * @copyright IvonneBurgos 2016
 */

namespace OCA\MisTrabajos\Controller;

use OCP\IRequest;
use OCP\AppFramework\Http\TemplateResponse;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\Controller;
use OC\Files\Utils\Scanner as Scanner;


class CpController extends Controller{
    
	private $userId;
  
	public function __construct($AppName, IRequest $request, $UserId){
		parent::__construct($AppName, $request);
		$this->userId = $UserId;
	}

	/**
	 * CAUTION: the @Stuff turns off security checks; for this page no admin is
	 *          required and no CSRF check. If you don't know what CSRF is, read
	 *          it up in the docs or you might create a security hole. This is
	 *          basically the only required method to add this exemption, don't
	 *          add it to any other method if you don't exactly know what it does
	 *
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 */

    public function cpFolder($folder,$id_job,$host_name) {

        $src =("/var/www/html/owncloud/Nube_Multimedia/". $this->userId . "/" . $folder);
        $dest = ("/var/www/html/owncloud/data/". $this->userId ."/files/Documents");
        $output = shell_exec("sh /var/www/html/owncloud/apps/mistrabajos/sh/cp.sh " . $src ." ". $dest);

        $path = $dest . "/". $folder;

        if (file_exists($path)) {
            $new = $this->scanFiles($folder, $id_job, $host_name);
            $result =  true;
        } else {
            $result = false;
        }

        return new DataResponse(['result' => $result, 'path' => $new]);
    }

    public function scanFiles($folder,$id_job,$host_name) {

        $scanner = new Scanner ($this->userId, \OC::$server->getDatabaseConnection(), \OC::$server->getLogger());
        $result = $scanner->scan('/'. $this->userId . '/files/Documents/' . $folder);
        $deleteJob = $this->deleteJob($id_job,$host_name);
        
        return $deleteJob;
    }


    protected function deleteJob($id_job,$host_name) {
      
        $ids = array(intval($id_job));

        $data = array("action" => array("user_name" => $this->userId,"host_name" => $host_name,"type" => "jobs", "ids" => $ids, "operation" => array("type" => "delete")));  

        $data_string = json_encode($data);
        $ch = curl_init("http://localhost:51000/");
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST"); 
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array( 
        'AFANASY: ' . strlen($data_string), 
        'Content-Type: application/json'
        )                       
        );                                                                  
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $result = curl_exec($ch);
        curl_close($ch);

        return $result;
    }
}