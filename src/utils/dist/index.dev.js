"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkEmail = checkEmail;
exports.checkPhone = checkPhone;
exports.checkScore = checkScore;
exports.bindURL = bindURL;
exports.setSessionStorage = setSessionStorage;
exports.getSessionStorage = getSessionStorage;
exports.getCurrentByDate = getCurrentByDate;
exports.convertDeepCopy = convertDeepCopy;
exports.convertURL = convertURL;

var _static = require("@static");

function checkEmail(rule, value, callback) {
  if (_static.REG_EMAIL.test(value)) return callback();
  callback(new Error('邮箱不合法'));
}
/**
 * 校验手机
 */


function checkPhone(rule, value, callback) {
  if (_static.REG_PHONE.test(value)) return callback();
  callback(new Error('手机号码不合法'));
}
/**
 * 校验分数
 */


function checkScore(rule, value, callback) {
  if (!Number.isInteger(value)) {
    callback(new Error('请输入数值'));
  } else {
    if (value < 0) {
      callback(new Error('分数不能小于0'));
    } else if (value > 50) {
      callback(new Error('分数不能大于50'));
    } else {
      callback();
    }
  }
}
/**
 * 绑定服务器端地址
 * @param {String} url
 * @returns
 */


function bindURL(url) {
  return _static.URL_SERVER + '/' + url;
}
/**
 * 设置SessionStorage
 * @param {String} name
 * @param {Object|Array} data
 */


function setSessionStorage(name, data) {
  sessionStorage.setItem(name, JSON.stringify(data));
}
/**
 * 获取SessionStorage
 * @param {String} name
 * @returns
 */


function getSessionStorage(name) {
  return sessionStorage.getItem(name) && JSON.parse(sessionStorage.getItem(name));
}
/**
 * 根据当前时间获取考试状态
 * @param {Date} data
 * @returns
 */


function getCurrentByDate(data) {
  data && data.forEach(function (item) {
    if (item.startTime > Date.now()) item.current = 0;else if (item.endTime < Date.now()) item.current = 2;else item.current = 1;
  });
  return data;
}
/**
 * 简单深拷贝
 */


function convertDeepCopy(data) {
  return JSON.parse(JSON.stringify(data));
}

function convertURL(data) {
  var params = [];

  for (var key in data) {
    params.push("".concat(key, "=").concat(data[key]));
  }

  return params.join('&');
}