(function(){
"use strict";

// calendar
function createDateElm(day, className, tooltip, url) {
  var outer;
  if (url) {
    outer = document.createElement('a');
    outer.href = url;
  } else {
    outer = document.createElement('div');
  }
  outer.className = 'calendar-date ' + className;
  var button = document.createElement('button');
  button.className = 'date-item';
  button.innerText = day;
  if (tooltip) {
    outer.className += ' tooltip';
    outer.setAttribute('data-tooltip', tooltip);
    button.className += ' badge';
  }
  outer.appendChild(button)
  return outer;
}

function generateCal(m) {
  document.getElementById('calendar').innerText = '';
  document.getElementById('yearmonth').innerText = m.toLocaleDateString('en-us', {
    year: 'numeric', month: 'long'
  });
  document.getElementById('yearmonth').setAttribute('data-time', m.getTime());

  var cal = document.getElementById('calendar');
  var daysInMonth = new Date(Date.UTC(m.getUTCFullYear(), m.getUTCMonth() + 1, 0)).getUTCDate();
  var daysInPrevMonth = new Date(Date.UTC(m.getUTCFullYear(), m.getUTCMonth(), 0)).getUTCDate();
  var firstDayBegins = new Date(Date.UTC(m.getUTCFullYear(), m.getUTCMonth(), 1)).getUTCDay();
  var year = m.getUTCFullYear();
  var month = m.getUTCMonth() + 1;
  for (var d = -firstDayBegins + 1, limit = Math.ceil((daysInMonth + firstDayBegins) / 7) * 7 - firstDayBegins; d <= limit; d++) {
    if (d <= 0) {
      cal.appendChild(createDateElm(d + daysInPrevMonth, 'prev-month disabled'));
    } else if (d > daysInMonth) {
      cal.appendChild(createDateElm(d - daysInMonth, 'next-month disabled'));
    } else {
      var post = window._posts.filter(function (p) {
        return (p.date.y == year && p.date.m == month && p.date.d == d);
      })[0];
      if (post) {
        cal.appendChild(createDateElm(d, 'current-month', post.title, post.url));
      } else {
        cal.appendChild(createDateElm(d, 'current-month'));
      }
    }
  }
}

var xhr = new XMLHttpRequest();
xhr.open('GET', '/blog/posts.json', true);
xhr.responseType = 'json';
xhr.onload= function(e) {
  if (this.status == 200) {
    window._posts = this.response.posts;
    generateCal(new Date());

    document.getElementById('prevmon').addEventListener('click', function () {
      var time = document.getElementById('yearmonth').getAttribute('data-time');
      var date = new Date(+time);
      var prev = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() - 1, 1));
      generateCal(prev);
    }, false);
    
    document.getElementById('nextmon').addEventListener('click', function () {
      var time = document.getElementById('yearmonth').getAttribute('data-time');
      var date = new Date(+time);
      var next = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 1));
      generateCal(next);
    }, false);
  }
};
xhr.send();

// toc
tocbot.init({
  tocSelector: '#toc',
  contentSelector: 'main article',
  headingSelector: 'h1, h2, h3',
  listClass: 'nav',
  listItemClass: 'nav-item',
  activeLinkClass: 'text-bold',
});

})();