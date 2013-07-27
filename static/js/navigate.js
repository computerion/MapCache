$(document).ready(function() {
    $("#dir1").val("2029 Stierlin Court, Mountain View, CA");
    $("#dir2").val("701 First Ave, Sunnyvale, CA");

    var dirType = "driving";
    $("#gobtn").click(function() {
        $("#locForm").submit();
    });

    $(".optionsBtn").click(function(){
        $("#mode").val($(this).id.toUpperCase());
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