<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Request, Lang;
use App\Models\EmailTemplateFooter as EmailTemplateFooterModel;

class EmailTemplateFooter extends Controller
{
    protected $section;
	protected $singleSection;
	protected $viewPath;
	protected $actionURL;

	public function __construct(){
        $this->section = 'Email Footers';
		$this->singleSection = 'Email Footer';
		$this->viewPath = 'admin/email-footers';
		$this->actionURL = 'email-footers';
	}

	public function index(Request $req) {
        $emailFooters = EmailTemplateFooterModel::paginate(10);
		$_data=array(
            '_meta_title' => "Email Template Footer",
            '_meta_keyword' => "Email Template Footer",
            '_meta_description' => "Email Template Footer",
            'section'=>$this->section,
			'singleSection'=>$this->singleSection,
            'actionURL'=>$this->actionURL,
            'view'=>"list",
			'emailFooters'=>$emailFooters,
        );

        return view($this->viewPath, $_data);
    }

    public function Add(){
        $_data=array(
            '_meta_title' => "Add Email Template Footer",
            '_meta_keyword' => "Add Email Template Footer",
            '_meta_description' => "Add Email Template Footer",
            'section'=>$this->section,
            'singleSection'=>$this->singleSection,
            'actionURL'=>$this->actionURL,
            'view'=>"add",
        );
        return view($this->viewPath, $_data);
    }

    public function Edit($id="") {
        $data = EmailTemplateFooterModel::where("id", $id)->first();
        if(isset($data) && !empty($data)):
            $_data=array(
                '_meta_title' => "Edit Email Template Footer",
                '_meta_keyword' => "Edit Email Template Footer",
                '_meta_description' => "Edit Email Template Footer",
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
            EmailTemplateFooterModel::create($data);
            return redirect($this->actionURL)->with( 'success', Lang::get('message.detailAdded', [ 'section' => $this->singleSection ])); 
        elseif($action=="edit"):
            $emailFooter = EmailTemplateFooterModel::where('id',$id)->first();
            EmailTemplateFooterModel::where("id", $id)->update($data);
            return redirect($this->actionURL)->with( 'success', Lang::get('message.detailUpdated', [ 'section' => $this->singleSection ]));
        elseif($action=="delete"):
            $_data = EmailTemplateFooterModel::where("id", $id)->first();
            if(isset($_data)):
                $_data->delete();
                return redirect($this->actionURL)->with( 'success', Lang::get('message.detailDeleted', [ 'section' => $this->singleSection ])); 
            else:
                return redirect($this->actionURL)->with( 'error',  Lang::get('message.somethingWrong', [ 'section' => $this->singleSection ])); 
            endif;
        elseif($action=="makeInactive"):
            EmailTemplateFooterModel::where('id', $id)
                ->update([
                    'status' => '2'
                ]);
            return redirect($this->actionURL)->with('success', Lang::get('message.statusInactive', [ 'section' => $this->singleSection ]));
        elseif($action=="makeActive"):
            EmailTemplateFooterModel::where('id', $id)
                ->update([
                    'status' => '1'
                ]);
            return redirect($this->actionURL)->with('success', Lang::get('message.statusActive', [ 'section' => $this->singleSection ]));
        endif; 
    }
}
