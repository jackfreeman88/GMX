<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Request, Lang;
use App\Models\Strain as StrainModel;

class Strain extends Controller
{
    protected $section;
	protected $singleSection;
	protected $viewPath;
	protected $actionURL;

	public function __construct(){
        $this->section = 'strains';
		$this->singleSection = 'strain';
		$this->viewPath = 'admin/strain';
		$this->actionURL = 'strain';
	}

	public function index(Request $request) {
        $data = Request::all();

        if(isset($data['filter']) && !empty($data['filter'])):
            $strains = StrainModel::where('title', 'LIKE', '%'.$data['filter'].'%')->paginate(10);
        else:
            $strains = StrainModel::paginate(10);
        endif;

		$_data=array(
            '_meta_title' => "Strains",
            '_meta_keyword' => "Strains",
            '_meta_description' => "Strains",
            'section'=>$this->section,
			'singleSection'=>$this->singleSection,
            'actionURL'=>$this->actionURL,
            'view'=>"list",
			'strains'=>$strains,
            'data' => $data
        );

        return view($this->viewPath, $_data);
    }

    public function Add(){
        $_data=array(
            '_meta_title' => "Add Strain",
            '_meta_keyword' => "Add Strain",
            '_meta_description' => "Add Strain",
            'section'=>$this->section,
            'singleSection'=>$this->singleSection,
            'actionURL'=>$this->actionURL,
            'view'=>"add",
        );
        return view($this->viewPath, $_data);
    }

    public function Edit($id="") {
        $data = StrainModel::where("id", $id)->first();
        if(isset($data) && !empty($data)):
            $_data=array(
                '_meta_title' => "Edit Strain",
                '_meta_keyword' => "Edit Strain",
                '_meta_description' => "Edit Strain",
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
                StrainModel::create($inserData);
                return redirect($this->actionURL)->with( 'success', Lang::get('message.detailAdded', [ 'section' => $this->singleSection ])); 
            elseif($action=="edit"):
                $emailHeader = StrainModel::where('id',$id)->first();
                $updateData = array(
                    'title' => $data['title'],
                    'isActive' => $data['isActive']
                );
                StrainModel::whereId($id)->update($updateData);
                return redirect($this->actionURL)->with( 'success', Lang::get('message.detailUpdated', [ 'section' => $this->singleSection ]));
            elseif($action=="delete"):
                $_data = StrainModel::where("id", $id)->first();
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
