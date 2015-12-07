
import { Component } from 'react'
import Line from './Line'
// import fs   from 'fs'
import fileStore      from '../stores/file-store'
import EditorDocument from './EditorDocument'
// import fileActions    from '../actions/file-actions'
// import istextorbinary from 'istextorbinary'

// const RE_EOL = /(\r\n|\r|\n)/
////////////////////////////////////////////////////////////////////////////////
var reKeyword = new RegExp(
    "const|yield|import|get|set|break|case|catch|continue|default|" +
    "delete|do|else|finally|for|function|if|in|instanceof|new|return|" +
    "switch|throw|try|typeof|let|var|while|with|debugger|__parent__|" +
    "__count__|escape|unescape|with|__proto__|class|enum|extends|" +
    "super|export|implements|private|public|interface|package|" +
    "protected|static|from|as"
);

var lexer = [
    {
        token:"multi-comment",
        match: str => str.match(/\/\*/),
        next : str => str.match(/\*\//)
    },
    {
        token: "string",
        match: str => str.match(/"/),
        next : str => str.match(/"/)
    },
    {
        token: "string-singlequoted",
        match: str => str.match(/'/),
        next : str => str.match(/'/)
    },
    {
        token: "comment-line",
        match: str => str.match(/\/\//),
        next : str => str.match(/\n/)
    },
    // {
    //     token: "identifier",
    //     match: str => str.match(
    //         new RegExp("[a-zA-Z\\$_\u00a1-\uffff][a-zA-Z\\d\\$_\u00a1-\uffff]*?")
    //     ) && !str.match(reKeyword)
    // },
    // regexp: {
    //     match: str => str.match(/\/.+?\//),
    //     block: true
    // },
    {
        token: "keyword",
        match: str => str.match(reKeyword) //&& !str.match("[a-zA-Z\\$_\u00a1-\uffff][a-zA-Z\\d\\$_\u00a1-\uffff]*")
    },
    // {
    //     token: "operator",
    //     match: str => str.match(/--|\+\+|\.{3}|===|==|=|!=|!==|<+=?|>+=?|!|&&|\|\||\?\:|[!$%&*+\-~\/^]=?/)
    // },
    // {
    //     token: "punctoator",
    //     match: str => str.match(/(\(|\{|\}|\)|;|\.|,|=>|\[|\])/)
    // },
    // {
    //     token: "number",
    //     match: str => (
    //         str.match(/[+-]?\d[\d_]*(?:(?:\.\d*)?(?:[eE][+-]?\d+)?)?\b/) ||
    //         str.match(/0(?:[xX][0-9a-fA-F]+|[bB][01]+)\b/)
    //     )
    // }
];



class EditSession {
    constructor(path:string='', mode:string='text') {
        this.path = path
        this.mode = mode
        this.document = new EditorDocument()
        this.startLine = 0
        this.endLine = 100
        this.load()
    }

    load() {
        if (this.path) {
            this.document.load(this.path);
        }
    }

    getClip() {
        let lines = []
        for (let i = this.startLine; i <= this.endLine; i++) {
            lines.push(this.document.lines[i])
        }
        return lines
    }
}

export class Editor extends Component {

    constructor(props) {
        super(props)
        this.state = {
            session: new EditSession()
        }
        this._onChange = this._onChange.bind(this)
    }

    componentWillUnmount()
    {
        fileStore.unlisten(this._onChange)
        // configStore.unlisten(this._onChange)
    }

    componentDidMount()
    {
        this.open(this.props.file.path)
        fileStore.listen(this._onChange)

        this.state.session.document.on("add:line", (line) => {
            let div = document.createElement('div');
            div.className = 'line'
            div.innerText = line
            // div.contentEditable = true
            // div.onSelectStart = function() { return true }
            this.refs.lines.appendChild(div)
        })

        this.state.session.document.on("clear", () => {
            this.refs.lines.innerHTML = `<div className="ride-selecion-layer" ref="selectionLayer">
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1"></svg>
            </div>`
        })

        this.state.session.document.on("ready", () => {
            this.renderSelection()
        })

        document.addEventListener("selectionchange", () => {
            var sel = getSelection();
            this.state.session.document.selection = []
            if (sel.rangeCount > 0) {
                var rng         = sel.getRangeAt(0),
                    startLine   = rng.startContainer,
                    startOffset = rng.startOffset,
                    endLine     = rng.endContainer,
                    endOffset   = rng.endOffset;

                if (startLine.nodeType == 3) {
                    startLine = startLine.parentNode;
                }
                if (endLine.nodeType == 3) {
                    endLine = endLine.parentNode;
                }

                while(startLine && !startLine.matches('.line')) {
                    startLine = startLine.parentNode;
                }
                while(endLine && !endLine.matches('.line')) {
                    endLine = endLine.parentNode;
                }

                let startLineIndex = 0
                if (startLine && startLine.matches('.line')) {
                    while(startLine && startLine.matches('.line')) {
                        startLine = startLine.previousSibling;
                        startLineIndex++
                    }
                }

                let endLineIndex = 0
                if (endLine && endLine.matches('.line')) {
                    while(endLine && endLine.matches('.line')) {
                        endLine = endLine.previousSibling;
                        endLineIndex++
                    }
                }

                this.state.session.document.selection = [{
                    start: [ startLineIndex, startOffset],
                    end:   [ endLineIndex  , endOffset  ]
                }]
            }
            this.renderSelection()
        });
    }

    _consolidateRects(rects) {
        let out = []
        for (let i = 0, l = rects.length, rect; i < l; i++) {
            rect = rects[i]
            if (i === 0) {
                out.push({
                    top   : rect.top,
                    left  : rect.left,
                    width : rect.width,
                    height: rect.height
                })
            }
            else {
                let prevRect = out[out.length - 1]
                if (rect.left === prevRect.left && rect.top === prevRect.top) {
                    prevRect.width  = rect.width
                    prevRect.height = rect.height
                }
                else {
                    out.push({
                        top   : rect.top,
                        left  : rect.left,
                        width : rect.width,
                        height: rect.height
                    })
                }
            }
        }
        return out;
    }

    renderSelection() {
        let edSel  = this.state.session.document.selection;
        let docSel = window.getSelection();

        this.refs.selectionLayer.innerHTML = ''
        let pRect = this.refs.selectionLayer.getBoundingClientRect()
        let deltaX = pRect.left
        let deltaY = pRect.top
        // docSel.removeAllRanges()
        let svg = this.refs.lines.querySelector('svg')
        if (!svg) {
            svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
            this.refs.lines.appendChild(svg)
        }

        svg.innerHTML = ''

        edSel.forEach(s => {
            let r = document.createRange();
            r.setStart(
                this.refs.lines.querySelector('.line:nth-child(' + (s.start[0]+1) + ')').firstChild,
                s.start[1]
            )
            r.setEnd(
                this.refs.lines.querySelector('.line:nth-child(' + (s.end[0]+1) + ')').firstChild,
                s.end[1]
            )

            let rects = this._consolidateRects(r.getClientRects())

            let path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
            // path.setAttribute("stroke", "red")
            // path.setAttribute("fill", "none")
            path.setAttribute("class", 'ride-selection')
            svg.appendChild(path)

            let d = [], x, y;
            for (let i = 0, l = rects.length, rect; i < l; i++) {
                rect = rects[i]
                if (i === 0) {
                    x = rect.left
                    y = rect.top
                    d.push(
                        "M",
                        rect.left - deltaX,
                        rect.top - deltaY
                    )
                }

                if (x != rect.left + rect.width - deltaX) {
                    x  = rect.left + rect.width - deltaX
                    d.push("H", x)
                }

                if (y != rect.top + rect.height - deltaY) {
                    y  = rect.top + rect.height - deltaY
                    d.push("V", y)
                }

                // d.push(
                //     rect.left + rect.width - deltaX,
                //     rect.top - deltaY,
                //     rect.left + rect.width - deltaX,
                //     rect.top + rect.height - deltaY
                // )

                // if (i === l - 1) {
                //     d.push(
                //         rect.left - deltaX,
                //         rect.top + rect.height - deltaY,
                //         "Z"
                //     )
                // }
            }
            for (let i = rects.length - 1, rect; i >= 0; i--) {
                rect = rects[i]
                if (x != rect.left - deltaX) {
                    x  = rect.left - deltaX
                    d.push("H", x)
                }

                if (y != rect.top - deltaY) {
                    y  = rect.top - deltaY
                    d.push("V", y)
                }
            }

            path.setAttribute("d", d.join(" "))

            // for (let i = 0, l = rects.length, rect; i < l; i++) {
            //     rect = rects[i]
            //     console.log(rect)
            //     let span = document.createElement('span')
            //     span.className    = 'ride-selection'
            //     span.style.top    = rect.top - deltaY + 'px'
            //     span.style.left   = rect.left - deltaX + 'px'
            //     span.style.width  = rect.width + 'px'
            //     span.style.height = rect.height + 'px'
            //     this.refs.selectionLayer.appendChild(span)
            // }

            // docSel.addRange(r)
        })
    }

    _onChange()
    {
        let currentFile = fileStore.getState().current
        if (currentFile && currentFile.session) {
            this.open(currentFile.path)
        }
    }

    open(path:string = null) {
        this.state.session.document.clear();
        this.state.session.path = path
        this.state.session.load(path)
    }

    setSession(session:EditSession) {
        this.setState({ session })
    }

    render() {
        // let visibleLines = this.state.session.getClip();
        // let visibleLines = this.state.session.document.lines;
        // console.log(visibleLines)
        return (
            <div className="ride-editor">
                <div className="ride-gutter" ref="gutter">
                    <div>1</div>
                </div>
                <div className="ride-lines" ref="lines">
                    <div className="ride-selecion-layer" ref="selectionLayer">
                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1"></svg>
                    </div>
                </div>
                {/*<div className="ride-scroller-y">
                    <div style={{height: 2000}}/>
                </div>
                <div className="ride-scroller-x">
                    <div style={{width: 2000}}/>
                </div>*/}
            </div>
        )
    }
}
