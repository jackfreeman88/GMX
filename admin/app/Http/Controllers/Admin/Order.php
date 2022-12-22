<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Request, Lang;
use App\Models\Order as OrderModel;
use App\Models\User as UserModel;
use Illuminate\Support\Facades\DB;

class Order extends Controller
{
    protected $section;
	protected $singleSection;
	protected $viewPath;
	protected $actionURL;

	public function __construct(){
        $this->section = 'Orders';
		$this->singleSection = 'Order';
		$this->viewPath = 'admin/order';
		$this->actionURL = 'orders';
	}

	public function index(Request $request) {
        $data = Request::all();
        // Filter List
        $brands = UserModel::join('orders', 'users.id', '=', 'orders.brandId')
            ->select('users.id', 'users.businessName')
            ->distinct()
            ->get();
        $retailers = UserModel::join('orders', 'users.id', '=', 'orders.retailerId')
            ->select('users.id','users.businessName')
            ->distinct()
            ->get();
        $statuses = _get_orders_statuses();
        // Filter Data
         /*if(isset($data['filter']) && !empty($data['filter'])):
            $search = $data['filter'];
            $orders = OrderModel::where( function( $query ) use ( $search ){
                $query->whereHas('Brand', function ( $subquery ) use ( $search ){
                    $subquery->where('businessName', 'LIKE', '%'.$search.'%');
                })
                ->orWhereHas('Retailer',function ( $subquery ) use ( $search ){
                    $subquery->where('businessName', 'LIKE', '%'.$search.'%');
                })
                ->orWhereHas('Product',function ( $subquery ) use ( $search ){
                    $subquery->where('title', 'LIKE', '%'.$search.'%');
                });
            })
            ->orwhere( function ( $query ) use ( $search ){
                $query->where('orderId', 'LIKE', '%'.$search.'%');
            })
            ->orwhere( function ( $query ) use ( $search ){
                $query->where('quantity', 'LIKE', '%'.$search.'%');
            })
            ->orwhere( function ( $query ) use ( $search ){
                $query->where('amount', 'LIKE', '%'.$search.'%');
            })->paginate(10);
        else*/
        $orders = new OrderModel;
        if(isset($data['date_filter']) && !empty($data['date_filter'])):
            $filterdate = explode(' to ', $data['date_filter']);
            $from = date($filterdate[0]);
            if(count($filterdate) == 2):
                $to = date($filterdate[1]);
                $orders = $orders->whereDate('createdAt', '>=', $from)->whereDate('createdAt', '<=', $to);
            else:
                $orders = $orders->where('createdAt', 'LIKE', '%'.$data['date_filter'].'%');
            endif;
        endif;
        if(isset($data['status']) && !empty($data['status'])):
            $orders = $orders->where('status', '=', $data['status']);
        endif;
        if(isset($data['brand']) && !empty($data['brand'])):
            $orders = $orders->where('brandId', '=', $data['brand']);
        endif;
        if(isset($data['retailer']) && !empty($data['retailer'])):
            $orders = $orders->where('retailerId', '=', $data['retailer']);
        endif;
        $orders = $orders->paginate(10);
		$_data=array(
            '_meta_title' => "Orders",
            '_meta_keyword' => "Orders",
            '_meta_description' => "Orders",
            'section'=>$this->section,
			'singleSection'=>$this->singleSection,
            'actionURL'=>$this->actionURL,
            'view'=>"list",
			'orders'=>$orders,
            'data' => $data,
            'brands' => $brands,
            'retailers' => $retailers,
            'statuses' => $statuses
        );

        return view($this->viewPath, $_data);
    }

    public function Details($id="") {
        $data = OrderModel::where("id", $id)->first();
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
}
