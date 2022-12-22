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
                    {{-- <div class="col-lg-12">
                        <div class="form-group mb-2">
                            <div class="d-flex align-items-center">
                                <label class="col-form-label fs-14 mw-180">User <span class="float-end me-3">:</span></label>
                                <p class="mb-0">{{ $data->Retailer->FullName ?? '' }}</p>
                            </div>                                
                        </div>
                    </div> --}}
                    <div class="col-lg-12">
                        <div class="form-group mb-2">
                            <div class="d-flex align-items-center">
                                <label class="col-form-label fs-14 mw-180">Product Name <span class="float-end me-3">:</span></label>
                                <p class="mb-0">{{ $data->product->title ?? '' }}</p>
                            </div>                            
                        </div>
                    </div>
                    <div class="col-lg-12">
                        <div class="form-group mb-2">
                            <div class="d-flex align-items-center">
                                <label class="col-form-label fs-14 mw-180">Brand Name <span class="float-end me-3">:</span></label>
                                <p class="mb-0">{{ $data->Brand->FullName ?? '' }}</p>
                            </div>                            
                        </div>
                    </div>
                    <div class="col-lg-12">
                        <div class="form-group mb-2">
                            <div class="d-flex align-items-center">
                                <label class="col-form-label fs-14 mw-180">Retailer Name <span class="float-end me-3">:</span></label>
                                <p class="mb-0">{{ $data->Retailer->FullName ?? '' }}</p>
                            </div>                            
                        </div>
                    </div>
                    <div class="col-lg-12">
                        <div class="form-group mb-2">
                            <div class="d-flex align-items-center">
                                <label class="col-form-label fs-14 mw-180">Type Name <span class="float-end me-3">:</span></label>
                                <p class="mb-0">{{ $data->type ?? '' }}</p>
                            </div>                            
                        </div>
                    </div>
                    <div class="col-lg-12">
                        <div class="form-group mb-2">
                            <div class="d-flex align-items-center">
                                <label class="col-form-label fs-14 mw-180">Ratings <span class="float-end me-3">:</span></label>
                                <p class="mb-0">{{ $data->ratings}} stars</p>                                
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-12">
                        <div class="form-group mb-2">
                            <div class="d-flex align-items-center">
                                <label class="col-form-label fs-14 mw-180">Description <span class="float-end me-3">:</span></label>
                                <p class="mb-0">{{ $data->description ?? ''}}</p>                                
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-lg-12">
                        <div class="form-group mb-2">
                            <div class="d-flex align-items-center">
                                <label class="col-form-label fs-14 mw-180">Rating Date <span class="float-end me-3">:</span></label>
                                <p class="mb-0">{{ _nice_date($data->createdAt) ?? '' }}</p>
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

                {{-- {!! Form::open(['url'=>url($actionURL),'method'=>'get','id'=>'reviewFilter']) !!}
                    <div class="row justify-content-lg-end">
                        <div class="col-auto ali pt-2">
                            <div class="col-form-label fs-14">Filter: </div>
                        </div>
                        <div class="col-12 col-md-4 col-sm-12 col-lg-3 mb-3">
                            <input type="text" name="filter" value="{{ $data['filter'] ?? '' }}" class="form-control fs-14" placeholder="Search Here">
                        </div>
                        <div class="col-sm-auto col mb-3">
                        <div class="form-group mb-2">
                            <button type="submit" data-toggle="tooltip" title="Filter" class="btn btn-primary btn-wh-50-46"><i class="fas fa-filter"></i></button>
                            @if( isset($data['filter']) && !empty($data['filter']) )
                                <a href="{{ url('review') }}" data-toggle="tooltip" title="Clear" class="btn btn-rounded btn-secondary1 btn-wh-50-46"><i class="fas fa-times-circle"></i></a>
                            @endif
                        </div>
                    </div>
                    </div>
                {!! Form::close() !!} --}}

                <div class="tbl-rounded">
                    <div class="tbl-body">
                        <div class="table-responsive1">
                            <table class="table  fs-14 reflow-tbl">
                                <thead>
                                    <tr class="bg-color-191919">
                                        <th>Product Name</th>
                                        <th>Retailer</th>
                                        <th>Brand</th>
                                        <th>Type</th>
                                        <th>Ratings</th>
                                        <th>Rating Date</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @if (isset($reviews) && count($reviews) > 0)
                                        @foreach ($reviews as $review)
                                            <tr>
                                                <td>{{ $review->product->title ?? '' }}</td>
                                                <td>{{ $review->Retailer->FullName ?? '' }}</td>
                                                <td>{{ $review->Brand->FullName ?? '' }}</td>
                                                <td>{{ $review->type ?? '' }}</td>
                                                <td>{{ $review->ratings ?? '' }}</td>
                                                <td>{{ _nice_date($review->createdAt) ?? '' }}</td>
                                                {{--<td>{{ $review->isActive=='1' ? 'Active' : 'Inactive' }}</td>--}}
                                                <td>
                                                    <div class="d-flex text-center">
                                                        @if($review->isActive=='1')
                                                            <a title="Make Inactive" href="{{url($actionURL.'/action/makeInactive/'.$review->id)}}"><i class="fas fa-check fs-18 text-success"></i></a>
                                                        @else
                                                            <a title="Make Active" href="{{url($actionURL.'/action/makeActive/'.$review->id)}}"><i class="fas fa-times-circle fs-18 color-0799c4"></i></a>
                                                        @endif
                                                        <span class="mx-1">|</span>
                                                        <a title="Details" href="{{url($actionURL.'/detail/'.$review->id)}}"><i class="fa fa-eye text-success fs-18"></i> </a>
                                                        <span class="mx-1">|</span>
                                                        <a title="Delete" href="javascript:void(0)" onclick="gmx_modal.confirmModal('{{ url($actionURL.'/action/delete/'.$review->id) }}');"><i class="fas fa-trash-alt fs-18 text-danger"></i>
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
                    {{ $reviews->links() }}
                </div>
            </div>
        </div>
    </div>
@endif
@stop
@section('js')
@stop