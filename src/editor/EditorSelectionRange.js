import EditorPoint from './EditorPoint'

export default class EditorSelectionRange {

    /**
     * @param {EditorPoint} start - The range start point
     * @param {EditorPoint} end   - The range end point
     */
    constructor(start, end) {
        this.start = start
        this.end   = end
    }

    isCollapsed() {
        return  this.start.row === this.end.row &&
                this.start.col === this.end.col
    }
}
