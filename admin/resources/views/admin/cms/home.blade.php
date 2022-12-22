@extends('admin.app.index')
@section('css')
    <link href="{{$ADMIN_THEME_PATH}}/plugins/bootstrap-fileinput/bootstrap-fileinput.css" rel="stylesheet" type="text/css" />
@endsection
@section('content')
<div class="news-list-page">
    <!-- <div class="sec-title divider-left fs-25 color-333333 pb-3 mb-4">Edit {{$cms->page_name}} Page</div> -->
    {!! Form::open(['url'=>url($actionURL.'/updatehome',$cms->slug),'files'=>true]) !!}
    <!-- Banner Section Start -->
    <div class="card bs-4 mb-3 card-dark">
        <div class="card-body">
        <div class="fs-20 color-white fw-600">Edit {{$cms->page_name}} Page</div>
        <hr class="mt-1 mb-2">
        <div class="fs-20 color-white fw-600">Banner Section</div>
        <hr class="mt-1 mb-2">
            <div id="slider_list">
            <input type="hidden" name="remove_slider[]" id="remove_slider" value="">
                @if (isset($Banner) && count($Banner)>0)
                    @foreach ($Banner as $key => $item)
                        <input type="hidden" name="section1_edit[]" value="{{ $item->id}}">
                        <div class="row slider_div">
                            <div class="col-lg-6 col-md-6">
                                <div class="form-group mb-3">
                                    <label class="col-form-label">Pre Title</label>
                                    <input type="text" name="section1_pre_title[{{ $key }}]" class="form-control" placeholder="Please Enter Accreditation title" value="{{ $item->preTitle ?? '' }}">
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6">
                                <div class="form-group mb-3">
                                    <label class="col-form-label">Title</label>
                                    <input type="text" name="section1_title[{{ $key }}]" class="form-control" value="{{ $item->title ?? '' }}">
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6">
                                <div class="form-group mb-3">
                                    <label class="col-form-label">Description</label>
                                    <input type="text" name="section1_description[{{ $key }}]" class="form-control" value="{{ $item->description ?? '' }}">
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6">
                                <div class="form-group mb-3">
                                    <label class="col-form-label">Button Text</label>
                                    <input type="text" name="section1_button_text[{{ $key }}]" class="form-control" maxlength="110" value="{{ $item->buttonText ?? '' }}">
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6">
                                <div class="form-group mb-3">
                                    <label class="col-form-label">Button Link</label>
                                    <input type="text" name="section1_button_link[{{ $key }}]" class="form-control" value="{{ $item->buttonLink ?? '' }}">
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6">
                                <div class="form-group">
                                    <div>
                                        <div class="col-form-label">Image</div>
                                        <div class="fileinput fileinput-new" data-provides="fileinput">
                                            <div class="fileinput-new thumbnail" style="width: 100px;">
                                                @if(isset($item->image) && !empty($item->image) )
                                                    @php $imageURL = env('ASSETS_URL').$item->image @endphp
                                                @else
                                                    @php $imageURL = $UPLOAD_PATH.'/'.'image-default.png' @endphp
                                                @endif
                                                <img src="{{$imageURL}}" style="max-width: 100px" alt= />
                                            </div>
                                            <div class="fileinput-preview fileinput-exists thumbnail" style="max-width: 100px;"> </div>
                                            <div>
                                                <span class="btn btn-rounded default btn-file">
                                                    <span class="fileinput-new btn btn-primary btn-rounded"> Select Image </span>
                                                    <span class="fileinput-exists btn btn-danger"> Change </span>
                                                    <input type="file" name="main_image_2[]" class="form-control"> 
                                                </span>
                                                <a href="javascript:;" class="btn btn-rounded btn-outline-danger fileinput-exists" data-dismiss="fileinput"> Remove </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr class="mt-2" />
                            <div class="col-lg-12">
                                <a href="javascript:void(0);" class="btn btn-danger remove_slider" delete_id="{{ $item->id ?? ''}}" style="display: {{ count( $Banner ) > 1 ? '' : 'none' }};"><i class="far fa-times"></i></a>
                            </div>
                        </div>
                    @endforeach
                @else
                    <div class="row slider_div">
                        <div class="col-lg-12">
                            <a href="javascript:void(0);" class="btn btn-danger remove_slider" style="display: none;"><i class="far fa-times"></i></a>
                        </div>
                        <div class="col-lg-6 col-md-6">
                            <div class="form-group mb-3">
                                <label class="col-form-label">Pre Title</label>
                                <input type="text" name="section1_pre_title[0]" class="form-control" maxlength="110">
                            </div>
                        </div>
                        <div class="col-lg-6 col-md-6">
                            <div class="form-group mb-3">
                                <label class="col-form-label">Title</label>
                                <input type="text" name="section1_title[0]" class="form-control">
                            </div>
                        </div>
                        <div class="col-lg-6 col-md-6">
                            <div class="form-group mb-3">
                                <label class="col-form-label">Description</label>
                                <input type="text" name="section1_description[0]" class="form-control">
                            </div>
                        </div>
                        <div class="col-lg-6 col-md-6">
                            <div class="form-group mb-3">
                                <label class="col-form-label">Button Text</label>
                                <input type="text" name="section1_button_text[0]" class="form-control" maxlength="110">
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="form-group mb-3">
                                <label class="col-form-label">Button Link</label>
                                <input type="text" name="section1_button_link[0]" class="form-control">
                            </div>
                        </div>
                        <div class="col-lg-6 col-md-6">
                            <div class="form-group">
                                <div class="col-form-label">Image</div>
                                <div class="fileinput fileinput-new" data-provides="fileinput">
                                    <div class="fileinput-new thumbnail" style="width: 100px;">
                                        @php $imageURL = env('ASSETS_URL').'/'.'image-default.png' @endphp
                                        <img src="{{$imageURL}}" style="max-width: 100px" alt= />
                                    </div>
                                    <div class="fileinput-preview fileinput-exists thumbnail" style="max-width: 100px;"> </div>
                                    <div>
                                        <span class="btn btn-rounded default btn-file">
                                            <span class="fileinput-new btn btn-primary btn-rounded"> Select Image </span>
                                            <span class="fileinput-exists btn btn-danger"> Change </span>
                                            <input type="file" name="main_image_2[]" class="form-control"> 
                                        </span>
                                        <a href="javascript:;" class="btn btn-rounded btn-outline-danger fileinput-exists" data-dismiss="fileinput"> Remove </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr class="mt-2" />
                    </div>
                @endif
            </div>
            <div class="col-lg-12">
                <div class="col-auto fw-600 pl-0" id="add_more_slider" style="margin: 10px 0px 15px 10px;">
                    <a href="javascript:void(0)" class="btn btn-outline-primary btn-rounded btn-wh-145-45"><i class="fas fa-plus-circle me-2"></i><span>Add Slider</span> </a>
                </div>
            </div>
        </div>
    </div>
    <!-- Banner Section End -->
    
    <!-- Vision Section Start -->
    <div class="card bs-4 mb-3 card-dark">
        <div class="card-body">
            <div>
                <div class="form-wrap">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="fs-20 color-white fw-600">Vision Section</div>
                            <hr class="mt-1 mb-2">
                            <div class="row">
                                <div class="col-lg-6 col-md-6">
                                    <div class="form-group">
                                        <div>
                                            <label class="col-form-label">Count</label>
                                            <input type="text" name="section2_count" class="form-control" value="{{ $cms->content['section2_count'] ?? '' }}" placeholder="Please Enter Count">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6">
                                    <div class="form-group">
                                        <div>
                                            <label class="col-form-label">Title</label>
                                            <input type="text" name="section2_main_title" class="form-control" value="{{ $cms->content['section2_main_title'] ?? '' }}" placeholder="Please Enter Title">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-12">
                                    <div class="form-group">
                                        <div>
                                            <div class="col-form-label">Description</div>
                                            <textarea class="form-control" name="section2_description" id="section2_description" placeholder="Type here...">{!! $cms->content['section2_description'] ?? '' !!}</textarea>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6">
                                    <div class="form-group">
                                        <div>
                                            <label class="col-form-label">Button Title</label>
                                            <input type="text" name="section2_button_title" class="form-control" value="{{ $cms->content['section2_button_title'] ?? '' }}" placeholder="Please Enter Button Text">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6">
                                    <div class="form-group">
                                        <div>
                                            <label class="col-form-label">Button Link</label>
                                            <input type="text" name="section2_button_link" class="form-control" value="{{ $cms->content['section2_button_link'] ?? '' }}" placeholder="Please Enter Button Link">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6">
                                <div class="form-group">
                                    <div>
                                        <div class="col-form-label">Image</div>
                                        <div class="fileinput fileinput-new" data-provides="fileinput">
                                            <div class="fileinput-new thumbnail" style="width: 100px;">
                                                @if(isset($cms->content['section2_image']) && !empty($cms->content['section2_image']) )
                                                    @php $imageURL = env('ASSETS_URL').$cms->content['section2_image'] @endphp
                                                @else
                                                    @php $imageURL = env('ASSETS_URL').'/'.'image-default.png' @endphp
                                                @endif
                                                
                                                <img src="{{$imageURL}}" style="max-width: 100px" alt= />
                                            </div>
                                            <div class="fileinput-preview fileinput-exists thumbnail" style="max-width: 100px;"> </div>
                                            <div>
                                                <span class="btn btn-rounded default btn-file">
                                                    <span class="fileinput-new btn btn-primary btn-rounded"> Select Image </span>
                                                    <span class="fileinput-exists btn btn-danger"> Change </span>
                                                    <input type="file" name="section2_image" class="form-control"> 
                                                </span>
                                                <a href="javascript:;" class="btn btn-rounded btn-outline-danger fileinput-exists" data-dismiss="fileinput"> Remove </a>
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
        </div>
    </div>
    <!-- Vision Section End -->

    <!-- Brands Section Start -->
    <div class="card bs-4 mb-3 card-dark">
        <div class="card-body">
            <div>
                <div class="form-wrap">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="fs-20 color-white fw-600">Brands Section</div>
                            <hr class="mt-1 mb-2">
                            <div class="row">
                                <div class="col-lg-6 col-md-6">
                                    <div class="form-group">
                                        <div>
                                            <label class="col-form-label">Count</label>
                                            <input type="text" name="section3_count" class="form-control" value="{{ $cms->content['section3_count'] ?? '' }}" placeholder="Please Enter Count">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6">
                                    <div class="form-group">
                                        <div>
                                            <label class="col-form-label">Title</label>
                                            <input type="text" name="section3_main_title" class="form-control" value="{{ $cms->content['section3_main_title'] ?? '' }}" placeholder="Please Enter Title">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-3 col-md-3">
                                    <div class="form-group">
                                        <div>
                                            <label class="col-form-label">List Icon</label>
                                            <input type="text" name="section3_list_icon1" class="form-control" value="{{ $cms->content['section3_list_icon1'] ?? '' }}" placeholder="Please Enter Title">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-3 col-md-3">
                                    <div class="form-group">
                                        <div>
                                            <label class="col-form-label">List Title</label>
                                            <input type="text" name="section3_list_title1" class="form-control" value="{{ $cms->content['section3_list_title1'] ?? '' }}" placeholder="Please Enter Title">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6">
                                    <div class="form-group">
                                        <div>
                                            <label class="col-form-label">List Description</label>
                                            <input type="text" name="section3_list_description1" class="form-control" value="{{ $cms->content['section3_list_description1'] ?? '' }}" placeholder="Please Enter Title">
                                        </div>
                                    </div>
                                </div>

                                <div class="col-lg-3 col-md-3">
                                    <div class="form-group">
                                        <div>
                                            <label class="col-form-label">List Icon</label>
                                            <input type="text" name="section3_list_icon2" class="form-control" value="{{ $cms->content['section3_list_icon2'] ?? '' }}" placeholder="Please Enter Title">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-3 col-md-3">
                                    <div class="form-group">
                                        <div>
                                            <label class="col-form-label">List Title</label>
                                            <input type="text" name="section3_list_title2" class="form-control" value="{{ $cms->content['section3_list_title2'] ?? '' }}" placeholder="Please Enter Title">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6">
                                    <div class="form-group">
                                        <div>
                                            <label class="col-form-label">List Description</label>
                                            <input type="text" name="section3_list_description2" class="form-control" value="{{ $cms->content['section3_list_description2'] ?? '' }}" placeholder="Please Enter Title">
                                        </div>
                                    </div>
                                </div>

                                <div class="col-lg-6 col-md-6">
                                    <div class="form-group">
                                        <div>
                                            <label class="col-form-label">Button Title</label>
                                            <input type="text" name="section3_button_title" class="form-control" value="{{ $cms->content['section3_button_title'] ?? '' }}" placeholder="Please Enter Button Text">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6">
                                    <div class="form-group">
                                        <div>
                                            <label class="col-form-label">Button Link</label>
                                            <input type="text" name="section3_button_link" class="form-control" value="{{ $cms->content['section3_button_link'] ?? '' }}" placeholder="Please Enter Button Link">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6">
                                <div class="form-group">
                                    <div>
                                        <div class="col-form-label">Image</div>
                                        <div class="fileinput fileinput-new" data-provides="fileinput">
                                            <div class="fileinput-new thumbnail" style="width: 100px;">
                                                @if(isset($cms->content['section3_image']) && !empty($cms->content['section3_image']) )
                                                    @php $imageURL = env('ASSETS_URL').$cms->content['section3_image'] @endphp
                                                @else
                                                    @php $imageURL = env('ASSETS_URL').'/'.'image-default.png' @endphp
                                                @endif
                                                
                                                <img src="{{$imageURL}}" style="max-width: 100px" alt= />
                                            </div>
                                            <div class="fileinput-preview fileinput-exists thumbnail" style="max-width: 100px;"> </div>
                                            <div>
                                                <span class="btn btn-rounded default btn-file">
                                                    <span class="fileinput-new btn btn-primary btn-rounded"> Select Image </span>
                                                    <span class="fileinput-exists btn btn-danger"> Change </span>
                                                    <input type="file" name="section3_image" class="form-control"> 
                                                </span>
                                                <a href="javascript:;" class="btn btn-rounded btn-outline-danger fileinput-exists" data-dismiss="fileinput"> Remove </a>
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
        </div>
    </div>
    <!-- Brands Section End -->
    
    <!-- Retailer Section Start -->
    <div class="card bs-4 mb-3 card-dark">
        <div class="card-body">
            <div>
                <div class="form-wrap">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="fs-20 color-white fw-600">Retailer Section</div>
                            <hr class="mt-1 mb-2">
                            <div class="row">
                                <div class="col-lg-6 col-md-6">
                                    <div class="form-group">
                                        <div>
                                            <label class="col-form-label">Count</label>
                                            <input type="text" name="section4_count" class="form-control" value="{{ $cms->content['section4_count'] ?? '' }}" placeholder="Please Enter Count">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6">
                                    <div class="form-group">
                                        <div>
                                            <label class="col-form-label">Title</label>
                                            <input type="text" name="section4_main_title" class="form-control" value="{{ $cms->content['section4_main_title'] ?? '' }}" placeholder="Please Enter Title">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-12">
                                    <div class="form-group">
                                        <div>
                                            <div class="col-form-label">Description</div>
                                            <textarea class="form-control" name="section4_description" id="section4_description" placeholder="Type here...">{!! $cms->content['section4_description'] ?? '' !!}</textarea>
                                        </div>
                                    </div>
                                </div>
                                <!-- Listing Section -->
                                <div class="col-lg-3 col-md-3">
                                    <div class="form-group">
                                        <div>
                                            <label class="col-form-label">List Icon</label>
                                            <input type="text" name="section4_list_icon1" class="form-control" value="{{ $cms->content['section4_list_icon1'] ?? '' }}" placeholder="Please Enter Title">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-3 col-md-3">
                                    <div class="form-group">
                                        <div>
                                            <label class="col-form-label">List Title</label>
                                            <input type="text" name="section4_list_title1" class="form-control" value="{{ $cms->content['section4_list_title1'] ?? '' }}" placeholder="Please Enter Title">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6">
                                    <div class="form-group">
                                        <div>
                                            <label class="col-form-label">List Description</label>
                                            <input type="text" name="section4_list_description1" class="form-control" value="{{ $cms->content['section4_list_description1'] ?? '' }}" placeholder="Please Enter Title">
                                        </div>
                                    </div>
                                </div>

                                <div class="col-lg-3 col-md-3">
                                    <div class="form-group">
                                        <div>
                                            <label class="col-form-label">List Icon</label>
                                            <input type="text" name="section4_list_icon2" class="form-control" value="{{ $cms->content['section4_list_icon2'] ?? '' }}" placeholder="Please Enter Title">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-3 col-md-3">
                                    <div class="form-group">
                                        <div>
                                            <label class="col-form-label">List Title</label>
                                            <input type="text" name="section4_list_title2" class="form-control" value="{{ $cms->content['section4_list_title2'] ?? '' }}" placeholder="Please Enter Title">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6">
                                    <div class="form-group">
                                        <div>
                                            <label class="col-form-label">List Description</label>
                                            <input type="text" name="section4_list_description2" class="form-control" value="{{ $cms->content['section4_list_description2'] ?? '' }}" placeholder="Please Enter Title">
                                        </div>
                                    </div>
                                </div>

                                <div class="col-lg-3 col-md-3">
                                    <div class="form-group">
                                        <div>
                                            <label class="col-form-label">List Icon</label>
                                            <input type="text" name="section4_list_icon3" class="form-control" value="{{ $cms->content['section4_list_icon3'] ?? '' }}" placeholder="Please Enter Title">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-3 col-md-3">
                                    <div class="form-group">
                                        <div>
                                            <label class="col-form-label">List Title</label>
                                            <input type="text" name="section4_list_title3" class="form-control" value="{{ $cms->content['section4_list_title3'] ?? '' }}" placeholder="Please Enter Title">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6">
                                    <div class="form-group">
                                        <div>
                                            <label class="col-form-label">List Description</label>
                                            <input type="text" name="section4_list_description3" class="form-control" value="{{ $cms->content['section4_list_description3'] ?? '' }}" placeholder="Please Enter Title">
                                        </div>
                                    </div>
                                </div>
                            <!-- Listing Section -->
                                <div class="col-lg-6 col-md-6">
                                    <div class="form-group">
                                        <div>
                                            <label class="col-form-label">Button Title</label>
                                            <input type="text" name="section4_button_title" class="form-control" value="{{ $cms->content['section4_button_title'] ?? '' }}" placeholder="Please Enter Button Text">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6">
                                    <div class="form-group">
                                        <div>
                                            <label class="col-form-label">Button Link</label>
                                            <input type="text" name="section4_button_link" class="form-control" value="{{ $cms->content['section4_button_link'] ?? '' }}" placeholder="Please Enter Button Link">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6">
                                    <div class="form-group">
                                        <div>
                                            <div class="col-form-label">Image</div>
                                            <div class="fileinput fileinput-new" data-provides="fileinput">
                                                <div class="fileinput-new thumbnail" style="width: 100px;">
                                                    @if(isset($cms->content['section4_image']) && !empty($cms->content['section4_image']) )
                                                        @php $imageURL = env('ASSETS_URL').$cms->content['section4_image'] @endphp
                                                    @else
                                                        @php $imageURL = env('ASSETS_URL').'/'.'image-default.png' @endphp
                                                    @endif
                                                    
                                                    <img src="{{$imageURL}}" style="max-width: 100px" alt= />
                                                </div>
                                                <div class="fileinput-preview fileinput-exists thumbnail" style="max-width: 100px;"> </div>
                                                <div>
                                                    <span class="btn btn-rounded default btn-file">
                                                        <span class="fileinput-new btn btn-primary btn-rounded"> Select Image </span>
                                                        <span class="fileinput-exists btn btn-danger"> Change </span>
                                                        <input type="file" name="section4_image" class="form-control"> 
                                                    </span>
                                                    <a href="javascript:;" class="btn btn-rounded btn-outline-danger fileinput-exists" data-dismiss="fileinput"> Remove </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6">
                                    <div class="form-group">
                                        <div>
                                            <div class="col-form-label">Image</div>
                                            <div class="fileinput fileinput-new" data-provides="fileinput">
                                                <div class="fileinput-new thumbnail" style="width: 100px;">
                                                    @if(isset($cms->content['section4_small_image']) && !empty($cms->content['section4_small_image']) )
                                                        @php $imageURL = env('ASSETS_URL').$cms->content['section4_small_image'] @endphp
                                                    @else
                                                        @php $imageURL = env('ASSETS_URL').'/'.'image-default.png' @endphp
                                                    @endif
                                                    
                                                    <img src="{{$imageURL}}" style="max-width: 100px" alt= />
                                                </div>
                                                <div class="fileinput-preview fileinput-exists thumbnail" style="max-width: 100px;"> </div>
                                                <div>
                                                    <span class="btn btn-rounded default btn-file">
                                                        <span class="fileinput-new btn btn-primary btn-rounded"> Select Image </span>
                                                        <span class="fileinput-exists btn btn-danger"> Change </span>
                                                        <input type="file" name="section4_small_image" class="form-control"> 
                                                    </span>
                                                    <a href="javascript:;" class="btn btn-rounded btn-outline-danger fileinput-exists" data-dismiss="fileinput"> Remove </a>
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
        </div>
    </div>
    <!-- Retailer Section End -->

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
<script src="{{$ADMIN_THEME_PATH}}/plugins/bootstrap-fileinput/bootstrap-fileinput.js" type="text/javascript"></script>
<script type="text/javascript" src="{{ url('node_modules/ckeditor/ckeditor.js') }}"></script>
<script type="text/javascript">
$(document).ready(function(){
    var ck_config = {
        height:'20em',
        skin: 'moono-dark',
        removeButtons:'Templates,Save,NewPage,ExportPdf,Preview,Print,Cut,Undo,Redo,Copy,Paste,PasteText,PasteFromWord,Find,Replace,SelectAll,Scayt,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,About,Maximize,BGColor,ShowBlocks,TextColor,Styles,Format,Font,FontSize,Iframe,Flash,Table,Image,HorizontalRule,Smiley,SpecialChar,PageBreak,Link,Unlink,Anchor,Language,BidiRtl,BidiLtr,JustifyLeft,Blockquote,Outdent,Indent,CreateDiv,JustifyCenter,JustifyRight,JustifyBlock,NumberedList,CopyFormatting,RemoveFormat,Underline,Strike,Superscript,Subscript',
        removePlugins: 'elementspath'
    };
    gmx_app.getckeditor($('#section2_description'),ck_config);
    gmx_app.getckeditor($('#section4_description'),ck_config);

    var ck_config2 = {
        height:'20em',
        skin: 'moono-dark',
        removeButtons:'Templates,Save,NewPage,ExportPdf,Preview,Print,Cut,Undo,Redo,Copy,Paste,PasteText,PasteFromWord,Find,Replace,SelectAll,Scayt,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,About,Maximize,BGColor,ShowBlocks,TextColor,Styles,Format,Font,FontSize,Iframe,Flash,Table,Image,HorizontalRule,Smiley,SpecialChar,PageBreak,Link,Unlink,Anchor,Language,BidiRtl,BidiLtr,JustifyLeft,Blockquote,Outdent,Indent,CreateDiv,JustifyCenter,JustifyRight,JustifyBlock,NumberedList,CopyFormatting,RemoveFormat,Underline,Strike,Superscript,Subscript',
        removePlugins: 'elementspath'
    };
    // gmx_app.getckeditor($('#section2_description'),ck_config2);
});
    $('#add_more_slider').click(function() {
        var element = $('.slider_div').first().clone();
        var newIndex = $('.slider_div').length;
        element.find('[name*="section1_pre_title["]').val('').end().find('[name*="section1_pre_title["]').attr('name', 'section1_pre_title[' + newIndex + ']');
        element.find('[name*="section1_title"]').val('').end().find('[name*="section1_title"]').attr('name', 'section1_title[' +newIndex + ']');
        element.find('[name*="section1_description"]').val('').end().find('[name*="section1_description"]').attr('name', 'section1_description[' +newIndex + ']');
        element.find('[name*="section1_button_text"]').val('').end().find('[name*="section1_button_text"]').attr('name', 'section1_button_text[' +newIndex + ']');
        element.find('[name*="section1_button_link"]').val('').end().find('[name*="section1_button_link"]').attr('name', 'section1_button_link[' +newIndex + ']');
        
        var temp = element.find('fileinput-preview').end().find('img');
        $(temp[0]).attr('src','{{ URL::asset('/public/uploads/') }}/image-default.png ');
        $(temp[1]).attr('src','{{ URL::asset('/public/uploads/') }}/image-default.png ');

        $('#slider_list').append(element);
            if ($('.slider_div').length > 1) {
                 $('.slider_div').find('.remove_slider').show();
            }
    });
    $(document).on('click', '.remove_slider', function() {
        var id = $(this).attr('delete_id');
		$("#remove_slider").val(function() {
			return $("#remove_slider").val() + " " + id;
		});

        $(this).parents('.slider_div').remove();
        $.each($("div.slider_div"), function(index, val) {
            $(this).find('[name*="section1_pre_title"]').attr('name', 'section1_pre_title[' + (index + 1) + ']');
            $(this).find('[name*="section1_title"]').attr('name','section1_title[' + (index + 1) + ']');
            $(this).find('[name*="section1_description"]').attr('name','section1_description[' + (index + 1) + ']');
            $(this).find('[name*="section1_button_text"]').attr('name','section1_button_text[' + (index + 1) + ']');
            $(this).find('[name*="section1_button_link"]').attr('name','section1_button_link[' + (index + 1) + ']');
            $(this).find('[name*="main_image_2"]').attr('name','section1_button_link[' + (index + 1) + ']');
        });
        if ($('.slider_div').length == 1) {
            $('.slider_div').find('.remove_slider').hide();
        }
    });
</script>
@stop
