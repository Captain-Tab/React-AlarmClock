### 步骤
1. 先到 `https://jrg-team.github.io/admin-graduation-project/`注册账号
2. 得到你的 `app-id` 和 `app-secret`

### 接口
用户注册
```
POST https://gp-server.hunger-valley.com/sign_up/user
params:{
    account: string,
    password: string,
    password_confirmation: string
}
```
用户登录
```
POST https://gp-server.hunger-valley.com/sign_in/user
params:{
    account: string,
    password: string
}
```
获取当前用户信息
```
GET https://gp-server.hunger-valley.com/me
```
获取我的`todoList`
```
GET https://gp-server.hunger-valley.com/todos
```
新增`todo`
```
POST https://gp-server.hunger-valley.com/todos
params:{
    description: string
}
```
编辑`todo`
```
PUT/PATCH https://gp-server.hunger-valley.com/todos/:id
params:{
    description?: string,
    completed?: boolean,
    deleted?: boolean,
    extra?: object
}
```
获取我的`tomatoList`
```
GET https://gp-server.hunger-valley.com/tomatoes
```
新增`tomato`
```
POST https://gp-server.hunger-valley.com/tomatoes

// 方式一：直接传 duration，新增一个番茄时间，并开始倒计时

params:{
    duration:  number //时长
}

// 方式二: 通过传 `started_at, ended_at, description, manually_created`新增一个历史「番茄」

params:{
    started_at:  datetime, //开始时间
    ended_at:  datetime, //结束时间
    description: string, //描述
    manually_created: true // 手动添加的番茄时间
}
```
编辑`tomato`
```
PUT/PATCH https://gp-server.hunger-valley.com/tomatoes/:id
params:{
    description: string; //描述
    aborted: boolean;// 是否是中断的
    extra?: {} // 拓展字段，开发者自己决定
}
```