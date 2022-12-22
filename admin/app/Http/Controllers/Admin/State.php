<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Request, Lang;
use App\Models\State as StateModel;

class State extends Controller
{
    protected $section;
	protected $singleSection;
	protected $viewPath;
	protected $actionURL;

	public function __construct(){
        $this->section = 'States';
		$this->singleSection = 'State';
		$this->viewPath = 'admin/state';
		$this->actionURL = 'state';
	}

	public function index(Request $request) {
        $data = Request::all();

        if(isset($data['filter']) && !empty($data['filter'])):
            $states = StateModel::where('name', 'LIKE', '%'.$data['filter'].'%')->paginate(10);
        else:
            $states = StateModel::paginate(10);
        endif;

		$_data=array(
            '_meta_title' => "States",
            '_meta_keyword' => "States",
            '_meta_description' => "States",
            'section'=>$this->section,
			'singleSection'=>$this->singleSection,
            'actionURL'=>$this->actionURL,
            'view'=>"list",
			'states'=>$states,
            'data' => $data
        );

        return view($this->viewPath, $_data);
    }

    public function Add(){
        $_data=array(
            '_meta_title' => "Add State",
            '_meta_keyword' => "Add State",
            '_meta_description' => "Add State",
            'section'=>$this->section,
            'singleSection'=>$this->singleSection,
            'actionURL'=>$this->actionURL,
            'view'=>"add",
        );
        return view($this->viewPath, $_data);
    }

    public function Edit($id="") {
        $data = StateModel::where("id", $id)->first();
        if(isset($data) && !empty($data)):
            $_data=array(
                '_meta_title' => "Edit State",
                '_meta_keyword' => "Edit State",
                '_meta_description' => "Edit State",
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
                    'name' => $data['name'],
                    'isActive' => $data['isActive']
                );
                StateModel::create($inserData);
                return redirect($this->actionURL)->with( 'success', Lang::get('message.detailAdded', [ 'section' => $this->singleSection ])); 
            elseif($action=="edit"):
                $emailHeader = StateModel::where('id',$id)->first();
                $updateData = array(
                    'name' => $data['name'],
                    'isActive' => $data['isActive']
                );
                StateModel::whereId($id)->update($updateData);
                return redirect($this->actionURL)->with( 'success', Lang::get('message.detailUpdated', [ 'section' => $this->singleSection ]));
            elseif($action=="delete"):
                $_data = StateModel::where("id", $id)->first();
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
}
