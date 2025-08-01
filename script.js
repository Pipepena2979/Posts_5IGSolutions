document.addEventListener('DOMContentLoaded', () => {
  const postsContainer = document.getElementById('posts-container');
  const searchInput = document.getElementById('search');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const pageInfo = document.getElementById('pageInfo');

  let allPosts = [];
  let currentPage = 1;
  const postsPerPage = 10;

  fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(data => {
      allPosts = data;
      renderPosts();
    })
    .catch(error => {
      postsContainer.innerHTML = '<p>Error al cargar los datos.</p>';
      console.error('Error:', error);
    });

  function renderPosts() {
    const filtered = filterPosts();
    const totalPages = Math.ceil(filtered.length / postsPerPage);

    const start = (currentPage - 1) * postsPerPage;
    const end = start + postsPerPage;
    const visiblePosts = filtered.slice(start, end);

    postsContainer.innerHTML = '';
    visiblePosts.forEach(post => {
      const postDiv = document.createElement('div');
      postDiv.classList.add('post');
      postDiv.innerHTML = `<h2>${post.title}</h2><p>${post.body}</p>`;
      postsContainer.appendChild(postDiv);
    });

    pageInfo.textContent = `Página ${currentPage} de ${totalPages}`;
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
  }

  function filterPosts() {
    const query = searchInput.value.toLowerCase();
    return allPosts.filter(post => post.title.toLowerCase().includes(query));
  }

  searchInput.addEventListener('input', () => {
    currentPage = 1;
    renderPosts();
  });

  prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      renderPosts();
    }
  });

  nextBtn.addEventListener('click', () => {
    const totalPages = Math.ceil(filterPosts().length / postsPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      renderPosts();
    }
  });
});
