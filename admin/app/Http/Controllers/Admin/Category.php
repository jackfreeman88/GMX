<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Request, Lang;
use App\Models\Category as CategoryModel;

class Category extends Controller
{
    protected $section;
	protected $singleSection;
	protected $viewPath;
	protected $actionURL;

	public function __construct(){
        $this->section = 'Categories';
		$this->singleSection = 'category';
		$this->viewPath = 'admin/categories';
		$this->actionURL = 'categories';
	}

	public function index(Request $request) {
        $data = Request::all();

        if(isset($data['filter']) && !empty($data['filter']) ):
            $categories = CategoryModel::where('title', 'LIKE', '%'.$data['filter'].'%')->paginate(10);
        else:
            $categories = CategoryModel::paginate(10);
        endif;
		$_data=array(
            '_meta_title' => 'Categories',
            '_meta_keyword' => 'Categories',
            '_meta_desc' => 'Categories',
            'section'=>$this->section,
			'singleSection'=>$this->singleSection,
            'actionURL'=>$this->actionURL,
            'view'=>"list",
			'categories'=>$categories,
            'data' => $data,
        );

        return view($this->viewPath, $_data);
    }

    public function Add(){
        $_data=array(
            '_meta_title' => 'Add Category',
            '_meta_keyword' => 'Add Category',
            '_meta_desc' => 'Add Category',
            'section'=>$this->section,
            'singleSection'=>$this->singleSection,
            'actionURL'=>$this->actionURL,
            'view'=>"add",
        );
        return view($this->viewPath, $_data);
    }

    public function Edit($id="") {
        $data = CategoryModel::where("id", $id)->first();
        if(isset($data) && !empty($data)):
            $_data=array(
                '_meta_title' => 'Edit Category',
                '_meta_keyword' => 'Edit Category',
                '_meta_desc' => 'Edit Category',
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
                CategoryModel::create($inserData);
                return redirect($this->actionURL)->with( 'success', Lang::get('message.detailAdded', [ 'section' => $this->singleSection ])); 
            elseif($action=="edit"):
                $emailHeader = CategoryModel::where('id',$id)->first();
                $updateData = array(
                    'title' => $data['title'],
                    'isActive' => $data['isActive']
                );
                CategoryModel::whereId($id)->update($updateData);
                return redirect($this->actionURL)->with( 'success', Lang::get('message.detailUpdated', [ 'section' => $this->singleSection ]));
            elseif($action=="makeInactive"):
                CategoryModel::where('id', $id)
                    ->update([
                        'isActive' => '2'
                    ]);
                return redirect($this->actionURL)->with('success', Lang::get('message.statusInactive', [ 'section' => $this->singleSection ]));
            elseif($action=="makeActive"):
                CategoryModel::where('id', $id)
                    ->update([
                        'isActive' => '1'
                    ]);
                return redirect($this->actionURL)->with('success', Lang::get('message.statusActive', [ 'section' => $this->singleSection ]));
            elseif($action=="delete"):
                $_data = CategoryModel::where("id", $id)->first();
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
