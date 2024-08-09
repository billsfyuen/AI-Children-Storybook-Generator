export function convertDisplayAge (age) {
    let displayAge
    switch (age) {
        case "3":
            displayAge = "3 or below"
            break;
        case "6":
            displayAge = "4 - 6"
            break;
        case "8":
            displayAge = "6 - 8"
            break;
        case "10":
            displayAge = "8 - 10"
            break;
        case "12":
            displayAge = "10 or above"
            break;
        default:
            displayAge = "other"
            break;
    }
    return displayAge
}