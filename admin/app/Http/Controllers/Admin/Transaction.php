<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Request, Lang, DB;
use App\Models\Transaction as TransactionModel;

class Transaction extends Controller
{
    protected $section;
	protected $singleSection;
	protected $viewPath;
	protected $actionURL;

	public function __construct(){
        $this->section = 'transactions';
		$this->singleSection = 'transaction';
		$this->viewPath = 'admin/transaction';
		$this->actionURL = 'transaction';
	}

	public function index(Request $request) {
        $data = Request::all();
        if(isset($data['filter']) && !empty($data['filter']) ):
            $filterdate = explode(' to ', $data['filter']);
            $from = date($filterdate[0]);
            if(count($filterdate) == 2):
                $to = date($filterdate[1]);
                $transactions = TransactionModel::whereDate('createdAt', '>=', $from)->whereDate('createdAt', '<=', $to)->paginate(10);
            else:
                $transactions = TransactionModel::where('createdAt', 'LIKE', '%'.$data['filter'].'%')->paginate(10);
            endif;
        else:
            $transactions = TransactionModel::paginate(10);
        endif;

		$_data=array(
            '_meta_title' => "Transactions",
            '_meta_keyword' => "Transactions",
            '_meta_description' => "Transactions",
            'section'=>$this->section,
			'singleSection'=>$this->singleSection,
            'actionURL'=>$this->actionURL,
            'view'=>"list",
			'transactions'=>$transactions,
            'data' => $data,
        );

        return view($this->viewPath, $_data);
    }

    public function Add(){
        $_data=array(
            '_meta_title' => "Add Transaction",
            '_meta_keyword' => "Add Transaction",
            '_meta_description' => "Add Transaction",
            'section'=>$this->section,
            'singleSection'=>$this->singleSection,
            'actionURL'=>$this->actionURL,
            'view'=>"add",
        );
        return view($this->viewPath, $_data);
    }

    public function Details($id="") {
        $data = TransactionModel::where("id", $id)->first();
        if(isset($data) && !empty($data)):
            $_data=array(
                '_meta_title' => "View Transactions",
                '_meta_keyword' => "View Transactions",
                '_meta_description' => "View Transactions",
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

    public function invoicePDF($transaction_id)
    {
        $transaction = TransactionModel::where("id", $transaction_id)->first();
        if(isset($transaction) && !empty($transaction)):
            $pass_array=array(
                'section'=>$this->section,
                'singleSection'=>$this->singleSection,
                'actionURL'=>$this->actionURL,
                'view'=>"Details",
                'transaction'=>$transaction,
            );
            $pdf = \App::make('dompdf.wrapper');
            $pdf->loadView('admin/invoice',$pass_array);
            $invoice_name =  rand();
            return $pdf->download('invoice_'.$invoice_name.'.pdf');
        else:
            return redirect($this->actionURL)->with('error', Lang::get('message.noData', [ 'section' => $this->singleSection ]));
        endif;
    }
}
