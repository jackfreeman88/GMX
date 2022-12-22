@extends('admin.app.index')
@section('css')
    <link href="{{$ADMIN_THEME_PATH}}/plugins/bootstrap-fileinput/bootstrap-fileinput.css" rel="stylesheet" type="text/css" />
@endsection
@section('content')
<div class="news-list-page">
    <!-- <div class="sec-title divider-left fs-25 color-333333 pb-3 mb-4">Edit {{$cms->page_name}} Page</div> -->
    {!! Form::open(['url'=>url($actionURL.'/update-contactus',$cms->slug),'files'=>true]) !!}
    <!-- Main Section Start -->
    <div class="card bs-4 mb-3 card-dark">
        <div class="card-body">
            <div>
                <div class="form-wrap">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="fs-20 color-white fw-600">Main Section</div>
                            <hr class="mt-1 mb-2">
                            <div class="row">
                                
                                <div class="col-lg-12 col-md-12">
                                    <div class="form-group">
                                        <div>
                                            <label class="col-form-label">Main Title</label>
                                            <input type="text" name="main_title" class="form-control" value="{{ $cms->content['main_title'] ?? '' }}" placeholder="Please Enter Title">
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
    <!-- Main Section End -->

    <div class="card bs-4 mb-3 card-dark">
        <div class="card-body">
            <div class="fs-20 color-white fw-600">SEO Section</div>
                <hr class="mt-1 mb-2">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="form-group">
                            <div>
                                <label class="col-form-label">Meta Title</label>
                                <input type="text" name="meta_title" class="form-control" value="{{ $cms->content['meta_title'] ?? '' }}">
                            </div>
                        </div>
                        <div class="form-group">
                            <div>
                                <label class="col-form-label">Meta Keywords</label>
                                <input type="text" name="meta_keyword" class="form-control" value="{{ $cms->content['meta_keyword'] ?? '' }}">
                            </div>
                        </div>
                        <div class="form-group">
                            <div>
                                <label class="col-form-label">Meta Description</label>
                                <textarea name="meta_description" id="meta_description" class="form-control" rows="3">{{ $cms->content['meta_description'] ?? '' }}</textarea>
                            </div>
                        </div>
                    </div>    
                </div>
            </div>
        </div>
    </div>
    <div class="card bs-4 mb-3 card-dark">
        <div class="card-body">
            <div class="btn btn-rounded-wrap btn-group-left-right d-flex flex-wrap justify-content-between">
                <a href="{{ url($actionURL) }}" class="btn btn-rounded btn-outline-danger btn-wh-145-45 mr-2">Cancel</a>
                <button type="submit" class="btn btn-rounded btn-outline-primary btn-wh-145-45">Save</button>
            </div>
        </div>
    </div>
    {!! Form::close() !!}
</div>
@stop

@section('js')
@stop
