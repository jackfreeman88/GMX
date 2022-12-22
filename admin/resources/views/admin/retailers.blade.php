@extends('admin.app.index')
@section('css')
<link href="{{$ADMIN_THEME_PATH}}/plugins/bootstrap-fileinput/bootstrap-fileinput.css" rel="stylesheet" type="text/css" />
@stop
@section('content')
@if($view=="add" || $view=="edit")
<div class="user-wrap">
    @if(isset($data->id)) 
        @php $id = $data->id @endphp
    @else 
        @php $id = 0 @endphp
    @endif
    {!! Form::open(['url'=>url($actionURL.'/action',$view).'/'.$id,'files'=>true,'id'=>'buyerform']) !!}
    <div class="card bs-4 mb-3 card-dark">
        <div class="card-body">
            <div class="form-wrap">
                <div class="col-lg-12">
                <div class="fs-20 color-white fw-600">{{ ucfirst($view) }} {{ ucfirst($singleSection) }}</div>
                <hr class="mt-1 mb-2">
                <div class="row">

                    <div class="col-lg-4">
                        @if(isset($data->profilePath) && !empty($data->profilePath) )
                            @php $imageURL = env('ASSETS_URL').'/'.$data->profilePath @endphp
                        @else
                            @php $imageURL = env('ASSETS_URL').'/'.'image-default.png' @endphp
                        @endif
                        <img src="{{$imageURL}}" style="max-width: 100px" alt= />
                    </div>
                    
                    <div class="col-lg-8">
                        <div class="col-lg-12">
                            <div class="form-group">
                                <label class="col-form-label fs-14">Business Name </label>
                                <input type="text" name="businessName" value="{{ $data->businessName ?? '' }}" class="form-control fs-14">
                            </div>
                        </div>
                        <!-- <div class="col-lg-12">
                            <div class="form-group">
                                <label class="col-form-label fs-14">Last Name </label>
                                <input type="text" name="lastName" value="{{ $data->lastName ?? '' }}" class="form-control fs-14">
                            </div>
                        </div> -->
                    </div>

                    <div class="col-lg-6">
                        <div class="form-group">
                            <label class="col-form-label fs-14">Email </label>
                            <input type="text" name="email" value="{{ $data->email ?? '' }}" class="form-control fs-14">
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="form-group">
                            <label class="col-form-label fs-14">Phone Number </label>
                            <input type="text" name="phoneNumber" value="{{ $data->phoneNumber ?? '' }}" class="form-control fs-14 numbersOnly">
                        </div>
                    </div>

                    <div class="col-lg-6">
                        <div class="form-group">
                            <label class="col-form-label fs-14">State </label>
                            <select class="form-control" id="state" name="state">
                                <option value="">Select Anyone</option>
                            @foreach($states as $key => $state)
                                <option value="{{ $state->id }}" @if( $data->State->id == $state->id ) selected @endif>{{$state->name}}</option>
                            @endforeach
                            </select>
                        </div>
                    </div>

                    <div class="col-lg-6">
                        <div class="form-group">
                            <label class="col-form-label fs-14">Zip Code </label>
                            <input type="text" name="zipCode" class="form-control fs-14 numbersOnly" value="{{ $data->zipCode ?? '' }}">
                        </div>
                    </div>
                    
                    <div class="col-lg-6">
                        <div class="form-group">
                            <label class="col-form-label fs-14">License Number </label>
                            <input type="text" name="licenseNumber" class="form-control fs-14" value="{{ $data->licenseNumber ?? '' }}">
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="form-group">
                            <label class="col-form-label fs-14">License Type </label>
                            <select class="form-control" id="medRec" name="medRec">
                                <option value="">Select Anyone</option>
                                @foreach($medRecs as $key => $medRec)
                                    <option value="{{ $medRec->id }}" @if( $data->medRecId == $medRec->id ) selected @endif>{{$medRec->title}}</option>
                                @endforeach
                            </select>
                        </div>
                    </div>

                    <div class="col-lg-12">
                        <div class="form-group">
                            <label class="col-form-label fs-14">Expiration Date </label>
                            <input type="text" name="expirationDate" class="form-control fs-14" value="{{ _nice_date($data->expirationDate) ?? '' }}">
                        </div>
                    </div>

                    <div class="col-lg-12">
                        <label class="col-form-label fs-14">License Document :</label>
                        @if(isset($data->licensePath) && !empty($data->licensePath) )
                            @php $imageURL = $UPLOAD_PATH.'/saller/'.$data->licensePath @endphp
                            <a href="{{ $imageURL }}" class="color-f3772c curser-pointer ms-2">Download File</a>
                        @endif
                        {{-- <label class="btn btn-secondary form-label" for="document_upload">Choose File</label> --}}
                        {{-- <input accept="image/*,application/pdf" name="licenseDocument" type="file" id="document_upload" class="form-control"> --}}
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
                    <div class="col-sm-auto">
                        {{--<a href="{{ url($actionURL.'/add') }}" class="btn btn-rounded btn-primary btn-wh-190-45 fw-600"><i class="fas fa-plus-circle mr-2"></i> Add {{ ucfirst($singleSection) }}</a>--}}
                    </div>
                </div>
                <hr class="mt-2 mb-3">

                {!! Form::open(['url'=>url($actionURL),'method'=>'get','id'=>'buyerFilter']) !!}
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
                                <a href="{{ url('retailers') }}" data-toggle="tooltip" title="Clear" class="btn btn-secondary1 btn-wh-50-46 br-6"><i class="fas fa-times-circle"></i></a>
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
                                        <th>Business Name</th>
                                        <th>Email</th>
                                        <th>Phone Number</th>
                                        <th>State</th>
                                        <th>Status</th>
                                        <th width="120">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @if (isset($retailers) && count($retailers) > 0)
                                        @foreach ($retailers as $retailer)
                                            <tr>
                                                <td>{{ $retailer->businessName ?? '' }}</td>
                                                <td>{{ $retailer->email ?? '' }}</td>
                                                <td>{{ $retailer->phoneNumber ?? '' }}</td>
                                                <td>{{ $retailer->State->name ?? '' }}</td>
                                                <td>{{ ($retailer->isActive=='1')?'Active':'Inactive' }}</td>
                                                <td>
                                                    <div class="d-flex text-center">
                                                        @if($retailer->isActive=='1')
                                                            <a title="Make Inactive" href="{{url($actionURL.'/action/makeInactive/'.$retailer->id)}}"><i class="fas fa-check fs-18 text-success"></i></a>
                                                        @else
                                                            <a title="Make Active" href="{{url($actionURL.'/action/makeActive/'.$retailer->id)}}"><i class="fas fa-times-circle fs-18 color-0799c4"></i></a>
                                                        @endif
                                                        <span class="mx-1">|</span>
                                                        <a title="Edit" href="{{url($actionURL.'/edit/'.$retailer->id)}}"><i class="fas fa-edit text-success fs-18"></i> </a>
                                                        {{-- <span class="mx-1">|</span>
                                                        <a title="Delete" href="javascript:void(0)" onclick="gmx_modal.confirmModal('{{ url($actionURL.'/action/delete/'.$retailer->id) }}');"><i class="fas fa-trash-alt fs-18 text-danger"></i>
                                                        </a> --}}
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
                    {{ $retailers->links() }}
                </div>
            </div>
        </div>
    </div>
@endif
@stop
@section('js')
<script src="{{$ADMIN_THEME_PATH}}/plugins/bootstrap-fileinput/bootstrap-fileinput.js" type="text/javascript"></script>

@stop