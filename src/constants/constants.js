[

    // General App Actions -------------------------------------------------------
    'APP_OPEN_FILE',
    'APP_CLOSE_FILE',
    'APP_SAVE_FILE',
    'APP_SAVE_FILE_AS',
    'APP_NOTIFY_FILE_CHANGED',
    'APP_SET_LEFT_SIDEBAR_WIDTH',

    // FileTree Actions ----------------------------------------------------------
    'FILETREE_SELECT_ITEM',
    'FILETREE_EXPAND_ITEM',
    'FILETREE_COLLAPSE_ITEM',
    'FILETREE_TOGGLE_ITEM',
    'FILETREE_REVEAL_PATH',
    'FILETREE_TOGGLE',

    // File Events ---------------------------------------------------------------
    'EVENT_FILE_OPENED',
    'EVENT_FILE_OPENED_FOR_PREVIEW',
    'EVENT_FILE_CHANGED',
    'EVENT_FILE_CHANGED_OUTSIDE',
    'EVENT_FILE_UNCHANGED',
    'EVENT_FILE_SAVED',
    'EVENT_FILE_CLOSED'

].forEach(x => exports[x] = x);
