<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Request, Lang, File;
use App\Models\User as UserModel;
use App\Models\State as StateModel;
use App\Models\BrandDetails as BrandDetailsModel;
use App\Models\MedRec as MedRecModel;

class Brands extends Controller
{
    protected $section;
	protected $singleSection;
	protected $viewPath;
	protected $actionURL;

	public function __construct(){
        $this->section = 'brands';
		$this->singleSection = 'brands';
		$this->viewPath = 'admin/brands';
		$this->actionURL = 'brands';
	}

	public function index(Request $request) {
        $data = Request::all();

        if(isset($data['filter']) && !empty($data['filter'])):
            $search = $data['filter'];
            $brands = UserModel::where(function ($query) use ($search) {
                $query->where('businessName', 'LIKE', '%'.$search.'%')
                    ->orWhere('email', 'LIKE', '%'.$search.'%')
                    ->orWhere('phoneNumber', 'LIKE', '%'.$search.'%');
            })->where(['isApproved' => '1', 'role' => '2'])->paginate(10);
        else:
            $brands = UserModel::where(['isApproved' => '1', 'role' => '2'])->paginate(10);
        endif;
		$_data=array(
            '_meta_title' => 'Brands',
            '_meta_keyword' => 'Brands',
            '_meta_desc' => 'Brands',
            'section'=>$this->section,
			'singleSection'=>$this->singleSection,
            'actionURL'=>$this->actionURL,
            'view'=>"list",
			'brands'=>$brands,
            'data' => $data
        );

        return view($this->viewPath, $_data);
    }

    public function Edit($id="") {
        $data = UserModel::where("id", $id)->first();
        $states = StateModel::all();
        $medRecs = MedRecModel::all();
        if(isset($data) && !empty($data)):
            $_data=array(
                '_meta_title' => 'Edit Brand',
                '_meta_keyword' => 'Edit Brand',
                '_meta_desc' => 'Edit Brand',
                'section'=>$this->section,
                'singleSection'=>$this->singleSection,
                'actionURL'=>$this->actionURL,
                'view'=>"edit",
                'data'=>$data,
                'states' => $states,
                'medRecs' => $medRecs
            );
            return view($this->viewPath, $_data);
        else:
            return redirect($this->actionURL)->with('error', Lang::get('message.noData', [ 'section' => $this->singleSection ]));
        endif;
    }

    public function Action($action="",$id="") {
        try {
            $data = Request::all();
            if($action=="edit"):
                $userData = UserModel::where('id',$id)->with('BrandDetails')->first();
                $BrandDetails = BrandDetailsModel::where('id',$userData->BrandDetails->id)->first();
                $updateData = array(
                    'businessName' => $data['businessName'],
                    // 'lastName' => $data['lastName'],
                    'brandName' => $data['brandName'] ?? '',
                    'email' => $data['email'],
                    'stateId' => $data['state'],
                    'zipCode' => $data['zipCode'],
                    'phoneNumber' => $data['phoneNumber'],
                    'licenseNumber' => $data['licenseNumber'],
                    'medRecId' => $data['medRec'],
                    'isActive' => $data['isActive'],
                );
                $updateBrandDetails = [
                    'brandName'=>$data['brandName'] ?? '',
                    'website'=>$data['website'] ?? '',
                    'year'=> $data['year'] ?? "",
                    'address' => $data['address'] ?? "",
                    'description' => $data['description'] ?? "",
                    'avgOrder'=>$data['avgOrder']
                ];
                BrandDetailsModel::whereId($userData->BrandDetails->id)->update($updateBrandDetails);

                if( isset($data['password']) && !empty($data['password']) ):
                    $updateData['password'] = Hash::make( $data['password']);
                endif;

                // if(isset($data['licenseDocument']) && is_file($data['licenseDocument'])):
                //     $main_licenseDocument = $data['licenseDocument'];
                //     if(isset($data['licenseDocument']) && !empty($data['licenseDocument'])):
                //         $image_name = explode('saller/',$data['licenseDocument']);
                //         File::delete(public_path('uploads/saller').'/'.$image_name[1]);
                //     endif;
                //     $licenseDocument = time() . '-' . $main_licenseDocument->getClientOriginalName();
                //     $licenseDocument = str_replace(' ', '_', $licenseDocument);
                //     $path = public_path('uploads/saller');
                //     $main_licenseDocument->move($path, $licenseDocument);
                //     $updateData['licensePath'] = $licenseDocument;
                // else:
                //     $updateData['licensePath'] = $userData->licensePath ?? '';
                // endif;
                // if(isset($data['profilePath']) && is_file($data['profilePath'])):
                //     $main_profilePath = $data['profilePath'];
                //     if(isset($userData->profilePath) && !empty($userData->profilePath)):
                //         $image_name = explode('saller/',$userData->profilePath);
                //         dd($image_name);
                //         File::delete(public_path('uploads/saller').'/'.$image_name[1]);
                //     endif;
                //     $profilePath = time() . '-' . $main_profilePath->getClientOriginalName();
                //     $profilePath = str_replace(' ', '_', $profilePath);
                //     $path = public_path('uploads/saller');
                //     $main_profilePath->move($path, $profilePath);
                //     $updateData['profilePath'] = $profilePath;
                // else:
                //     $updateData['profilePath'] = $userData->profilePath ?? '';
                // endif;

                if(isset($data['licensePath']) && is_file($data['licensePath'])):
                    $main_licensePath = $data['licensePath'];
                    if(isset($data['licensePath']) && !empty($data['licensePath'])):
                        $image_name = explode('saller/',$data['licensePath']);
                        File::delete(public_path('uploads/saller').'/'.$image_name[1]);
                    endif;
                    $licensePath = time() . '-' . $main_licensePath->getClientOriginalName();
                    $licensePath = str_replace(' ', '_', $licensePath);
                    $path = public_path('uploads/saller');
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
            elseif($action=="approve"):
                $user = UserModel::where('id', $id)->first();
                $user->isApproved = '1';
                $user->save();
                $email = $user->email;
                $name = $user->businessName;
                $new_mail_data['NAME'] = $name;
                $new_mail_data['LINK'] = env('FRONTEND_BASE_URL').'/sign-in';
                $new_email_data = _email_template_content("19",$new_mail_data);

                // << Email Template Data
                $new_subject = isset( $new_email_data[0] ) ? $new_email_data[0] : '';
                $new_content = $new_email_data[1];
                // From, To and Send Email
                $new_fromdata = ['email' => $email,'name' => $name];
                $new_mailids = [$email => $name];
                _mail_send_general( $new_fromdata, $new_subject , $new_content , $new_mailids );
                return redirect('unverified-brands')->with('success', 'Brand has been approved');

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

    public function View($id="") {
        $data = UserModel::where("id", $id)->first();
        $states = StateModel::all();
        if(isset($data) && !empty($data)):
            $_data=array(
                '_meta_title' => 'View Brand',
                '_meta_keyword' => 'View Brand',
                '_meta_desc' => 'View Brand',
                'section'=>$this->section,
                'singleSection'=>$this->singleSection,
                'actionURL'=>'unverified-brands',
                'view'=>"view",
                'data'=>$data,
                'states' => $states,
            );
            return view('admin/unverified-brands', $_data);
        else:
            return redirect('unverified-brands')->with('error', Lang::get('message.noData', [ 'section' => $this->singleSection ]));
        endif;
    }

    public function unverifiedBrands(Request $request){
        $data = Request::all();

        if(isset($data['filter']) && !empty($data['filter'])):
            $search = $data['filter'];
            $brands = UserModel::where(function ($query) use ($search) {
                $query->where('businessName', 'LIKE', '%'.$search.'%')
                    ->orWhere('email', 'LIKE', '%'.$search.'%')
                    ->orWhere('phoneNumber', 'LIKE', '%'.$search.'%');
            })->where(['isApproved' => '2', 'role' => '2'])->paginate(10);
        else:
            $brands = UserModel::where(['isApproved' => '2', 'role' => '2'])->paginate(10);
        endif;
		$_data=array(
            '_meta_title' => 'Unverified Brands',
            '_meta_keyword' => 'Unverified Brands',
            '_meta_desc' => 'Unverified Brands',
            'section'=>'Unverified Brands',
			'singleSection'=>'Unverified Brand',
            'actionURL'=>'unverified-brands',
            'view'=>"list",
			'brands'=>$brands,
            'data' => $data
        );

        return view('admin/unverified-brands', $_data);
    }
}
