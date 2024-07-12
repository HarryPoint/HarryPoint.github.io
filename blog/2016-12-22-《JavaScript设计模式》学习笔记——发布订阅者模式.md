## 《JavaScript设计模式》学习笔记——发布订阅者模式


<!--kg-card-begin: markdown-->

因前段时间业务需要使用到了观察者（Observer）模式，同时在使用的过程中，让我想起了Publish/Subscribe（发布/订阅）模式。起初感觉这两种模式非常相似，但是细细观察你会发现，Obsever模式要求希望接收到主题通知的观察者（或对象）必须订阅内容改变事件。

然而Publish/Subscribe模式使用了一个主题/事件通道，这个通道介于希望接收到通知（订阅者）的对象和激活事件的对象（发布者）之间。其目的是避免订阅者和发布者产生依赖关系。这与Obsever模式不同，因为它允许任何订阅者执行适当的事件处理程序来注册接收发布者发出的通知。

```
let pubsub = {};

(function (q) {
    let topics = {}, //保存订阅者
        subUid = -1; 

    //发布广播事件，包含特定的topic和数据
    q.publist = function (topic, args) {
        //判断是否有这个topic的订阅者
        if(!topics[topic]){
            return false
        }
        
        //获取这个事件的所有订阅者
        let subscribers = topics[topic],
            len =  subscribers ? subscribers.length : 0;

        while  (len--) {
            //通过while循环广播，并传递topic和数据
            subscribers[len].func(topic, args)
        }
        return this
    };

    //通过特定的名称和回调函数订阅事件，topic/event触发时执行事件
    q.subscribe = function (topic, func) {
        //判断是否有订阅该topic的订阅者，没有的话定义一个新的数组
        //topice[topic] 保存指定topic的订阅者们
        //topice[topic][index] 保存指定topic的单个订阅者
        
        if(!topics[topic]){
            topics[topic] = []
        }
        
        let token = (++subUid).toString();
        
        //给订阅者制定token和回调函数
        topics[topic].push({
            token : token,
            func : func
        });

        return token
    };

    //基于订阅上的标记引用，通过特定topic取消订阅
    q.unsubscribe = function (token) {
        for (let m in topics){
            if(topics[m]) {
                for(let i = 0, j = topics[m].length; i < j; i++){
                    if(topics[m][j].token === token){
                        topics[m].splice(i, 1);
                        return token
                    }
                }
            }
        }
    }
})(pubsub);


//定义一个订阅者
let messageLogger = function (topics, data) {
    console.log("Logging:" + topics + ": " + data)
};

//订阅者监听的topic
let subscription = pubsub.subscribe("inbox/newMessage", messageLogger);

//发布者发布订阅者感兴趣的topic
pubsub.publist("inbox/newMessage", "Hello world"); //Logging:inbox/newMessage: hello world

//或者
pubsub.publist("inbox/newMessage", ['test', 'a', 'b', 'c']); //Logging:inbox/newMessage: test,a,b,c

pubsub.publist("inbox/newMessage", {
    url: 'https://zhelin.me',
    body: 'Hello'
}); //Logging:inbox/newMessage: [object Object]

//取消订阅
pubsub.unsubscribe(subscription);

//因为订阅者和发布者没有依赖关系，发布者并不知道订阅者已经取消了订阅
pubsub.publist("inbox/newMessage", "Bye！");
```
