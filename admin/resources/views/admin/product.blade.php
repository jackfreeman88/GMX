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
    {!! Form::open(['url'=>url($actionURL.'/action',$view).'/'.$id,'files'=>true,'id'=>'productform']) !!}
    <div class="row">
        <div class="col-xl-12">
            <div class="card bs-4 mb-3 card-dark">
                <div class="card-body">
                    <div class="form-wrap">
                        <div class="col-lg-12">
                            <div class="fs-20 color-white fw-600">{{ ucfirst($view) }} {{ ucfirst($singleSection) }}</div>
                            <hr class="mt-1 mb-2">
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="form-group mb-2">
                                        <div class="d-flex align-items-center">
                                            <label class="col-form-label fs-14 mw-180">Title <span class="float-end me-3">:</span></label>
                                            <p class="mb-0">{{ $data->title ?? '' }}</p>
                                        </div>                            
                                    </div>
                                </div>
                                <div class="col-lg-12">
                                    <div class="form-group mb-2">
                                        <div class="d-flex align-items-center">
                                            <label class="col-form-label fs-14 mw-180">User <span class="float-end me-3">:</span></label>
                                            <p class="mb-0">{{ $data->user->firstName ?? '' }} {{ $data->user->lastName ?? ''}}</p>
                                        </div>                                
                                    </div>
                                </div>
                                <div class="col-lg-12">
                                    <div class="form-group mb-2">
                                        <div class="d-flex align-items-center">
                                            <label class="col-form-label fs-14 mw-180">Title <span class="float-end me-3">:</span></label>
                                            <p class="mb-0">{{ $data->title}}</p>                                
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-12">
                                    <div class="form-group mb-2">
                                        <div class="d-flex align-items-center">
                                            <label class="col-form-label fs-14 mw-180">Category <span class="float-end me-3">:</span></label>
                                            <p class="mb-0">{{ $data->category->title ?? ''}}</p>                                
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-12">
                                    <div class="form-group mb-2">
                                        <div class="d-flex align-items-center">
                                            <label class="col-form-label fs-14 mw-180">Med/Rec <span class="float-end me-3">:</span></label>
                                            <p class="mb-0">{{ $data->medRec->title ?? ''}}</p>                            
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-12">
                                    <div class="form-group mb-2">
                                        <div class="d-flex align-items-center">
                                            <label class="col-form-label fs-14 mw-180">Price <span class="float-end me-3">:</span></label>
                                            <p class="mb-0">{{ _price($data->price) ?? ''}}</p>                                
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-12">
                                    <div class="form-group mb-2">
                                        <div class="d-flex align-items-center">
                                            <label class="col-form-label fs-14 mw-180">Strain <span class="float-end me-3">:</span></label>
                                            <p class="mb-0">{{ $data->strain->title ?? ''}}</p>                                
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-12">
                                    <div class="form-group mb-2">
                                        <div class="d-flex align-items-center">
                                            <label class="col-form-label fs-14 mw-180">Dominant Terpene <span class="float-end me-3">:</span></label>
                                            <p class="mb-0">{{ $data->dominant ?? ''}}</p>
                                        </div>                            
                                    </div>
                                </div>
                                <div class="col-lg-12">
                                    <div class="form-group mb-2">
                                        <div class="d-flex align-items-center">
                                            <label class="col-form-label fs-14 mw-180">I/O <span class="float-end me-3">:</span></label>
                                            <p class="mb-0">{{ $data->ioro->title ?? ''}}</p>
                                        </div>                            
                                    </div>
                                </div>
                                <div class="col-lg-12">
                                    <div class="form-group mb-2">
                                        <div class="d-flex align-items-center">
                                            <label class="col-form-label fs-14 mw-180">Harvested <span class="float-end me-3">:</span></label>
                                            <p class="mb-0">{{ _nice_date($data->harvested) ?? ''}}</p>
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

                {!! Form::open(['url'=>url($actionURL),'method'=>'get','id'=>'productFilter']) !!}
                    <div class="row justify-content-lg-end">
                        <div class="col-auto ali pt-2">
                            <div class="col-form-label fs-14">Filter: </div>
                        </div>
                        <div class="col-12 col-md-4 col-sm-12 col-lg-3 mb-3">
                            <input type="text" name="filter" value="{{ $data['filter'] ?? '' }}" class="form-control fs-14" placeholder="Search Here">
                        </div>
                        <div class="col-sm-auto col mb-3">
                        <div class="form-group mb-2">
                            <button type="submit" data-toggle="tooltip" title="Filter" class="btn btn-primary btn-wh-50-46 br-6"><i class="fas fa-filter"></i></button>
                            @if( isset($data['filter']) && !empty($data['filter']) )
                                <a href="{{ url('product') }}" data-toggle="tooltip" title="Clear" class="btn btn-secondary1 btn-wh-50-46 br-6"><i class="fas fa-times-circle"></i></a>
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
                                        <th>Product Name</th>
                                        <th>Category</th>
                                        <th>Med/Rec</th>
                                       <!--  <th>Price Per lbl</th> -->
                                        <th>Strain</th>
                                        <th>THC%</th>
                                        <th>Flavor</th>
                                        <th>Dominant Terpene</th>
                                        <th>I/O</th>
                                        <th>Harvested</th>
                                        <th width="120">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @if (isset($products) && count($products) > 0)
                                        @foreach ($products as $product)
                                            <tr>
                                                <td>{{ $product->title ?? '' }}</td>
                                                <td>{{ $product->category->title ?? '' }}</td>
                                                <td>{{ $product->medRec->title ?? '' }}</td>
                                               <!--  <td>{{ _price($product->price) ?? '' }}</td> -->
                                                <td>{{ $product->strain->title ?? '' }}</td>
                                                <td>{{ $product->thc ?? '' }}%</td>
                                                <td>{{ $product->flavor ?? '' }}</td>
                                                <td>{{ $product->dominant ?? '' }}</td>
                                                <td>{{ $product->ioro->title ?? '' }}</td>
                                                <td>{{ _nice_date($product->harvested) ?? '' }}</td>
                                                <td>
                                                    <div class="d-flex text-center">
                                                        <a title="Details" href="{{url(env('FRONTEND_BASE_URL').'/product/'.$product->slug)}}" target="_blank"><i class="fa fa-eye text-success fs-18"></i> </a>
                                                        <span class="mx-1">|</span>
                                                        @if($product->isActive=='1')
                                                            <a title="Make Inactive" href="{{url($actionURL.'/action/makeInactive/'.$product->id)}}"><i class="fas fa-check fs-18 text-success"></i></a>
                                                        @else
                                                            <a title="Make Active" href="{{url($actionURL.'/action/makeActive/'.$product->id)}}"><i class="fas fa-times-circle fs-18 color-0799c4"></i></a>
                                                        @endif
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
                    {{ $products->links() }}
                </div>
            </div>
        </div>
    </div>
@endif
@stop
@section('js')
@stop