/* global jQuery */
var savedState;

try {
    savedState = JSON.parse(localStorage.state || '{}');
}
catch (err) {
    console.warn('Error parsing saved state:');
    console.error(err);
    savedState = {};
}


export const STATE = jQuery.extend(true, {
    leftSidebarWidth: 300,
    fileTree: {
        selectedPath: ''
    },
    openFiles: [],
    currentFile: '',
    settings: {
        syntaxTheme: 'ace/theme/twilight',
        fontSize: '14px'
    }
}, savedState);

export default STATE;
