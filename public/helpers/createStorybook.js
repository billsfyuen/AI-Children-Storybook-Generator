import { getCharacterData } from "./getCharacterData.js";
import { bookReader } from "./bookReader.js";

window["bookReader"] = bookReader;

const createNewStoryModal = new bootstrap.Modal(
  document.getElementById("createNewStoryModal"),
  {}
);

const characterImage = document.querySelector(".new-story-character-image");
const characterSelection = document.querySelector("#new-storybook-character");
const createStatus = document.querySelector(".create-story-book-status");
const createDoneStatus = document.querySelector(
  ".create-story-book-done-status"
);
const createInProgressIcon = document.getElementById(
  "create-story-book-in-progress-icon"
);
const createDoneIcon = document.getElementById("create-story-book-done-icon");
const createStorybookFooter = document.querySelector(
  "#create-storybook-footer"
);

characterSelection.setAttribute(
  "onchange",
  "displayCharacterImage(this.value)"
);

window["displayCharacterImage"] = displayCharacterImage;

export async function createStorybook(characterId = -1) {
  characterSelection.innerHTML = "";

  //TODO: if no character is created under this user, prompt user to create a character

  const characterData = await loadCharacters();

  let hasDisplayFirstCharacterImage = false;
  for (let data of characterData) {
    if (!hasDisplayFirstCharacterImage) {
      displayCharacterImage(data.id);
      hasDisplayFirstCharacterImage = true;
    }
    characterSelection.insertAdjacentHTML(
      "beforeend",
      `<option value="${data.id}">${data.name}</option>`
    );
  }

  createNewStoryModal.show();

  document
    .querySelector("#new-storybook-form")
    .addEventListener("submit", async (e) => {
      e.preventDefault();

      const characterId = characterSelection.value;
      const category = document.querySelector("#new-storybook-category").value;
      const targetAge = document.querySelector(
        "#new-storybook-target-age"
      ).value;
      const totalPage = document.querySelector(
        "#new-storybook-total-page"
      ).value;

      document
        .querySelector("#new-storybook-submit-btn")
        .setAttribute("disabled", "");

      generateStoryPlot(characterId, category, targetAge, totalPage);
    });
}

async function loadCharacters() {
  const loadCharactersRes = await fetch("/characters");
  let loadCharactersResult = await loadCharactersRes.json();
  return loadCharactersResult.data;
}

async function displayCharacterImage(id) {
  let characterData = await getCharacterData(id);

  characterImage.innerHTML = `<img src="../uploads/characterImg/${characterData[0].image}" id="character-image">`;
}

async function generateStoryPlot(characterId, category, targetAge, totalPage) {
  createInProgressIcon.classList.toggle("hidden");
  createStatus.innerHTML = "Generating Plots ... ";

  let generatePlotRes = await fetch("/storybook-plot", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ characterId, category, targetAge, totalPage }),
  });

  let generatePlotResult = await generatePlotRes.json();

  if (generatePlotRes.ok) {
    createDoneStatus.innerHTML = "Plots Completed! ";

    let storybookContentJSON = generatePlotResult.data.plot;
    let storybookId = generatePlotResult.data.id;

    for (let page = 1; page <= totalPage; page++) {
      await generatePage(characterId, storybookContentJSON, storybookId, page);
    }

    let firstAttemptRes = fetch("../first-attempt-finish", {
      method: "PUT",
    });

    createStatus.innerHTML = "";
    createStatus.innerHTML = "All Done!";
    createInProgressIcon.classList.toggle("hidden");
    createDoneIcon.classList.toggle("hidden");
    createStorybookFooter.insertAdjacentHTML(
      "beforeend",
      `<button class="btn btn-primary" id="read-now-btn" onclick="bookReader(event,${storybookId})">Read Now</button>`
    );
  } else {
    console.log(result);
    window.alert("Error during Plot Generation: " + result.message);
    window.location.reload();
  }
}

async function generatePage(
  characterId,
  storybookContentJSON,
  storybookId,
  pageNumber
) {
  let storybookContentJSONStr = JSON.stringify(storybookContentJSON);

  createStatus.innerHTML = `Now Generating Page ${pageNumber} ... `;

  let generatePageRes = await fetch("/page", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      characterId,
      storybookContentJSONStr,
      storybookId,
      pageNumber,
    }),
  });

  let generatePageResult = await generatePageRes.json();

  if (generatePageRes.ok) {
    createDoneStatus.innerHTML = `Page ${pageNumber} Completed! `;
  } else {
    console.log(generatePageResult);
    window.alert("Error while generating pages: " + generatePageResult.message);
  }
}
