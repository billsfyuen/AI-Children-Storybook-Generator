const newCharacterModal = new bootstrap.Modal(
  document.getElementById("newCharacterModal"),
  {}
);

export function createCharacter() {
  newCharacterModal.show();

  document
    .querySelector("#new-character-form")
    .addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = document.querySelector("#new-character-name").value;
      const speciesType = document.querySelector(
        "#new-character-species-type"
      ).value;
      const gender = document.querySelector(
        "#character-preference-gender"
      ).value;
      const age = document.querySelector("#character-preference-age").value;
      const bodyShape = document.querySelector(
        "#character-preference-body-shape"
      ).value;
      const heightSize = document.querySelector(
        "#character-preference-height-size"
      ).value;

      document
        .querySelector("#new-character-submit-btn")
        .setAttribute("disabled", "");
      document
        .querySelector("#new-character-content-footer")
        .insertAdjacentHTML(
          "afterbegin",
          `Creating "${name} the ${speciesType}<i class="fa-solid fa-spinner fa-spin-pulse" style="color: #74C0FC;"></i>`
        );

      //TODO: guide user to input better names
      console.log("Creating Character: " + name);

      let res = await fetch("/character", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          speciesType,
          gender,
          age,
          bodyShape,
          heightSize,
        }),
      });

      let result = await res.json();

      if (res.ok) {
        //create character successful
        //TODO: better user experience
        window.alert("Create Character Successful!");
        window.location.reload();
      } else {
        console.log(result);
        window.alert("Error: " + result.message);
        window.location.reload();
      }
    });
}
