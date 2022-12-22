<!DOCTYPE html>
<html lang="en">
	<head>
		<script type="text/javascript">
			// Internet Explorer 6-11
			var isIE = /*@cc_on!@*/false || !!document.documentMode;
			if(isIE){
				window.location.href ="browser-not-supported";
			}
		</script>
		<base href="{{ url('') }}">
		<meta charset="UTF-8">
		<meta content="ie=edge" http-equiv="x-ua-compatible">
		<meta content="IE=edge" http-equiv="X-UA-Compatible">
		<meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width" />
		<meta name="msapplication-tap-highlight" content="no"/>
		<meta name="_token" content="{{ csrf_token() }}" />
		{{-- <title>@yield('title', $SITE_NAME) :: {{$SITE_NAME}}</title> --}}
		@if( isset( $_meta_title ) && $_meta_title )
		<title>{{$_meta_title}} :: {{$SITE_NAME}}</title>
		@else
			<title>@yield('title', $SITE_NAME)</title>
		@endif 
		@if( isset( $_meta_keyword ) && $_meta_keyword )
			<meta name="keywords" content="{{$_meta_keyword}}">
		@endif
		@if( isset( $_meta_desc ) && $_meta_desc )
			<meta name="description" content="{{$_meta_desc}}">
		@endif
		<link rel="shortcut icon" href="{{ url('/public/images/favicon.ico') }}">
		<link rel="icon" type="image/png" href="{{ url('/public/images/favicon.png') }}">
		<link rel="stylesheet" href="{{ url('/public/fonts/fonts.css?v=1.0') }}">
		<link rel="stylesheet" href="{{ url('/public/css/admin.css?v=1.0') }}">
		<script src="{{ url('/public/js/admin.js?v=1.0') }}"></script>
		@yield('css')
	</head>
	<body>
		@include('admin.app.loaderMain')
		@include('admin.app.loaderMainTrans')
	    <div class="admin-login-layout">
			@yield('content')
		</div>
		@yield('js')
		<script type="text/javascript">
			$(window).bind("load",function(){$(".main-loader").fadeOut(400);});
			@if ($success = Session::get('success'))
				gmx_app.notifyWithtEle("{{$success}}",'success');
			@endif
			@if ($warning = Session::get('error'))
				gmx_app.notifyWithtEle("{{$warning}}",'error');
			@endif
		</script>
	</body>
</html>
<!-- Localized -->