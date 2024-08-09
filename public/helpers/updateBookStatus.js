export async function storybookUpdatePrivate(id) {
    let res = await fetch (`/storybook-to-private?id=${id}`, {
        method: "PUT"
    })

    let result = res.json()

    if (res.ok) {
        window.location.reload()
    } else {
        console.log(result);
    }
}

export async function storybookUpdatePublic(id) {
    let res = await fetch (`/storybook-to-public?id=${id}`, {
        method: "PUT"
    })

    let result = res.json()

    if (res.ok) {
        window.location.reload()
    } else {
        console.log(result);
    }
}