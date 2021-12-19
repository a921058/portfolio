$(window).on('load', function(){
    // 메뉴바 
    var height = window.innerHeight;
    var x= 0, y = height/2;
    var curveX = 10, curveY = 0, targetX = 0, xitteration = 0, yitteration = 0;
    var menuExpanded = false;
    
    const blob = $('#blob');
    const blobPath = $('#blob-path');
  
    const hamburger = $('.hamburger');
  
    $(this).on('mousemove', function(e){
        x = e.pageX;
        y = e.pageY;
    });
  
    $('.hamburger, .menu-inner').on('mouseenter', function(){
        $(this).parent().addClass('expanded');
        menuExpanded = true;
    });
  
    $('.menu-inner').on('mouseleave', function(){
        menuExpanded = false;
        $(this).parent().removeClass('expanded');
    });
  
    function easeOutExpo(currentIteration, startValue, changeInValue, totalIterations) {
        return changeInValue * (-Math.pow(2, -10 * currentIteration / totalIterations) + 1) + startValue;
    }
  
    var hoverZone = 150;
    var expandAmount = 20;
    
    function svgCurve() {
        if ((curveX > x-1) && (curveX < x+1)) {
            xitteration = 0;
        } else {
            if (menuExpanded) {
            targetX = 0;
            } 
            else {
                xitteration = 0;
                if (x > hoverZone) {
                    targetX = 0;
                } else {
                    targetX = -(((60+expandAmount)/100)*(x-hoverZone));
                }     
            }
            xitteration++;
        }
  
        if ((curveY > y-1) && (curveY < y+1)) {
            yitteration = 0;
        } else {
            yitteration = 0;
            yitteration++;  
        }
  
      curveX = easeOutExpo(xitteration, curveX, targetX-curveX, 100);
      curveY = easeOutExpo(yitteration, curveY, y-curveY, 100);
  
      var anchorDistance = 200;
      var curviness = anchorDistance - 40;
  
      var newCurve2 = "M60,"+height+"H0V0h60v"+(curveY-anchorDistance)+"c0,"+curviness+","+curveX+","+curviness+","+curveX+","+anchorDistance+"S60,"+(curveY)+",60,"+(curveY+(anchorDistance*2))+"V"+height+"z";
  
      blobPath.attr('d', newCurve2);
  
      blob.width(curveX+60);
  
      hamburger.css('transform', 'translate('+curveX+'px, '+curveY+'px)');
      
      window.requestAnimationFrame(svgCurve);
    }
  
    window.requestAnimationFrame(svgCurve);
    
    // 프로필

    //a 태그 이동
    $(".scroll_move").click(function(event){
        event.preventDefault();
        $('html,body').animate({scrollTop:$(this.hash).offset().top}, 1000);
    });
    
    $(".slide_img").on('click', function() {

        $('body').addClass('stop-scrolling');

        var target = $(document).scrollTop();

        $(".web_design_bg").css({"top": target});
        $(".web_design_bg").show();
        $(".web_design_bimg").css({"top": target+100});
        $(".web_design_bimg").show();
        $(".showedimg").attr('src', $(this).attr("src"));
        $(".slidename").html($(this).attr("src").slice(16, -4));
    });

    $(".close_showedimg").on('click', function(){
        $('body').removeClass('stop-scrolling');
        $(".web_design_bg").hide();
        $(".web_design_bimg").hide();
    });

    var img_list = ["./graphicdesign/가방 홈페이지 디자인.jpg",
                    "./graphicdesign/로고제작.jpg",
                    "./graphicdesign/삼성카드 리뉴얼.jpg",
                    "./graphicdesign/캐릭터 드로잉.jpg",
                    "./graphicdesign/팝업창.jpg",
                    "./graphicdesign/팝업창2.jpg"];

    var display_in = [0, 1, 2]
    var display_out = [3, 4, 5]

    $('.button_l').on('click', function() {
        var temp = display_in.pop()
        display_in.unshift(display_out.pop());
        display_out.unshift(temp);
        for(var i=0; i<3; i++) {
            $('.gd_slide_img'+i).attr('src', img_list[display_in[i]]);
        }
    });

    $('.button_r').on('click', function() {
        display_out.push(display_in.shift());
        display_in.push(display_out.shift());
        for(var i=0; i<3; i++) {
            $('.gd_slide_img'+i).attr('src', img_list[display_in[i]]);
        }
    });

    $(".button_r_c").on('click', function(){
        const now = $('.showedimg').attr('src');
        var idx = img_list.indexOf(now);
        var change_img = img_list[(idx + 1) % 6]
        $('.showedimg').attr('src', change_img);
        $(".slidename").html(change_img.slice(16, -4));
    });

    $(".button_l_c").on('click', function(){
        const now = $('.showedimg').attr('src');
        var idx = img_list.indexOf(now);
        if (idx - 1 == -1){
            idx = img_list.length;
        }
        var change_img = img_list[idx - 1]
        $('.showedimg').attr('src', change_img);
        $(".slidename").html(change_img.slice(16, -4));
    });




    $(".hover_img1").mouseenter(function() {
        $(this).attr('src', './UXUI/CGV hover.jpg'); 
    });
    $(".hover_img1").mouseleave(function() {
        $(this).attr('src', './UXUI/CGV 리뉴얼.jpg'); 
    });

    $(".hover_img2").mouseenter(function() {
        $(this).attr('src', './UXUI/손연재 hover.jpg'); 
    });
    $(".hover_img2").mouseleave(function() {
        $(this).attr('src', './UXUI/손연재 리뉴얼.jpg'); 
    });

    $(".hover_img3").mouseenter(function() {
        $(this).attr('src', './UXUI/아쿠아 hover.jpg'); 
    });
    $(".hover_img3").mouseleave(function() {
        $(this).attr('src', './UXUI/아쿠아 리뉴얼.jpg'); 
    });

    $('#circle1').circleProgress({
        value: 0.90,
        size: 200,
        startAngle: (1/2)*Math.PI,
        thickness: 20,
        lineCap: "round",
        fill: {
            gradient: ["#f2bc1b"]
        }
    });
    $('#circle2').circleProgress({
        value: 0.80,
        size: 200,
        startAngle: (1/2)*Math.PI,
        thickness: 20,
        lineCap: "round",
        fill: {
            gradient: ["#f2bc1b"]
        }
    });
    $('#circle3').circleProgress({
        value: 0.80,
        size: 200,
        startAngle: (1/2)*Math.PI,
        thickness: 20,
        lineCap: "round",
        fill: {
            gradient: ["#f2bc1b"]
        }
    });
    $('#circle4').circleProgress({
        value: 0.80,
        size: 200,
        startAngle: (1/2)*Math.PI,
        thickness: 20,
        lineCap: "round",
        fill: {
            gradient: ["#f2bc1b"]
        }
    });

    var show = true;

    $(window).on("scroll", function() {

        const progress = $(".ability");

        if (($(this).scrollTop() + 500> progress.offset().top) && show){
            $('#circle1').circleProgress({value:0.9});
            $('#circle2').circleProgress({value:0.8});
            $('#circle3').circleProgress({value:0.8});
            $('#circle4').circleProgress({value:0.8});
            show = false;
        }

        if (($(this).scrollTop() < progress.offset().top - $(window).height()) && !show) {
            show = true;
        }
    });
});

imgslide();

function imgslide() {
    var val = $("#slide").attr("val");
    var mx = $("#slide").attr("max");
    $("#slide_img"+val).hide();
    if(val == mx) {
        val = 1;
    }
    else {
        val++;
    }
    $("#slide_img"+val).fadeIn(500);
    $("#slide").attr("val", val);
    setTimeout('imgslide()', 3000);
}
