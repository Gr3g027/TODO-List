/* Utilities function file */

export function parseSize(size: string | number) {

    //parsing size for components props
    if (typeof size === "string") {
        return size;
    }
    return `${size}px`;
}

export function saveJson(jsonData: Array<any>) {
    //saving json to localstorage
    localStorage.setItem("todos", JSON.stringify(jsonData))
}

export function getJson(): Array<any> {
    //retrieving data from localstorage
    let jsonString: string | null = localStorage.getItem("todos")
    if (jsonString) {
        const jsonData: Array<{}> = JSON.parse(jsonString)
        return jsonData
    }
    return []
}