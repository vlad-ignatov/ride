export default class EditorPoint {

    /**
     * @param {DOMNode} row - The line DOM node containg the point
     * @param {Number}  col - The character offset within the node
     */
    constructor(row, col) {
        this.row = row
        this.col = col
    }
}
