
/**
 * The EditorSelection is a callection of 0 or more ranges
 */
export default class EditorSelection {

    constructor() {
        this.ranges = []
    }

    addRange(range) {
        this.ranges.push(range)
    }

    forEach(...args) {
        return this.ranges.forEach(...args)
    }
}
