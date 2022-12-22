<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Request, Lang, Str;
use App\Models\Plan as PlanModel;

class Subscription extends Controller
{
    protected $section;
	protected $singleSection;
	protected $viewPath;
	protected $actionURL;

	public function __construct(){
        $this->section = 'Subscriptions';
		$this->singleSection = 'Subscription';
		$this->viewPath = 'admin/subscription';
		$this->actionURL = 'subscription';
	}

	public function index(Request $request) {
        $data = Request::all();

        if(isset($data['filter']) && !empty($data['filter'])):
            $strains = PlanModel::where('title', 'LIKE', '%'.$data['filter'].'%')->paginate(10);
        else:
            $strains = PlanModel::paginate(10);
        endif;

		$_data=array(
            '_meta_title' => "Subscriptions",
            '_meta_keyword' => "Subscriptions",
            '_meta_description' => "Subscriptions",
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
            '_meta_title' => "Add Subscription",
            '_meta_keyword' => "Add Subscription",
            '_meta_description' => "Add Subscription",
            'section'=>$this->section,
            'singleSection'=>$this->singleSection,
            'actionURL'=>$this->actionURL,
            'view'=>"add",
        );
        return view($this->viewPath, $_data);
    }

    public function Edit($id="") {
        $data = PlanModel::where("id", $id)->first();
        if(isset($data) && !empty($data)):
            $_data=array(
                '_meta_title' => "Edit Subscription",
                '_meta_keyword' => "Edit Subscription",
                '_meta_description' => "Edit Subscription",
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
                $insertData = array(
                    'title' => $data['title'],
                    'price' => $data['price'],
                    'description' => $data['description'],
                    'isActive' => $data['isActive'],
                );
                $slug = Str::slug($data['title']);
                $cnt = PlanModel::where("slug",'like',$slug."%")->count();
                $insertData['slug'] = $slug;
                if($cnt > 0):
                    $result = $slug."-".($cnt-1);
                    $insertData['slug'] = ++$result;
                endif;
                PlanModel::create($insertData);
                return redirect($this->actionURL)->with( 'success', Lang::get('message.detailAdded', [ 'section' => $this->singleSection ])); 
            elseif($action=="edit"):
                $planCount = PlanModel::where('id',$id)->count();
                if($planCount > 0):
                    $updateData = array(
                        'title' => $data['title'],
                        'price' => $data['price'],
                        'description' => $data['description'],
                        'isActive' => $data['isActive'],
                    );
                    PlanModel::whereId($id)->update($updateData);
                    return redirect($this->actionURL)->with( 'success', Lang::get('message.detailUpdated', [ 'section' => $this->singleSection ]));
                else:
                    return redirect($this->actionURL)->with( 'error', Lang::get('message.noData', [ 'section' => $this->singleSection ]));
                endif;
            elseif($action=="makeInactive"):
                PlanModel::where('id', $id)
                    ->update([
                        'isActive' => '2'
                    ]);
                return redirect($this->actionURL)->with('success', Lang::get('message.statusInactive', [ 'section' => $this->singleSection ]));
            elseif($action=="makeActive"):
                PlanModel::where('id', $id)
                    ->update([
                        'isActive' => '1'
                    ]);
                return redirect($this->actionURL)->with('success', Lang::get('message.statusActive', [ 'section' => $this->singleSection ]));
            endif; 
        } catch (\Throwable $th) {
            return redirect($this->actionURL)->with( 'error',  Lang::get('message.somethingWrong', [ 'section' => $this->singleSection ])); 
        }
    }
}
