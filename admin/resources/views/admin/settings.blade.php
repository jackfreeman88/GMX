@extends('admin.app.index')
@section('content')
<div class="user-wrap">
    <div class="card bs-4 mb-3 card-dark">
        <div class="card-body">
            <div class="row align-items-center mb-3">
                <div class="col">
                    <div class="fs-18 fw-600 color-white">Settings</div>
                </div>
            </div>
            <hr class="mt-2 mb-3">
            <div>
                {!! Form::open(['url'=>url('/settings/update/admin-detail'),'files'=>true,'id'=>'admindetailForm']) !!}
                    <div class="row">
                        <div class="col-lg-8">
                            <div class="form-wrap">
                                <div class="mb-md-1 fs-18 fw-600 color-white">Update Admin Acount Details</div>
                                <hr class="mt-2 mb-3">
                                <div class="row">
                                    @php $name =  explode(' ',$adminData->name); @endphp
                                    <div class="col-lg-6">
                                        <div class="form-group">
                                            <div>
                                                <label class="col-form-label fs-14">First Name</label>
                                                <input type="text" name="fname" class="form-control"
                                                    placeholder="Please Enter Admin First Name" value="{{ $name[0] ?? '' }}">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="form-group">
                                            <div>
                                                <label class="col-form-label fs-14">Last Name</label>
                                                <input type="text" name="lname" class="form-control"
                                                    placeholder="Please Enter Admin Last Name" value="{{ $name[1] ?? '' }}">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="form-group">
                                            <div>
                                                <label class="col-form-label fs-14">Email</label>
                                                <input type="text" name="email" class="form-control" placeholder=""
                                                    value="{{ $adminData->email ?? ""}}">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="form-group">
                                            <div>
                                                <label class="col-form-label fs-14">Password</label>
                                                <input type="password" name="password" class="form-control"
                                                    placeholder="" value="">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="btn btn-rounded-wrap btn-right">
                                    <button type="submit" class="btn btn-rounded btn-primary btn-wh-130-50">Update</button>
                                </div>
                            </div>
                        </div>
                    </div>
                {!! Form::close() !!}
                <hr>
                {!! Form::open(['url'=>url('/settings'),'method'=>'post','files'=>true]) !!}
                    <div class="form-wrap">
                    <div class="mb-md-1 fs-17 fw-600">Update Site Settings Details</div>
                    <hr class="mt-2 mb-3">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="row">
                                    <div class="col-lg-6">
                                        <div class="form-group">
                                            <div>
                                                <label class="col-form-label fs-14">Notification Email address of
                                                    admin</label>
                                                <input type="text" name="info_email" class="form-control"
                                                    value="{{ _get_setting('info_email') ?? "" }}" placeholder="Pease Enter Email">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="form-group">
                                            <div>
                                                <label class="col-form-label fs-14">Contact Number</label>
                                                <input type="text" name="contact_number" value="{{ _get_setting('contact_number') ?? "" }}" class="form-control numbersOnly" placeholder="Please Enter Contact Number"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="form-group">
                                            <div>
                                                <label class="col-form-label fs-14">Site Address</label>
                                                <textarea cols="3" rows="2" name="site_address" class="form-control" placeholder="Please Ennter Site Address">{!! _get_setting('site_address') !!}</textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="form-group">
                                            <div>
                                                <label class="col-form-label fs-14">Site Address</label>
                                                <input type="text" name="site_name" value="{{ _get_setting('site_name') ?? ""}}" class="form-control" placeholder="Please Enter site name"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="mb-md-1 fs-18 fw-600 color-white">Social links</div>
                                <div class="row">
                                    <div class="col-lg-6">
                                        <div class="form-group">
                                            <div>
                                                <label class="col-form-label fs-14">Facebook</label>
                                                <input type="text" name="facebook_link" class="form-control"
                                                    value="{{ _get_setting('facebook_link') }}" placeholder="Please Enter Social Link">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="form-group">
                                            <div>
                                                <label class="col-form-label fs-14">Instagram</label>
                                                <input type="text" name="instagram_link" class="form-control" value="{{ _get_setting('instagram_link') }}" placeholder="Please Enter Social Link">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-lg-6">
                                        <div class="form-group">
                                            <div>
                                                <label class="col-form-label fs-14">Twitter</label>
                                                <input type="text" name="twitter_link" class="form-control"
                                                    value="{{ _get_setting('twitter_link') }}" placeholder="Please Enter Social Link">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="form-group">
                                            <div>
                                                <label class="col-form-label fs-14">LinkedIn</label>
                                                <input type="text" name="linkedin_link" class="form-control" value="{{ _get_setting('linkedin_link') }}" placeholder="Please Enter Social Link">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="btn btn-rounded-wrap btn-right">
                                    <button type="submit" class="btn btn-rounded btn-primary btn-wh-130-50">Save</button>
                                </div>
                            </div>
                            {{-- <div class="col-lg-4">
                                <div>
                                    <div class="mb-md-1 fs-18 color-333333 fw-600">Logo</div>
                                    <label class="pictureuploadthumb-wrap full">
                                        <input type="file" name="logo" id="logo" style="display:none;">
                                        <figure>
                                            <img class="contain uploadimgtag" src="{{ env('ASSETS_URL')._get_setting('logo') }}" id="previewLogo" alt="profile">
                                        </figure>
                                            <div class="figure-caption btn btn-primary1"> Change Photo </div>
                                    </label>
                                </div>
                                <hr>
                                <div>
                                    <div class="mb-md-1 fs-18 color-333333 fw-600">Small Logo</div>
                                    <label class="pictureuploadthumb-wrap full">
                                        <input type="file" name="minlogo" id="minlogo" style="display:none;">
                                        <figure class="figure-40">
                                            <img class="contain uploadimgtag" src="{{ env('ASSETS_URL')._get_setting('minlogo') }}" id="previewMinLogo" alt="profile">
                                        </figure>
                                        <div class="btn btn-rounded btn-primary1 text-nowrap"> Change Photo </div>
                                    </label>
                                </div>
                                <hr>
                                <div>
                                    <div class="mb-md-1 fs-18 color-333333 fw-600">Footer Logo</div>
                                    <label class="pictureuploadthumb-wrap full">
                                        <input type="file" name="footerlogo" id="footerlogo" style="display:none;">
                                        <figure class="figure-40">
                                            <img class="contain uploadimgtag" src="{{ env('ASSETS_URL')._get_setting('footerlogo') }}" id="previewFooterLogo" alt="profile">
                                        </figure>
                                        <div class="btn btn-rounded btn-primary1 text-nowrap"> Change Photo </div>
                                    </label>
                                </div>
                            </div> --}}
                        </div>
                    </div>
                {!! Form::close() !!}
                
                
            </div>
        </div>
    </div>
</div>
@endsection
@section('js')
<script type="text/javascript">
    $("#logo").on('change',function(event){
        gmx_app.readURL($(this),$("#previewLogo"));
        if($(this).val().trim() == ''){
            return false;
        }
    });
    $("#minlogo").on('change',function(event){
        gmx_app.readURL($(this),$("#previewMinLogo"));
        if($(this).val().trim() == ''){
            return false;
        }
    });
    $("#footerlogo").on('change',function(event){
        gmx_app.readURL($(this),$("#previewFooterLogo"));
        if($(this).val().trim() == ''){
            return false;
        }
    });
    $("#sabbath_mode").on('change',function(event){
        $("#bookingsettingsForm").submit();
    });
</script>
@endsection