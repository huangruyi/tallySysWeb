// 公共布局
const layout = {
    formItemLayout: {
        labelCol: {
            xs: 24,
            sm: 4
        },
        wrapperCol: {
            xs: 24,
            sm: 12
        }
    },
    offsetLayout: {
        wrapperCol: {
            xs: 24,
            sm: {
                span: 12,
                offset: 4
            }
        }
    },
    rowObject: {
        minRows: 4, maxRows: 6
    },
    modalFormItemLayout: {
        labelCol: { span: 5 },
        wrapperCol: { span: 16 }
    },
    radioLayout: {
        labelCol: { span: 8 },
        wrapperCol: { span: 10 }
    },
    // roleRowObject: { //角色管理使用
    //     minRows: 20, maxRows: 24
    // },
}

const opera = {
    CREATE: 'create',
    EDIT: 'edit',
    DEL: 'delete'
}

const action = {
    GET: 'get',
    POST: 'post',
    PUT: 'put',
    DELETE: 'delete'
}

const tip = {
    CREATE_TIP: '新增成功！',
    EDIT_TIP: '编辑成功！',
    DELETE_TIP: '删除成功！'
}

const code = {
    income: 'income'
}

// 记账类型管理
const PARENT_CODE = '-1'
const type = {
    PARENT: 'parent',
    CHILD: 'child'
}
// const pagination = {
//     DEFAULT_PAGE_INDEX: 1, //默认请求第一页数据
//     DEFAULT_PAGE_SIZE: 15, //pageSize: 15
// }

const TITLE = '小金猪记账系统'
const HOME_URL = '/home'
const ROOT_URL = '/'

export default {
    layout,
    //pagination,
    TITLE,
    HOME_URL,
    ROOT_URL,
    opera,
    code,
    action,
    tip,
    PARENT_CODE,
    type
}
