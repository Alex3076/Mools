;(function(){
	function a(){
		document.documentElement.style.fontSize = document.documentElement.clientWidth / (10) + "px";
	}
	var b = null;
	window.addEventListener("resize", function() {
		clearTimeout(b), b = setTimeout(a, 300)
	}, !1), a();
})();
