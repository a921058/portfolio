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
    
    $(".showimg").on('click', function() {

        $('body').addClass('stop-scrolling');

        var target = $(document).scrollTop();

        $(".web_design_bg").css({"top": target});
        $(".web_design_bg").show();
        $(".web_design_bimg").css({"top": target+100});
        $(".web_design_bimg").show();
        $(".showedimg").attr('src', $(this).attr("src"));
    });

    $(".close_showedimg").on('click', function(){
        $('body').removeClass('stop-scrolling');
        $(".web_design_bg").hide();
        $(".web_design_bimg").hide();
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
            gradient: ["#f2bc1b", "#2a69bb"]
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
            gradient: ["#2a69bb"]
        }
    });
    $('#circle4').circleProgress({
        value: 0.80,
        size: 200,
        startAngle: (1/2)*Math.PI,
        thickness: 20,
        lineCap: "round",
        fill: {
            gradient: ["#2a69bb", "#f2bc1b"]
        }
    });

    var show = true;

    $(window).on("scroll", function() {

        const progress = $(".ability");
        console.log($(this).scrollTop(), progress.offset().top, show)


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