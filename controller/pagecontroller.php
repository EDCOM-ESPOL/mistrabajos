<?php
/**
 * ownCloud - mistrabajos
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

class PageController extends Controller {


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
	public function index() {
		$params = ['user' => $this->userId];
		return new TemplateResponse('mistrabajos', 'main', $params);  // templates/main.php
	}

	/**
	 * Simply method that posts back the payload of the request
	 * @NoAdminRequired
	 */
	public function doEcho($type) {
        $data = array("get" => array("type"=>$type));  
		$data_string = json_encode($data);
		//$ch = curl_init("http://200.126.7.76:51000/");
		$ch = curl_init("http://192.168.1.4:51000/");
		curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST"); 
		curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
		curl_setopt($ch, CURLOPT_HTTPHEADER, array(  
		'AFANASY: 23',     
		'Content-Type: application/json')                                 
		);                                                                  
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		$result = curl_exec($ch);
		curl_close($ch);

		return new DataResponse(['get' => $result]);
	}

	public function cpFolder($folder) {

		$src = escapeshellarg("/var/www/owncloud/Nube_Multimedia/admin/" . $folder);
		$dest = escapeshellarg("/var/www/owncloud/data/admin/files/Documents");
		// if (shell_exec("cp -r " . $src . " " . $dest)) {
		// 	$result = $dest;
		// }
		$output = shell_exec("sh /var/www/owncloud/apps/mistrabajos/sh/cp.sh " . $src . " ". $dest ." 2>&1");
		if ($output) {
			//$result = scanFiles($dest);
			$result = 'ok';
		} else {
			$result = 'no';
		}
		//$response = 'ok';
		return new DataResponse($result);
	}

	public function scanFiles($dest) {
		$scanner = new Scanner ($this->userId, \OC::$server->getDatabaseConnection(), \OC::$server->getLogger());
		$result = $scanner->scan($dest);
		
		return $dest;
	}
}
?>