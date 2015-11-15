'use strict';

var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

/**
 * The base class for all the stores
 */
export default class StoreBase extends EventEmitter
{
    constructor()
    {
        super();
    }

    /**
     * @param {function} callback
     */
    addChangeListener(callback)
    {
        this.on(CHANGE_EVENT, callback);
    }

    /**
     * @param {function} callback
     */
    removeChangeListener(callback)
    {
        this.removeListener(CHANGE_EVENT, callback);
    }

    emitChange()
    {
        this.emit(CHANGE_EVENT);
    }
}
