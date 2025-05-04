const API_KEY = 'cf217d7ad39c8aca63938b7b3bcb6fb9';
const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ko-KR&page=1`;

fetch(url)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        const cardContainer = document.querySelector('.cardBox');

        data.results.forEach(movie => {
            const card = document.createElement('div');
            card.classList.add('card');

            card.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w300${movie.poster_path}" />
            <div>
              <h5 id="movie_title">${movie.title}</h5>
              <p id="vote_average">✶ ${movie.vote_average}</p>
              <p>${movie.overview}</p>
            </div>
          `;

            cardContainer.appendChild(card);
            card.addEventListener('click', () => {
                document.getElementById('modalTitle').textContent = movie.title;
                document.getElementById('modalOverview').textContent = movie.overview;
                document.getElementById('movieModal').style.display = 'flex';
            });
        });


    });

document.getElementById('searchButton').addEventListener('click', function (e) {
    e.preventDefault();

    const keyword = document.getElementById('searchBox').value.toLowerCase(); // 검색어
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        const title = card.querySelector('h5').textContent.toLowerCase();
        if (title.includes(keyword)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});