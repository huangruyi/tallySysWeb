const moduleList = [
    {
        sName: '首页',
        sLinkurl: '/home',
        sIcon: 'home',        
    },
    {
        sName: '个人中心',
        sLinkurl: '/userCenter',
        sIcon: 'user',        
    },
    {
        sName: '收入管理',
        sLinkurl: '/incomeManage',
        sIcon: 'money-collect',        
    },
    {
        sName: '存储管理',
        sLinkurl: '/storageManage',
        sIcon: 'transaction',
        children: [
            {
                sName: '固定资金',
                sLinkurl: '/storageManage/fixed',
                sIcon: 'account-book', 
            },
            {
                sName: '流动资金',
                sLinkurl: '/storageManage/liquidity',
                sIcon: 'account-book', 
            }
        ]        
    },
    {
        sName: '支出管理',
        sLinkurl: '/spendingManage',
        sIcon: 'account-book',        
    }
]
export default moduleList;