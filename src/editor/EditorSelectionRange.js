import EditorPoint from './EditorPoint'

/**
 * Represents a selection range which is just an object with start and end
 * points. Each of those points has row and col coordinates are the row and
 * column within the file. If the points are equal the range is collapsed and
 * should render as carret.
 */
export default class EditorSelectionRange {

    /**
     * @param {EditorPoint} start - The range start point
     * @param {EditorPoint} end   - The range end point
     */
    constructor(start, end) {
        if (!start) {
            throw new Error('At least one argument is required')
        }
        this.setStart(start)
        this.setEnd(end || start)
    }

    /**
     * Sets the start point of the selection range
     * @param {Object} point - An object with row and col properties
     * @param {Boolean} silent - used internally to suppress exceptions. By
     * default it is not allowed to set the start after the end but sometimes
     * we might intend to use setEnd immediately after this call and also move
     * the end point so we should be able to suppress exceptions...
     */
    setStart({ row, col }, silent) {
        if (!silent && this.end && (row > this.end.row ||
            (row === this.end.row && col > this.end.col)))
        {
            throw new Error('The start point cannot be after the end point')
        }

        this.start = new EditorPoint(row, col)
    }

    /**
     * Sets the end point of the selection range
     * @param {Object} point - An object with row and col properties
     * @param {Boolean} silent - used internally to suppress exceptions. By
     * default it is not allowed to set the end before the start but sometimes
     * we might intend to use setStart immediately after this call and also move
     * the start point so we should be able to suppress exceptions...
     */
    setEnd({ row, col }, silent) {
        if (!silent && this.start && (row < this.start.row ||
            (row === this.start.row && col < this.start.col)))
        {
            throw new Error('The end point cannot be before the start point')
        }
        this.end = new EditorPoint(row, col)
    }

    /**
     * If the points are ecual the range is collapsed (should render as carret).
     */
    isCollapsed() {
        return  this.start.row === this.end.row &&
                this.start.col === this.end.col
    }

    /**
     * Returns the stringified version of the JSON verion of the range
     */
    serialize() {
        return JSON.stringify(this.toJSON());
    }

    /**
     * To string is just an alias
     */
    toString() {
        return this.serialize()
    }

    /**
     * Parses the string and applies the extracted values to the instance.
     * @return {Boolean} TRUE if the changes we successfully applied.
     *     FALSE otherwise.
     */
    unserialize(str) {
        let arr = JSON.parse(str)
        if (arr && Array.isArray(arr)) {
            this.setStart(arr[0], true)
            this.setEnd(arr[1])
            return true
        }
        return false
    }

    /**
     * Serialization is like a snapshot of the range at the current moment.
     * It converts the start.row and end.row dom elements to their indexes (Line
     * numbers). Note that lines are 1-based!  The final result looks like:
     * [{ row: 1, col: 2 },{ row: 4, col: 8 }]
     * which means a range from the 2nd char (inclusive) of line 1 to the 4th
     * (exclusive) of line 8.
     */
    toJSON() {
        return [
            { row: this.start.row, col: this.start.col },
            { row: this.end.row  , col: this.end.col   }
        ]
    }
}
