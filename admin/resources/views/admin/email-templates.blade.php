@extends('admin.app.index')
@section('css')
@stop
@section('content')
@if($view=="add" || $view=="edit")
{{--<link href="{{$ADMIN_THEME_PATH}}/plugins/bootstrap-fileinput/bootstrap-fileinput.css" rel="stylesheet" type="text/css" />--}}
<div class="user-wrap">
    @if(isset($data->id)) 
        @php $id = $data->id @endphp
    @else 
        @php $id = 0 @endphp
    @endif
    {!! Form::open(['url'=>url($actionURL.'/action',$view).'/'.$id,'files'=>true,'id'=>'emailtemplateform']) !!}
    <div class="card bs-4 mb-3 card-dark">
        <div class="card-body">
            <div class="form-wrap">
                <div class="col-lg-12">
                <div class="fs-20 color-white fw-600">{{ ucfirst($view) }} {{ ucfirst($singleSection) }}</div>
                <hr class="mt-1 mb-2">
                <div class="row">
                    <div class="col-lg-6">
                        <div class="form-group">
                            <label class="col-form-label fs-14">Title </label>
                            <input type="text" name="title" value="{{ $data->title ?? '' }}" class="form-control fs-14">
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="form-group">
                            <label class="col-form-label fs-14">Subject </label>
                            <input type="text" name="subject" value="{{ $data->subject ?? '' }}" class="form-control fs-14">
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="form-group">
                            <div>
                                <label class="col-form-label fs-14">Email Header</label>
                                <select class="form-control" id="headerId" name="headerId">
                                    <option value="">Select Email Header</option>
                                    @foreach($emailHeaders as $header)
                                        <option value="{{ $header->id }}" @if( isset($data->headerId) && $data->headerId == $header->id ) selected @endif>{{ $header->title }}</option>
                                    @endforeach
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="form-group">
                            <div>
                                <label class="col-form-label fs-14">Email Footer</label>
                                <select class="form-control" id="footerId" name="footerId">
                                    <option value="">Select Email Footer</option>
                                    @foreach($emailFooters as $footer)
                                        <option value="{{ $footer->id }}" @if( isset($data->footerId) && $data->footerId == $footer->id ) selected @endif>{{ $footer->title }}</option>
                                    @endforeach
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-12">
                        <div class="form-group">
                            <div>
                                <div class="col-form-label fs-14">Description</div>
                                <textarea class="form-control" name="body" id="body">{!! $data->body ?? '' !!}</textarea>
                            </div>
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
{{--<script src="{{$ADMIN_THEME_PATH}}/plugins/bootstrap-fileinput/bootstrap-fileinput.js" type="text/javascript"></script>--}}
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
                            <table id="email_templates_table" class="table  fs-14 reflow-tbl">
                                <thead>
                                    <tr class="bg-color-191919">
                                        <th>Title</th>
                                        <th>Status</th>
                                        <th width="180">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @if (isset($emailTemplates) && count($emailTemplates) > 0)
                                        @foreach ($emailTemplates as $emailTemplate)
                                            <tr>
                                                <td>{{ $emailTemplate->title ?? '' }}</td>
                                                <td>{{ ($emailTemplate->status=='1')?'Active':'Inactive' }}</td>
                                                <td>
                                                    <div class="d-flex text-center">
                                                        @if ($emailTemplate->status == '1')
                                                            <a title="Make Inactive" href="{{url($actionURL.'/action/makeInactive/'.$emailTemplate->id)}}"><i class="fas fa-check fs-18 text-success"></i> </a>
                                                        @else
                                                            <a title="Make Active" href="{{url($actionURL.'/action/makeActive/'.$emailTemplate->id)}}"><i class="far fa-times-circle fs-18 color-0799c4"></i> </a>
                                                        @endif
                                                        <span class="mx-1">|</span>
                                                        <a title="Edit" href="{{url($actionURL.'/edit/'.$emailTemplate->id)}}"><i class="fas fa-edit fs-18 text-success"></i> </a>
                                                        <span class="mx-1">|</span>
                                                        <a title="Delete" href="javascript:void(0)" onclick="mechanech_modal.confirmModal('{{ url($actionURL.'/action/delete/'.$emailTemplate->id) }}');"><i class="far fa-trash-alt fs-18 text-danger"></i>
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
                    {{ $emailTemplates->links() }}
                </div>
            </div>
        </div>
    </div>
@endif
@stop
@section('js')
<script type="text/javascript" src="{{ url('node_modules/ckeditor/ckeditor.js') }}"></script>
<script type="text/javascript">
    $(document).ready(function(){
        var ck_config = {
            height:'20em',
            removeButtons:'Templates,Save,NewPage,ExportPdf,Preview,Print,Cut,Undo,Redo,Copy,Paste,PasteText,PasteFromWord,Find,Replace,SelectAll,Scayt,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,About,Maximize,BGColor,ShowBlocks,TextColor,Styles,Format,Font,FontSize,Iframe,Flash,Table,Image,HorizontalRule,Smiley,SpecialChar,PageBreak,Link,Unlink,Anchor,Language,BidiRtl,BidiLtr,JustifyLeft,Blockquote,Outdent,Indent,CreateDiv,JustifyCenter,JustifyRight,JustifyBlock,NumberedList,CopyFormatting,RemoveFormat,Underline,Strike,Superscript,Subscript',
            removePlugins: 'elementspath'
        };
        gmx_app.getckeditor($('#body'),ck_config);
    });
</script>
@stop