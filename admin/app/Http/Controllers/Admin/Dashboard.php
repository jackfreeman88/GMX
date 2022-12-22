<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User as UserModel;
use App\Models\Product as ProductModel;
use App\Models\Order as OrderModel;
use Illuminate\Support\Facades\DB;

class Dashboard extends Controller
{
    protected $viewPath;
    protected $actionURL;

	public function __construct()
    {
        $this->viewPath = 'admin';
        $this->actionURL = 'dashboard';
    }
    public function index() {
    	$pass_array = array(
			'_meta_title' => "Dashboard",
			'_meta_keyword' => "Dashboard",
			'_meta_description' => "Dashboard",
		);
		$userCount = UserModel::where('isActive',1)->where('role','!=',1)->count();
		$brandCount = UserModel::where('isActive',1)->where('role',2)->count();
		$retailerCount = UserModel::where('isActive',1)->where('role',3)->count();
		$productCount = ProductModel::where('isActive',1)->count();
		$orderInfo = OrderModel::select( DB::raw('IFNULL(SUM(quantity),0) as total_sold_qty, IFNULL(SUM(total),0) as total_order_cost'))->where('status','6')->where('isActive',1)->first();
		$pass_array['userCount'] = $userCount ?? 0;
		$pass_array['brandCount'] = $brandCount ?? 0;
		$pass_array['retailerCount'] = $retailerCount ?? 0;
		$pass_array['productCount'] = $productCount ?? 0;
		$pass_array['productSoldQTYCount'] = $orderInfo['total_sold_qty'];
		$pass_array['totalOrderCost'] = $orderInfo['total_order_cost'];
		return view($this->viewPath.'/dashboard', $pass_array );
	}
}
