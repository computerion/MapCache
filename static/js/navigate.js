$(document).ready(function() {
    $("#dir1").val("53 Wild Rose Drive, Andover, MA");
    $("#dir2").val("14 Bridle Path Road, Andover, MA");

    var dirType = "driving";
    $("#gobtn").click(function() {
        var input1 = $("#dir1").val();
        var input2 = $("#dir2").val();
        $("#locForm").submit();
    });

    $(".optionsBtn").click(function(){
        $("#mode").val($(this).val().toUpperCase());
        $(".optionsBtn").removeClass("optionsBtn-selected");
        $(this).addClass("optionsBtn-selected");
        dirType = $(this).id;
        console.log($(this));
        console.log(dirType);
    })

    $("#driving").addClass("optionsBtn-selected");

    $(".dir").keypress(function(e) {
        if (e.which == 13) {
            $("#gobtn").trigger('click');
        }
    });
});