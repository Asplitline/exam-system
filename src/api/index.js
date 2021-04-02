import { _get, _post, _delete, _put } from './helper'
// base 
const _login = _post('account/api/login')
// user
const _getUserList = _post('/account/pageAccount')
const _changePassword = _get('/account/changePassword')
const _addUser = _post('/account/insert')
const _editUser = _put('/account/updateIgnoreNull')
const _deleteUser = _delete('/account/delete')
// contest
const _getContestList = _get('/contest/api/pageContest')
const _deleteContest = _delete('contest/api/deleteContest')
// subject
const _getSubjectList = _get('/subject/api/pageSubjects')
const _addSubject = _post('/subject/api/addSubject')
const _editSubject = _post('/subject/api/updateSubject')
const _deleteSubject = _delete('subject/api/deleteSubject')
// problem
const _getProblemList = _get('/question/api/pageQuestion')
const _deleteProblem = _delete('/question/api/deleteQuestion')
// discuss
const _getPostList = _get('/post/api/pagePosts')
const _deletePost = _delete('/post/api/deletePost')
export {
    // base
    _login,
    // user
    _getUserList,
    _changePassword,
    _addUser,
    _editUser,
    _deleteUser,
    // contest
    _getContestList,
    _deleteContest,
    // subject
    _getSubjectList,
    _deleteSubject,
    _addSubject,
    _editSubject,
    // problem
    _getProblemList,
    _deleteProblem,
    // discuss
    _getPostList,
    _deletePost
}
