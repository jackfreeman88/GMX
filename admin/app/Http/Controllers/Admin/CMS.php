<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\CMS as CMSModel;
use App\Models\Banner as BannerModel;
use  Lang, File;

class CMS extends Controller
{
    protected $section;
	protected $singleSection;
	protected $viewPath;
	protected $actionURL;

	public function __construct(){
		$this->section = 'CMS';
		$this->singleSection = 'CMS';
		$this->viewPath = 'admin/cms';
		$this->actionURL = 'cms';
	}

    public function index() {
		$data = CMSModel::orderBy('id',"DESC")->paginate(10);
		$_data=array(
			'_meta_title' => 'CMS Pages',
			'_meta_keyword' => 'CMS Pages',
			'_meta_desc' => 'CMS Pages',
			'section'=>$this->section,
			'singleSection'=>$this->singleSection,
			'actionURL'=>$this->actionURL,
			'view'=>"list",
			'data'=>$data,
		);
		return view($this->viewPath.'/'.'cms', $_data);
	}

    public function Edit($slug="") {
		$cms = CMSModel::where('slug',$slug)->first();
		$_data=array(
			'_meta_title' => 'Edit '.$cms->name.' Pages',
			'_meta_keyword' => 'Edit '.$cms->name.' Pages',
			'_meta_desc' => 'Edit '.$cms->name.' Pages',
			'section'=>$this->section,
			'singleSection'=>$this->singleSection,
			'actionURL'=>$this->actionURL,
			'view'=>"edit",
			'cms'=>$cms,
		);
		if($slug == "home"):
			$Banner = BannerModel::All();
			$_data['Banner'] = $Banner;
		endif;
		return view($this->viewPath.'/'.$slug, $_data);
	}
    
	public function updatehome(Request $request,$slug="") {
		try {
			$cms = CMSModel::where('Slug',$slug)->first();
			$description = [];
			//Banner Section Start
			foreach ($request->section1_pre_title as $key => $value):
				$bannerEdit = null;
				if(isset($request->section1_edit[$key])):
					$bannerEdit = BannerModel::whereId($request->section1_edit[$key])->first();
				endif;
				$banner_content = array();
				$banner_content['preTitle'] = $request->section1_pre_title[$key] ?? "";
				$banner_content['title'] = $request->section1_title[$key] ?? "";
				$banner_content['description'] = $request->section1_description[$key] ?? "";
				$banner_content['buttonText'] = $request->section1_button_text[$key] ?? "";
				$banner_content['buttonLink'] = $request->section1_button_link[$key] ?? "";
				if(isset($request->main_image_2[$key]) && is_file($request->main_image_2[$key])):
					if($request->hasFile('main_image_2.'.$key)):
						$main_image_2_image = $request->file('main_image_2.'.$key);
						if(isset($bannerEdit->image) && !empty($bannerEdit->image) && File::exists(env('ASSETS_PATH').$bannerEdit->image)):
							File::delete(env('ASSETS_PATH').$bannerEdit->image);
						endif;
						$section1_small_image = time() . '-' . $main_image_2_image->getClientOriginalName();
						$section1_small_image = str_replace(' ', '_', $section1_small_image);
						$path = env('ASSETS_PATH').'/cms';
						$main_image_2_image->move($path, $section1_small_image);
						$banner_content['image'] = '/cms/'.$section1_small_image;
					endif;
				endif;
				BannerModel::updateOrCreate(['id' => $request->section1_edit[$key] ?? ""],$banner_content);
			endforeach;
			## Banner Deletion Start
			$delete_slider = explode(" " , $request->remove_slider[0]);
			if(isset($delete_slider) && !empty($delete_slider[0])):
				foreach ($delete_slider as $index => $item):
					$BannerData = BannerModel::whereId($item)->first();
					$image_name = $BannerData->image;
					if(isset($image_name) && File::exists(env('ASSETS_PATH').$image_name)):
						File::delete(env('ASSETS_PATH').$image_name);
					endif;
					$BannerData = BannerModel::whereId($item)->delete();
				endforeach;
			endif;
			## Banner Deletion End
			$imageData = BannerModel::all();
			$bannerData = array();
			foreach ($imageData as $key => $value):
				$arr = array();
				$arr['preTitle'] = $value->preTitle;
				$arr['title'] = $value->title;
				$arr['description'] = $value->description;
				$arr['buttonText'] = $value->buttonText;
				$arr['buttonLink'] = $value->buttonLink;
				$arr['image'] = $value->image;
				$bannerData[] = $arr;
			endforeach;
			$description['banner_content'] = $bannerData;

			## Vision Section Start
			$description['section2_count'] = $request->section2_count ?? "";
			$description['section2_main_title'] = $request->section2_main_title ?? "";
			$description['section2_description'] = $request->section2_description ?? "";
			$description['section2_button_title'] = $request->section2_button_title ?? "";
			$description['section2_button_link'] = $request->section2_button_link ?? "";
			if($request->hasFile('section2_image')):
				$main_section2_image = $request->file('section2_image');
				if(isset($cms->content['section2_image']) && !empty($cms->content['section2_image'])):
					$image_name = $cms->content['section2_image'];
					File::delete(env('ASSETS_PATH').$image_name);
				endif;
				$section2_image = time() . '-' . $main_section2_image->getClientOriginalName();
				$section2_image = str_replace(' ', '_', $section2_image);
				$path = env('ASSETS_PATH').'/cms';
				$main_section2_image->move($path, $section2_image);
				$description['section2_image'] = '/cms/'.$section2_image;
			else:
				$description['section2_image'] = $cms->content['section2_image'] ?? '';
			endif;
			## Vision Section End

			## Brands Section Start
			$description['section3_count'] = $request->section3_count ?? "";
			$description['section3_main_title'] = $request->section3_main_title ?? "";

			$description['section3_list_icon1'] = $request->section3_list_icon1 ?? "";
			$description['section3_list_title1'] = $request->section3_list_title1 ?? "";
			$description['section3_list_description1'] = $request->section3_list_description1 ?? "";

			$description['section3_list_icon2'] = $request->section3_list_icon2 ?? "";
			$description['section3_list_title2'] = $request->section3_list_title2 ?? "";
			$description['section3_list_description2'] = $request->section3_list_description2 ?? "";

			$description['section3_button_title'] = $request->section3_button_title ?? "";
			$description['section3_button_link'] = $request->section3_button_link ?? "";
			if($request->hasFile('section3_image')):
				$main_section3_image = $request->file('section3_image');
				if(isset($cms->content['section3_image']) && !empty($cms->content['section3_image'])):
					$image_name = $cms->content['section3_image'];
					File::delete(env('ASSETS_PATH').$image_name);
				endif;
				$section3_image = time() . '-' . $main_section3_image->getClientOriginalName();
				$section3_image = str_replace(' ', '_', $section3_image);
				$path = env('ASSETS_PATH').'/cms';
				$main_section3_image->move($path, $section3_image);
				$description['section3_image'] = '/cms/'.$section3_image;
			else:
				$description['section3_image'] = $cms->content['section3_image'] ?? '';
			endif;
			## Brands Section End

			## Retailer Section Start
			$description['section4_count'] = $request->section4_count ?? "";
			$description['section4_main_title'] = $request->section4_main_title ?? "";
			$description['section4_description'] = $request->section4_description ?? "";

			$description['section4_list_icon1'] = $request->section4_list_icon1 ?? "";
			$description['section4_list_title1'] = $request->section4_list_title1 ?? "";
			$description['section4_list_description1'] = $request->section4_list_description1 ?? "";

			$description['section4_list_icon2'] = $request->section4_list_icon2 ?? "";
			$description['section4_list_title2'] = $request->section4_list_title2 ?? "";
			$description['section4_list_description2'] = $request->section4_list_description2 ?? "";

			$description['section4_list_icon3'] = $request->section4_list_icon3 ?? "";
			$description['section4_list_title3'] = $request->section4_list_title3 ?? "";
			$description['section4_list_description3'] = $request->section4_list_description3 ?? "";

			$description['section4_button_title'] = $request->section4_button_title ?? "";
			$description['section4_button_link'] = $request->section4_button_link ?? "";
			if($request->hasFile('section4_image')):
				$main_section4_image = $request->file('section4_image');
				if(isset($cms->content['section4_image']) && !empty($cms->content['section4_image'])):
					$image_name = $cms->content['section4_image'];
					File::delete(env('ASSETS_PATH').$image_name);
				endif;
				$section4_image = time() . '-' . $main_section4_image->getClientOriginalName();
				$section4_image = str_replace(' ', '_', $section4_image);
				$path = env('ASSETS_PATH').'/cms';
				$main_section4_image->move($path, $section4_image);
				$description['section4_image'] = '/cms/'.$section4_image;
			else:
				$description['section4_image'] = $cms->content['section4_image'] ?? '';
			endif;
			if($request->hasFile('section4_small_image')):
				$main_section4_small_image = $request->file('section4_small_image');
				if(isset($cms->content['section4_small_image']) && !empty($cms->content['section4_small_image'])):
					$image_name = $cms->content['section4_small_image'];
					File::delete(env('ASSETS_PATH').$image_name);
				endif;
				$section4_small_image = time() . '-' . $main_section4_small_image->getClientOriginalName();
				$section4_small_image = str_replace(' ', '_', $section4_small_image);
				$path = env('ASSETS_PATH').'/cms';
				$main_section4_small_image->move($path, $section4_small_image);
				$description['section4_small_image'] = '/cms/'.$section4_small_image;
			else:
				$description['section4_small_image'] = $cms->content['section4_small_image'] ?? '';
			endif;
			## Retailer Section End

			//SEO Section Start
			$description['meta_title'] = $request->meta_title ?? "";
			$description['meta_keyword'] = $request->meta_keyword ?? "";
			$description['meta_description'] = $request->meta_description ?? ""; 
			//SEO Section End

			$cms->content = $description;
			$cms->save();
			return redirect($this->actionURL.'/edit/'.$slug)->with( 'success', Lang::get('message.detailUpdated', [ 'section' => $this->section ]));
		} catch (\Throwable $th) {
			return redirect($this->actionURL.'/edit/'.$slug)->with( 'error', Lang::get('message.somethingWrong', [ 'section' => $this->singleSection ]));
		}
    }

	public function updatetermsandconditions(Request $request,$slug="") {
		try {
			$cms = CMSModel::where('Slug',$slug)->first();
			$description=array(
				'main_title'=>$request->input('main_title'),
				'main_content'=>$request->input('main_content'),
				'meta_title' => $request->input('meta_title'),
				'meta_keyword' => $request->input('meta_keyword'),
				'meta_description' => $request->input('meta_description'));

			//SEO Section Start
			$description['meta_title'] = $request->meta_title ?? "";
			$description['meta_keyword'] = $request->meta_keyword ?? "";
			$description['meta_description'] = $request->meta_description ?? ""; 
			//SEO Section End

			$cms->content = $description;
			$cms->save();
			return redirect($this->actionURL.'/edit/'.$slug)->with( 'success', Lang::get('message.detailUpdated', [ 'section' => $this->section ]));
		} catch (\Throwable $th) {
			return redirect($this->actionURL.'/edit/'.$slug)->with( 'error', Lang::get('message.somethingWrong', [ 'section' => $this->singleSection ]));
		}
	}

	public function updateaboutus(Request $request,$slug="")
	{
		try {
			$cms = CMSModel::where('Slug',$slug)->first();
			$description = [];

			## Main Section Start
			$description['section1_main_title'] = $request->section1_main_title ?? "";
			$description['section1_title'] = $request->section1_title ?? "";
			$description['section1_description'] = $request->section1_description ?? "";
			// List Item 1
			$description['section1_list_title1'] = $request->section1_list_title1 ?? "";
			$description['section1_list_description1'] = $request->section1_list_description1 ?? "";
			if($request->hasFile('section1_list_image1')):
				$main_section1_list_image1 = $request->file('section1_list_image1');
				if(isset($cms->content['section1_list_image1']) && !empty($cms->content['section1_list_image1'])):
					$image_name = $cms->content['section1_list_image1'];
					File::delete(env('ASSETS_PATH').$image_name);
				endif;
				$section1_list_image1 = time() . '-' . $main_section1_list_image1->getClientOriginalName();
				$section1_list_image1 = str_replace(' ', '_', $section1_list_image1);
				$path = env('ASSETS_PATH').'/cms';
				$main_section1_list_image1->move($path, $section1_list_image1);
				$description['section1_list_image1'] = '/cms/'.$section1_list_image1;
			else:
				$description['section1_list_image1'] = $cms->content['section1_list_image1'] ?? '';
			endif;
			// List Item 2
			$description['section1_list_title2'] = $request->section1_list_title2 ?? "";
			$description['section1_list_description2'] = $request->section1_list_description2 ?? "";
			if($request->hasFile('section1_list_image2')):
				$main_section1_list_image2 = $request->file('section1_list_image2');
				if(isset($cms->content['section1_list_image2']) && !empty($cms->content['section1_list_image2'])):
					$image_name = $cms->content['section1_list_image2'];
					File::delete(env('ASSETS_PATH').$image_name);
				endif;
				$section1_list_image2 = time() . '-' . $main_section1_list_image2->getClientOriginalName();
				$section1_list_image2 = str_replace(' ', '_', $section1_list_image2);
				$path = env('ASSETS_PATH').'/cms';
				$main_section1_list_image2->move($path, $section1_list_image2);
				$description['section1_list_image2'] = '/cms/'.$section1_list_image2;
			else:
				$description['section1_list_image2'] = $cms->content['section1_list_image2'] ?? '';
			endif;
			## Main Section End

			## About Tagline Section Start
			$description['section2_main_title'] = $request->section2_main_title ?? "";
			$description['section2_description'] = $request->section2_description ?? "";
			$description['section2_quote'] = $request->section2_quote ?? "";
			if($request->hasFile('section2_image')):
				$main_section2_image = $request->file('section2_image');
				if(isset($cms->content['section2_image']) && !empty($cms->content['section2_image'])):
					$image_name = $cms->content['section2_image'];
					File::delete(env('ASSETS_PATH').$image_name);
				endif;
				$section2_image = time() . '-' . $main_section2_image->getClientOriginalName();
				$section2_image = str_replace(' ', '_', $section2_image);
				$path = env('ASSETS_PATH').'/cms';
				$main_section2_image->move($path, $section2_image);
				$description['section2_image'] = '/cms/'.$section2_image;
			else:
				$description['section2_image'] = $cms->content['section2_image'] ?? '';
			endif;
			## About Tagline Section End

			//SEO Section Start
			$description['meta_title'] = $request->meta_title ?? "";
			$description['meta_keyword'] = $request->meta_keyword ?? "";
			$description['meta_description'] = $request->meta_description ?? ""; 
			//SEO Section End

			$cms->content = $description;
			$cms->save();
			return redirect($this->actionURL.'/edit/'.$slug)->with( 'success', Lang::get('message.detailUpdated', [ 'section' => $this->section ]));
		} catch (\Throwable $th) {
			return redirect($this->actionURL.'/edit/'.$slug)->with( 'error', Lang::get('message.somethingWrong', [ 'section' => $this->singleSection ]));
		}
	}

	public function updateContactUs(Request $request,$slug="") {
		try {
			$cms = CMSModel::where('Slug',$slug)->first();
			$description=array(
				'main_title'=>$request->input('main_title')
			);

			//SEO Section Start
			$description['meta_title'] = $request->meta_title ?? "";
			$description['meta_keyword'] = $request->meta_keyword ?? "";
			$description['meta_description'] = $request->meta_description ?? ""; 
			//SEO Section End

			$cms->content = $description;
			$cms->save();
			return redirect($this->actionURL.'/edit/'.$slug)->with( 'success', Lang::get('message.detailUpdated', [ 'section' => $this->section ]));
		} catch (\Throwable $th) {
			return redirect($this->actionURL.'/edit/'.$slug)->with( 'error', Lang::get('message.somethingWrong', [ 'section' => $this->singleSection ]));
		}
	}

	public function updatePrivacyPolicy(Request $request,$slug="")
	{
		try {
			$cms = CMSModel::where('Slug',$slug)->first();
			$description=array(
				'main_title'=>$request->input('main_title'),
				'main_content'=>$request->input('main_content'),
				'meta_title' => $request->input('meta_title'),
				'meta_keyword' => $request->input('meta_keyword'),
				'meta_description' => $request->input('meta_description'));

			//SEO Section Start
			$description['meta_title'] = $request->meta_title ?? "";
			$description['meta_keyword'] = $request->meta_keyword ?? "";
			$description['meta_description'] = $request->meta_description ?? ""; 
			//SEO Section End

			$cms->content = $description;
			$cms->save();
			return redirect($this->actionURL.'/edit/'.$slug)->with( 'success', Lang::get('message.detailUpdated', [ 'section' => $this->section ]));
		} catch (\Throwable $th) {
			return redirect($this->actionURL.'/edit/'.$slug)->with( 'error', Lang::get('message.somethingWrong', [ 'section' => $this->singleSection ]));
		}
	}
}
