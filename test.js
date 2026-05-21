import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyC1O-WVb95Z77o2JelptaZ8ljRPdNVDIeY",
  authDomain: "yeom-official.firebaseapp.com",
  projectId: "yeom-official",
  storageBucket: "yeom-official.appspot.com",
  messagingSenderId: "285438640273",
  appId: "1:285438640273:web:7d91f4ddc24536a3c5ff30",
  measurementId: "G-EBXHHN5WFK",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const searchInput = document.getElementById("searchInput");
const resultsList = document.getElementById("resultsList");

// ─── SEARCH BAR LOGIC ───────────────────────────────────────────

// Create overlay dynamically
const overlay = document.createElement("div");
overlay.classList.add("search-overlay");
document.body.appendChild(overlay);

const searchResults = document.querySelector(".search-results");

searchInput.addEventListener("input", async () => {
  const searchTerm = searchInput.value.trim().toLowerCase();

  if (searchTerm === "") {
    resultsList.innerHTML = "";
    searchResults.classList.remove("active");
    overlay.classList.remove("active");
    return;
  }

  // Show overlay + floating results panel
  searchResults.classList.add("active");
  overlay.classList.add("active");

  try {
    const usersRef = collection(db, "users");
    const q = query(
      usersRef,
      where("username", ">=", searchTerm),
      where("username", "<=", searchTerm + "\uf8ff")
    );
    const querySnapshot = await getDocs(q);

    resultsList.innerHTML = "";

    if (querySnapshot.empty) {
      resultsList.innerHTML = "<p>No users found.</p>";
      return;
    }

    querySnapshot.forEach((doc) => {
      const userData = doc.data();
      const userElement = document.createElement("div");
      userElement.classList.add("user-result");
      userElement.innerHTML = `
        <p>@${userData.username}</p>
        <button onclick="viewProfile('${doc.id}')">View Profile</button>
      `;
      resultsList.appendChild(userElement);
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    resultsList.innerHTML = "<p>Error loading results. Please try again.</p>";
  }
});

// Dismiss overlay on background tap
overlay.addEventListener("click", () => {
  searchInput.value = "";
  resultsList.innerHTML = "";
  searchResults.classList.remove("active");
  overlay.classList.remove("active");
  searchInput.blur();
});

window.viewProfile = (userId) => {
  window.location.href = `profile.html?uid=${userId}`;
};

// ─── SUGGESTED PROFILES LOGIC ───────────────────────────────────
function fisherYatesShuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

async function loadSuggestedUsers() {
  const currentUser = auth.currentUser;
  const snapshot = await getDocs(collection(db, "users"));

  const allUsers = snapshot.docs
    .map(doc => ({ id: doc.id, ...doc.data() }))
    .filter(u => u.id !== currentUser?.uid); // exclude self

  const suggested = fisherYatesShuffle(allUsers).slice(0, 5);
  renderSuggested(suggested);
}

function renderSuggested(users) {
  const container = document.getElementById("suggestedCards");

  // Keep the invite card, replace the rest
  const inviteCard = container.querySelector(".card:first-child");
  container.innerHTML = "";
  container.appendChild(inviteCard);

  users.forEach(user => {
    const initials = user.username
      ? user.username.slice(0, 2).toUpperCase()
      : "??";

    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <div class="profile-circle">${initials}</div>
      <h2>${user.username}</h2>
      <p>suggested</p>
      <button class="spot-btn" onclick="viewProfile('${user.id}')">Spot</button>
    `;
    container.appendChild(card);
  });
}

// Load suggested once auth is ready
onAuthStateChanged(auth, (user) => {
  if (user) loadSuggestedUsers();
});

// === Spot Button Toggle Logic ===
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('spot-btn')) {
    const btn = e.target;
    
    if (btn.innerText === "Spot") {
      btn.innerText = "Spotted";
      btn.style.background = "white";
      btn.style.color = "black";
      btn.style.border = "2px solid black";
    } else {
      btn.innerText = "Spot";
      btn.style.background = "black";
      btn.style.color = "white";
      btn.style.border = "none";
    }
  }
});
