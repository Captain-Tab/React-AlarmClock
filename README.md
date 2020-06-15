### 番茄时间管理
核心原理: 

[番茄工作法](https://zh.wikipedia.org/wiki/%E7%95%AA%E8%8C%84%E5%B7%A5%E4%BD%9C%E6%B3%95)是一种时间管理方法，该方法使用一个定时器来分割一个为25分钟的工作时间。

核心步骤:
1. 设定番茄工作法定时器至`n`分钟（通常为25分钟）
2. 点击开始按钮，倒计时为`25`分钟
3. 持续工作直至定时器完成倒数, 记录完成的任务信息

核心作用:

番茄工作法的关键是规划，追踪，记录，处理，以及可视化。当每个番茄时结束后，成果会被记录下来以提高参与者的成就感并为未来的自我观察和改进提供原始数据。这一时间管理技术的本质目的是减少干扰，专注于当前进行的事情。

### 项目介绍
[在线预览](http://yixinistab.xyz/React-AlarmClock/)

![](https://user-gold-cdn.xitu.io/2020/6/15/172b81aba5d23267?w=1468&h=853&f=gif&s=1185566)


主要页面
* 注册页面
* 登录页面
* 用户页面，其中包括`tomato`番茄任务模块，`todoList`模块和统计模块
  
主要功能
- [x] 注册新账号
- [x] 登录账号
- [x] 退出账号
- [x] 用户首页/主页
- [x] 开始番茄任务/开始`todo`任务
- [x] 中断番茄任务
- [x] 双击编辑`todoList`任务
- [x] 可视化数据，图表互动
- [x] 点击元素，切换图表和数据显示
- [x] 统计模块计算完成总数，历史最高，今日任务等
- [x] 数据已分页形式显示
- [x] 对完成数据进行编辑和删除

主要技术
```
  "antd": "^4.2.0",
  "axios": "^0.19.2",
  "date-fns": "^2.14.0",
  "echarts": "^4.8.0",
  "gh-pages": "^3.0.0",
  "history": "^4.10.1",
  "lodash": "^4.17.15",
  "node-sass": "^4.14.1",
  "react": "^16.13.1",
  "react-dom": "^16.13.1",
  "react-redux": "^7.2.0", 
  "react-router-dom": "^5.2.0",
  "react-scripts": "3.4.1",
  "redux": "^4.0.5",
  "typescript": "~3.7.2"
``` 

### 项目目录

```
├── src
│   ├── App.vue                          # 组件入口
│   ├── assets                           # 资源目录
│   ├── components
│   │   ├── echarts                      # echart图表
│   │   │                
│   │   ├── statistics                   # 数据统计模块 
│   │   │                 
│   │   ├── todo                         # todo模块
│   │   │                 
│   │   ├── tomato                       # 番茄任务模块
│   │                  
│   ├── http                             # 请求与路由
│   │   ├── axios                        # aixos库
│   │   │                 
│   │   ├── history                      # history路由
│   │ 
│   ├── redux                            # redux模块
│   │   ├── action                       # action目录
│   │   │             
│   │   ├── reducer                      # reducer目录
│   │   │   
│   │   └── store.js                     # store文件
│   │     
│   ├── style                            # 包含所有scss文件
│   │ 
│   └── views 
│       ├── Home                         # 用户页面/主页, 实际由component目录的组件组成
│       │                    
│       ├── Login                        # 用户登录页面/退出用户后的页面
│       │   
│       ├── SignUp                       # 用户注册页面
│          
├── package.json                         # 用户配置文件                    
```

### 项目开发
```
# 启动应用
yarn start

# 测试应用
yarn test 

# 生成build
yarn build

# 部署应用
yarn run deploy 
```
