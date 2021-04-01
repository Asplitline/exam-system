"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_PWD = exports.EDIT = exports.ADD = exports.REG_PHONE = exports.REG_EMAIL = exports.URL_SERVER = exports.levels = exports.contestStatus = exports.menuList = void 0;
var menuList = [{
  index: '/user',
  icon: 'iconfont',
  content: '用户管理'
}, {
  index: '/contest',
  icon: 'iconfont',
  content: '考试管理'
}, {
  index: '/subject',
  icon: 'iconfont',
  content: '课程管理'
}, {
  index: '/problem',
  icon: 'iconfont',
  content: '题目管理'
}, {
  index: '/correct',
  icon: 'iconfont',
  content: '试卷批改'
}, {
  index: '/discuss',
  icon: 'iconfont',
  content: '交流管理'
}];
exports.menuList = menuList;
var contestStatus = [{
  state: 0,
  content: '未开始'
}, {
  state: 1,
  content: '考试中'
}, {
  state: 2,
  content: '已结束'
}];
exports.contestStatus = contestStatus;
var levels = [{
  id: 0,
  value: '学生',
  type: 'info'
}, {
  id: 1,
  value: '教师',
  type: 'primary'
}, {
  id: 2,
  value: '管理员',
  type: 'danger'
}];
exports.levels = levels;
var URL_SERVER = 'http://localhost:8088';
exports.URL_SERVER = URL_SERVER;
var REG_EMAIL = /^\w+@\w+(\.\w+)+$/;
exports.REG_EMAIL = REG_EMAIL;
var REG_PHONE = /^1[34578]\d{9}$/;
exports.REG_PHONE = REG_PHONE;
var ADD = 0;
exports.ADD = ADD;
var EDIT = 1;
exports.EDIT = EDIT;
var DEFAULT_PWD = 123456;
exports.DEFAULT_PWD = DEFAULT_PWD;