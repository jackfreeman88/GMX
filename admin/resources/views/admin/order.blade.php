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
    {!! Form::open(['url'=>url($actionURL.'/action',$view).'/'.$id,'files'=>true,'id'=>'reviewform']) !!}
    <div class="card bs-4 mb-3 card-dark">
        <div class="card-body">
            <div class="form-wrap">
                <div class="col-lg-12">
                <div class="fs-20 color-white fw-600">{{ ucfirst($singleSection) }} {{ ucfirst($view) }}</div>
                <hr class="mt-1 mb-2">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="form-group mb-2">
                            <div class="d-flex align-items-center">
                                <label class="col-form-label fs-14 mw-180">order <span class="float-end me-3">:</span></label>
                                <p class="mb-0">#{{ $data->orderId ?? '' }}</p>
                            </div>                                
                        </div>
                    </div>
                    <div class="col-lg-12">
                        <div class="form-group mb-2">
                            <div class="d-flex align-items-center">
                                <label class="col-form-label fs-14 mw-180">Brand <span class="float-end me-3">:</span></label>
                                <p class="mb-0">{{ $data->Brand->FullName ?? '' }}</p>
                            </div>                                
                        </div>
                    </div>
                    <div class="col-lg-12">
                        <div class="form-group mb-2">
                            <div class="d-flex align-items-center">
                                <label class="col-form-label fs-14 mw-180">Retailer <span class="float-end me-3">:</span></label>
                                <p class="mb-0">{{ $data->Retailer->FullName ?? '' }}</p>
                            </div>                                
                        </div>
                    </div>
                    <div class="col-lg-12">
                        <div class="form-group mb-2">
                            <div class="d-flex align-items-center">
                                <label class="col-form-label fs-14 mw-180">Product Name <span class="float-end me-3">:</span></label>
                                <p class="mb-0">{{ $data->Product->title ?? '' }}</p>
                            </div>                            
                        </div>
                    </div>
                    <div class="col-lg-12">
                        <div class="form-group mb-2">
                            <div class="d-flex align-items-center">
                                <label class="col-form-label fs-14 mw-180">category<span class="float-end me-3">:</span></label>
                                <p class="mb-0">{{ $data->Category->title ?? '' }}</p>
                            </div>                            
                        </div>
                    </div>
                    <div class="col-lg-12">
                        <div class="form-group mb-2">
                            <div class="d-flex align-items-center">
                                <label class="col-form-label fs-14 mw-180">Quantity <span class="float-end me-3">:</span></label>
                                <p class="mb-0">{{ $data->quantity ?? '' }}</p>
                            </div>                            
                        </div>
                    </div>
                    <div class="col-lg-12">
                        <div class="form-group mb-2">
                            <div class="d-flex align-items-center">
                                <label class="col-form-label fs-14 mw-180">Amount <span class="float-end me-3">:</span></label>
                                <p class="mb-0">{{ _price($data->amount) ?? '' }}</p>
                            </div>                            
                        </div>
                    </div>
                    <div class="col-lg-12">
                        <div class="form-group mb-2">
                            <div class="d-flex align-items-center">
                                <label class="col-form-label fs-14 mw-180">Total <span class="float-end me-3">:</span></label>
                                <p class="mb-0">{{ _price($data->total) ?? '' }}</p>
                            </div>                            
                        </div>
                    </div>
                    <div class="col-lg-12">
                        <div class="form-group mb-2">
                            <div class="d-flex align-items-center">
                                <label class="col-form-label fs-14 mw-180">Status <span class="float-end me-3">:</span></label>
                                <p class="mb-0">{{ $data->StatusText ?? '' }}</p>
                            </div>                            
                        </div>
                    </div>
                    @if(isset($data->status) && $data->status == 3)
                        <div class="col-lg-12">
                            <div class="form-group mb-2">
                                <div class="d-flex align-items-center">
                                    <label class="col-form-label fs-14 mw-180">Order Cancelled By <span class="float-end me-3">:</span></label>
                                    <p class="mb-0">{{ $data->User->FullName ?? '' }}</p>
                                </div>                            
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <div class="form-group mb-2">
                                <div class="d-flex align-items-center">
                                    <label class="col-form-label fs-14 mw-180">Order Cancelled At <span class="float-end me-3">:</span></label>
                                    <p class="mb-0">{{ _nice_date($data->cancelledAt) ?? '' }}</p>
                                </div>                            
                            </div>
                        </div>
                    @endif
                </div>
                {{-- <div class="btn btn-rounded-wrap btn-group-left-right d-flex flex-wrap justify-content-between">
                    <a href="{{ url($actionURL) }}" class="btn btn-rounded btn-outline-danger btn-wh-145-45 mr-2">Cancel</a>
                    <button type="submit" class="btn btn-rounded btn-outline-primary btn-wh-145-45">Save</button>
                </div> --}}
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

                {!! Form::open(['url'=>url($actionURL),'method'=>'get','id'=>'orderfilter']) !!}
                    <div class="row justify-content-lg-end">
                      <!--   <div class="col-auto ali pt-2">
                            <div class="col-form-label fs-14">Filter: </div>
                        </div> -->
                        <!-- <div class="col-12 col-md-4 col-sm-12 col-lg-3 mb-3">
                            <input type="text" name="filter" value="{{ $data['filter'] ?? '' }}" class="form-control fs-14" placeholder="Search Here">
                        </div> -->
                        <div class="col-12 col-md-4 col-sm-12 col-lg-3 mb-3">
                            <input type="text" name="date_filter" id="date_filter" class="form-control datepicker" placeholder="Filter Date" @if(isset($data['date_filter']) && !empty($data['date_filter'])) value="{{ $data['date_filter'] }}" @endif>
                        </div>
                        <div class="col-12 col-md-4 col-sm-12 col-lg-2 mb-3">
                            <select class="form-control" id="status" name="status"  data-select2init="true" data-placeholder="Select Status">
                                <option value="">Select Status</option>
                                @foreach ($statuses as $key=>$status)
                                    <option value="{{$key}}" @if(isset($data['status']) && !empty($data['status']) && $data['status'] == $key) selected @endif>{{$status}}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="col-12 col-md-4 col-sm-12 col-lg-3 mb-3">
                            <select class="form-control" id="brand" name="brand"  data-select2init="true" data-placeholder="Select Brand">
                                <option value="">Select Brand</option>
                                @foreach ($brands as $brand)
                                    <option value="{{$brand->id}}" @if(isset($data['brand']) && !empty($data['brand']) && $data['brand'] == $brand->id) selected @endif>{{$brand->businessName}}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="col-12 col-md-4 col-sm-12 col-lg-3 mb-3">
                            <select class="form-control" id="retailer" name="retailer"  data-select2init="true" data-placeholder="Select Retailer">
                                <option value="">Select Retailer</option>
                                @foreach ($retailers as $retailer)
                                    <option value="{{$retailer->id}}" @if(isset($data['retailer']) && !empty($data['retailer']) && $data['retailer'] == $retailer->id) selected @endif>{{$retailer->businessName}}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="col-sm-auto col mb-3">
                        <div class="form-group mb-2">
                            <button type="submit" data-toggle="tooltip" title="Filter" class="btn btn-primary btn-wh-50-46"><i class="fas fa-filter"></i></button>
                            @if((isset($data['date_filter']) && !empty($data['date_filter'])) || (isset($data['status']) && !empty($data['status'])) || (isset($data['brand']) && !empty($data['brand'])) || (isset($data['retailer']) && !empty($data['retailer'])))
                                <a href="{{ url($actionURL) }}" data-toggle="tooltip" title="Clear" class="btn btn-rounded btn-secondary1 btn-wh-50-46"><i class="fas fa-times-circle"></i></a>
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
                                        <th>#</th>
                                        <th>Brand</th>
                                        <th>Retailer</th>
                                        <th>Product</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                        <th>Order Date</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @if (isset($orders) && count($orders) > 0)
                                        @foreach ($orders as $order)
                                            <tr>
                                                <td>#{{ $order->orderId ?? '' }}</td>
                                                <td>
                                                    <a title="Details" href="{{url(env('FRONTEND_BASE_URL').'/brand/'.$order->Brand->slug)}}" target="_blank">{{ $order->Brand->FullName ?? '' }}</a>
                                                </td>
                                                <td>
                                                    <a title="Details" href="{{url(env('FRONTEND_BASE_URL').'/customer/'.$order->Retailer->slug)}}" target="_blank">{{ $order->Retailer->FullName ?? '' }}</a>
                                                </td>
                                                <td>
                                                    <a title="Details" href="{{url(env('FRONTEND_BASE_URL').'/product/'.$order->Product->slug)}}" target="_blank">{{ $order->Product->title ?? '' }}</a>
                                                </td>
                                                <td>{{ $order->quantity ?? '' }}</td>
                                                <td>{{ _price($order->amount) ?? '' }}</td>
                                                <td>{{ _nice_date($order->createdAt) ?? '' }}</td>
                                                <td>
                                                    <div class="d-flex text-center">
                                                        <a title="Details" href="{{url($actionURL.'/detail/'.$order->id)}}"><i class="fa fa-eye text-success fs-18"></i> </a>
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
                    {{ $orders->links() }}
                </div>
            </div>
        </div>
    </div>
@endif
@stop
@section('js')
<script>
    $(function(){
        $("#date_filter").flatpickr({
            position:"bottom",
            mode: "range",
            dateFormat: "Y-m-d",
            disableMobile: true
        });
    });
</script>
@stop