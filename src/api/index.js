import { _get, _post, _delete } from './helper'

// user
const _getUserList = _post('/account/pageAccount')
const _deleteUser = _delete('/account/delete')
// contest
const _getContestList = _get('/contest/api/pageContest')
const _deleteContest = _delete('contest/api/deleteContest')
// subject 
const _getSubjectList = _get('/subject/api/pageSubjects')
const _deleteSubject = _delete('subject/api/deleteSubject')
// problem
const _getProblemList = _get('/question/api/pageQuestion')
const _deleteProblem = _delete('/question/api/deleteQuestion')
// discuss
const _getPostList = _get('/post/api/pagePosts')
const _deletePost = _delete('/post/api/deletePost')
export {
    // user
    _getUserList,
    _deleteUser,
    // contest
    _getContestList,
    _deleteContest,
    // subject
    _getSubjectList,
    _deleteSubject,
    // problem
    _getProblemList,
    _deleteProblem,
    // discuss
    _getPostList,
    _deletePost
}
