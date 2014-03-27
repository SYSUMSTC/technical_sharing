function setClickNum(){
	var obj = document.getElementById("showNum");
	var url = "./server.php";
	var data = "mode=read&name=countnum";
	var oncomplete = function(value){
		obj.innerHTML = value;
	}
	getRequest(url,data,oncomplete);
}
function addClick(){
	var url = "./server.php";
	var data = "mode=write&name=countnum";
	var oncomplete = function(value){
		var obj = document.getElementById("showNum");
		obj.innerHTML = parseInt(obj.innerHTML) + 1;
	}
	getRequest(url,data,oncomplete);
}
function getRequest(url, data, oncomplete) {
	var ajax = GetHttpObject();
    if (!ajax) {
    	alert("no");
    }
    ajax.open("POST", url, true);
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.onreadystatechange = function(){
		if (ajax.readyState == 4 && ajax.status == 200){
			if (ajax.responseText.length > 0){
				oncomplete(ajax.responseText);
			}
 		}
	};
    ajax.send(data);
}


function GetHttpObject(){
    if (typeof XMLHttpRequest != 'undefined'){
    	 return new XMLHttpRequest();
    }  
    try{
        return new ActiveXObject("Msxml2.XMLHTTP");
    }catch (e){
        try{
            return new ActiveXObject("Microsoft.XMLHTTP");
        }catch (e) {}
    }
    return false;
}
