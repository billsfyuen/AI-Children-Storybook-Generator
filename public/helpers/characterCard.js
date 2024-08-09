import { getCharacterData } from "./getCharacterData.js";

const characterCardModal = new bootstrap.Modal(document.getElementById('characterCardModal'), {});

const characterContentBody = document.querySelector("#character-content-body");
const characterContentHeader = document.querySelector(".character-content-header");
const deleteBtn = document.querySelector(".delete-btn");

// const createStoryWithCharacterBtn = document.querySelector(".create-story-with-character-btn");

export async function showCharacterCard(characterId) {

    const characterData = await getCharacterData(characterId)
    const characterName = characterData[0].name;
    const characterImage = characterData[0].image

    characterContentHeader.innerHTML = `Character Name: ${characterName}`
    characterContentBody.innerHTML = `<img src="../uploads/characterImg/${characterImage}" alt="${characterName}" class="character-card-image">`

    characterCardModal.show()

    deleteBtn.addEventListener('click', () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: "Deleted!",
                text: "Your character has been deleted.",
                icon: "success"
              });
              deleteCharacter(characterId)
              window.location.reload()
            }
          });
    })

    // createStoryWithCharacterBtn.addEventListener('click', () => {
    //     createStoryWithCharacter(characterId)
    // })
}

async function deleteCharacter(id) {
    let res = await fetch(`/character?id=${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
    })

    if (res.ok) {
        let response = await res.json()
        return response.data
    }
}

// function createStoryWithCharacter(id) {
//     //TODO
// }