export function keyGenerate() {
    return Math.random().toString(36).substring(2, 15)
}