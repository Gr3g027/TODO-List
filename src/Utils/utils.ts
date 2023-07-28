export function parseSize(size: string | number) {
    if (typeof size === "string") {
        return size;
    }
    return `${size}px`;
}

export function saveJson(jsonData: any) {
    localStorage.setItem("JsonData", JSON.stringify(jsonData))
}

export function getJson(): object {
    let jsonData: any = localStorage.getItem("JsonData")
    if (jsonData) {
        jsonData = JSON.parse(jsonData)
    }
    return jsonData
}