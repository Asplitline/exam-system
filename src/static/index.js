export const aMenuList = [
    { index: '/_user', icon: 'iconfont icon-user', content: '用户管理' },
    { index: '/_contest', icon: 'iconfont icon-Correction', content: '考试管理' },
    { index: '/_subject', icon: 'iconfont icon-subject', content: '课程管理' },
    { index: '/_problem', icon: 'iconfont icon-collection', content: '题目管理' },
    { index: '/_correct', icon: 'iconfont icon-ic_examine', content: '试卷批改' },
    { index: '/_discuss', icon: 'iconfont icon-discuss', content: '交流管理' }
]

export const aMiniMenuList = ['/_user', '/_contest', '/_subject', '/_problem', '/_correct', '/_discuss',]

export const contestStatus = [
    { state: 0, content: '未开始', type: 'info' },
    { state: 1, content: '考试中', type: 'success' },
    { state: 2, content: '已结束', type: 'danger' }
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
