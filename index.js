const API_KEY = 'cf217d7ad39c8aca63938b7b3bcb6fb9';
const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ko-KR&page=1`;

fetch(url)
    // 이 URL로 웹 통신을 요청한다. 괄호 안에 다른 것이 없다면 GET!
    .then(res => res.json())
    // 통신 요청을 받은 데이터는 res라는 이름으로 JSON화 한다
    .then(data => {
        console.log(data); // 개발자 도구에 찍어보기
        const cardContainer = document.querySelector('.cardBox'); // 영화 카드들 들어갈 div

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
        }); // JSON 형태로 바뀐 데이터를 data라는 이름으로 붙여 사용한다


    });

document.getElementById('searchButton').addEventListener('click', function (e) {
    e.preventDefault(); // 폼 제출 방지

    const keyword = document.getElementById('searchBox').value.toLowerCase(); // 검색어
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        const title = card.querySelector('h5').textContent.toLowerCase();
        if (title.includes(keyword)) {
            card.style.display = 'block'; // 보이기
        } else {
            card.style.display = 'none'; // 숨기기
        }
    });
});