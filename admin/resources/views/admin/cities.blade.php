@extends('admin.app.index')
@section('css')
@stop
@section('content')
@if($view=="add" || $view=="edit")
<div class="user-wrap">
    @if(isset($data->id)) 
        @define $id = $data->id 
    @else 
        @define $id = 0 
    @endif
    {!! Form::open(['url'=>url($actionURL.'/action',$view).'/'.$id,'id'=>'cityform']) !!}
    <div class="card bs-4 mb-3 card-dark">
        <div class="card-body">
            <div class="form-wrap">
                <div class="col-lg-12">
                <div class="fs-20 color-white fw-600">{{ ucfirst($view) }} {{ ucfirst($singleSection) }}</div>
                <hr class="mt-1 mb-2">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="form-group">
                            <div>
                                <label class="col-form-label fs-14">Country</label>
                                <select class="form-control" id="country" name="country_id"  data-select2init="true" data-placeholder="Select country">
                                    <option value="">Select country</option>
                                    @foreach ($countries as $country)
                                        <option value="{{$country->id}}" @if( isset($data->country_id) && $data->country_id == $country->id ) selected @endif>{{$country->title}}</option>
                                    @endforeach
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-12">
                        <div class="form-group">
                            <div>
                                <label class="col-form-label fs-14">State</label>
                                <select class="form-control" id="state" name="state_id"  data-select2init="true" data-placeholder="Select state">
                                    <option value="">Select state</option>
                                    @if( !empty($data->country_id)) 
                                    @define $state_names = _get_states($data->country_id)
                                        @foreach($state_names as $state_name)
                                        <option value="{{$state_name->id}}" @if( isset($data->state_id) && $data->state_id == $state_name->id ) selected @endif>{{ $state_name->title }}</option>
                                        @endforeach
                                    @endif
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-12">
                        <div class="form-group">
                            <label class="col-form-label fs-14">City</label>
                            <input type="text" name="title" value="{{ $data->title ?? '' }}" class="form-control fs-14">
                        </div>
                    </div>
                    <div class="col-lg-12">
                        <div class="form-group">
                            <div>
                                <label class="col-form-label fs-14">Status</label>
                                <select class="form-control" id="status" name="status">
                                    <option value="1" @if( isset($data->status) && $data->status == '1' ) selected @endif>Active</option>
                                    <option value="2" @if( isset($data->status) && $data->status == '2' ) selected @endif>Inactive</option>
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
                        <a href="{{ url($actionURL.'/add') }}" class="btn btn-rounded btn-primary btn-wh-190-45 fw-600"><i class="fas fa-plus-circle mr-2"></i> Add {{ ucfirst($singleSection) }}</a>
                    </div>
                </div>
                <hr class="mt-2 mb-3">
                <div class="tbl-rounded">
                    <div class="tbl-body">
                        <div class="table-responsive1">
                            <table class="table  fs-14 reflow-tbl">
                                <thead>
                                    <tr class="bg-color-191919">
                                        <th>Country</th>
                                        <th>State</th>
                                        <th>City</th>
                                        <th>Status</th>
                                        <th width="180">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @if (isset($cities) && count($cities) > 0)
                                        @foreach ($cities as $city)
                                            <tr>
                                                <td>{{ $city->country->title ?? ''}}</td>
                                                <td>{{ $city->state->title ?? ''}}</td>
                                                <td>{{ $city->title ?? '' }}</td>
                                                <td>{{ ($city->status=='1')?'Active':'Inactive' }}</td>
                                                <td>
                                                    <div class="d-flex text-center">
                                                        @if ($city->status == '1')
                                                            <a title="Make Inactive" href="{{url($actionURL.'/action/makeInactive/'.$city->id)}}"><i class="fas fa-check fs-18 text-success"></i> </a>
                                                        @else
                                                            <a title="Make Active" href="{{url($actionURL.'/action/makeActive/'.$city->id)}}"><i class="fas fa-times-circle fs-18 color-0799c4"></i> </a>
                                                        @endif
                                                        <span class="mx-1">|</span>
                                                        <a title="Edit" href="{{url($actionURL.'/edit/'.$city->id)}}"><i class="fas fa-edit text-success fs-18"></i> </a>
                                                        <span class="mx-1">|</span>
                                                        <a title="Delete" href="javascript:void(0)" onclick="mechanech_modal.confirmModal('{{ url($actionURL.'/action/delete/'.$city->id) }}');"><i class="fas fa-trash-alt fs-18 text-danger"></i>
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
                    {{ $cities->links() }}
                </div>
            </div>
        </div>
    </div>
@endif
@endsection
@section('js')
@if($view=="add" || $view=="edit")
<script type="text/javascript">
    $(document).ready(function(){
        $("#country").change(function(){
            var country_id = $(this).val();
            var $state = $("#state");
            $state.empty(); // remove old options
            $state.append($('<option></option>').attr("value", "").text("Select state"));
            if(country_id != ""){ 
                gmx_app.ajaxRequest('{{url($getStateURL)}}/'+country_id, '','GET').then(function(res) {
                if(res.data.length > 0){
                    $.each(res.data, function(key,value) {
                        $state.append($("<option></option>")
                        .attr("value", value.id).text(value.title));
                    }); 
                }
                });}
           
        });
    });
</script>
@endif
@endsection
