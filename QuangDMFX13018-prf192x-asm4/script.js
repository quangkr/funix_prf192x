// vim: set ft=javascript foldmethod=marker :

// global variables {{{
const articlesList = document.querySelector('.articles-list');
const searchForm = document.querySelector('.navbar-search-form');
const filterForm = document.querySelector('.navbar-filter-form');
const loaderContainer = document.getElementById('loader-container');

const API_KEY = '136979d3a14f564c839fd77a46a02a72';

const initialFilterOption = {
  language: 'en',
  country: '',
  ['search-in']: [ 'title', 'description', 'content' ],
  ['sort-by']: '',
  ['from-date']: '',
  ['from-time']: '00:00',
  ['to-date']: '',
  ['to-time']: '00:00',
}

let filterOption = { ...initialFilterOption };
//}}}

// convert filter options to an object of query strings {{{
function convertOptionToQuery(options) {
  return {
    language: options.language ? `&lang=${options.language}` : '',
    country: options.country ? `&country=${options.country}` : '',
    ['search-in']: options['search-in'].length ? `&in=${options['search-in'].join(',')}` : '',
    ['sort-by']: options['sort-by'] ? `&sortby=${options['sort-by']}` : '',
    ['from-date']: options['from-date'] ? `&from=${options['from-date']}` : '',
    ['from-time']: options['from-date'] ? `T${options['from-time']}:00Z` : '',
    ['to-date']: options['to-date'] ? `&to=${options['to-date']}` : '',
    ['to-time']: options['to-date'] ? `T${options['to-time']}:00Z` : '',
  };
}
//}}}

// fetch top headlines {{{
async function fetchTopHeadlines() {
  const queries = convertOptionToQuery(filterOption);
  const url = [
    'https://gnews.io/api/v4/top-headlines',
    '?',
    `token=${API_KEY}`,
    queries.language,
    queries.countries,
    queries['sort-by'],
    queries['from-date'],
    queries['from-time'],
    queries['to-date'],
    queries['to-time'],
  ].join('');

  const res = await fetch(url);

  if (res.ok) {
    const data = await res.json();
    return {
      ok: true,
      data: data.articles,
    };
  } else {
    return { ok: false };
  }
}
//}}}

// search articles {{{
async function fetchSearchedArticles(query) {
  const queries = convertOptionToQuery(filterOption);
  const url = [
    'https://gnews.io/api/v4/search',
    '?',
    `token=${API_KEY}`,
    `&q=${query}`,
    queries.language,
    queries.countries,
    queries['sort-by'],
    queries['from-date'],
    queries['from-time'],
    queries['to-date'],
    queries['to-time'],
    queries['search-in'],
  ].join('');

  const res = await fetch(url);

  if (res.ok) {
    const data = await res.json();
    return {
      ok: true,
      data: data.articles,
    };
  } else {
    return { ok: false };
  }
}
//}}}

// set filter option {{{
function setFilterOption() {
  let newOption = { ['search-in']: [] };
  const formData = new FormData(filterForm);
  for (var entry of formData.entries()) {
    if (entry[0] != 'search-in') {
      newOption[entry[0]] = entry[1];
    } else {
      newOption['search-in'].push(entry[1]);
    }
  }

  filterOption = { ...newOption };
}
//}}}

// set filter form {{{
function setFilterForm() {
  Object.keys(filterOption).filter(field => field != 'search-in')
    .forEach(function(fieldName) {
      filterForm.elements[fieldName].value = filterOption[fieldName];
    });
  // our checkboxes need special attention
  filterForm.elements["search-in"].forEach(function(element) {
    element.checked = filterOption["search-in"].includes(element.value)
                    ? true
                    : false;
  });
}
//}}}

// render articles list {{{
function renderArticlesList(data) {
  // loop through each article
  return data.map(function(article) {
    // clone the template
    const articleTemplate = document.getElementById('template-article-piece')
      .content
      .firstElementChild
      .cloneNode(true);

    const articleImg = articleTemplate.querySelector('.article-piece-img');
    const articleImgLink = articleTemplate.querySelector('.article-piece-img-link');
    const articleTitleLink = articleTemplate.querySelector('.article-piece-title-link');
    const articleTime = articleTemplate.querySelector('.article-piece-time');
    const articleSummary = articleTemplate.querySelector('.article-piece-summary');

    articleImg.src = article.image;
    articleTitleLink.textContent = article.title;
    articleTime.textContent = new Date(article.publishedAt)
      .toLocaleString('en-US',
        {
          dateStyle: 'full',
          timeStyle: 'medium',
          hour12: true,
        });
    articleSummary.textContent = article.description;
    //articleSummary.textContent = article.content
    //  .split(' ')
    //  .slice(0, -2)
    //  .join(' ');
    articleImgLink.href = article.url;
    articleTitleLink.href = article.url;

    return articleTemplate;
  });
}
//}}}

// render error message {{{
function renderErrorMessage(message) {
  const errorMessageTemplate = document.getElementById('template-error')
    .content
    .firstElementChild
    .cloneNode(true);

  const errorTextNode = errorMessageTemplate.querySelector('.error-text');
  errorTextNode.textContent = message;

  return errorMessageTemplate;
}
//}}}

// render page {{{
async function renderPage(container, type = 'TOP_HEADLINES', query = '') {
  let fetchResult;

  // show the loader, then fetch data
  loaderContainer.classList.remove('hidden');
  switch (type) {
    case 'TOP_HEADLINES':
      fetchResult = await fetchTopHeadlines();
      break;
    case 'SEARCH':
      fetchResult = query ? await fetchSearchedArticles(query) : await fetchTopHeadlines();
      break;
    default:
      fetchResult = { ok: false };
      break;
  }

  // scraps old contents
  container.innerHTML = '';

  if (!fetchResult.ok) {
    container.appendChild(renderErrorMessage('There was some error fetching articles. Please try again!'));
  } else if (!fetchResult.data.length) {
    container.appendChild(renderErrorMessage('No articles found! Please try another search string or filter option!'));
  } else {
    renderArticlesList(fetchResult.data).forEach(function(element) {
      container.appendChild(element);
    });
  }

  // hide the loader again
  loaderContainer.classList.add('hidden');
}
//}}}

// event listeners {{{
searchForm.addEventListener('submit', function(e) {
  e.preventDefault();
  renderPage(articlesList, 'SEARCH', searchForm.elements.searchquery.value);
});

filterForm.addEventListener('submit', function(e) {
  e.preventDefault();
  setFilterOption();
  filterForm.classList.remove('opened');
});

document.getElementById('navbar-filter-form-button-reset').addEventListener('click', function() {
  filterOption = { ...initialFilterOption };
  setFilterForm();
});

// filter toggle is more complex
document.getElementById('navbar-filter-toggle').addEventListener('click', function() {
  if (filterForm.className.includes('opened')) {
    // simply hide the form if it is not hidden
    filterForm.classList.remove('opened');
  } else {
    // update the form input values with global object
    // before unhiding it
    setFilterForm();
    filterForm.classList.add('opened');
  }
})

//}}}

renderPage(articlesList, 'TOP_HEADLINES');
