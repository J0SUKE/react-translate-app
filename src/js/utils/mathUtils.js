export function getLength(object) {
    let i = 0;
    for(let prop in object)
    {
        i++;
    }
    return i;
}