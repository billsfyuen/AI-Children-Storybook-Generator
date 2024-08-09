export async function getUserInfo() {
    const res = await fetch("../user")
    const data = (await res.json()).data
    return data
}

export async function checkIsMember() {
    const res = await fetch("../payment")
    const data = (await res.json()).data
    if (data.length > 0) {
        return true
    }
    return false
}

export async function hasFirstAttempt() {
    const res = await fetch("../free-trial")
    const data = (await res.json()).data
    return data[0].has_first_attempt
}