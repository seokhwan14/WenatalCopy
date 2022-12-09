$(function() {

  //스크롤시 header .scrolled 클래스 추가/삭제로
  // header영역이 보이거나 안보이게 함
  var didScroll;
  let lastScrollTop = 0;
  let delta = 5;
  let navbarHeight = $('header').outerHeight();
  $(window).scroll(function(e) {
    didScroll = true;
  });
  setInterval(function() {
    if (didScroll) {
      hasScrolled();
      didScroll = false;
    }
  }, 250);

  function hasScrolled() {
    let st = $(this).scrollTop();
    if (Math.abs(lastScrollTop - st) <= delta)
      return;
    if (st > lastScrollTop && st > navbarHeight) {
      $('header').addClass('scrolled');
    } else {
      $('header').removeClass('scrolled');
    }
    lastScrollTop = st;
  };

  //burger-toggle 클래스 추가/삭제로 작동하게하기
  $("#gnbbtn .gnbbtn.right").on('click', function() {
    if ($(".burger-toggle").hasClass("off")) {
      $(".burger-toggle").removeClass("off");
    } else {
      $(".burger-toggle").addClass("off");
    }
  });

  $("#gnbbtn .gnbbtn.left").on('click', function() {
    if ($(".buying").hasClass("buyoff")) {
      $($(".buying").removeClass("buyoff"));
    } else {
      $($(".buying").addClass("buyoff"));
    }
  })
  $(".x-area").on('click', function() {
    if ($(".buying").hasClass("buyoff")) {
      $($(".buying").removeClass("buyoff"));
    } else {
      $($(".buying").addClass("buyoff"));
    }
  })




  $(window).scroll(function() {
    let winH = $(window).height(); //현재창 높이
    let winW = $(window).width(); //현재창 너비
    let scTop = $(this).scrollTop(); //내려간 scroll양

    //together background이미지 영역
    let togetherBg = $("#together .together-bg-container");
    if (winH > 0 && winW >= 1007) {
      $(togetherBg).css("transform", `translateY(${100 + (scTop * 0.5)}px)`)
    } else if (winH > 2500) {
      togetherBg.css("transform", "translateY(0px)");
    }
    //together background이미지 영역 끝.

    //him,her부분 시작
    let productsHim = $("#products-him .container");
    let productsHer = $("#products-her .container")
    let forHim = $("#products-him .him-bg")
    let forHer = $("#products-her .her-bg")
    let himTop = productsHim.offset().top;
    let herTop = productsHer.offset().top + winH;
    //him,her값이 같기때문에 her에 100vh값을 추가해줌
    // console.log("Him" + himTop);
    // console.log("scroll == " + scTop);


    // him-her fixed기능을 넣어주기 위한 if문
    if (scTop >= himTop && scTop <= herTop && winW >= 1024) {
      forHim.addClass("fixed-him");
      $("#products-him .container h2").addClass("fixed-him02");
      $("#products-him .container .container-him").addClass("fixed-him03");
      forHer.addClass("fixed-her");
      $("#products-her .container h2").addClass("fixed-her02");
      $("#products-her .container .container-her").addClass("fixed-her03");
    } else if (scTop >= herTop || scTop <= himTop && winW >= 1024) {
      forHim.removeClass("fixed-him");
      $("h2", productsHim).removeClass("fixed-him02");
      $(".container-him", productsHim).removeClass("fixed-him03")
      forHer.removeClass("fixed-her");
      $("h2", productsHer).removeClass("fixed-her02");
      $(".container-her", productsHer).removeClass("fixed-her03")
    }
    // console.log(himTop);
    // console.log(herTop);

    //opacity값을 주기 위한 창 비율
    let ratio = ((scTop - himTop) / winH) * 100;
    let opaci = ratio * 0.02;
    // console.log(ratio);
    // console.log(opaci);
    if (ratio <= 0) {
      // $("#products-him .container h2, #products-him .container .container-him").css("margin-top",45);
    } else if (ratio >= 40 || ratio < 60) {
      $("#products-him .container h2, #products-him .container .container-him").css("opacity", 1 - opaci);
      $("#products-her .container h2, #products-her .container .container-her").css("opacity", opaci - 0.6);
      $("#products-him .container h2.fixed-him02, #products-him .container .container-him.fixed-him03").css("top", (37.5 - ratio * 0.1) + "vh");
      $("#products-her .container h2.fixed-her02, #products-her .container .container-her.fixed-her03").css("top", (47.5 - ratio * 0.1) + "vh");
    } else if (scTop > himTop && winW < 1024) {
      $("#products-him .container h2, #products-him .container .container-him").css("opacity", 10);
      $("#products-her .container h2, #products-her .container .container-her").css("opacity", 10);
    }
    // console.log(scTop);
    // console.log(himTop);
    //him,her 부분 끝.


    // carousel부분 시작
    let pmiPx = $("#products-more-intro").offset().top + (winH * 3 / 10);
    let caroPx = scTop - pmiPx + winH;
    // console.log(caroPx);

    if (caroPx >= 0 && caroPx < winH && winW >= 1024) {
      $("#carousel ul").css("transform", `translateX(-${caroPx}px)`)
    } else if (caroPx >= winH && winW >= 1024) {
      $("#carousel ul, #products-heading").css("transform", `translate(-${caroPx}px, ${scTop - pmiPx}px)`)
    }
    // console.log(caroPx / winH);
    if ((caroPx / winH) < 3.5 && winW >= 1024) {
      $("#products-heading h3 p span").css("bottom", "-12vh");
    } else if ((caroPx / winH) >= 3.5 && (caroPx / winH) < 4.5 && winW >= 1024) {
      $("#products-heading h3 p span").css("bottom", "0px").css("transition", "1s");
    }

    if ((caroPx / winH) >= 3.2 && (caroPx / winH) < 4.5 && winW >= 1024) {
      $("#products-heading").css("transform", `translate(-${(3.2 * winH)}px, ${scTop - pmiPx}px)`);
    } else if ((caroPx / winH) >= 4.5 && winW >= 1024) {
      $("#products-heading").css("transform", `translate(-${(3.2 * winH)}px, ${3.5 * winH}px)`);
    }
    //carousel 영역 끝
  })
  //scroll 영역 끝





  //test image carousel 영역 시작
  // let winW1 = $(window).width();
  // let width001 = winW1 / 100 * 35;
  var widthNum = $("#test-section .test-image ul li").outerWidth();
  let liLeng = $("#test-section .test-image.one ul li").length;

  //답답해서 resize function으로 화면비율 줄어들 시 widthNum값을 다시 조정해주는방법을 적용
  $(window).resize(function() {
    $("#test-section .test-image ul").css("width", widthNum * liLeng);
    widthNum = $("#test-section .test-image ul li").outerWidth();
  })
  $("#test-section .test-image.one ul li:last").prependTo("#test-section .test-image.one ul");
  $("#test-section .test-image.half ul li:last").prependTo("#test-section .test-image.half ul");
  $("#test-section .test-image ul").css("margin-left", -widthNum);
  initialFunc("prev");

  function initialFunc(init) {
    $("#test-section .test-image ul").css("margin-left", -widthNum);
    if (init === "prev") {
      $("#test-section .test-image.one ul li:last").prependTo("#test-section .test-image.one ul");
      $("#test-section .test-image.half ul li:last").prependTo("#test-section .test-image.half ul");
    } else if (init === "next") {
      $("#test-section .test-image.one ul li:first").appendTo("#test-section .test-image.one ul");
      $("#test-section .test-image.half ul li:first").appendTo("#test-section .test-image.half ul");
    }
  }

  function actionBtn(el) {
    el.click(function() {
      let testImage = $("#test-section .test-image ul");
      let testMarginLeft = parseInt(testImage.css("margin-left"));
      let isAni = testImage.is(":animated");
      console.log(widthNum);
      // console.log(winW1);

      //text class추가 및 삭제
      $("#test-section .test-text ul li").each(function(e, i) {
        let imageText = $("#test-section .test-image.one ul li:nth-child(2) img").attr("alt");
        // console.log(imageText);
        // console.log($(this).attr("class"));
        if (imageText == $(this).attr("class")) {
          $("#test-section .test-text ul li").removeClass("active-text");
          $(this).addClass("active-text");
        }
      })
      //동작중일때 작동불가능
      if (!isAni) {
        if (el.attr("id") === "btn-prev") {
          testImage.animate({
            marginLeft: testMarginLeft + widthNum
          }, "slow", "swing", function() {
            initialFunc("prev");
          })
        } else if (el.attr("id") === "btn-next") {
          testImage.animate({
            marginLeft: testMarginLeft - widthNum
          }, "slow", "swing", function() {
            initialFunc("prev");
          })
        }
      }
    })
  }
  $(".btn").each(function() {
    actionBtn($(this));
  })
  //test-image carousel영역 끝
})
