/**
 * Created by root on 2/19/17.
 */
/*$('#myModal').modal({
    keyboard : true
});*/


$(document).ready(function () {

  /*  /!*function hide(id){
        $('.editform+id').hide();
    }*!/
    function drop(id){
  /!*      $('.dropform+id').click(function () {
            /!*$('.editform+id').slideToggle();*!/
        })*!/
       /!* $('."editform+id"').css("display","block2");*!/
       var editform = "editform"+id
        $('.editform').css("display","block")

    };*/
 /* $('.editform').hide();
  $('.dropform').click(function(){
      var $edit =  $(this).next().next();
     /!* var $edit = $(this).closest('.container').find('.editform')*!/
     if($edit.is(':hidden')){
          $edit.show();
     }
     else{
         $edit.hide()
     }
  })*/
$('.removeGood').click(function (e) {
    var deleteId = $(this).data('id');
   $.ajax({
       url : '/goods/delete/'+deleteId,
       type : 'DELETE',
       success : function () {
           
       }
   })
    window.location = '/goods'
})

})();