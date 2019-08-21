// //designWidth:设计稿的实际宽度值，需要根据实际设置
// //maxWidth:制作稿的最大宽度值，需要根据实际设置
// //这段js的最后面有两个参数记得要设置，一个为设计稿实际宽度，一个为制作稿最大宽度，例如设计稿为750，最大宽度为750，则为(750,750)
// //使用1rem=100px转换你的设计稿的像素，例如设计稿上某个块是100px*300px,换算成rem则为1rem*3rem。
export const flexibel = function (designWidth, maxWidth) {
	var doc = document,
		win = window,
		docEl = doc.documentElement,
		remStyle = document.createElement("style"),
		tid;

	function refreshRem() {
		var width = docEl.getBoundingClientRect().width;
		maxWidth = maxWidth || 540;
		width > maxWidth && (width = maxWidth);
		var rem = width * 100 / designWidth;
		remStyle.innerHTML = 'html{font-size:' + rem + 'px;}';
	}

	if (docEl.firstElementChild) {
		docEl.firstElementChild.appendChild(remStyle);
	} else {
		var wrap = doc.createElement("div");
		wrap.appendChild(remStyle);
		doc.write(wrap.innerHTML);
		wrap = null;
	}
	//要等 wiewport 设置好后才能执行 refreshRem，不然 refreshRem 会执行2次；
	refreshRem();

	win.addEventListener("resize", function () {
		clearTimeout(tid); //防止执行两次
		tid = setTimeout(refreshRem, 300);
	}, false);

	win.addEventListener("pageshow", function (e) {
		if (e.persisted) { // 浏览器后退的时候重新计算
			clearTimeout(tid);
			tid = setTimeout(refreshRem, 300);
		}
	}, false);

	if (doc.readyState === "complete") {
		doc.body.style.fontSize = "14px";
	} else {
		doc.addEventListener("DOMContentLoaded", function () {
			doc.body.style.fontSize = "14px";
		}, false);
	}
}




// export const mainResize = () => {
// 	// let windowObject = window;
// 	let doc = document;
// 	// docEl = doc.documentElement;
// 	// remStyle = document.createElement("style");
// 	let winWidth =  window.innerWidth;
// 	let winHeight =  window.innerHeight;
// 	let maiContainer = doc.querySelector('.main-container');
// 	let contentContainer = doc.querySelector('.content-container');
// 	//当手机屏幕高宽比大于设计稿的高宽比时,高度自适应
// 	// let htmlObject = doc;
// 	if ((winHeight / winWidth) > (1300 / 750)) {
		
// 	console.log(window.innerWidth)
// 			let fontSize = winWidth / 7.5;
// 			// remStyle.innerHTML = 'html{font-size:' + fontSize + 'px;}';
// 			doc.querySelector('html').style.fontSize=fontSize + 'px';
// 			if(maiContainer&&contentContainer){
// 				maiContainer.style.display = 'block';
// 				contentContainer.style.top=((winHeight - contentContainer.clientHeight ) / 2) + 'px';
// 				contentContainer.style.left = '0';
// 			}
// 	} else {
// 	let maiContainerall = doc.querySelectorAll('.main-container');
// 	let contentContainerall = doc.querySelectorAll('.content-container');
// 			//当手机屏幕高宽比小于设计稿的高宽比时,宽度自适应
// 			let fontSize = winHeight / 1300 * 750 / 7.5;
// 			doc.querySelector('html').style.fontSize=fontSize + 'px';
// 			if(maiContainer&&contentContainer){
// 				maiContainer.style.display = 'block';
// 				for(var i=0;i<contentContainerall.length;i++){
// 					contentContainerall[i].style.top= '0';
// 					contentContainerall[i].style.left = ((winWidth - contentContainer.clientWidth ) / 2) + 'px';
// 				}
// 				// contentContainer.style.top= '0';
// 				// contentContainer.style.left = ((winWidth - contentContainer.clientWidth ) / 2) + 'px';
// 			}
// 	}
// }
// // window.onload= ()=>{
// mainResize();
// // }

// window.addEventListener("resize", function () {
// 	mainResize();
// }, false);