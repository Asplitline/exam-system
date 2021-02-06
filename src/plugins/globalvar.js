const _currentUser = {}
function _setCurrentUser (val) {
    Object.assign(this._currentUser, val)
}
function _getCurrentUser () {
    return this._currentUser
}

const _currentContest = {}

function _setCurrentContest (val) {
    Object.assign(this._currentContest, val)
}

function _getCurrentContest () {
    return this._currentContest
}

export const currentUser = {
    _currentUser,
    _setCurrentUser,
    _getCurrentUser
}

export const currentContest = {
    _currentContest,
    _setCurrentContest,
    _getCurrentContest
}
