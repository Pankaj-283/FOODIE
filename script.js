// Mobile menu (demo)
const burger = document.getElementById('burger');
if (burger) burger.addEventListener('click', () => alert('Add a mobile menu here (UI-only).'));

// Sign-in modal (UI-only)
const openSignIn = document.getElementById('openSignIn');
const closeSignIn = document.getElementById('closeSignIn');
const signInModal = document.getElementById('signInModal');
if (openSignIn && signInModal) openSignIn.addEventListener('click', () => signInModal.classList.add('show'));
if (closeSignIn && signInModal) closeSignIn.addEventListener('click', () => signInModal.classList.remove('show'));
if (signInModal) signInModal.addEventListener('click', (e)=>{ if(e.target===signInModal) signInModal.classList.remove('show'); });

// Restaurant search & filter

document.addEventListener("DOMContentLoaded", () => {
  const cuisineFilter = document.getElementById("cuisineFilter");
  const searchInput = document.getElementById("searchRestaurant");
  const menuItems = document.querySelectorAll(".menu-item");

  cuisineFilter.addEventListener("change", filterMenu);
  searchInput.addEventListener("input", filterMenu);

  function filterMenu() {
    const selectedCuisine = cuisineFilter.value.trim().toLowerCase();
    const searchTerm = searchInput.value.trim().toLowerCase();

    menuItems.forEach(item => {
      const itemCuisine = item.getAttribute("data-cuisine")?.trim().toLowerCase() || "";
      const itemName = item.querySelector("h3")?.textContent.trim().toLowerCase() || "";

      const matchesCuisine = selectedCuisine === "" || itemCuisine === selectedCuisine;
      const matchesSearch = searchTerm === "" || itemName.includes(searchTerm);

      item.style.display = (matchesCuisine && matchesSearch) ? "block" : "none";
    });
  }
});