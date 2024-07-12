var data=canvas.toDataURL(); 
// dataURL 的格式为 “data:image/png;base64,\*\*\*\*”,逗号之前都是一些说明性的文字，我们只需要逗号之后的就行了 
data=data.split(',')[1]; 
data=window.atob(data); 
var ia = new Uint8Array(data.length); for (var i = 0; i < data.length; i++) { ia[i] = data.charCodeAt(i); }; // canvas.toDataURL 返回的默认格式就是 image/png 
var blob=new Blob(\[ia], {type:"image/png"});