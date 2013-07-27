$(document).ready(function() {
    $("#dir1").val("53 Wild Rose Drive, Andover, MA");
    $("#dir2").val("14 Bridle Path Road, Andover, MA");

    $("#gobtn").click(function() {
        var input1 = $("#dir1").val();
        var input2 = $("#dir2").val();
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