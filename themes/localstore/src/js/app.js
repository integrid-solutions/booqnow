//Navigation active class
$(function () {
  let path = location.pathname.replace(/^\/+|\/+$/gm, '');
  
  $('.section-category-nav li a').each(function () {
    if (path !== '' && this.href.includes(path)) {
      $(this).addClass('active');
    }
  });
  
  $('header li a').each(function () {
    if (path !== '' && this.href.includes(path)) {
      $(this).addClass('active');
    }
  });
  
  $(document).on('click', '.loadmore-btn', function (event) {
    event.preventDefault();
    
    const wrapper = $('.load-more-wrapper');
    const loadMoreBtn = $('.loadmore-btn');
    $.get($(this).attr('href'), function (response) {
      const items = $(response).find('.load-more-item');
      const nextLoadMoreBtn = $(response).find('.loadmore-btn');
      
      items.each((_, item) => {
        wrapper.append(item);
      });
      
      if (nextLoadMoreBtn.length) {
        loadMoreBtn.attr('href', nextLoadMoreBtn[0].href);
      } else {
        loadMoreBtn.hide();
      }
    });
  });
});
