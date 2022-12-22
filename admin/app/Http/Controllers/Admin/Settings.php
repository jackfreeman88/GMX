<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Request, File, Hash;
use App\Models\Admin as AdminModel;
use App\Models\Settings as SettingsModel;

class Settings extends Controller
{
    public function settings()
    {
        $adminData = AdminModel::first();
        $_data=array(
            '_meta_title' => "Settings",
			'_meta_keyword' => "Settings",
			'_meta_description' => "Settings",
            'adminData'=>$adminData
        );
        $data = Request::all();
        if(isset($data) && !empty($data)):
            unset($data['_token']);
            if(isset($data['logo']) && !empty($data['logo'])):
                if(File::exists(env('ASSETS_PATH')._get_setting('logo'))):
                    File::delete(env('ASSETS_PATH')._get_setting('logo'));
                endif;
                $logo = $data['logo']->getClientOriginalName();
                $logo = str_replace(' ', '_', $logo);
                $path = env('ASSETS_PATH').'/settings';
                $data['logo']->move($path, $logo);
                $data['logo'] = '/settings/'.$logo;
            endif;
            if(isset($data['minlogo']) && !empty($data['minlogo'])):
                if(File::exists(env('ASSETS_PATH')._get_setting('minlogo'))):
                    File::delete(env('ASSETS_PATH')._get_setting('minlogo'));
                endif;
                $minlogo = $data['minlogo']->getClientOriginalName();
                $minlogo = str_replace(' ', '_', $minlogo);
                $path = env('ASSETS_PATH').'/settings';
                $data['minlogo']->move($path, $minlogo);
                $data['minlogo'] = '/settings/'.$minlogo;
            endif;
            if(isset($data['logo-white']) && !empty($data['logo-white'])):
                if(File::exists(env('ASSETS_PATH')._get_setting('logo-white'))):
                    File::delete(env('ASSETS_PATH')._get_setting('logo-white'));
                endif;
                $logo_white = $data['logo-white']->getClientOriginalName();
                $logo_white = str_replace(' ', '_', $logo_white);
                $path = env('ASSETS_PATH').'/settings';
                $data['logo-white']->move($path, $logo_white);
                $data['logo-white'] = '/settings/'.$logo_white;
            endif;
            if(isset($data['footerlogo']) && !empty($data['footerlogo'])):
                if(File::exists(env('ASSETS_PATH')._get_setting('footerlogo'))):
                    File::delete(env('ASSETS_PATH')._get_setting('footerlogo'));
                endif;
                $footerlogo = $data['footerlogo']->getClientOriginalName();
                $footerlogo = str_replace(' ', '_', $footerlogo);
                $path = env('ASSETS_PATH').'/settings';
                $data['footerlogo']->move($path, $footerlogo);
                $data['footerlogo'] = '/settings/'.$footerlogo;
            endif;
            foreach ($data as $key => $value):
                $setting = SettingsModel::where('name',$key)->first();
                if(!$setting):
                    $insertsetting = new SettingsModel();
                    $insertsetting->name = $key;
                    $insertsetting->description = $value ?? '';
                    $insertsetting->save();
                else:
                    SettingsModel::where('id',$setting->id)->update(['description'=>$value]);
                endif;
            endforeach;
            return back()->with('success', 'Setting updated successfully.');
        else:
            return view('admin.settings', $_data);
        endif;
    }

    public function UpdateAdminDetails(){
        try {
            $data = Request::all();
            if(isset($data) && !empty($data)):
                unset($data['_token']);
                $admin = AdminModel::first();
                    $updateData = array(
                        'name' => $data['fname'] .' '. $data['lname'],
                        'email' => $data['email'],
                        // 'password' => Hash::make( $data['password'] ),
                    );
                if(isset($data['password']) && !empty($data['password'])):
                    $updateData['password'] = Hash::make( $data['password'] );
                endif;
                AdminModel::where("id", $admin->id)->update($updateData);
                return back()->with('success', 'Admin detail updated successfully.');

            endif;
        } catch (\Throwable $th) {
            return back()->with('error', 'Semething went wrong !!!');
        }
    }
}
