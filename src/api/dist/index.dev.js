"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._deletePost = exports._getPostList = exports._deleteProblem = exports._getProblemList = exports._deleteSubject = exports._getSubjectList = exports._deleteContest = exports._getContestList = exports._deleteUser = exports._changePassword = exports._getUserList = void 0;

var _helper = require("./helper");

var _getUserList = (0, _helper._post)('/account/pageAccount');

exports._getUserList = _getUserList;

var _changePassword = (0, _helper._get)('/account/changePassword');

exports._changePassword = _changePassword;

var _deleteUser = (0, _helper._delete)('/account/delete'); // contest


exports._deleteUser = _deleteUser;

var _getContestList = (0, _helper._get)('/contest/api/pageContest');

exports._getContestList = _getContestList;

var _deleteContest = (0, _helper._delete)('contest/api/deleteContest'); // subject


exports._deleteContest = _deleteContest;

var _getSubjectList = (0, _helper._get)('/subject/api/pageSubjects');

exports._getSubjectList = _getSubjectList;

var _deleteSubject = (0, _helper._delete)('subject/api/deleteSubject'); // problem


exports._deleteSubject = _deleteSubject;

var _getProblemList = (0, _helper._get)('/question/api/pageQuestion');

exports._getProblemList = _getProblemList;

var _deleteProblem = (0, _helper._delete)('/question/api/deleteQuestion'); // discuss


exports._deleteProblem = _deleteProblem;

var _getPostList = (0, _helper._get)('/post/api/pagePosts');

exports._getPostList = _getPostList;

var _deletePost = (0, _helper._delete)('/post/api/deletePost');

exports._deletePost = _deletePost;