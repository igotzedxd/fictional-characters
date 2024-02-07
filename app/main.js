async function fetchCharacters() {
  try {
    const response = await fetch("../data/characters.json");
    const characters = await response.json();
    return characters;
  } catch (error) {
    console.error("Error fetching or parsing data:", error);
  }
}

const characters = await fetchCharacters();

const app = {};

app.init = () => {
  const cards = document.querySelector(".cards");
  const gridBtn = document.querySelector(".grid-btn");
  const listBtn = document.querySelector(".list-btn");
  const modal = document.querySelector(".modal");
  const body = document.querySelector("body");

  const gridTmpl = (character) => {
    return `
        <div class="card grid-view">
            <div class="top"><p>${character.irl}</p></div>
                <img class="char-img" src="${character.image}" alt="${character.name}" />
            <div class="bottom">
                <h2>${character.character}</h2>
                <p>${character.show}</p>
            </div>
        </div> `;
  };

  const listTmpl = (character) => {
    return `
        <div class="card list-view">
            <div class="content">
                <img class="small-img" src="${character.image}" alt="${character.name}" />
                <p class="irl-name">${character.irl}</p>
                <h2 class="char-name">${character.character}</h2>
                <p>${character.show}</p>
            </div>
        </div> `;
  };

  const modalTmpl = (character) => {
    return `
        <i class="fa-solid fa-x close-btn"></i>
        <div class="first-sec">
        <img src="${character.cover}" alt="${character.name}" />
        </div>
        <div class="last-sec">
        <h2>${character.character}</h2>
        <p>${character.about}</p>
        <img class="modal-avatar" src="${character.img}" alt="${character.name}" />
        </div>
    `;
  };

  let modalActive = false;

  const modalEvents = () => {
    const allCards = document.querySelectorAll(".card");
    allCards.forEach((card, index) => {
      card.addEventListener("click", () => {
        renderModal(index);
      });
    });
  };

  const gridView = () => {
    while (cards.firstChild) {
      cards.removeChild(cards.firstChild);
    }
    characters.forEach((character, index) => {
      cards.insertAdjacentHTML("beforeend", gridTmpl(character));
      const images = document.querySelectorAll(".char-img");
      const lastImage = images[index];
      lastImage.addEventListener("mouseover", () => {
        lastImage.setAttribute("src", character.img);
      });
      lastImage.addEventListener("mouseleave", () => {
        lastImage.setAttribute("src", character.image);
      });
    });
    modalEvents();
  };

  const listView = () => {
    while (cards.firstChild) {
      cards.removeChild(cards.firstChild);
    }
    characters.forEach((character, index) => {
      cards.insertAdjacentHTML("beforeend", listTmpl(character));
      const images = document.querySelectorAll(".small-img");
      const lastImage = images[index];
      lastImage.addEventListener("mouseover", () => {
        lastImage.setAttribute("src", character.img);
      });
      lastImage.addEventListener("mouseleave", () => {
        lastImage.setAttribute("src", character.image);
      });
    });
    modalEvents();
  };

  const renderModal = (index) => {
    while (modal.firstChild) {
      modal.removeChild(modal.firstChild);
    }
    modal.insertAdjacentHTML("beforeend", modalTmpl(characters[index]));
    modal.classList.add("active");
    modalActive = true;
    const closeBtn = document.querySelector(".close-btn");
    closeBtn.addEventListener("click", () => {
      modal.classList.remove("active");
      modalActive = false;
    });

    window.addEventListener("click", (e) => {
      if (!modalActive) {
        console.log("bob");
      } else if (modalActive && e.target === body) {
        modal.classList.remove("active");
      }
    });
  };

  gridView();
  gridBtn.addEventListener("click", gridView);
  listBtn.addEventListener("click", listView);

  const allCards = document.querySelectorAll(".card");

  allCards.forEach((card, index) => {
    card.addEventListener("click", () => {
      renderModal(index);
      console.log("bob");
    });
  });
};

app.init();
