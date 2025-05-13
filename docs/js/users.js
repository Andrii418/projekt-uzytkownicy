document.addEventListener("DOMContentLoaded", () => {
  const cardsContainer = document.getElementById("users-cards");
  const tableBody = document.getElementById("users-table-body");
  const pagination = document.getElementById("pagination");
  const searchInput = document.getElementById("search-input");
  const sortSelect = document.getElementById("sort-select");

  let usersData = [];
  let currentPage = 1;
  const usersPerPage = 3;

  fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => res.json())
    .then((data) => {
      usersData = data;
      renderUsers();
    })
    .catch(() => {
      cardsContainer.innerHTML = "<p>Wystąpił błąd przy ładowaniu danych.</p>";
    });

  function renderUsers() {
    const searchQuery = searchInput.value.toLowerCase();
    const sortBy = sortSelect.value;

    let filtered = usersData.filter((user) =>
      user.name.toLowerCase().includes(searchQuery)
    );

    if (sortBy === "name") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "city") {
      filtered.sort((a, b) => a.address.city.localeCompare(b.address.city));
    }

    const totalPages = Math.ceil(filtered.length / usersPerPage);
    currentPage = Math.min(currentPage, totalPages);

    const start = (currentPage - 1) * usersPerPage;
    const paginatedUsers = filtered.slice(start, start + usersPerPage);

    cardsContainer.innerHTML = "";
    tableBody.innerHTML = "";

    paginatedUsers.forEach((user) => {
      const card = document.createElement("div");
      card.className = "user-card";
      card.innerHTML = `
        <div class="user-header">
          <i class="fas fa-user-circle avatar-icon"></i>
          <h3>${user.name}</h3>
        </div>
        <p><i class="fas fa-envelope"></i> ${user.email}</p>
        <p><i class="fas fa-city"></i> ${user.address.city}</p>
        <a href="user-details.html?id=${user.id}" class="details-link">
          <i class="fas fa-info-circle"></i> Zobacz szczegóły
        </a>
      `;
      cardsContainer.appendChild(card);
    });

    paginatedUsers.forEach((user) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.phone}</td>
        <td>${user.address.city}</td>
        <td><a href="user-details.html?id=${user.id}" class="table-btn">Szczegóły</a></td>
      `;
      tableBody.appendChild(row);
    });

    renderPagination(totalPages);
  }

  function renderPagination(totalPages) {
    pagination.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement("button");
      btn.textContent = i;
      if (i === currentPage) btn.classList.add("active");
      btn.addEventListener("click", () => {
        currentPage = i;
        renderUsers();
      });
      pagination.appendChild(btn);
    }
  }

  searchInput.addEventListener("input", () => {
    currentPage = 1;
    renderUsers();
  });

  sortSelect.addEventListener("change", () => {
    currentPage = 1;
    renderUsers();
  });
});
