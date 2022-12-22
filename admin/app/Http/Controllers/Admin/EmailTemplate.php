<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Request, Lang;
use App\Models\EmailTemplateHeader as EmailTemplateHeaderModel;
use App\Models\EmailTemplate as EmailTemplateModel;
use App\Models\EmailTemplateFooter as EmailTemplateFooterModel;

class EmailTemplate extends Controller
{
    protected $section;
	protected $singleSection;
	protected $viewPath;
	protected $actionURL;

	public function __construct(){
        $this->section = 'Email Templates';
		$this->singleSection = 'Email Template';
		$this->viewPath = 'admin/email-templates';
		$this->actionURL = 'email-templates';
	}

	public function index(Request $req) {
        $emailTemplates = EmailTemplateModel::paginate(10);
		$_data=array(
            '_meta_title' => "Email Templates",
			'_meta_keyword' => "Email Templates",
			'_meta_description' => "Email Templates",
            'section'=>$this->section,
			'singleSection'=>$this->singleSection,
            'actionURL'=>$this->actionURL,
            'view'=>"list",
			'emailTemplates'=>$emailTemplates,
        );

        return view($this->viewPath, $_data);
    }

    public function Add(){
        $emailHeaders = EmailTemplateHeaderModel::where('status','1')->get();
        $emailFooters = EmailTemplateFooterModel::where('status','1')->get();

        $_data=array(
            '_meta_title' => "Add Email Template",
			'_meta_keyword' => "Add Email Template",
			'_meta_description' => "Add Email Template",
            'section'=>$this->section,
            'singleSection'=>$this->singleSection,
            'actionURL'=>$this->actionURL,
            'view'=>"add",
            'emailHeaders'=>$emailHeaders,
            'emailFooters'=>$emailFooters,
        );
        return view($this->viewPath, $_data);
    }

    public function Edit($id="") {
        $data = EmailTemplateModel::where("id", $id)->first();
        $emailHeaders = EmailTemplateHeaderModel::where('status','1')->get();
        $emailFooters = EmailTemplateFooterModel::where('status','1')->get();

        if(isset($data) && !empty($data)):
            $_data=array(
                '_meta_title' => "Edit Email Template",
                '_meta_keyword' => "Edit Email Template",
                '_meta_description' => "Edit Email Template",
                'section'=>$this->section,
                'singleSection'=>$this->singleSection,
                'actionURL'=>$this->actionURL,
                'view'=>"edit",
                'data'=>$data,
                'emailHeaders'=>$emailHeaders,
                'emailFooters'=>$emailFooters,
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
            EmailTemplateModel::create($data);
            return redirect($this->actionURL)->with( 'success', Lang::get('message.detailAdded', [ 'section' => $this->singleSection ])); 
        elseif($action=="edit"):
            $emailTemplate = EmailTemplateModel::where('id',$id)->first();
            EmailTemplateModel::where("id", $id)->update($data);
            return redirect($this->actionURL)->with( 'success', Lang::get('message.detailUpdated', [ 'section' => $this->singleSection ]));
        elseif($action=="delete"):
            $_data = EmailTemplateModel::where("id", $id)->first();
            if(isset($_data)):
                $_data->delete();
                return redirect($this->actionURL)->with( 'success', Lang::get('message.detailDeleted', [ 'section' => $this->singleSection ])); 
            else:
                return redirect($this->actionURL)->with( 'error',  Lang::get('message.somethingWrong', [ 'section' => $this->singleSection ])); 
            endif;
        elseif($action=="makeInactive"):
            EmailTemplateModel::where('id', $id)
                ->update([
                    'status' => '2'
                ]);
            return redirect($this->actionURL)->with('success', Lang::get('message.statusInactive', [ 'section' => $this->singleSection ]));
        elseif($action=="makeActive"):
            EmailTemplateModel::where('id', $id)
                ->update([
                    'status' => '1'
                ]);
            return redirect($this->actionURL)->with('success', Lang::get('message.statusActive', [ 'section' => $this->singleSection ]));
        endif; 
    }
}
