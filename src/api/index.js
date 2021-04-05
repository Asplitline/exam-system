import { _get, _post, _delete, _put } from './helper'
const NO_HANDLE = 0
// base 
const _login = _post('account/api/login')
const _uploadFile = _post('/uploadfile')
// user
const _getUser = _get('/account/list')
const _getUserList = _post('/account/pageAccount')
const _changePassword = _get('/account/changePassword')
const _addUser = _post('/account/insert')
const _editUser = _put('/account/updateIgnoreNull')
const _deleteUser = _delete('/account/delete')
// contest
const _getContestList = _get('/contest/api/pageContest')
const _addContest = _post('/contest/api/addContest')
const _editContest = _put('/contest/api/updateContest')
const _deleteContest = _delete('contest/api/deleteContest')
// subject
const _getSubjectList = _get('/subject/api/pageSubjects')
const _addSubject = _post('/subject/api/addSubject')
const _editSubject = _post('/subject/api/updateSubject')
const _deleteSubject = _delete('subject/api/deleteSubject')
// problem
const _getProblemList = _get('/question/api/pageQuestion')
const _getProblemByContestId = _get('/question/api/getQuestionsByContestId')
// const _getProblemBySubjectId = _get('/question/api/getQuestionsBySubjectId')
const _addProblem = _post('/question/api/addQuestion')
const _editProblem = _post('/question/api/updateQuestion')
const _deleteProblem = _delete('/question/api/deleteQuestion')
// discuss
const _getPostList = _get('/post/api/pagePosts')
const _addPost = _post('/post/api/addPost')
const _editPost = _post('/post/api/updatePost')
const _deletePost = _delete('/post/api/deletePost')
// comment 
const _addComment = _post('/comment/api/addComment')
export {
    // base
    _login,
    _uploadFile,
    // user
    _getUser,
    _getUserList,
    _changePassword,
    _addUser,
    _editUser,
    _deleteUser,
    // contest
    _getContestList,
    _addContest,
    _editContest,
    _deleteContest,
    // subject
    _getSubjectList,
    // _getProblemBySubjectId,
    _deleteSubject,
    _addSubject,
    _editSubject,
    // problem
    _getProblemList,
    _getProblemByContestId,
    _addProblem,
    _editProblem,
    _deleteProblem,
    // discuss
    _getPostList,
    _addPost,
    _editPost,
    _deletePost,
    // comment 
    _addComment
}
