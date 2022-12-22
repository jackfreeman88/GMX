@extends('admin.app.index')
@section('css')
    <link href="{{$ADMIN_THEME_PATH}}/plugins/bootstrap-fileinput/bootstrap-fileinput.css" rel="stylesheet" type="text/css" />
@endsection
@section('content')
<div class="news-list-page">
    <!-- <div class="sec-title divider-left fs-25 color-333333 pb-3 mb-4">Edit {{$cms->page_name}} Page</div> -->
    {!! Form::open(['url'=>url($actionURL.'/updateaboutus',$cms->slug),'files'=>true]) !!}
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
                                
                                <div class="col-lg-6 col-md-6">
                                    <div class="form-group">
                                        <div>
                                            <label class="col-form-label">Main Title</label>
                                            <input type="text" name="section1_main_title" class="form-control" value="{{ $cms->content['section1_main_title'] ?? '' }}" placeholder="Please Enter Title">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6">
                                    <div class="form-group">
                                        <div>
                                            <div class="col-form-label">Title</div>
                                            <input type="text" name="section1_title" class="form-control" value="{{ $cms->content['section1_title'] ?? '' }}" placeholder="Please Enter Title">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-12">
                                    <div class="form-group">
                                        <div>
                                            <div class="col-form-label">Description</div>
                                            <textarea class="form-control" name="section1_description" id="section1_description" placeholder="Type here...">{!! $cms->content['section1_description'] ?? '' !!}</textarea>
                                        </div>
                                    </div>
                                </div>
                                <!-- List 1 Content -->
                                <div class="col-lg-3 col-md-3">
                                    <div class="form-group">
                                        <div>
                                            <div class="col-form-label">List 1 Title</div>
                                            <input type="text" name="section1_list_title1" class="form-control" value="{{ $cms->content['section1_list_title1'] ?? '' }}" placeholder="Please Enter Title">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6">
                                    <div class="form-group">
                                        <div>
                                            <div class="col-form-label">List 1 Description</div>
                                            <textarea class="form-control" name="section1_list_description1" id="section1_list_description1" placeholder="Type here...">{!! $cms->content['section1_list_description1'] ?? '' !!}</textarea>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-3 col-md-3">
                                    <div class="form-group">
                                        <div class="col-form-label">List 1 Image</div>
                                        <div class="fileinput fileinput-new" data-provides="fileinput">
                                            <div class="fileinput-new thumbnail" style="width: 100px;">
                                                @if(isset($cms->content['section1_list_image1']) && !empty($cms->content['section1_list_image1']) )
                                                    @php $imageURL = env('ASSETS_URL').$cms->content['section1_list_image1'] @endphp
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
                                                    <input type="file" name="section1_list_image1" class="form-control"> 
                                                </span>
                                                <a href="javascript:;" class="btn btn-rounded btn-outline-danger fileinput-exists" data-dismiss="fileinput"> Remove </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- List 2 Content -->
                                <div class="col-lg-3 col-md-3">
                                    <div class="form-group">
                                        <div>
                                            <div class="col-form-label">List 2 Title</div>
                                            <input type="text" name="section1_list_title2" class="form-control" value="{{ $cms->content['section1_list_title2'] ?? '' }}" placeholder="Please Enter Title">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6">
                                    <div class="form-group">
                                        <div>
                                            <div class="col-form-label">List 2 Description</div>
                                            <textarea class="form-control" name="section1_list_description2" id="section1_list_description2" placeholder="Type here...">{!! $cms->content['section1_list_description2'] ?? '' !!}</textarea>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-3 col-md-3">
                                    <div class="form-group">
                                        <div class="col-form-label">List 2 Image</div>
                                        <div class="fileinput fileinput-new" data-provides="fileinput">
                                            <div class="fileinput-new thumbnail" style="width: 100px;">
                                                @if(isset($cms->content['section1_list_image2']) && !empty($cms->content['section1_list_image2']) )
                                                    @php $imageURL = env('ASSETS_URL').$cms->content['section1_list_image2'] @endphp
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
                                                    <input type="file" name="section1_list_image2" class="form-control"> 
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
    <!-- Main Section End -->

    <!-- About Tagline Section Start -->
    <div class="card bs-4 mb-3 card-dark">
        <div class="card-body">
            <div>
                <div class="form-wrap">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="fs-20 color-white fw-600">About Tagline Section</div>
                            <hr class="mt-1 mb-2">
                            <div class="row">
                                <div class="col-lg-12">
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
                                            <label class="col-form-label">Description</label>
                                            <textarea class="form-control" name="section2_description" id="section2_description" placeholder="Type here...">{!! $cms->content['section2_description'] ?? '' !!}</textarea>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6">
                                    <div class="form-group">
                                        <div>
                                            <label class="col-form-label">Quote Text</label>
                                            <textarea class="form-control" name="section2_quote" id="section2_quote" placeholder="Type here...">{!! $cms->content['section2_quote'] ?? '' !!}</textarea>
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
    <!-- About Tagline Section End -->

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
        removeButtons:'Templates,Save,NewPage,ExportPdf,Preview,Print,Cut,Undo,Redo,Copy,Paste,PasteText,PasteFromWord,Find,Replace,SelectAll,Scayt,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,About,Maximize,BGColor,ShowBlocks,TextColor,Styles,Format,Font,FontSize,Iframe,Flash,Table,Image,HorizontalRule,Smiley,SpecialChar,PageBreak,Link,Unlink,Anchor,Language,BidiRtl,BidiLtr,JustifyLeft,Blockquote,Outdent,Indent,CreateDiv,JustifyCenter,JustifyRight,JustifyBlock,NumberedList,CopyFormatting,RemoveFormat,Underline,Strike,Superscript,Subscript',
        removePlugins: 'elementspath'
    };
    gmx_app.getckeditor($('#section2_description'),ck_config);
    gmx_app.getckeditor($('#section1_list_description1'),ck_config);
    gmx_app.getckeditor($('#section1_list_description2'),ck_config);

    var ck_config2 = {
        height:'20em',
        removeButtons:'Templates,Save,NewPage,ExportPdf,Preview,Print,Cut,Undo,Redo,Copy,Paste,PasteText,PasteFromWord,Find,Replace,SelectAll,Scayt,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,About,Maximize,BGColor,ShowBlocks,TextColor,Styles,Format,Font,FontSize,Iframe,Flash,Table,HorizontalRule,Smiley,SpecialChar,PageBreak,Link,Unlink,Anchor,Language,BidiRtl,BidiLtr,JustifyLeft,Blockquote,Outdent,Indent,CreateDiv,JustifyCenter,JustifyRight,JustifyBlock,NumberedList,CopyFormatting,RemoveFormat,Underline,Strike,Superscript,Subscript',
        removePlugins: 'elementspath'
    };
    // gmx_app.getckeditor($('#section2_description'),ck_config2);
});
</script>
@stop
