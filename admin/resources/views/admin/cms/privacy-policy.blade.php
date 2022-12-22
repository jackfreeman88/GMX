@extends('admin.app.index')
@section('css')
    <link href="{{$ADMIN_THEME_PATH}}/plugins/bootstrap-fileinput/bootstrap-fileinput.css" rel="stylesheet" type="text/css" />
@stop
@section('content')
<div class="news-list-page">
    <!-- <div class="sec-title divider-left fs-25 color-333333 pb-3 mb-4">Edit {{$cms->page_name}} Page</div> -->
    {!! Form::open(['url'=>url($actionURL.'/updatetermsandconditions',$cms->slug),'files'=>true]) !!}
    <div class="card bs-4 mb-3 card-dark">
        <div class="card-body">
            <div>
                <div class="form-wrap">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="fs-20 color-white fw-600">Edit {{$cms->page_name}} Page</div>
                            <hr class="mt-1 mb-2">
                            <div class="fs-20 color-white fw-600">Main Section</div>
                            <hr class="mt-1 mb-2">
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="form-group">
                                        <div>
                                            <label class="col-form-label">Title</label>
                                            <input type="text" name="main_title" class="form-control" value="{{ $cms->content['main_title'] ?? '' }}">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-12">
                                    <div class="form-group">
                                        <div>
                                            <label class="col-form-label">Content</label>
                                            <textarea name="main_content" id="main_content" class="form-control" rows="3">{{ $cms->content['main_content'] ?? '' }}</textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
                    <div class="btn btn-rounded-wrap btn-group-left-right d-flex flex-wrap justify-content-between">
                            <a href="{{ url($actionURL) }}" class="btn btn-rounded btn-outline-danger btn-wh-145-45 mr-2">Cancel</a>
                            <button type="submit" class="btn btn-rounded btn-outline-primary  btn-wh-145-45">Save</button>
                    </div>
                            
                </div>
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
    gmx_app.getckeditor($('#main_content'),ck_config);
});
</script>
@stop
