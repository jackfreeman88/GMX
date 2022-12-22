@extends('admin.app.index')
@section('css')
@stop
@section('content')
@if($view=="add" || $view=="edit")
<div class="user-wrap">
    @if(isset($data->id)) 
        @php $id = $data->id @endphp
    @else 
        @php $id = 0 @endphp
    @endif
    {!! Form::open(['url'=>url($actionURL.'/action',$view).'/'.$id,'files'=>true,'id'=>'subscriptionForm']) !!}
    <div class="row">
        <div class="col-lg-12">
            <div class="card bs-4 mb-3 card-dark">
                <div class="card-body">
                    <div class="form-wrap">
                        <div class="col-lg-12">
                        <div class="fs-20 color-white fw-600">{{ ucfirst($view) }} {{ ucfirst($singleSection) }}</div>
                        <hr class="mt-1 mb-2">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="form-group">
                                    <label class="col-form-label fs-14">Title </label>
                                    <input type="text" name="title" value="{{ $data->title ?? '' }}" class="form-control fs-14" placeholder="Enter Title">
                                </div>
                            </div>
                            <div class="col-lg-12">
                                <div class="form-group">
                                    <label class="col-form-label fs-14">Description </label>
                                    <textarea name="description" id="description" class="form-control fs-14" placeholder="Enter Description">{{ $data->description ?? '' }}</textarea>
                                </div>
                            </div>
                            <div class="col-lg-12">
                                <div class="form-group">
                                    <label class="col-form-label fs-14">Price ($) </label>
                                    <input type="text" name="price" value="{{ _nice_amount($data->price) ?? '' }}" class="form-control fs-14 numbersOnly" placeholder="Enter Subscription Price">
                                </div>
                            </div>
                            <div class="col-lg-12">
                                <div class="form-group">
                                    <div>
                                        <label class="col-form-label fs-14">Status</label>
                                        <select class="form-control" id="isActive" name="isActive">
                                            <option value="1" @if( isset($data->isActive) && $data->isActive == '1' ) selected @endif>Active</option>
                                            <option value="2" @if( isset($data->isActive) && $data->isActive == '2' ) selected @endif>Inactive</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="btn btn-rounded-wrap btn-group-left-right d-flex flex-wrap justify-content-between">
                            <a href="{{ url($actionURL) }}" class="btn btn-rounded btn-outline-danger btn-wh-145-45 mr-2">Cancel</a>
                            <button type="submit" class="btn btn-rounded btn-outline-primary btn-wh-145-45">Save</button>
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

                {!! Form::open(['url'=>url($actionURL),'method'=>'get','id'=>'strainFilter']) !!}
                    <div class="row justify-content-lg-end">
                        <div class="col-auto ali pt-2">
                            <div class="col-form-label fs-14">Filter: </div>
                        </div>
                        <div class="col-12 col-md-4 col-sm-12 col-lg-3 mb-3">
                            <input type="text" name="filter" value="{{ $data['filter'] ?? '' }}" class="form-control fs-14" placeholder="Search Here">
                        </div>
                        <div class="col-sm-auto col mb-3">
                        <div class="form-group">
                            <button type="submit" data-toggle="tooltip" title="Filter" class="btn btn-primary btn-wh-50-46 br-6"><i class="fas fa-filter"></i></button>
                            @if( isset($data['filter']) && !empty($data['filter']) )
                                <a href="{{ url($actionURL) }}" data-toggle="tooltip" title="Clear" class="btn btn-secondary1 btn-wh-50-46 br-6"><i class="fas fa-times-circle"></i></a>
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
                                        <th>Title</th>
                                        <th>Price</th>
                                        <th>Status</th>
                                        <th width="120">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @if (isset($strains) && count($strains) > 0)
                                        @foreach ($strains as $strain)
                                            <tr>
                                                <td>{{ $strain->title ?? '' }}</td>
                                                <td>{{ _price($strain->price) ?? '' }}</td>
                                                <td>{{ ($strain->isActive=='1')?'Active':'Inactive' }}</td>
                                                <td>
                                                    <div class="d-flex text-center">
                                                        @if($strain->isActive=='1')
                                                            <a title="Make Inactive" href="{{url($actionURL.'/action/makeInactive/'.$strain->id)}}"><i class="fas fa-check fs-18 text-success"></i></a>
                                                        @else
                                                            <a title="Make Active" href="{{url($actionURL.'/action/makeActive/'.$strain->id)}}"><i class="fas fa-times-circle fs-18 color-0799c4"></i></a>
                                                        @endif
                                                        <span class="mx-1">|</span>
                                                        <a title="Edit" href="{{url($actionURL.'/edit/'.$strain->id)}}"><i class="fas fa-edit text-success fs-18"></i> </a>
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
                    {{ $strains->links() }}
                </div>
            </div>
        </div>
    </div>
@endif
@stop
@section('js')
@stop