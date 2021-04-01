export const menuList = [
    { index: '/user', icon: 'iconfont', content: '用户管理' },
    { index: '/contest', icon: 'iconfont', content: '考试管理' },
    { index: '/subject', icon: 'iconfont', content: '课程管理' },
    { index: '/problem', icon: 'iconfont', content: '题目管理' },
    { index: '/correct', icon: 'iconfont', content: '试卷批改' },
    { index: '/discuss', icon: 'iconfont', content: '交流管理' }
]

export const contestStatus = [
    { state: 0, content: '未开始' },
    { state: 1, content: '考试中' },
    { state: 2, content: '已结束' }
]

export const levels = [
    { id: 0, value: '学生', type: 'info' },
    { id: 1, value: '教师', type: 'primary' },
    { id: 2, value: '管理员', type: 'danger' }
]

export const URL_SERVER = 'http://localhost:8088'
export const REG_EMAIL = /^\w+@\w+(\.\w+)+$/
export const REG_PHONE = /^1[34578]\d{9}$/
export const ADD = 0
export const EDIT = 1
export const DEFAULT_PWD = 123456
