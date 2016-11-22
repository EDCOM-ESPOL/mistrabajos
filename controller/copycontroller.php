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


class CopyController extends Controller{
    
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

   /* public function cpFolder($folder)
    {
        
        $response = 'ok';

        return new DataResponse($response);
    }*/

    public function cpFolder($folder) {

        $mensaje;

        $src =("/var/www/owncloud/Nube_Multimedia/". $this->userId . "/" . $folder);
        $dest = ("/var/www/owncloud/data/". $this->userId ."/files/Documents");
        $output = shell_exec("sh /var/www/owncloud/apps/mistrabajos/sh/cp.sh " . $src . " ". $dest);

        $path = $dest . "/". $folder;
        /*if ($output) {
            $new = $this->scanFiles($folder);
            $result = 'ok';
        }
        else {
            $result = 'no';
        }*/
        
            if (file_exists($path)) {
                $new = $this->scanFiles($folder);
                $result =  true;
            } else {
                $result = false;
            }
        
        return new DataResponse(['result' => $result,
                                 'path' => $folder]);
        }

    public function scanFiles($folder) {
        $scanner = new Scanner ($this->userId, \OC::$server->getDatabaseConnection(), \OC::$server->getLogger());
        $result = $scanner->scan('/'. $this->userId . '/files/Documents/' . $folder);
        
        return $result;
    }
    }