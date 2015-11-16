import OpenedFile from './OpenedFile'

/**
 * Represents a collection OpenedFile objects (visually represented as tabs in
 * the editor)
 */
export default class OpenedFilesList
{
    constructor()
    {
        this.files = []
    }

    /**
     * Returns the number of opened files
     */
    get length(): number
    {
        return this.files.length
    }

    /**
     * Adds new file to the list.
     * @param {string} path The file path. This might be empty to add new virtual
     * file, i.e. one that hasn't been saved anywhere yet
     */
    add(path: string = '', content: string = ''): number
    {
        return this.files.push(new OpenedFile(
            path,
            content
        ))
    }

    /**
     * Removes a file identified by index
     */
    removeFileAt(index: number): void
    {
        if (index < 0 || index >= this.files.length) {
            throw new Error('Invalid index')
        }
        this.files.splice(index, 1)
    }

    /**
     * Move the file at @oldIndex to @newIndex
     */
    move(oldIndex: number, newIndex: number): void
    {
        if (oldIndex < 0 || oldIndex >= this.files.length) {
            throw new Error('Invalid oldIndex')
        }
        if (newIndex < 0 || newIndex >= this.files.length) {
            throw new Error('Invalid newIndex')
        }
        let file = this.files.splice(oldIndex, 1)
        this.files.splice(newIndex, 0, file)
    }

    /**
     * Iterate over the files
     */
    forEach(...args)
    {
        return this.files.forEach(...args)
    }
}
