<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Request, Lang;
use App\Models\EmailTemplateHeader as EmailTemplateHeaderModel;

class EmailTemplateHeader extends Controller
{
    protected $section;
	protected $singleSection;
	protected $viewPath;
	protected $actionURL;

	public function __construct(){
        $this->section = 'Email Headers';
		$this->singleSection = 'Email Header';
		$this->viewPath = 'admin/email-headers';
		$this->actionURL = 'email-headers';
	}

	public function index(Request $req) {
        $emailHeaders = EmailTemplateHeaderModel::paginate(10);
		$_data=array(
            '_meta_title' => "Email Template Headers",
            '_meta_keyword' => "Email Template Headers",
            '_meta_description' => "Email Template Headers",
            'section'=>$this->section,
			'singleSection'=>$this->singleSection,
            'actionURL'=>$this->actionURL,
            'view'=>"list",
			'emailHeaders'=>$emailHeaders,
        );

        return view($this->viewPath, $_data);
    }

    public function Add(){
        $_data=array(
            '_meta_title' => "Add Email Template Header",
            '_meta_keyword' => "Add Email Template Header",
            '_meta_description' => "Add Email Template Header",
            'section'=>$this->section,
            'singleSection'=>$this->singleSection,
            'actionURL'=>$this->actionURL,
            'view'=>"add",
        );
        return view($this->viewPath, $_data);
    }

    public function Edit($id="") {
        $data = EmailTemplateHeaderModel::where("id", $id)->first();
        if(isset($data) && !empty($data)):
            $_data=array(
                '_meta_title' => "Edit Email Template Header",
                '_meta_keyword' => "Edit Email Template Header",
                '_meta_description' => "Edit Email Template Header",
                'section'=>$this->section,
                'singleSection'=>$this->singleSection,
                'actionURL'=>$this->actionURL,
                'view'=>"edit",
                'data'=>$data,
            );
            return view($this->viewPath, $_data);
        else:
            return redirect($this->actionURL)->with('error', Lang::get('message.noData', [ 'section' => $this->singleSection ]));
        endif;
    }

    public function Action($action="",$id="") {
        $data = Request::all();
        unset($data['_token']);
        if($action=="add"):
            EmailTemplateHeaderModel::create($data);
            return redirect($this->actionURL)->with( 'success', Lang::get('message.detailAdded', [ 'section' => $this->singleSection ])); 
        elseif($action=="edit"):
            $emailHeader = EmailTemplateHeaderModel::where('id',$id)->first();
            EmailTemplateHeaderModel::where("id", $id)->update($data);
            return redirect($this->actionURL)->with( 'success', Lang::get('message.detailUpdated', [ 'section' => $this->singleSection ]));
        elseif($action=="delete"):
            $_data = EmailTemplateHeaderModel::where("id", $id)->first();
            if(isset($_data)):
                $_data->delete();
                return redirect($this->actionURL)->with( 'success', Lang::get('message.detailDeleted', [ 'section' => $this->singleSection ])); 
            else:
                return redirect($this->actionURL)->with( 'error',  Lang::get('message.somethingWrong', [ 'section' => $this->singleSection ])); 
            endif;
        elseif($action=="makeInactive"):
            EmailTemplateHeaderModel::where('id', $id)
                ->update([
                    'status' => '2'
                ]);
            return redirect($this->actionURL)->with('success', Lang::get('message.statusInactive', [ 'section' => $this->singleSection ]));
        elseif($action=="makeActive"):
            EmailTemplateHeaderModel::where('id', $id)
                ->update([
                    'status' => '1'
                ]);
            return redirect($this->actionURL)->with('success', Lang::get('message.statusActive', [ 'section' => $this->singleSection ]));
        endif; 
    }
}
