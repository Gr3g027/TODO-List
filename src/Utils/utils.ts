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

export function deleteElementFromJson(item: {id: number}): number{
    let items = getJson()
    items.splice(item.id, 1)
    saveJson(items)
    return item.id
}

export function bringSelectedDown(items: Array<{}>, i: number): any {
    if(i === items.length - 1){
        console.log("one element in array")
        return items
    }

    const tmp = items[i]
    for (let j = i; j < items.length - 1; j++) {
        items[i] = items[i + 1];
    }
    items[items.length - 1] = tmp

    return items
}