$(function () {
  //header fixed
  const $header = $(".header");
  if ($header.length) {
    $(window).on("scroll", function () {
      if ($(this).scrollTop() > 0) {
        $header.addClass("fixed");
      } else {
        $header.removeClass("fixed");
      }
    });
  }

  //featureText
  const featureTexts = document.querySelectorAll(
    ".feature-list-item-textwrapper"
  );

  if (featureTexts.length && window.IntersectionObserver) {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "0px",
        threshold: 0.1,
      }
    );
    featureTexts.forEach((TextWrapper) => {
      observer.observe(TextWrapper);
    });
  }

  //fadeInEffect
  function triggerFadeIn() {
    $(".fadeInEffect").addClass("fadeIn");
    const $delayAnimation = $(".head-text.fadeInEffect.fadeIn");
    if ($delayAnimation.length) {
      setTimeout(() => {
        $delayAnimation.addClass("text-fadein-done");
      }, 1100);
    }
  }
  setTimeout(triggerFadeIn, 1000);

  // tab
  const tabContainerSelector = ".swiper-container";
  const tabClass = "trainerStaff-tab-menu";
  const tabActiveClass = "active";

  // 1. Swiperの初期化
  const trainerStaffSwiper = new Swiper(tabContainerSelector, {
    allowTouchMove: false,
    autoHeight: true, // 高さを自動調整（必須）
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
  });
  //リスト初期表示、画面に入ったらスライドイン
  const trainerStaffSection = document.querySelector(".trainerStaff");

  if (trainerStaffSection && window.IntersectionObserver) {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            $(".trainer-list__item").addClass("animate");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "0px",
        threshold: 0.1,
      }
    );
    observer.observe(trainerStaffSection);
  }

  // 2. タブボタンの取得
  // document.querySelectorAll で、jQueryのように使えるNodeListを取得
  const tabbtnEles = document.querySelectorAll(`.${tabClass}`);

  // 3. クリックイベントの再設定
  tabbtnEles.forEach((tab, index) => {
    tab.addEventListener("click", (e) => {
      e.preventDefault();

      const currentIndex = trainerStaffSwiper.activeIndex;
      if (index === currentIndex) {
        return;
      }

      // **タブのアクティブクラス切り替え**
      // 既存のアクティブなタブからクラスを削除
      document
        .querySelector(`.${tabClass}.${tabActiveClass}`)
        .classList.remove(tabActiveClass);
      // クリックされたタブにクラスを追加
      tab.classList.add(tabActiveClass);

      // **Swiperスライドの切り替え**
      trainerStaffSwiper.slideTo(index);

      trainerStaffSwiper.updateAutoHeight();
      trainerStaffSwiper.update();

      // **リストアイテムのアニメーション**
      $(".trainer-list__item, .staff-list__item").removeClass("animate");
      setTimeout(() => {
        if (index === 0) {
          $(".trainer-list__item").addClass("animate");
        } else if (index === 1) {
          $(".staff-list__item").addClass("animate");
        }
      }, 50);
    });
  });

  // 💡 URLパラメータによる初期切り替え（initTab）は、
  // 動作が複雑化するため、まずは削除して手動で動くことを確認してください。
  // 初期表示は最初のスライド（index 0）に自動でなります。

  //studio slideshow
  if ($(".studio-slideshow").length) {
    const studioSwiper = new Swiper(".studio-slideshow", {
      loop: true,
      pagination: {
        el: ".studio-indicator",
        clickable: false,
        bulletClass: "studio-indicator__dot",
        bulletActiveClass: "active",
      },
      navigation: {
        nextEl: ".studio-nav__next",
        prevEl: ".studio-nav__prev",
      },
      speed: 500,
    });
  }

  //scroll-x pop-up display none
  $(function () {
    var $scrollContainer = $(".price .scroll");
    var $popup = $(".scroll-popup");
    $scrollContainer.on("scroll", function () {
      if ($(this).scrollLeft() > 0) {
        $popup.addClass("is-hidden");
      }
    });
  });

  //scroll top
  const $pagetop = $(".toTop");
  if ($pagetop.length) {
    $(window).on("scroll", function () {
      if ($(this).scrollTop() > 300) {
        $pagetop.addClass("is-show");
      } else {
        $pagetop.removeClass("is-show");
      }
    });
  }
  $pagetop.click(function () {
    $("body,html").animate({ scrollTop: 0 }, 500);
    return false;
  });
});

//以下、記録用
/*
$(function () {
  //header fixed
  const $header = $(".header");
  if ($header.length) {
    $(window).on("scroll", function () {
      if ($(this).scrollTop() > 0) {
        $header.addClass("fixed");
      } else {
        $header.removeClass("fixed");
      }
    });
  }

  //fadeInEffect
  function triggerFadeIn() {
    $(".fadeInEffect").addClass("fadeIn");
    const $delayAnimation = $(".head-text.fadeInEffect.fadeIn");
    if ($delayAnimation.length) {
      setTimeout(() => {
        $delayAnimation.addClass("text-fadein-done");
      }, 1100);
    }
  }
  setTimeout(triggerFadeIn, 1000);

  //tab
  const trainerStaffSwiper = new Swiper(".trainerStaff-tab-container", {
    allowTouchMove: false,
    autoHeight: true,
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    on: {
      init: function () {
        if (this.activeIndex === 0) {
          setTimeout(() => {
            $(".trainer-list__item").addClass("animate");
          }, 50);
        }
      },
    },
    slideChangeTransitionEnd: function () {
      const targetIndex = this.activeIndex;
      const $tabs = $(".trainerStaff-tab-menu");
      $tabs.removeClass("active");
      $tabs.eq(targetIndex).addClass("active");
    },
  });
  const trainerStaffTabMenus = document.querySelectorAll(
    ".trainerStaff-tab-menu a"
  );

  trainerStaffTabMenus.forEach((link, index) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      trainerStaffSwiper.slideTo(index);
      $(link)
        .closest(".trainerStaff-tab")
        .find(".trainerStaff-tab-menu")
        .removeClass("active");
      $(link).parent().addClass("active");
    });
  });

  $(".trainerStaff-tab-menu").on("click", function (e) {
    e.preventDefault();
    const $this = $(this);
    const targetIndex = $this.index();
    $(".trainerStaff-tab-menu").removeClass("active");
    $this.addClass("active");
    trainerStaffSwiper.slideTo(targetIndex);
    $(".trainer-list__item, .staff-list__item").removeClass("animate");
    setTimeout(() => {
      if (targetIndex === 0) {
        $(".trainer-list__item").addClass("animate");
      } else if (targetIndex === 1) {
        $(".staff-list__item").addClass("animate");
      }
    }, 50);
  });

  //studio slideshow
  if ($(".studio-slideshow").length) {
    const studioSwiper = new Swiper(".studio-slideshow", {
      loop: true,
      pagination: {
        el: ".studio-indicator",
        clickable: false,
        bulletClass: "studio-indicator__dot",
        bulletActiveClass: "active",
      },
      navigation: {
        nextEl: ".studio-nav__next",
        prevEl: ".studio-nav__prev",
      },
      speed: 500,
    });
  }

  //scroll top
  const $pagetop = $(".toTop");
  if ($pagetop.length) {
    $(window).on("scroll", function () {
      if ($(this).scrollTop() > 300) {
        $pagetop.addClass("is-show");
      } else {
        $pagetop.removeClass("is-show");
      }
    });
  }
});
*/

/* js
document.addEventListener("DOMContentLoaded", () => {
  //header fixed
  const header = document.querySelector(".header");

  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 0) {
        header.classList.add("fixed");
      } else {
        header.classList.remove("fixed");
      }
    });
  }

  //fadeInEffect
  function triggerFadeIn() {
    document.querySelectorAll(".fadeInEffect").forEach(function (el) {
      el.classList.add("fadeIn");
    });

    const delayAnimation = document.querySelector(
      ".head-text.fadeInEffect.fadeIn"
    );
    if (delayAnimation) {
      setTimeout(() => {
        delayAnimation.classList.add("text-fadein-done");
      }, 1100);
    }
  }
  setTimeout(triggerFadeIn, 1000);

  //tab
  const tabs = document.querySelectorAll(".trainerStaff-tab-menu");
  const contents = document.querySelectorAll(".trainerStaff-tab-content");
  const getItemSelector = (content) => {
    if (content.classList.contains("trainer-list")) {
      return ".trainer-list__item";
    } else if (content.classList.contains("staff-list")) {
      return ".staff-list__item";
    }
    return null;
  };

  function initializeTabAnimation() {
    const initialContent = document.querySelector(
      ".trainerStaff-tab-content.active"
    );
    if (initialContent) {
      const itemSelector = getItemSelector(initialContent);
      if (itemSelector) {
        initialContent.querySelectorAll(itemSelector).forEach((item) => {
          item.classList.add("animate");
        });
      }
    }
  }
  initializeTabAnimation();

  tabs.forEach((tab) => {
    tab.addEventListener("click", (e) => {
      e.preventDefault();
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      contents.forEach((c) => {
        c.classList.remove("active");
        const itemSlector = getItemSelector(c);
        if (itemSlector) {
          c.querySelectorAll(itemSlector).forEach((item) => {
            item.classList.remove("remove");
          });
        }
      });
      const targetId = tab.querySelector("a").getAttribute("href");
      const targetContent = document.querySelector(targetId);
      if (targetContent) {
        targetContent.classList.add("active");
        setTimeout(() => {
          const itemSlector = getItemSelector(targetContent);
          if (itemSlector) {
            targetContent.querySelectorAll(itemSlector).forEach((item) => {
              item.classList.add("animate");
            });
          }
        }, 50);
      }
    });
  });

  //studio
  const slideshowContainer = document.querySelector(".studio-slideshow-inner");
  const slideshowItems = document.querySelectorAll(".studio-slideshow__item");
  const prevButton = document.querySelector(".studio-nav__prev");
  const nextButton = document.querySelector(".studio-nav__next");
  const indicatorContainer = document.querySelector(".studio-indicator");

  const totalOriginalSlides = slideshowItems.length;
  let currentIndex = 1;

  if (totalOriginalSlides > 0) {
    const cloneLast = slideshowItems[totalOriginalSlides - 1].cloneNode(true);
    const cloneFirst = slideshowItems[0].cloneNode(true);
    slideshowContainer.prepend(cloneLast);
    slideshowContainer.appendChild(cloneFirst);
    const totalSlides = totalOriginalSlides + 2;

    slideshowContainer.style.width = `${totalSlides * 100}%`;
    const initialOffset = -((currentIndex * 100) / totalSlides);
    slideshowContainer.style.transform = `translateX(${initialOffset}%)`;
    const dots = [];
    for (let i = 0; i < totalOriginalSlides; i++) {
      const dot = document.createElement("li");
      dot.classList.add("studio-indicator__dot");
      indicatorContainer.appendChild(dot);
      dots.push(dot);
    }
    dots[currentIndex - 1].classList.add("active");

    function updateIndicator(originalIndex) {
      dots.forEach((d) => d.classList.remove("active"));
      dots[originalIndex - 1].classList.add("active");
    }

    function updateSlide(step) {
      let newIndex = currentIndex + step;
      slideshowContainer.style.transition = "transform 0.5s ease-in-out";
      const offset = -((newIndex * 100) / totalSlides);
      slideshowContainer.style.transform = `translateX(${offset}%)`;
      currentIndex = newIndex;

      let originalIndexToHighlight = currentIndex;
      if (currentIndex === 0) {
        originalIndexToHighlight = totalOriginalSlides;
      } else if (currentIndex === totalSlides - 1) {
        originalIndexToHighlight = 1;
      }
      updateIndicator(originalIndexToHighlight);

      if (currentIndex === totalSlides - 1 || currentIndex === 0) {
        let jumpToIndex =
          currentIndex === totalSlides - 1 ? 1 : totalOriginalSlides;
        setTimeout(() => {
          slideshowContainer.style.transition = "none";
          const jumpOffset = -((jumpToIndex * 100) / totalSlides);
          slideshowContainer.style.transform = `translateX(${jumpOffset}%)`;
          currentIndex = jumpToIndex;
        }, 500);
      }
    }

    nextButton.addEventListener("click", () => {
      updateSlide(1);
    });
    prevButton.addEventListener("click", () => {
      updateSlide(-1);
    });
  }

  //scroll to top
  const pagetop = document.querySelector(".toTop");

  if (pagetop) {
    // スクロール時の表示/非表示を制御
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        pagetop.classList.add("is-show");
      } else {
        pagetop.classList.remove("is-show");
      }
    });
  }
});
*/

/**
 *     function updateSlide(direction) {
      const leavingSlide = slideshowItems[currentIndex];
      let newIndex = currentIndex;
      if (direction === "next") {
        newIndex = (currentIndex + 1) % totalSlides;
        leavingSlide.classList.add("prev");
      } else if (direction === "prev") {
        newIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        leavingSlide.classList.add("next");
      }
      leavingSlide.classList.remove("active");
      currentIndex = newIndex;
      const enteringSlide = slideshowItems[currentIndex];
      enteringSlide.classList.add("active");
      setTimeout(() => {
        leavingSlide.classList.remove("prev", "next");
      }, 500);
    }

 */
