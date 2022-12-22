<div class="loader-filter" style="display: none;">
	<div class="loader-img">
		<div class="loader-book">
			<div class="loader-inner">
			  <div class="loader-left"></div>
			  <div class="loader-middle"></div>
			  <div class="loader-right"></div>
			</div>
			<ul class="ul-loaderbook"><li></li> <li></li> <li></li> <li></li> <li></li> <li></li> <li></li> <li></li> <li></li> <li></li> <li></li> <li></li> <li></li> <li></li> <li></li> <li></li> <li></li> <li></li></ul>
		  </div>
		<style>
			.loader-filter{position:fixed;left:0;top:0;right:0;bottom:0;display:flex;justify-content:center;align-items:center;background-color: rgba(255, 255, 255,.98);z-index:1011;}
			.loader-book{width:32px;height:12px;position:relative;margin:32px 0 0 0;zoom:1.5;}
			.loader-book .loader-inner{width:32px;height:12px;position:relative;transform-origin:2px 2px;transform:rotateZ(-90deg);animation:loaderbook 6.8s ease infinite;}
			.loader-book .loader-inner .loader-left,
			.loader-book .loader-inner .loader-right{width:60px;height:4px;top:0;border-radius:2px;background:#2f519e;position:absolute;}
			.loader-book .loader-inner .loader-left:before,
			.loader-book .loader-inner .loader-right:before{content:"";width:48px;height:4px;border-radius:2px;background:inherit;position:absolute;top:-10px;left:6px;}
			.loader-book .loader-inner .loader-left{right:28px;transform-origin:58px 2px;transform:rotateZ(90deg);animation:loaderleft 6.8s ease infinite;}
			.loader-book .loader-inner .loader-right{left:28px;transform-origin:2px 2px;transform:rotateZ(-90deg);animation:loaderright 6.8s ease infinite;}
			.loader-book .loader-inner .loader-middle{width:32px;height:12px;border:4px solid #2f519e;border-top:0;border-radius:0 0 9px 9px;transform:translateY(2px);}
			.loader-book .ul-loaderbook{margin:0;padding:0;list-style:none;position:absolute;left:50%;top:0;}
			.loader-book .ul-loaderbook li{height:4px;border-radius:2px;transform-origin:100% 2px;width:48px;right:0;top:-10px;position:absolute;background:#2f519e;transform:rotateZ(0deg) translateX(-18px);animation-duration:6.8s;animation-timing-function:ease;animation-iteration-count:infinite;}
			.loader-book .ul-loaderbook li:nth-child(0){animation-name:bookpage-0;}
			.loader-book .ul-loaderbook li:nth-child(1){animation-name:bookpage-1;}
			.loader-book .ul-loaderbook li:nth-child(2){animation-name:bookpage-2;}
			.loader-book .ul-loaderbook li:nth-child(3){animation-name:bookpage-3;}
			.loader-book .ul-loaderbook li:nth-child(4){animation-name:bookpage-4;}
			.loader-book .ul-loaderbook li:nth-child(5){animation-name:bookpage-5;}
			.loader-book .ul-loaderbook li:nth-child(6){animation-name:bookpage-6;}
			.loader-book .ul-loaderbook li:nth-child(7){animation-name:bookpage-7;}
			.loader-book .ul-loaderbook li:nth-child(8){animation-name:bookpage-8;}
			.loader-book .ul-loaderbook li:nth-child(9){animation-name:bookpage-9;}
			.loader-book .ul-loaderbook li:nth-child(10){animation-name:bookpage-10;}
			.loader-book .ul-loaderbook li:nth-child(11){animation-name:bookpage-11;}
			.loader-book .ul-loaderbook li:nth-child(12){animation-name:bookpage-12;}
			.loader-book .ul-loaderbook li:nth-child(13){animation-name:bookpage-13;}
			.loader-book .ul-loaderbook li:nth-child(14){animation-name:bookpage-14;}
			.loader-book .ul-loaderbook li:nth-child(15){animation-name:bookpage-15;}
			.loader-book .ul-loaderbook li:nth-child(16){animation-name:bookpage-16;}
			.loader-book .ul-loaderbook li:nth-child(17){animation-name:bookpage-17;}
			.loader-book .ul-loaderbook li:nth-child(18){animation-name:bookpage-18;}
			@keyframes bookpage-0 {
			4%{transform:rotateZ(0deg) translateX(-18px);}
			13%,54%{transform:rotateZ(180deg) translateX(-18px);}
			63%{transform:rotateZ(0deg) translateX(-18px);}
			}
			@keyframes bookpage-1 {
			5.86%{transform:rotateZ(0deg) translateX(-18px);}
			14.74%,55.86%{transform:rotateZ(180deg) translateX(-18px);}
			64.74%{transform:rotateZ(0deg) translateX(-18px);}
			}
			@keyframes bookpage-2 {
			7.72%{transform:rotateZ(0deg) translateX(-18px);}
			16.48%,57.72%{transform:rotateZ(180deg) translateX(-18px);}
			66.48%{transform:rotateZ(0deg) translateX(-18px);}
			}
			@keyframes bookpage-3 {
			9.58%{transform:rotateZ(0deg) translateX(-18px);}
			18.22%,59.58%{transform:rotateZ(180deg) translateX(-18px);}
			68.22%{transform:rotateZ(0deg) translateX(-18px);}
			}
			@keyframes bookpage-4 {
			11.44%{transform:rotateZ(0deg) translateX(-18px);}
			19.96%,61.44%{transform:rotateZ(180deg) translateX(-18px);}
			69.96%{transform:rotateZ(0deg) translateX(-18px);}
			}
			@keyframes bookpage-5 {
			13.3%{transform:rotateZ(0deg) translateX(-18px);}
			21.7%,63.3%{transform:rotateZ(180deg) translateX(-18px);}
			71.7%{transform:rotateZ(0deg) translateX(-18px);}
			}
			@keyframes bookpage-6 {
			15.16%{transform:rotateZ(0deg) translateX(-18px);}
			23.44%,65.16%{transform:rotateZ(180deg) translateX(-18px);}
			73.44%{transform:rotateZ(0deg) translateX(-18px);}
			}
			@keyframes bookpage-7 {
			17.02%{transform:rotateZ(0deg) translateX(-18px);}
			25.18%,67.02%{transform:rotateZ(180deg) translateX(-18px);}
			75.18%{transform:rotateZ(0deg) translateX(-18px);}
			}
			@keyframes bookpage-8 {
			18.88%{transform:rotateZ(0deg) translateX(-18px);}
			26.92%,68.88%{transform:rotateZ(180deg) translateX(-18px);}
			76.92%{transform:rotateZ(0deg) translateX(-18px);}
			}
			@keyframes bookpage-9 {
			20.74%{transform:rotateZ(0deg) translateX(-18px);}
			28.66%,70.74%{transform:rotateZ(180deg) translateX(-18px);}
			78.66%{transform:rotateZ(0deg) translateX(-18px);}
			}
			@keyframes bookpage-10 {
			22.6%{transform:rotateZ(0deg) translateX(-18px);}
			30.4%,72.6%{transform:rotateZ(180deg) translateX(-18px);}
			80.4%{transform:rotateZ(0deg) translateX(-18px);}
			}
			@keyframes bookpage-11 {
			24.46%{transform:rotateZ(0deg) translateX(-18px);}
			32.14%,74.46%{transform:rotateZ(180deg) translateX(-18px);}
			82.14%{transform:rotateZ(0deg) translateX(-18px);}
			}
			@keyframes bookpage-12 {
			26.32%{transform:rotateZ(0deg) translateX(-18px);}
			33.88%,76.32%{transform:rotateZ(180deg) translateX(-18px);}
			83.88%{transform:rotateZ(0deg) translateX(-18px);}
			}
			@keyframes bookpage-13 {
			28.18%{transform:rotateZ(0deg) translateX(-18px);}
			35.62%,78.18%{transform:rotateZ(180deg) translateX(-18px);}
			85.62%{transform:rotateZ(0deg) translateX(-18px);}
			}
			@keyframes bookpage-14 {
			30.04%{transform:rotateZ(0deg) translateX(-18px);}
			37.36%,80.04%{transform:rotateZ(180deg) translateX(-18px);}
			87.36%{transform:rotateZ(0deg) translateX(-18px);}
			}
			@keyframes bookpage-15 {
			31.9%{transform:rotateZ(0deg) translateX(-18px);}
			39.1%,81.9%{transform:rotateZ(180deg) translateX(-18px);}
			89.1%{transform:rotateZ(0deg) translateX(-18px);}
			}
			@keyframes bookpage-16 {
			33.76%{transform:rotateZ(0deg) translateX(-18px);}
			40.84%,83.76%{transform:rotateZ(180deg) translateX(-18px);}
			90.84%{transform:rotateZ(0deg) translateX(-18px);}
			}
			@keyframes bookpage-17 {
			35.62%{transform:rotateZ(0deg) translateX(-18px);}
			42.58%,85.62%{transform:rotateZ(180deg) translateX(-18px);}
			92.58%{transform:rotateZ(0deg) translateX(-18px);}
			}
			@keyframes bookpage-18 {
			37.48%{transform:rotateZ(0deg) translateX(-18px);}
			44.32%,87.48%{transform:rotateZ(180deg) translateX(-18px);}
			94.32%{transform:rotateZ(0deg) translateX(-18px);}
			}
			@keyframes loaderleft {
			4%{transform:rotateZ(90deg);}
			10%,40%{transform:rotateZ(0deg);}
			46%,54%{transform:rotateZ(90deg);}
			60%,90%{transform:rotateZ(0deg);}
			96%{transform:rotateZ(90deg);}
			}
			@keyframes loaderright {
			4%{transform:rotateZ(-90deg);}
			10%,40%{transform:rotateZ(0deg);}
			46%,54%{transform:rotateZ(-90deg);}
			60%,90%{transform:rotateZ(0deg);}
			96%{transform:rotateZ(-90deg);}
			}
			@keyframes loaderbook {
			4%{transform:rotateZ(-90deg);}
			10%,40%{transform:rotateZ(0deg);transform-origin:2px 2px;}
			40.01%,59.99%{transform-origin:30px 2px;}
			46%,54%{transform:rotateZ(90deg);}
			60%,90%{transform:rotateZ(0deg);transform-origin:2px 2px;}
			96%{transform:rotateZ(-90deg);}
			}
		</style>
	</div>
</div>