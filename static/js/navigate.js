$(document).ready(function() {

    var dirType = "driving";
    $("#gobtn").click(function() {
        $("#mode").val(dirType);
        console.log($("#mode").val());
        $("#locForm").submit();
    });

    $('#dir1').val('Fremont, CA');
    $('#dir2').val('Yahoo, Sunnyvale');

    $(".optionsBtn").click(function(){
        $("#mode").val($(this).attr('id').toUpperCase());
        $(".optionsBtn").removeClass("optionsBtn-selected");
        $(this).addClass("optionsBtn-selected");
        dirType = $(this).attr('id');
    })

    $("#driving").addClass("optionsBtn-selected");

    $(".dir").keypress(function(e) {
        if (e.which == 13) {
            $("#gobtn").trigger('click');
        }
    });
});
