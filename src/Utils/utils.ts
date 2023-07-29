export function parseSize(size: string | number) {
    if (typeof size === "string") {
        return size;
    }
    return `${size}px`;
}

export function saveJson(jsonData: any) {
    localStorage.setItem("todos", JSON.stringify(jsonData))
}

export function getJson(): any {
    let jsonString: string | null = localStorage.getItem("todos")
    if (jsonString) {
        const jsonData: Array<{}> = JSON.parse(jsonString)
        return jsonData
    }
    return []
}