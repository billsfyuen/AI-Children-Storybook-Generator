export async function getCharacterData(id) {
    let res = await fetch(`/character?id=${id}`, {
        method: 'GET',
    })

    if (res.ok) {
        let response = await res.json()
        return response.data
    }
}