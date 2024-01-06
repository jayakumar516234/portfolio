
 var value=0;
function menubar(){
   
    if(value%2==0){
        document.getElementById("menuList").style.left="50%";
        document.getElementById("menuList").style.transition="1s";
        value=false;
        value++;
    }
    else{
        document.getElementById("menuList").style.left="100%";
        value++;
    }
}