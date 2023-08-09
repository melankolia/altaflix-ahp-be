const useFullFunction = {
    randomizedArr(source) {
        const result = []
        while (source.length !== 0) {
            let randomIndex = Math.floor(Math.random() * source.length)
            result.push(source[randomIndex])
            source.splice(randomIndex, 1)
        }
        return result
    },
    convertToCamelCase(str) {
        return str && str.split(" ").map((e, i) =>  i != 0 ? e[0].toUpperCase() + e.substring(1) : e[0].toLowerCase() + e.substring(1)).join("")
    }
};

export default useFullFunction