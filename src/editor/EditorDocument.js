/* global setImmediate */
import { default as EventEmitter } from 'events'
const FS = require('fs')
// import istextorbinary from 'istextorbinary'

/**
 * Represents an opened file as an array of lines. Each line also includes it's
 * line terminator at the end. This is also an EventEmitter and fires various
 * events when lines are added, removed or changed. It also manages multiple
 * selections as simple and virtual text ranges.
 */
export default class EditorDocument extends EventEmitter {

    constructor() {
        super()
        this.lines = []
        this.length = 0
        this.selection = [
            { start: [ 1,  2], end: [ 5, 16] },
            { start: [ 7, 12], end: [ 7, 18] },
            { start: [17, 12], end: [27,  8] }
        ]
    }

    /**
     * Reads a chunk of data from the readable stream. This calls itself
     * repeatedly until the entire file is read. Note that the editor will
     * render the file line by line but that is blocking until the end of the
     * current chunk so the chunk size affects loading perfirmance. If the
     * chuncks are too big it will take some time until the editor can render
     * something and the chunks are too small the entire loading will take
     * more time.
     * TODO: Fix the progress? Currently total is in bytes while loaded
     * is in chars so the copmutation might be incorrect in some cases
     * (depending on the file contents).
     * @private
     */
    _readChunk(readable, buffer='', loaded=0, total=0) {
        var chunk = readable.read(1024)
        if (chunk !== null) {
            buffer += chunk
            let lines = buffer.split(/\n/)
            buffer = lines.pop()
            for (let i = 0, l = lines.length; i < l; i++) {
                this.addLine(lines.shift() + '\n')
            }
            loaded += chunk.length
            this.emit("progress", { loaded, total });
            setTimeout(() => {
                this._readChunk(readable, buffer, loaded, total)
            }, 0)
        }
        else {
            if (buffer) {
                this.addLine(buffer)
            }
            this.emit("ready")
        }
    }

    /**
     * Reads a file and loads it into the document array
     */
    load(path) {
        this.clear()
        if (path) {
            let stat     = FS.statSync(path)
            let readable = FS.createReadStream(path)
            let buffer   = '';
            let loaded   = 0
            this.emit("progress", { loaded, total: stat.size });
            readable.setEncoding('utf8')
            readable.on('error', console.error)
            readable.on('readable', () => {
                setImmediate(() => {
                    this._readChunk(readable, buffer, loaded=0, stat.size)
                })
            })
        }
    }

    /**
     * Returns the value of the document which is just the lines joined back
     * into a single string.
     */
    getValue(): string {
        return this.lines.join('')
    }

    clear() {
        this.lines  = []
        this.length = 0
        this.emit("clear")
    }

    addLine(l) {
        this.length = this.lines.push(l)
        this.emit("add:line", l, this.length)
    }

    setLines(lines) {
        this.lines  = lines
        this.length = this.lines.length
        this.emit("change")
    }
}
