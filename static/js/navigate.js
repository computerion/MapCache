$(document).ready(function() {
    $("#dir1").val("2029 Stierlin Court, Mountain View, CA");
    $("#dir2").val("701 First Ave, Sunnyvale, CA");

    $("#gobtn").click(function() {
        $("#locForm").submit();
    });

    $(".optionsBtn").click(function(){
        $("#mode").val($(this).val.toUpperCase());
    })

    $(".dir").keypress(function(e) {
        if (e.which == 13) {
            $("#gobtn").trigger('click');
        }
    });
});