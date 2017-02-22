/*-------------innerText property in Firefox*/
//var browser = document.getElementById("browser").getAttribute("name");
//alert(navigator.appName);
if(navigator.appName.indexOf("Netscape")!=-1)
{
	HTMLElement.prototype.__defineGetter__("innerText",function()  
	{  
		var textRange = this.ownerDocument.createRange();  
		 //Using range to retrieve the content of the object  
		textRange.selectNodeContents(this);  
		//only get the content of the object node 
		//textRange.		
			  return textRange.toString();  
			   // give innerText the value of the node content  
			 }  
	);  
	HTMLElement.prototype.__defineSetter__("innerText",function(val)  
	{  

		this.innerHTML = val; 

	}  
	); 
}

/*----------------------------------------------------------------------------*/

String.prototype.decode=function()
{
var i = 0;
var g="";
var code;
var o;
var s=this;
for(i=0;i<s.length;i++)
{
code = s.charCodeAt(i);
if(code>=1072 && code<=1103)
g += String.fromCharCode(code-848);
else 
{
switch(code)
{
case 1025:g += String.fromCharCode(code-857);
break;  
case 1105:g += String.fromCharCode(code-921);
break;
default:g+=s[i];

}
}
}


return g;



}

String.prototype.encode= function()
{

var i = 0;
var g="";
var code;
var o;
var s=this;
for(i=0;i<s.length;i++)
{
code = s.charCodeAt(i);
if(code>=192 && code<=255)
g += String.fromCharCode(code+848);
else 
{

switch(code)
{

case 168:g+=String.fromCharCode(code+857);
break;
case 184:g+=String.fromCharCode(code+921);
break;
default:g+=s[i];

}
}
}


return g;
}


String.prototype.count=function(sym)
{
var count=0;
var pos = this.indexOf(sym);
while(pos!=-1)
{
count++;
pos=this.indexOf(sym,pos+sym.length);
}
return count;
}



Array.prototype.count=function(sym)
{
var s=this.join(String.fromCharCode(1));
return s.count(sym);
}


String.prototype.getPosFrom = function(sym,pos)
{
var p = this.indexOf(sym);
var c=1;
while(p!=-1 && c<pos)
{
c++;
p = this.indexOf(sym,p+sym.length);

}

return p;
}
String.prototype.getPartFrom = function(sym,pos)
{
var cop=this;
var p = cop.indexOf(sym);
var c=0;
while(p!=-1 && c<pos)
{
cop=cop.substr(p+1);
p = cop.indexOf(sym);
c++;
}

return cop;
}
String.prototype.toSym=function(sym,pos)
{
var p=this.indexOf(sym);
var res=0;
while(p!=-1 && p+1<pos)
{
res++;
p=this.indexOf(sym,p+sym.length);
}
res-=2;
res = res==-2 ? 0 : res;
return res;

}

String.prototype.repeat = function (h)
{

var i;
var s="";
for(i=1;i<=h;i++) s+=this; 
return s;

}
String.prototype.str_replace = function(search,rep)
{
var pos = this.indexOf(search);
var res = this;
while(pos!=-1)
{
res = res.substr(0,pos)+rep+res.substr(pos+search.length);
pos = res.indexOf(search);
}
return res;

}
String.prototype.trim = function()
{
var res = this;
while(res.charCodeAt(0)==32 || res.charCodeAt(0)==9)
{
res = res.substr(1);
}
while(res.charCodeAt(res.length-1)==32 || res.charCodeAt(res.length-1)==9)
{
res = res.substr(0,res.length-1);
}


return res;
}


k = new Object(document.getElementById("line"));
w = new Object(document.getElementById("percent"));
pb =new Object(document.getElementById("progressbar"));

function array_pos(arr,search,tut,front)
{	

k.innerHTML='<font style="background-color:black;color:black;">' + ".".repeat(50) +'</font>';

var stLength = k.innerText.length;

w.innerText=0;
k.innerHTML='<font style="background-color:black;color:black;">' + ".".repeat(stLength) +'</font>';
pb.style.visibility="inherit";
var all = arr.count(search);
if(all==0) return false;
//alert(all);
var count=0;

if(tut==undefined) tut=false;
var i,g,per,x;
x=0;
per=0;
/*
100=arr.length
s=k
*/

var pq = Math.floor(100/stLength);
var del=Math.floor((pq*arr.length)/(100-pq));


/*
var len = arr.length;
var del=Math.floor(100/stLength);
*/
var z;
g = 0;
var element;
var elements=new Array();
var poses = new Array();
for(i=0;i<=arr.length-1;i++)
{
if(count>=all) break;
if(front)
{
element = arr[i].toLowerCase().str_replace(","," ").trim();
elements=element.split(" ");

for(z=0;z<elements.length;z++)
{
if(elements[z].substr(0,search.length)==search)
    {
poses[g] = i;
count++;
g++;
break;    


   }


}


}
else
{
if(tut)
 {
			
element = arr[i].toLowerCase().str_replace(","," ").trim();
elements=element.split(" ");


       
if(in_array(elements,search.toLowerCase()))
   {				
poses[g] = i;
count++;
g++;
   }
               
 }
else
{

if(arr[i].toLowerCase().indexOf(search.toLowerCase())!=-1)
 {
poses[g] = i;
count++;
g++;

 }

}
}	
//per=Math.floor(((i*100)/len)/del);
if(per>=del*2)
  {
per=0;
x++;
k.innerHTML='<font style="background-color:navy;color:navy;">'+k.innerText.substr(0,x*2)+'</font><font style="background-color:black;color:black;">' +k.innerText.substr(x*2)+"</font>";
w.innerText=parseInt(w.innerText)+pq*2;
   }
per++;
}
	if(poses.length!=0) return poses;
	else return false;
}
function in_array(arr,sym)
{
   var i;
   in_arr = false;
   for(i=0;i<=arr.length;i++)
   {
      if(arr[i] == sym) 
      {
         in_arr = true;
         break;
      }
   }
   return in_arr;
}
function search(method,srch,lang,tut,front)
{
var res = new Array();

switch(method)
{
default:
var rus = base["rus"].split("$%$");
var tat=base["tat"].split("$%$");

	switch(lang)
	{
case "tat":

var poses = array_pos(tat,srch,document.getElementById("tut").checked,front);
if(poses!==false)
{
var i;
var aor =  new Array();
var atr =  new Array();				
for(i=0;i<poses.length;i++) 
{
					 
aor[i] = rus[poses[i]];
atr[i] = tat[poses[i]];				

}
res=new Array(aor,atr);

			}
else return false;
			return res;	
		break;
		case "rus":

var poses = array_pos(rus,srch,document.getElementById("tut").checked,front);

if(poses!==false)
{
var i;
var aor =  new Array();
var atr =  new Array();				

for(i=0;i<poses.length;i++)
{
					
aor[i] = tat[poses[i]];
atr[i] = rus[poses[i]];
}
res = new Array(aor,atr);
}
else return false;
			return res;	
		break;
}
break;
case "line":
aor = new Array();
atr = Array();
pb.style.visibility="inherit";
k.innerHTML='<font style="background-color:black;color:black;">' + ".".repeat(50) +'</font>';
stLength=k.innerText.length;
w.innerText=0;
/*

100 = stLength
x = 1 
*/
var x=Math.floor(100/stLength);
var per;
var z;
switch(lang)
{
case "tat":
var len=base["tat"].length;
var pos = base["tat"].indexOf(srch);
var beg,en,symTo,trPos;
var i=0;
var g,temp;
var elemets=new Array();
while(pos!=-1)
{
beg=base["tat"].lastIndexOf("$%$",pos);
en=base["tat"].indexOf("$%$",pos);
temp=base["tat"].substr(beg+3,en-beg-3);

symTo=base["tat"].substr(0,pos).count("$%$");

trPos = base["rus"].getPosFrom("$%$",symTo);
if(front)
{
elements = temp.str_replace(",",String.fromCharCode(32)).trim().split(String.fromCharCode(32));
for(z=0;z<elements.length;z++)
{
if(elements[z].substr(0,srch.length)==srch && !in_array(aor,temp))
{
aor[i]=temp;
atr[i]=base["rus"].substr(trPos+3,base["rus"].indexOf("$%$",trPos+3)-trPos-3);

i++;
break;


}



}


}
else
{

if(document.getElementById("tut").checked)
{
elements = temp.str_replace(",",String.fromCharCode(32)).trim().split(String.fromCharCode(32));
for(g=0;g<elements.length;g++)
{
if(elements[g]==srch && !in_array(aor,temp))
{

aor[i]=temp;
atr[i]=base["rus"].substr(trPos+3,base["rus"].indexOf("$%$",trPos+3)-trPos-3);

i++;
break;
}


}


}
else
{
if(!in_array(aor,temp))
{
aor[i]=temp;
atr[i]=base["rus"].substr(trPos+3,base["rus"].indexOf("$%$",trPos+3)-trPos-3);
i++;
}
}
}
pos=base["tat"].indexOf(srch,pos+srch.length);

//alert("i ");

/*
100 = base["tat"].length
per = pos;

*/
per=Math.floor((((pos+srch.length)*100)/len)/x);
k.innerHTML='<font style="background-color:navy;color:navy;">'+k.innerText.substr(0,Math.floor(per/x))+'</font><font style="background-color:black;color:black;">' +k.innerText.substr(Math.floor(per/x))+"</font>";
w.innerText=per;

//alert(pos+" "+temp);
}
//alert("end");
res= new Array(atr,aor);

return (aor.length==0 ? false : res);
break;

case "rus":
var pos = base["rus"].indexOf(srch);
var len = base["rus"].length;
var beg,en,symTo,trPos;
var i=0;
var temp;
var g=0;
var elements = new Array();
while(pos!=-1)
{
beg=base["rus"].lastIndexOf("$%$",pos);
en=base["rus"].indexOf("$%$",pos);
temp=base["rus"].substr(beg+3,en-beg-3);
symTo=base["rus"].substr(0,pos).count("$%$");

trPos = base["tat"].getPosFrom("$%$",symTo);

if(front)
{
elements = temp.str_replace(",",String.fromCharCode(32)).trim().split(String.fromCharCode(32));
for(z=0;z<elements.length;z++)
{
if(elements[z].substr(0,srch.length)==srch && !in_array(aor,temp))
{
aor[i]=temp;
atr[i]=base["tat"].substr(trPos+3,base["tat"].indexOf("$%$",trPos+3)-trPos-3);

i++;
break;


}



}


}
else
{

if(tut)
{
elements = temp.str_replace(",",String.fromCharCode(32)).trim().split(String.fromCharCode(32));
for(g=0;g<elements.length;g++)
{

if(elements[g]==srch && !in_array(aor,temp))
{
aor[i]=temp;
atr[i]=base["tat"].substr(trPos+3,base["tat"].indexOf("$%$",trPos+3)-trPos-3);
i++;
break;
}


}


}
else
{
if(!in_array(aor,temp))
{
aor[i]=temp;
atr[i]=base["tat"].substr(trPos+3,base["tat"].indexOf("$%$",trPos+3)-trPos-3);
i++;
}
}

}
pos=base["rus"].indexOf(srch,pos+srch.length);

//alert("i "+i);
per=Math.floor((((pos+srch.length)*100)/len)/x);
k.innerHTML='<font style="background-color:navy;color:navy;">'+k.innerText.substr(0,Math.floor(per/x))+'</font><font style="background-color:black;color:black;">' +k.innerText.substr(Math.floor(per/x))+"</font>";
w.innerText=per;

}
res= new Array(atr,aor);
//alert("end "+aor.length);

return (aor.length==0 ? false : res);
break; 

}
break;

}
	
}
function showInfo(i)
{

alert(String.fromCharCode(13)+String.fromCharCode(10)+decode("fromHTML",result[in_translate][i]).encode());
}



function decode(type,str)
{
var res = "";

switch(type)
{
case "toHTML":
var tat = new Array(1175,1187,1211,1241,1257,1199);

var code;
for(i=0;i<=str.length-1;i++)
{
code=str.charCodeAt(i);
if(in_array(tat, code))
{
res+=String.fromCharCode(38)+String.fromCharCode(35)+code+";";
}
else res+=str.charAt(i);
}
break;
case "fromHTML":
var pos = str.indexOf("&#");
var code;
while(pos!=-1)
{
res = str.substr(pos); 
code = res.substr(2,res.indexOf(";")-2);

str = str.substr(0,pos)+String.fromCharCode(code)+res.substr(res.indexOf(";")+1);
pos = str.indexOf("&#");
}
res=str;
break;

}

return res;
}



document.getElementById("main_button").onclick = function()
{

if(document.getElementById("inversion").checked)
{
in_translate=1;
in_original=0;

}
else
{
in_translate=0;
in_original=1;

}
	if(document.getElementById("search_string").value.trim().length!=0)
	{

var s_string=document.getElementById("search_string").value;



var code=test_string.charCodeAt(0);
if(code>=192 && code<=255) s_string=s_string.decode();
var method=document.getElementById("method").value;
if(method=="smart") 
{
method=s_string.length<=4 ? "k" : "line";
}

result = search(method,decode("toHTML",s_string).toLowerCase(),document.getElementById("lang").value,document.getElementById("tut").checked,document.getElementById("front").checked);
document.getElementById("result_table").innerHTML = "";
if(result)
{
var i;
tr = new Array();			
for(i=0;i<result[0].length;i++)
{

tr[i]= "<tr><td><button  class=\"tbutton\" onClick='showInfo("+i+")'>"+result[in_original][i].encode() + "</button></td></tr><tr><td><hr></td></tr>";
	

}
count_results=0;
document.getElementById("results_caption").innerText=tr.length+" results was found";
SomeResults(0,10);
		}
		else 

{

document.getElementById("results_caption").innerText=0+" results was found";

document.getElementById("result_table").innerHTML = "<tr><td>Not found!</td></tr>";

}
	}
	else alert("Empty search string");
document.getElementById("line").innerHTML='<font style="background-color:navy;color:navy;">' + ".".repeat(50) +'</font>';
document.getElementById("percent").innerText=100;
document.getElementById("progressbar").style.visibility="hidden";
	
}

//alert(base["tat"].length);
function SomeResults(beg,how,back)
{

var i;
document.getElementById("result_table").innerHTML="";
if(back)
{
 beg=count_results-how-how;

}
for(i=beg;i<how+beg;i++)
{
if(i>=tr.length) break;
document.getElementById("result_table").innerHTML+=tr[i];


}
if(back) count_results-=how;
else count_results+=how;

//alert(beg+" "+how+" "+count_results+"="+tr.length);
var add="";
if(how<count_results) add = "<td><input type=\"button\"  onClick=\"SomeResults("+count_results+","+how+",true)\" value=\"<<<\"  /></td>";
var forw="";
if(count_results<tr.length) 
forw="<td><input type=\"button\" onClick=\"SomeResults("+count_results+","+how+",false)\" value=\">>>\"  /></td>";
if(add!="" || forw!="")
document.getElementById("result_table").innerHTML+="<tr>"+add+forw+"</tr>";

}


document.onmouseup=function()
{
	var o = document.getElementById("search_string");
	if(o.value.length<=62)
	{
		if(o.size!=0) o.size=o.value.length+12; 
		else o.size=5;
	}
}
document.onkeyup=document.onmouseup;
k_buttons=document.getElementsByName("keyboard");
/*document.getElementById("search_string").onfocus = disable_keyboard(false);
//document.getElementById("search_string").onblur = disable_keyboard(true);
function disable_keyboard(mode)
{
	var i;
	for(i=0;i<k_buttons.length;i++)
	{
		k_buttons[i].disabled=mode;
	}
}
*/

document.body.style.visibility="inherit";
//var kmk = search("k","абай","tat"));
//alert(kmk[0][0]);
//alert(base["tat"].length +" "+base["rus"].length);
//document.getElementById("splash").style.visibility="hidden";
