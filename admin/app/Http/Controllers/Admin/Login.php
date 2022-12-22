<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Admin as AdminModel;
use App\Http\Requests\Admin\LoginRequest;
use Request, Lang, Auth, Hash;

class Login extends Controller
{
    private $redirect_after_login = "/dashboard";

    protected function getLogin() {
		if (auth()->guard('admin')->check()):
			return redirect($this->redirect_after_login);
		endif;
		return view('admin/login');
	}

	protected function postLogin(LoginRequest $request) {
		$remember_me = $request->only('remember') ? true : false;
		$auth = auth()->guard('admin');
		if ($auth->attempt($request->only('email', 'password'), $remember_me)):
			return redirect($this->redirect_after_login);
		else:
			return redirect('login')->with( 'error', Lang::get('message.emailAndPassword') ); 
		endif;	
	}
	
	protected function getLogout() {
		$auth = auth()->guard('admin');
		$auth->logout();
		return redirect('login')->with(['success' => 'Logged Out']);
	}

	protected function getForgotPassword() {
		if (auth()->guard('admin')->check()) {
			return redirect($this->redirect_after_login);
		}
		return view('admin/forgotpassword');
	}

	protected function postForgotPassword() {
		if (auth()->guard('admin')->check()):
			return redirect($this->redirect_after_login);
		endif;
		$post_data = Request::All();
		$email = $post_data['email'];
		$data = AdminModel::where('email',$email)->first();
		
		if(isset($data) && !empty($data)):
			$update=array('rememberToken'=>md5($data->id));
			$link=url("new-password").'/'.$update['rememberToken'];
			/* Mail send start */
			$email = $data->email;
			$name = $data->name;
			$new_mail_data['NAME']		=	$name;
			$new_mail_data['LINK']		=	$link;
			$new_email_data = _email_template_content("2",$new_mail_data);
			
			// << Email Template Data
			$new_subject = isset( $new_email_data[0] ) ? $new_email_data[0] : '';
			$new_content = $new_email_data[1];
			// From, To and Send Email
			$new_fromdata = ['email' => $email,'name' => $name];
			$new_mailids = [$email => $name];
			_mail_send_general( $new_fromdata, $new_subject , $new_content , $new_mailids );
			/* Mail send end */
			AdminModel::find($data->id)->update($update);
			return redirect('forgotpassword')->with('success', Lang::get('message.checkEmail'));
		else:
			return redirect('forgotpassword')->with('error', Lang::get('message.emailNotExist'));
		endif;
	}

	protected function newPassword($id="") {
		$data = Request::all();
		if (auth()->guard('admin')->check()):
			return redirect($this->redirect_after_login);
		endif;
		$data = AdminModel::where("rememberToken",$id)->first();
		if(isset($data) && !empty($data)):
			$_data=array('id'=>$id,'successlink'=>1);
	        return view( 'admin/new-password', $_data );
		else:
			$_data=array('id'=>$id,'successlink'=>0);
	        return view( 'admin/new-password', $_data);
		endif;
	}

	protected function postConfirmNewPassword() {
		$post_data = Request::all();
		$data = AdminModel::where("rememberToken",$post_data['id'])->first();
		if(isset($data) && !empty($data)):
			$update=array('rememberToken'=>"",'password'=>Hash::make($post_data['password']));
			AdminModel::find($data->id)->update($update);
			$_data=array('id'=>$post_data['id'],'success'=>1);
			return redirect('login')->with('success','Password has been successfully update.');
		else:
			$_data=array('id'=>$post_data['id'],'success'=>0);
			return redirect('new-password/'.$post_data['id']);				
		endif;
	}
}
