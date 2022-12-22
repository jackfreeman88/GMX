<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Request, Lang;
use App\Models\MedRec as MedRecModel;

class MedRec extends Controller
{
    protected $section;
	protected $singleSection;
	protected $viewPath;
	protected $actionURL;

	public function __construct(){
        $this->section = 'Meds / Recs';
		$this->singleSection = 'Med / Rec';
		$this->viewPath = 'admin/med_rec';
		$this->actionURL = 'med_rec';
	}

	public function index(Request $request) {
        $data = Request::all();
        if( isset($data['filter']) && !empty($data['filter']) ):
            $med_recs = MedRecModel::where('title', 'LIKE', '%'.$data['filter'].'%')->paginate(10);
        else:
            $med_recs = MedRecModel::paginate(10);
        endif;
        
		$_data=array(
            '_meta_title' => "MedRec",
            '_meta_keyword' => "MedRec",
            '_meta_description' => "MedRec",
            'section'=>$this->section,
			'singleSection'=>$this->singleSection,
            'actionURL'=>$this->actionURL,
            'view'=>"list",
			'med_recs'=>$med_recs,
            'data' => $data
        );

        return view($this->viewPath, $_data);
    }

    public function Add(){
        $_data=array(
            '_meta_title' => "Add MedRec",
            '_meta_keyword' => "Add MedRec",
            '_meta_description' => "Add MedRec",
            'section'=>$this->section,
            'singleSection'=>$this->singleSection,
            'actionURL'=>$this->actionURL,
            'view'=>"add",
        );
        return view($this->viewPath, $_data);
    }

    public function Edit($id="") {
        $data = MedRecModel::where("id", $id)->first();
        if(isset($data) && !empty($data)):
            $_data=array(
                '_meta_title' => "Edit MedRec",
                '_meta_keyword' => "Edit MedRec",
                '_meta_description' => "Edit MedRec",
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
        try {
            $data = Request::all();
            if($action=="add"):

                $inserData = array(
                    'title' => $data['title'],
                    'isActive' => $data['isActive']
                );
                MedRecModel::create($inserData);
                return redirect($this->actionURL)->with( 'success', Lang::get('message.detailAdded', [ 'section' => $this->singleSection ])); 
            elseif($action=="edit"):
                $updateData = array(
                    'title' => $data['title'],
                    'isActive' => $data['isActive']
                );
                MedRecModel::whereId($id)->update($updateData);
                return redirect($this->actionURL)->with( 'success', Lang::get('message.detailUpdated', [ 'section' => $this->singleSection ]));
            elseif($action=="delete"):
                $_data = MedRecModel::where("id", $id)->first();
                if(isset($_data)):
                    $_data->delete();
                    return redirect($this->actionURL)->with( 'success', Lang::get('message.detailDeleted', [ 'section' => $this->singleSection ])); 
                else:
                    return redirect($this->actionURL)->with( 'error',  Lang::get('message.somethingWrong', [ 'section' => $this->singleSection ])); 
                endif;
            endif; 
        } catch (\Throwable $th) {
            return redirect($this->actionURL)->with( 'error',  Lang::get('message.somethingWrong', [ 'section' => $this->singleSection ])); 
        }
    }

    public function MedRegFilter(Request $request)
    {
        try {
            $data = Request::all();
            $search = $data['filter'];
            if(!empty($search)):
                $med_recs = MedRecModel::where('title', 'LIKE', '%'.$search.'%')->paginate(10);
            else:
                $med_recs = MedRecModel::paginate(10);
            endif;
            $_data=array(
                'section'=>$this->section,
                'singleSection'=>$this->singleSection,
                'actionURL'=>$this->actionURL,
                'view'=>"list",
                'med_recs'=>$med_recs,
                'search' => $search,
            );
            return view($this->viewPath, $_data);
        } catch (\Throwable $th) {
            return redirect($this->actionURL)->with( 'error',  Lang::get('message.somethingWrong', [ 'section' => $this->singleSection ]));
        }
    }
}
