(function(){

// $("li").on("cilck","a",function(){
//     $(this).addClass('active').siblings().removeClass('active');
// });
$(".country>li").on("click",function(){
    $(this).addClass('active').siblings().removeClass('active');
    // alert("被电击了")
});
   //获取当前tab中鼠标停在的table栏的索引  
   var index = $(this).index();  
   //  console.log(index);  
   //根据这个索引切换，下面的展示  
   $(".main").eq(index).addClass("selected").siblings().removeClass("selected");  
   
   
   
   
   
   














})()