'use strict';

/////////////////////////////////////////////////////////////////////////
// Declarations
const nav = document.querySelector('nav');
const navList = document.querySelector('nav ul');
const navIcon = document.querySelector('nav .icon');
const mainContainer = document.querySelector('main .row');
const movieCard = document.querySelectorAll('main .card');

// console.log(movieCard);

const detailsElements = {
  background: document.querySelector('.home'),
  poster: document.querySelector('.details img'),
  title: document.querySelector('.details h3'),
  description: document.querySelector('.details p'),
  list: document.querySelector('.details ul'),
};

// console.log(details);
let isListOpen = false;
const API_KEY = '15191d6e037f9aa7729f76d2d53b6390';
/////////////////////////////////////////////////////////////////////////
// Functions
// (function () {
//   options.forEach(opt => {
//     navList.insertAdjacentHTML(
//       'beforeend',
//       `<li class="link" data-opt="${opt}">${
//         opt[0].toUpperCase() + opt.slice(1)
//       }</li>`
//     );
//   });
// })();

const fetchAndDisplayMovies = async function (category) {
  const API_URL = `https://api.themoviedb.org/3/movie/${category}?api_key=${API_KEY}`;
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const data = await response.json();
    displayMovies(data.results);
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
};

fetchAndDisplayMovies('now_playing');

const fetchAndDisplayDetails = async function (id) {
  const API_URL = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`;
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const data = await response.json();
    displayDetails(data);
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
};
fetchAndDisplayDetails(1022789);

const displayMovies = function (movies) {
  mainContainer.innerHTML = '';
  console.log(movies);
  movies.forEach(movie => {
    const card = `<div class="col-12 col-sm-6 col-md-4">
                    <div class="d-flex h-100">
                      <div class="card mb-5 flex-fill rounded-0 make-pointer" data-id="${movie.id}">
                        <img src="https://image.tmdb.org/t/p/original${movie.poster_path}" class="card-img-top h-100" alt="" />
                      </div>
                    </div>
                </div>`;
    mainContainer.insertAdjacentHTML('beforeend', card);
  });
};

const displayDetails = function (movieDetails) {
  console.log(movieDetails);
  detailsElements.background.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${movieDetails.backdrop_path})`;
  detailsElements.poster.src = `https://image.tmdb.org/t/p/original${movieDetails.poster_path}`;
  detailsElements.title.textContent = `${movieDetails.title}`;
  detailsElements.description.textContent = `${movieDetails.overview}`;
  detailsElements.list.innerHTML = '';
  movieDetails.genres.forEach(function ({ name: genre }) {
    const HTMLElement = `<li>${genre}</li>`;
    detailsElements.list.insertAdjacentHTML('beforeend', HTMLElement);
  });
};

const closeList = function () {
  navList.classList.add('hide');
  navIcon.style.color = '#fff';
  isListOpen = false;
};
const openList = function () {
  navList.classList.remove('hide');
  navIcon.style.color = 'rgb(255, 0, 191)';
  isListOpen = true;
};

////////////////////////////////////////////////////////////////////////////
// Event Listeners

navIcon.addEventListener('click', function () {
  isListOpen ? closeList() : openList();
});

document.addEventListener('click', function (e) {
  if (
    e.target.closest('nav ul') != navList &&
    e.target.closest('nav .icon') != navIcon
  )
    closeList();
});

navList.addEventListener('click', function (e) {
  if (e.target.classList.contains('link')) {
    console.log(e.target.dataset.category);
    fetchAndDisplayMovies(e.target.dataset.category);
    closeList();
  }
});

mainContainer.addEventListener('click', function (e) {
  if (e.target.closest('.card')) {
    console.log(e.target.closest('.card').dataset.id);
    fetchAndDisplayDetails(e.target.closest('.card').dataset.id);
  }
});

window.addEventListener('scroll', function () {
  if (window.scrollY == 0) {
    nav.classList.remove('bg-dark', 'shadow');
    nav.classList.add('bg-transparent');
  } else {
    nav.classList.remove('bg-transparent');
    nav.classList.add('bg-dark', 'shadow');
  }
});
