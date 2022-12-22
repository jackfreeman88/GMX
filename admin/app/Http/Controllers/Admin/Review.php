<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Request, Lang;
use App\Models\Review as ReviewModel;

class Review extends Controller
{
    protected $section;
	protected $singleSection;
	protected $viewPath;
	protected $actionURL;

	public function __construct(){
        $this->section = 'Review';
		$this->singleSection = 'Review';
		$this->viewPath = 'admin/review';
		$this->actionURL = 'review';
	}

	public function index(Request $request) {
        $data = Request::all();
        $reviews = ReviewModel::paginate(10);
		$_data=array(
            '_meta_title' => "Reviews",
            '_meta_keyword' => "Reviews",
            '_meta_description' => "Reviews",
            'section'=>$this->section,
			'singleSection'=>$this->singleSection,
            'actionURL'=>$this->actionURL,
            'view'=>"list",
			'reviews'=>$reviews,
            'data' => $data,
        );

        return view($this->viewPath, $_data);
    }

    public function Details($id="") {
        $data = ReviewModel::where("id", $id)->first();
        if(isset($data) && !empty($data)):
            $_data=array(
                '_meta_title' => "View Review",
                '_meta_keyword' => "View Review",
                '_meta_description' => "View Review",
                'section'=>$this->section,
                'singleSection'=>$this->singleSection,
                'actionURL'=>$this->actionURL,
                'view'=>"Details",
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
            if($action=="makeInactive"):
                ReviewModel::where('id', $id)
                    ->update([
                        'isActive' => '2'
                    ]);
                return redirect($this->actionURL)->with('success', Lang::get('message.statusInactive', [ 'section' => $this->singleSection ]));
            elseif($action=="makeActive"):
                ReviewModel::where('id', $id)
                    ->update([
                        'isActive' => '1'
                    ]);
                return redirect($this->actionURL)->with('success', Lang::get('message.statusActive', [ 'section' => $this->singleSection ]));
            elseif($action=="delete"):
                $_data = ReviewModel::where("id", $id)->first();
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

    public function productFilter(Request $request)
    {
        try {
            $data = Request::all();
            $search = $data['filter'];
            if(!empty($search)):
                $reviews = ReviewModel::where('title', 'LIKE', '%'.$search.'%')->paginate(10);
            else:
                $reviews = ReviewModel::paginate(10);
            endif;
            $_data=array(
                'section'=>$this->section,
                'singleSection'=>$this->singleSection,
                'actionURL'=>$this->actionURL,
                'view'=>"list",
                'reviews'=>$reviews,
                'search' => $search,
            );
            return view($this->viewPath, $_data);
        } catch (\Throwable $th) {
            return redirect($this->actionURL)->with( 'error',  Lang::get('message.somethingWrong', [ 'section' => $this->singleSection ]));
        }
    }
}
