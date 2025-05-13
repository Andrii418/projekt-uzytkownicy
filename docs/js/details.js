// js/details.js
document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const userId = params.get('id');
  const container = document.getElementById('user-details');
  const editBtn = document.getElementById("editBtn");
  const editForm = document.getElementById("editForm");

  let currentUser = null;

  if (!userId) {
    container.innerHTML = "<p>Nie znaleziono ID użytkownika.</p>";
    return;
  }

  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    const user = await res.json();

    currentUser = user;

    container.innerHTML = `
      <p><i class="fas fa-user"></i> <strong>Imię i nazwisko:</strong> ${user.name}</p>
      <p><i class="fas fa-user-tag"></i> <strong>Nazwa użytkownika:</strong> ${user.username}</p>
      <p><i class="fas fa-envelope"></i> <strong>Email:</strong> ${user.email}</p>
      <p><i class="fas fa-phone"></i> <strong>Telefon:</strong> ${user.phone}</p>
      <p><i class="fas fa-city"></i> <strong>Miasto:</strong> ${user.address.city}</p>
      <p><i class="fas fa-road"></i> <strong>Ulica:</strong> ${user.address.street}</p>
      <p><i class="fas fa-globe"></i> <strong>Strona WWW:</strong> <a href="http://${user.website}" target="_blank">${user.website}</a></p>
      <p><i class="fas fa-building"></i> <strong>Firma:</strong> ${user.company.name}</p>
    `;

    // Wypełnij formularz domyślnymi wartościami
    editForm.name.value = user.name;
    editForm.email.value = user.email;
    editForm.phone.value = user.phone;

  } catch (err) {
    container.innerHTML = "<p>Błąd ładowania danych użytkownika.</p>";
  }

  editBtn.addEventListener("click", () => {
    container.style.display = "none";
    editForm.style.display = "block";
  });

  editForm.addEventListener("submit", (e) => {
    e.preventDefault();

    currentUser.name = editForm.name.value;
    currentUser.email = editForm.email.value;
    currentUser.phone = editForm.phone.value;

    container.innerHTML = `
      <p><i class="fas fa-user"></i> <strong>Imię i nazwisko:</strong> ${currentUser.name}</p>
      <p><i class="fas fa-user-tag"></i> <strong>Nazwa użytkownika:</strong> ${currentUser.username}</p>
      <p><i class="fas fa-envelope"></i> <strong>Email:</strong> ${currentUser.email}</p>
      <p><i class="fas fa-phone"></i> <strong>Telefon:</strong> ${currentUser.phone}</p>
      <p><i class="fas fa-city"></i> <strong>Miasto:</strong> ${currentUser.address.city}</p>
      <p><i class="fas fa-road"></i> <strong>Ulica:</strong> ${currentUser.address.street}</p>
      <p><i class="fas fa-globe"></i> <strong>Strona WWW:</strong> <a href="http://${currentUser.website}" target="_blank">${currentUser.website}</a></p>
      <p><i class="fas fa-building"></i> <strong>Firma:</strong> ${currentUser.company.name}</p>
    `;

    editForm.style.display = "none";
    container.style.display = "block";
  });
});
