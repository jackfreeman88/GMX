<div class="main-loader">
	<div class="loader-img">
		{{-- <img src="{{ url('public/images/favicon.png') }}" style="width: 15vh; height: 15vh;"/>	--}}
		<div class="line-scale"><div></div><div></div><div></div><div></div><div></div></div></div></div>
		<style>
			.main-loader{position:fixed;left:0;top:0;right:0;bottom:0;display:flex;justify-content:center;align-items:center;background-color: rgba(0, 0, 0,.98);z-index:1050;}
			/***** Lines loader *****/
			@-webkit-keyframes line-scale {
			    0% { -webkit-transform: scaley(1); transform: scaley(1);}
			   50% {-webkit-transform: scaley(0.4); transform: scaley(0.4);}
			  100% {-webkit-transform: scaley(1); transform: scaley(1); }
			}
			@keyframes line-scale {
			    0% { -webkit-transform: scaley(1); transform: scaley(1);}
			   50% { -webkit-transform: scaley(0.4); transform: scaley(0.4);}
			  100% { -webkit-transform: scaley(1); transform: scaley(1); } 
			}
			.line-scale > div:nth-child(1) {
			  -webkit-animation: line-scale 1s -0.4s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
			          animation: line-scale 1s -0.4s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
			}
			.line-scale > div:nth-child(2) {
			  -webkit-animation: line-scale 1s -0.3s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
			          animation: line-scale 1s -0.3s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08); 
			}
			.line-scale > div:nth-child(3) {
			  -webkit-animation: line-scale 1s -0.2s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
			          animation: line-scale 1s -0.2s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
			}
			.line-scale > div:nth-child(4) {
			  -webkit-animation: line-scale 1s -0.1s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
			          animation: line-scale 1s -0.1s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08); 
			}
			.line-scale > div:nth-child(5) {
			  -webkit-animation: line-scale 1s 0s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
			          animation: line-scale 1s 0s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08); }
			.line-scale > div {
			  background-color: #22a612;
			  width: 4px;
			  height: 30px;
			  border-radius: 2px;
			  margin: 2px;
			  display: inline-block;
			  -webkit-animation-fill-mode: both;
			          animation-fill-mode: both;
			}
		</style>
	</div>
</div>