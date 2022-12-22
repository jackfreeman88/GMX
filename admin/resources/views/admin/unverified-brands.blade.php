@extends('admin.app.index')
@section('css')
<link href="{{$ADMIN_THEME_PATH}}/plugins/bootstrap-fileinput/bootstrap-fileinput.css" rel="stylesheet" type="text/css" />
@stop
@section('content')
@if($view=="view")
<div class="user-wrap">
    @if(isset($data->id)) 
        @php $id = $data->id @endphp
    @else 
        @php $id = 0 @endphp
    @endif
    {!! Form::open(['url'=>url($actionURL.'/action/approve').'/'.$id,'files'=>true,'id'=>'sallerform']) !!}
    <div class="card bs-4 mb-3 card-dark">
        <div class="card-body">
            <div class="form-wrap">
                <div class="col-lg-12">
                <div class="fs-20 color-white fw-600">{{ ucfirst($view) }} {{ ucfirst($singleSection) }}</div>
                <hr class="mt-1 mb-2">
                <div class="row">

                    <div class="col-lg-4">
                        <div class="col-form-label">Profile Image</div>
                        @if(isset($data->profilePath) && !empty($data->profilePath) )
                            @php $imageURL = env('ASSETS_URL').'/'.$data->profilePath @endphp
                        @else
                            @php $imageURL = env('ASSETS_URL').'/'.'image-default.png' @endphp
                        @endif
                        <img src="{{$imageURL}}" style="max-width: 100px" alt= />
                    </div>
                    <div class="col-lg-8">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="form-group">
                                    <label class="col-form-label fs-14"><b>Name: </b> </label>
                                    <label> {{ $data->businessName ?? '' }}</label>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-6">
                                <div class="form-group">
                                    <label class="col-form-label fs-14"><b>Email: </b> </label>
                                    <label> {{ $data->email ?? '' }}</label>
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="form-group">
                                    <label class="col-form-label fs-14"><b>Phone Number: </b> </label>
                                    <label> {{ $data->phoneNumber ?? '' }}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="fs-20 color-white fw-600">Brand Details</div>
                    <hr class="mt-1 mb-2">
                    @php 
                        $brandDetails = $data->BrandDetails;
                    @endphp
                    <div class="col-lg-12">
                        <div class="form-group">
                            <label class="col-form-label fs-14"><b>Brand Name: </b></label>
                            <label>{{ $data->brandName ?? '' }}</label>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="form-group">
                            <label class="col-form-label fs-14"><b>Website: </b></label>
                            <label>{{ $brandDetails->website ?? '' }}</label>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="form-group">
                            <label class="col-form-label fs-14"><b>Business Establishment Year: </b></label>
                            <label> {{ $brandDetails->year ?? '0' }}</label>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="form-group">
                            <label class="col-form-label fs-14"><b>Average Order Per Month: </b></label>
                            <label>{{ $brandDetails->avgOrder ?? '0' }}</label>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="form-group">
                            <label class="col-form-label fs-14"><b>License Number:</b> </label>
                            <label>{{ $data->licenseNumber ?? '' }}</label>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="form-group">
                            <label class="col-form-label fs-14"><b>License Type:</b> </label>
                            <label>{{ $data->license ? $data->license->title : '' }}</label>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="form-group">
                            <label class="col-form-label fs-14"><b>License Expire Date: </b> </label>
                            <label>{{ _nice_date($data->expirationDate) ?? '' }}</label>
                        </div>
                    </div>
                    <div class="col-lg-12">
                        <label class="col-form-label fs-14"><b>License Document :</b></label>
                        @if(isset($data->licensePath) && !empty($data->licensePath) )
                            @php $imageURL = $UPLOAD_PATH.'/saller/'.$data->licensePath @endphp
                            <a href="{{ $imageURL }}" class="color-f3772c curser-pointer ms-2">Download File</a>
                        @endif
                        {{-- <label class="btn btn-secondary form-label" for="document_upload">Choose File</label> --}}
                        {{-- <input accept="image/*,application/pdf" name="licenseDocument" type="file" id="document_upload" class="form-control"> --}}
                    </div>
                    <div class="col-lg-6">
                        <div class="form-group">
                            <label class="col-form-label fs-14"><b>State:</b></label>
                            <label>
                                @foreach($states as $key => $state)
                                    {{ $data->State->id == $state->id ? $state->name : '' }}
                                @endforeach
                            </label>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="form-group">
                            <label class="col-form-label fs-14"><b>Zip Code: </b> </label>
                            <label>{{ $data->zipCode ?? '' }}</label>
                        </div>
                    </div>
                    <div class="col-lg-12">
                        <div class="form-group">
                            <label class="col-form-label fs-14"><b>Address: </b> </label>
                            <label>{{ $brandDetails->address ?? '' }}</label>
                        </div>
                    </div>
                    <div class="col-lg-12">
                        <div class="form-group">
                            <label class="col-form-label fs-14"><b>Description:</b> </label>
                            <label>{{ $brandDetails->description ?? '' }}</label>
                        </div>
                    </div>
                    <div class="col-lg-12">
                        <div class="form-group">
                            <div>
                                <label class="col-form-label fs-14"><b>Status:</b></label>
                                {{ isset($data->isActive) && $data->isActive == '1' ? 'Active' : 'Inactive' }}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="btn btn-rounded-wrap btn-group-left-right d-flex flex-wrap justify-content-between">
                    <a href="{{ url($actionURL) }}" class="btn btn-rounded btn-outline-danger btn-wh-145-45 mr-2">Cancel</a>
                    <button type="submit" class="btn btn-rounded btn-outline-primary btn-wh-145-45">Approve</button>
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
                    {{--<div class="col-sm-auto">
                        <a href="{{ url($actionURL.'/add') }}" class="btn btn-rounded btn-primary btn-wh-190-45 fw-600"><i class="fas fa-plus-circle mr-2"></i> Add {{ ucfirst($singleSection) }}</a>
                    </div>--}}
                </div>
                <hr class="mt-2 mb-3">

                {!! Form::open(['url'=>url($actionURL),'method'=>'get','id'=>'sallerFilter']) !!}
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
                                <a href="{{ url('brands') }}" data-toggle="tooltip" title="Clear" class="btn btn-secondary1 btn-wh-50-46 br-6"><i class="fas fa-times-circle"></i></a>
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
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone Number</th>
                                        <th>State</th>
                                        <th>Status</th>
                                        <th width="120">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @if (isset($brands) && count($brands) > 0)
                                        @foreach ($brands as $brand)
                                            <tr>
                                                <td>{{ $brand->businessName ?? '' }}</td>
                                                <td>{{ $brand->email ?? '' }}</td>
                                                <td>{{ $brand->phoneNumber ?? '' }}</td>
                                                <td>{{ $brand->State->name ?? '' }}</td>
                                                <td>{{ ($brand->isActive=='1')?'Active':'Inactive' }}</td>
                                                <td>
                                                    <div class="d-flex text-center">
                                                        <a title="Approve" href="{{url($actionURL.'/action/approve/'.$brand->id)}}"><i class="fas fa-check fs-18 text-success"></i></a>
                                                        <span class="mx-1">|</span>
                                                        <a title="View" href="{{url($actionURL.'/view/'.$brand->id)}}"><i class="fas fa-eye text-success fs-18"></i> </a>
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
                    {{ $brands->links() }}
                </div>
            </div>
        </div>
    </div>
@endif
@stop
@section('js')
<script src="{{$ADMIN_THEME_PATH}}/plugins/bootstrap-fileinput/bootstrap-fileinput.js" type="text/javascript"></script>

@stop