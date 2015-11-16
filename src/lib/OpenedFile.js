/* global ace, fs */

/**
 * Represents a file opened in the editor. Note that this is not a file object.
 */
export default class OpenedFile
{
    /**
     * The text content of the file
     */
    text: string = '';

    /**
     * The file path. Might be '' (the default) which indicates that this is a
     * virtual file, i.e. it is opened in the editoe but not yet saved anywhere
     * on the disc.
     */
    path:string = '';

    /**
     * The encoding to use for reading and writing. Cureently only utf8 is
     * supported
     */
    encoding: string = 'utf8';

    constructor(path)
    {
        this.encoding = 'utf8';
        this.path = path || '';
        this.text = '';

        if (this.path) {
            this.text = fs.readFileSync(this.path, this.encoding);
        }

        this.editorSession = ace.createEditSession(this.path);
    }

    isModified(): boolean
    {
        return false;
    }

    close()
    {
        return true;
    }
}
