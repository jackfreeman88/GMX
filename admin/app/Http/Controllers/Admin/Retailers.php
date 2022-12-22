<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Request, Lang;
use App\Models\User as UserModel;
use App\Models\State as StateModel;
use App\Models\MedRec as MedRecModel;

class Retailers extends Controller
{
    protected $section;
	protected $singleSection;
	protected $viewPath;
	protected $actionURL;

	public function __construct(){
        $this->section = 'retailers';
		$this->singleSection = 'retailers';
		$this->viewPath = 'admin/retailers';
		$this->actionURL = 'retailers';
	}

	public function index(Request $request) {
        $data = Request::all();
        if(isset( $data['filter']) && !empty($data['filter'])):
            $search = $data['filter'];
            $retailers = UserModel::where(function ($query) use ($search) {
                $query->where('businessName', 'LIKE', '%'.$search.'%')
                    ->orWhere('email', 'LIKE', '%'.$search.'%')
                    ->orWhere('phoneNumber', 'LIKE', '%'.$search.'%');
            })->where('role','3')->paginate(10);
        else:
            $retailers = UserModel::where('role','3')->paginate(10);
        endif;
		$_data=array(
            '_meta_title' => "Retailers",
            '_meta_keyword' => "Retailers",
            '_meta_description' => "Retailers",
            'section'=>$this->section,
			'singleSection'=>$this->singleSection,
            'actionURL'=>$this->actionURL,
            'view'=>"list",
			'retailers'=>$retailers,
            'data' => $data
        );

        return view($this->viewPath, $_data);
    }

    public function Add(){
        $_data=array(
            '_meta_title' => "Add Retailers",
            '_meta_keyword' => "Add Retailers",
            '_meta_description' => "Add Retailers",
            'section'=>$this->section,
            'singleSection'=>$this->singleSection,
            'actionURL'=>$this->actionURL,
            'view'=>"add",
        );
        return view($this->viewPath, $_data);
    }

    public function Edit($id="") {
        $data = UserModel::where("id", $id)->first();
        $states = StateModel::all();
        $medRecs = MedRecModel::all();
        if(isset($data) && !empty($data)):
            $_data=array(
                '_meta_title' => "Edit Retailers",
                '_meta_keyword' => "Edit Retailers",
                '_meta_description' => "Edit Retailers",
                'section'=>$this->section,
                'singleSection'=>$this->singleSection,
                'actionURL'=>$this->actionURL,
                'view'=>"edit",
                'data'=>$data,
                'states' => $states,
                'medRecs' => $medRecs,
            );
            return view($this->viewPath, $_data);
        else:
            return redirect($this->actionURL)->with('error', Lang::get('message.noData', [ 'section' => $this->singleSection ]));
        endif;
    }

    public function Action($action="",$id="") {
        try {
            $data = Request::all();
            // dd($data['password]);
            if($action=="edit"):
                $userData = UserModel::where('id',$id)->first();
                $updateData = array(
                    'businessName' => $data['businessName'],
                    'email' => $data['email'],
                    'stateId' => $data['state'],
                    'zipCode' => $data['zipCode'],
                    'phoneNumber' => $data['phoneNumber'],
                    'licenseNumber' => $data['licenseNumber'],
                    'medRecId' => $data['medRec'],
                    'isActive' => $data['isActive'],
                );
                if( isset($data['password']) && !empty($data['password']) ):
                    $updateData['password'] = Hash::make( $data['password']);
                endif;

                if(isset($data['profilePath']) && is_file($data['profilePath'])):
                    $main_profilePath = $data['profilePath'];
                    if(isset($cms->content['profilePath']) && !empty($cms->content['profilePath'])):
                        $image_name = explode('cms/',$cms->content['profilePath']);
                        File::delete(public_path('uploads/retailers').'/'.$image_name[1]);
                    endif;
                    $profilePath = time() . '-' . $main_profilePath->getClientOriginalName();
                    $profilePath = str_replace(' ', '_', $profilePath);
                    $path = public_path('uploads/retailers');
                    $main_profilePath->move($path, $profilePath);
                    $updateData['profilePath'] = $profilePath;
                else:
                    $updateData['profilePath'] = $userData->profilePath ?? '';
                endif;

                if(isset($data['licensePath']) && is_file($data['licensePath'])):
                    $main_licensePath = $data['licensePath'];
                    if(isset($cms->content['licensePath']) && !empty($cms->content['licensePath'])):
                        $image_name = explode('cms/',$cms->content['licensePath']);
                        File::delete(public_path('uploads/retailers').'/'.$image_name[1]);
                    endif;
                    $licensePath = time() . '-' . $main_licensePath->getClientOriginalName();
                    $licensePath = str_replace(' ', '_', $licensePath);
                    $path = public_path('uploads/retailers');
                    $main_licensePath->move($path, $licensePath);
                    $updateData['licensePath'] = $licensePath;
                else:
                    $updateData['licensePath'] = $userData->licensePath ?? '';
                endif;
                UserModel::whereId($id)->update($updateData);
                return redirect($this->actionURL)->with( 'success', Lang::get('message.detailUpdated', [ 'section' => $this->singleSection ]));
            elseif($action=="makeInactive"):
                UserModel::where('id', $id)
                    ->update([
                        'isActive' => '2'
                    ]);
                return redirect($this->actionURL)->with('success', Lang::get('message.statusInactive', [ 'section' => $this->singleSection ]));
            elseif($action=="makeActive"):
                UserModel::where('id', $id)
                    ->update([
                        'isActive' => '1'
                    ]);
                return redirect($this->actionURL)->with('success', Lang::get('message.statusActive', [ 'section' => $this->singleSection ]));
            
            // elseif($action=="delete"):
            //     $_data = UserModel::where("id", $id)->first();
            //     if(isset($_data)):
            //         $_data->delete();
            //         return redirect($this->actionURL)->with( 'success', Lang::get('message.detailDeleted', [ 'section' => $this->singleSection ])); 
            //     else:
            //         return redirect($this->actionURL)->with( 'error',  Lang::get('message.somethingWrong', [ 'section' => $this->singleSection ])); 
            //     endif;

            endif; 
        } catch (\Throwable $th) {
            return redirect($this->actionURL)->with( 'error',  Lang::get('message.somethingWrong', [ 'section' => $this->singleSection ])); 
        }
    }

    public function retailersFilter(Request $request)
    {
        try {
            $data = Request::all();
            $search = $data['filter'];
            if(!empty($search)):
                $retailers = UserModel::where(function ($query) use ($search) {
                            $query->where('businessName', 'LIKE', '%'.$search.'%')
                                ->orWhere('email', 'LIKE', '%'.$search.'%')
                                ->orWhere('phoneNumber', 'LIKE', '%'.$search.'%')
                                ->orWhere('licenseNumber', 'LIKE', '%'.$search.'%')
                                ->orWhere('medRecId', 'LIKE', '%'.$search.'%');
                        })->where('role','3')->paginate(10);
                // dd(count($retailers));
            else:
                $retailers = UserModel::where('role','3')->paginate(10);
            endif;
            $_data=array(
                'section'=>$this->section,
                'singleSection'=>$this->singleSection,
                'actionURL'=>$this->actionURL,
                'view'=>"list",
                'retailers'=>$retailers,
                'search' => $search,
            );
            return view($this->viewPath, $_data);
        } catch (\Throwable $th) {
            return redirect($this->actionURL)->with( 'error',  Lang::get('message.somethingWrong', [ 'section' => $this->singleSection ]));
        }
    }
}
