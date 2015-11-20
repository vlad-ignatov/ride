import alt from '../alt'

class SessionActions
{
    constructor() {
        this.generateActions(
            'openFile',
            'closeFile',
            'setCurrentFile'
        );
    }
}

var sessionActions = alt.createActions(SessionActions)

export default sessionActions
