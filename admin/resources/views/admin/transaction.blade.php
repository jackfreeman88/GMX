@extends('admin.app.index')
@section('css')
@stop
@section('content')
@if($view=="Details")
<div class="user-wrap">
    @if(isset($data->id)) 
        @php $id = $data->id @endphp
    @else 
        @php $id = 0 @endphp
    @endif
    {!! Form::open(['url'=>url($actionURL.'/action',$view).'/'.$id,'files'=>true,'id'=>'transactionform']) !!}
    <div class="card bs-4 mb-3 card-dark">
        <div class="card-body">
            <div class="form-wrap">
                <div class="col-lg-12">
                    <div class="d-flex align-items-center justify-content-between flex-wrap">
                        <div class="fs-20 color-white fw-600 mb-3">{{ ucfirst($view) }} {{ ucfirst($singleSection) }}</div>
                        <div class="fs-16 fw-300 color-white align-left mb-3">
                            <a title="Details" href="{{url($actionURL.'/invoice/'.$data['id'])}}" class="color-099f00 fw-500">
                                <span class="fs-24 me-2 v-align-middle"><i class="fas fa-file-download"></i></span>Download Invoice 
                            </a>                            
                        </div>
                    </div>
                    <hr class="mt-1 mb-2">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="form-group mb-2">
                                <div class="d-flex align-items-center">
                                    <label class="col-form-label fs-14 mw-180">User Name <span class="float-end me-3">:</span></label>
                                    <p class="mb-0">{{ $data->User->FullName ?? '' }}</p>
                                </div>                            
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <div class="form-group mb-2">
                                <div class="d-flex align-items-center">
                                    <label class="col-form-label fs-14 mw-180">Subscription <span class="float-end me-3">:</span></label>
                                    <p class="mb-0">{{ $data->Plan->title ?? ''}}</p>
                                </div>                                
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <div class="form-group mb-2">
                                <div class="d-flex align-items-center">
                                    <label class="col-form-label fs-14 mw-180">Customer Id <span class="float-end me-3">:</span></label>
                                    <p class="mb-0">{{ $data->customerId}}</p>                                
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <div class="form-group mb-2">
                                <div class="d-flex align-items-center">
                                    <label class="col-form-label fs-14 mw-180">Subscription Token <span class="float-end me-3">:</span></label>
                                    <p class="mb-0">{{ $data->subscriptionToken ?? ''}}</p>                                
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <div class="form-group mb-2">
                                <div class="d-flex align-items-center">
                                    <label class="col-form-label fs-14 mw-180">Subscription Id <span class="float-end me-3">:</span></label>
                                    <p class="mb-0">{{ $data->subscriptionId ?? ''}}</p>                            
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <div class="form-group mb-2">
                                <div class="d-flex align-items-center">
                                    <label class="col-form-label fs-14 mw-180">Price <span class="float-end me-3">:</span></label>
                                    <p class="mb-0">{{ _price($data->amount) ?? ''}}</p>                                
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <div class="form-group mb-2">
                                <div class="d-flex align-items-center">
                                    <label class="col-form-label fs-14 mw-180">Status <span class="float-end me-3">:</span></label>
                                    <p class="mb-0">{{ $data->status ?? ''}}</p>                                
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <div class="form-group mb-2">
                                <div class="d-flex align-items-center">
                                    <label class="col-form-label fs-14 mw-180">Start Date <span class="float-end me-3">:</span></label>
                                    <p class="mb-0">{{ _nice_date($data->startDate) ?? '' }}</p>
                                </div>                            
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <div class="form-group mb-2">
                                <div class="d-flex align-items-center">
                                    <label class="col-form-label fs-14 mw-180">End Date <span class="float-end me-3">:</span></label>
                                    <p class="mb-0">{{ _nice_date($data->endDate) ?? '' }}</p>
                                </div>                            
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <div class="form-group mb-2">
                                <div class="d-flex align-items-center">
                                    <label class="col-form-label fs-14 mw-180">Purchased Date <span class="float-end me-3">:</span></label>
                                    <p class="mb-0">{{ _nice_date($data->createdAt) ?? ''}}</p>
                                </div>                            
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <div class="form-group">
                                <div class="d-flex align-items-center">
                                    <label class="col-form-label fs-14 mw-180">Status<span class="float-end me-3">:</span></label>
                                    <p class="mb-0">
                                        @if( isset($data->isActive) && $data->isActive == '1' )
                                            Active
                                        @else
                                            Inactive
                                        @endif
                                    </p>                                
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {!! Form::close() !!}
</div>
@else
    <div class="user-wrap">
        <div class="card bs-4 mb-3 card-dark">
            <div class="card-body">
                <div class="row align-items-center mb-3">
                    <div class="col">
                        <div class="fs-18 fw-600 color-white"> {{ ucfirst($section) }} </div>
                    </div>
                </div>
                <hr class="mt-2 mb-3">

                {!! Form::open(['url'=>url($actionURL),'method'=>'get','id'=>'transactionFilter']) !!}
                    <div class="row justify-content-lg-end">
                        <div class="col-auto ali pt-2">
                            <div class="col-form-label fs-14">Filter: </div>
                        </div>
                        <div class="col-12 col-md-4 col-sm-12 col-lg-3 mb-3">
                            <input type="text" name="filter" id="filter" class="form-control datepicker" placeholder="Filter Date" @if(isset($data['filter']) && !empty($data['filter'])) value="{{ $data['filter'] }}" @endif>
                        </div>
                        <div class="col-sm-auto col mb-3">
                        <div class="form-group mb-2">
                            <button type="submit" data-toggle="tooltip" title="Filter" class="btn btn-primary btn-wh-50-46 br-6"><i class="fas fa-filter"></i></button>
                            @if( isset($data['filter']) && !empty($data['filter']) )
                                <a href="{{ url('transaction') }}" data-toggle="tooltip" title="Clear" class="btn btn-secondary1 btn-wh-50-46 br-6"><i class="fas fa-times-circle"></i></a>
                            @endif
                        </div>
                    </div>
                    </div>
                {!! Form::close() !!}

                <div class="tbl-rounded">
                    <div class="tbl-body">
                        <div class="table-responsive1">
                            <table class="table  fs-14 reflow-tbl">
                                <thead>
                                    <tr class="bg-color-191919">
                                        <th>User Name</th>
                                        <th>Subscription</th>
                                        <th>Subscription ID</th>
                                        <th>Status</th>
                                        <th>Purchase Date</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @if (isset($transactions) && count($transactions) > 0)
                                        @foreach ($transactions as $transaction)
                                            <tr>
                                                <td>{{ $transaction->User->FullName ?? '' }}</td>
                                                <td>{{ $transaction->Plan->title ?? '' }}</td>
                                                <td>{{ $transaction->subscriptionId ?? '' }}</td>
                                                <td>{{ $transaction->status ?? '' }}</td>
                                                <td>{{ _nice_date($transaction->createdAt) ?? '' }}</td>
                                                <td>
                                                    <div class="d-flex text-center">
                                                        <a title="Details" href="{{url($actionURL.'/detail/'.$transaction->id)}}"><i class="fa fa-eye text-success fs-18"></i> </a>
                                                        </a>
                                                        <span class="mx-1">|</span>
                                                        <a title="Details" href="{{url($actionURL.'/invoice/'.$transaction->id)}}"><i class="fas fa-download text-success fs-18"></i> </a>
                                                        </a>
                                                    </div>
                                                </td>
                                            </tr>
                                        @endforeach
                                    @else
                                        <tr><td colspan="10" align="center"><div class="alert alert-info text-center my-2" role="alert"> No record found. </div></td></tr>
                                    @endif
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="d-flex justify-content-end mt-4">
                    {{ $transactions->links() }}
                </div>
            </div>
        </div>
    </div>
@endif
@stop
@section('js')
<script>
    $(function(){
        $("#filter").flatpickr({
            position:"bottom",
            mode: "range",
            dateFormat: "Y-m-d",
            disableMobile: true
        });
    });
</script>
@stop