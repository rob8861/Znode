$(function() {

    var graph = new NodeGraph();
    // composition view

    // consider moving to NodeGraph
    $("#canvas").mouseup(function(e) {
        if((openWin.css("display") == "none") && (openComp.css("display") == "none")) {
            var children = $(e.target).children();
            if(children.length > 0) {
                var type = children[0].tagName;
                if(type == "desc" || type == "SPAN") {
                    graph.addNodeAtMouse();
                }
            }
        }
    });
    // ui code
    var openWin = $("#openWin");
    openWin.hide();
    
    var openComp = $('#openComp');
    openComp.hide();

    $(".btn").mouseenter(function() {
        $(this).animate({
            "backgroundColor" : "white"
        }, 200);
    }).mouseleave(function() {
        $(this).animate({
            "backgroundColor" : "#efefef"
        });
    });
    $("#clear").click(function() {
        graph.clearAll();
    });
    $("#help").click(function() {
        window.open("http://www.zreference.com/znode", "_blank");
    });
    $('#inheritance').click(function() {
        // open up a menu with class names
        alert("Open a menu with list of class name.");
    });
    $('#resources').click(function() {
        $('#res').dialog({
            autoOpen : true,
            show : "blind",
            hide : "explode"
        });
    });
    $('#composition').click(function() {
        var classNames = $('#classNames');
        classNames.html('');
        openComp.fadeIn();
        classNames.append("<div class='className'>Class Name 1<\/div>");
        classNames.append("<div class='className'>Class Name 2<\/div>");
        classNames.append("<div class='className'>Class Name 3<\/div>");
        
    });

    $("#save").click(saveFile);

    function saveFile() {
        var name = filename.val();
        if(name == "" || name == nameMessage) {
            alert("Please Name Your File");
            filename[0].focus();
            return;
        }
        $.post("json/save.php", {
            data : graph.toJSON(),
            name : name
        }, function(data) {
            alert("Your file was saved.");
        });
    }


    $("#canvas").mousedown(function() {
        openWin.fadeOut();
        openComp.fadeOut();
    });

    $("#open").click(function() {
        var fileList = $("#files");
        fileList.html("<div>loading...<\/div>");
        openWin.fadeIn();
        fileList.load("json/files.php?" + Math.random() * 1000000);
    });
    var nameMessage = "Enter your file name";
    var filename = $("#filename").val(nameMessage);

    filename.focus(function() {
        if($(this).val() == nameMessage) {
            $(this).val("");
        }
    }).blur(function() {
        if($(this).val() == "") {
            $(this).val(nameMessage);
        }
    });

    $("#nameForm").submit(function(e) {
        e.preventDefault();
        saveFile();
    });

    $(".file").live('click', function() {
        var name = $(this).text();
        $.getJSON("files/" + name + ".json", {
            n : Math.random()
        }, function(data) {
            graph.fromJSON(data);

            filename.val(name);
        });
    }).live('mouseover', function() {
        $(this).css({
            "background-color" : "#ededed"
        });
    }).live("mouseout", function() {
        $(this).css({
            "background-color" : "white"
        });
    });
    
    $('.className').live('click', function() {
        $('#comp').dialog({
            autoOpen : true,
            show : "blind",
            hide : "explode"
        });
    }).live('mouseover', function() {
        $(this).css({
            "background-color" : "#ededed"
        });
    }).live('mouseout', function() {
        $(this).css({
            "background-color" : "white"
        });
    });
});
