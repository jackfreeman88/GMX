<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Request, Lang;
use App\Models\Product as ProductModel;

class Product extends Controller
{
    protected $section;
	protected $singleSection;
	protected $viewPath;
	protected $actionURL;

	public function __construct(){
        $this->section = 'product';
		$this->singleSection = 'product';
		$this->viewPath = 'admin/product';
		$this->actionURL = 'product';
	}

	public function index(Request $request) {
        $data = Request::all();
        if(isset($data['filter']) && !empty($data['filter']) ):
            $products = ProductModel::where('title', 'LIKE', '%'.$data['filter'].'%')->paginate(10);
        else:
            $products = ProductModel::paginate(10);
        endif;

		$_data=array(
            '_meta_title' => "Products",
            '_meta_keyword' => "Products",
            '_meta_description' => "Products",
            'section'=>$this->section,
			'singleSection'=>$this->singleSection,
            'actionURL'=>$this->actionURL,
            'view'=>"list",
			'products'=>$products,
            'data' => $data,
        );

        return view($this->viewPath, $_data);
    }

    public function Add(){
        $_data=array(
            '_meta_title' => "Add Products",
            '_meta_keyword' => "Add Products",
            '_meta_description' => "Add Products",
            'section'=>$this->section,
            'singleSection'=>$this->singleSection,
            'actionURL'=>$this->actionURL,
            'view'=>"add",
        );
        return view($this->viewPath, $_data);
    }

    // public function Details($id="") {
    //     $data = ProductModel::where("id", $id)->first();
    //     if(isset($data) && !empty($data)):
    //         $_data=array(
    //             '_meta_title' => "View Products",
    //             '_meta_keyword' => "View Products",
    //             '_meta_description' => "View Products",
    //             'section'=>$this->section,
    //             'singleSection'=>$this->singleSection,
    //             'actionURL'=>$this->actionURL,
    //             'view'=>"Details",
    //             'data'=>$data,
    //         );
    //         return view($this->viewPath, $_data);
    //     else:
    //         return redirect($this->actionURL)->with('error', Lang::get('message.noData', [ 'section' => $this->singleSection ]));
    //     endif;
    // }

    public function Action($action="",$id="") {
        try {
            $data = Request::all();
            if($action=="makeInactive"):
                ProductModel::where('id', $id)
                    ->update([
                        'isActive' => '2'
                    ]);
                return redirect($this->actionURL)->with('success', Lang::get('message.statusInactive', [ 'section' => $this->singleSection ]));
            elseif($action=="makeActive"):
                ProductModel::where('id', $id)
                    ->update([
                        'isActive' => '1'
                    ]);
                return redirect($this->actionURL)->with('success', Lang::get('message.statusActive', [ 'section' => $this->singleSection ]));
            endif; 
        } catch (\Throwable $th) {
            dd($th);
            return redirect($this->actionURL)->with( 'error',  Lang::get('message.somethingWrong', [ 'section' => $this->singleSection ])); 
        }
    }
}
