# 状态码

200：状态正常

201：状态异常

202：注册类型异常



# Response 的组织

Response通常会有如下的三个键值对：

```json
{
    'code':'200',
	'msg':'Brief Intro.',
     '*result':'MORE Details'
}
```

- '*code*'是一个状态码，详情请查阅状态码一栏

- ‘*msg*’是对状态的一个简要说明

- ‘**result*’是对结果的返回，可能只是一个值，也有可能是另外一组JSON数据

  ***表明这是可选字段，在有些情况下才会返回。**

# 模块说明

### 一、用户管理模块：

#### 	1.1	登录：

```javascript
Request Url：http://47.95.243.80:3000/users/login
Method: POST
Parameters: 
	{
		method:'email' or 'phone',
		account:'account',
		password:'password'
	}
Response
	{
		code:'200',
		msg:'msg',
		*result:'user_id'
	}
```

#### 	1.2	注册：

```javascript
Request Url：http://47.95.243.80:3000/users/register
Method: POST
Parameters: 
	{
		method:'email' or 'phone',
		account:'account',
		nickname:'nickname',
         verifycode:'verifycode',
		password:'password'
	}
Response
	{
		code:'200',
		msg:'msg',
		*result:'sqlMsg'
	}
```

#### 	1.3 发送注册验证码：

```javascript
Request Url：http://47.95.243.80:3000/users/registerVerifycode
Method: POST
Parameters: 
	{
		"account":'12312312312',
	}
Response
	{
		code:'200',
		msg:'Message already sent'
	}
```

#### 	1.4 发送重置密码验证码：

```javascript
Request Url：http://47.95.243.80:3000/users/resetVerifycode
Method: POST
Parameters: 
	{
		"account":'12312312312',
	}
Response
	{
		code:'200',
		msg:'Message already sent'
	}
```

#### 	1.5 重置密码：

```javascript
Request Url：http://47.95.243.80:3000/users/resetPassword
Method: POST
Parameters: 
	{
		"account":'12312312312',
         "password":"password",
         "verifycode":"verifycode"
	}
Response
	{
		code:'200',
		msg:'Updated Successfully',
        *result:'user_id'
	}
```

#### 	1.5 修改密码：

```javascript
Request Url：http://47.95.243.80:3000/users/modifyPassword
Method: POST
Parameters: 
	{
		"id":'12312312312',
         "oldpassword":"oldpassword",
         "newpassword":"newpassword"
	}
Response
	{
		code:'200',
		msg:'Updated Successfully'
	}
```



### 二、个人信息查询模块：

#### 	2.1、查询个人信息

##### 		2.1.1查询全部个人信息

```javascript
Request Url: http://47.95.243.80:3000/userinfo/get_userinfo_all
Method：POST
Parameters:
	{
    	'id':100
    }
Response: 
	{
		'code':200, 
		'msg': 'success',
		'result':
         	{
            	'id':100,
            	'name':'myh'
			} 
	}
```
##### 2.1.2 获取个人某些具体信息

```javascript
Request Url: http://47.95.243.80:3000/userinfo/get_userinfo
Method：POST
Parameters: 
	{
		'id':100, 
		'Attributes':'id,name,phone..'
	}
Response: 
	{
		'code':200,
		'msg': 'success', 
		'result':
			{
				'id':100, 			
				'name':'myh'
			} 
	}
```

#### 2.2、更新个人信息

##### 2.2.1只更新一个字段时

```javascript
Request Url: http://47.95.243.80/userinfo/update_userinfo
Method：POST
Parameters: 
	{
		'id':100, 
		'Attributes':
			{
				'name':'new_name'
			}
	}
Response: 
	{
		'code':200, 
		'msg': 'success'
	}
```
##### 2.2.2同时更新多个字段

```javascript
Request Url: http://47.95.243.8/userinfo/update_userinfo
Method:POST
Parameters: 
	{
		'id':100, 
		'Attributes':
			{
				'name':'new_name',
				'phone':'13155414212'
			}
	}
Response: 
	{
		'code':200, 
		'msg': 'success'
	}
```

#### 2.3获取所有用户列表

```javascript
Request Url:  http://47.95.243.80:3000/userinfo/user_list
Method:POST
Parameters:null
Response: 
	{
		'code':200, 
		'msg': 'success', 
		'result': id(数组)
	}
```
### 三、关系模块

#### 3.1  查询好友列表

```javascript
Request Url:  http://47.95.243.80:3000/relationship/all
Method:POST
Parameters:{
    "id":"22"
}
Response: 
	{
		'code':200, 
		'msg': 'success', 
         'result':[{
                'id':'id',
                'description':'description',
                'time':'time',
                'name':'name',
                'nickname':'nickname',
                'phone_number':'phone_number',
                'profile_photo':'profile_photo'
            	},
                 {
                       …………
                       …………
                 }，
                 …………
                 ]
	}
```

#### 3.2 检验好友关系

```javascript
Request Url:  http://47.95.243.80:3000/relationship/check
Method:POST
Parameters:{
    "id1":"id1",
    "id2":"id2"
}
Response: 
	{
		'code':200, 
		'msg': 'success', 
		 *'result': ""
	}
```

#### 3.3新建好友关系

```javascript
Request Url:  http://47.95.243.80:3000/relationship/new
Method:POST
Parameters:{
    "id1":"id1",
    "id2":"id2"
}
Response: 
	{
		'code':200, 
		'msg': 'success', 
		 *'result': ""
	}
```

#### 3.4筛选好友关系

```javascript
Request Url:  http://47.95.243.80:3000/relationship/filter
Method:POST
Parameters:{
    "method":"0",  0-name 1-nickname 2-number
    "id1":"id1",
    "id2":"id2"
}
Response: 
	{
		'code':200, 
		'msg': 'success', 
		 *'result': ""
	}
```

### 四、消息模块

#### 4.1发送消息

```javascript
Request Url:  http://47.95.243.80:3000/message/send
Method:POST
Parameters:{
	"sender":"sender",
    "receiver":"receiver",
    "content":"content"
}
Response: 
	{
		'code':200, 
		'msg': 'success'
	}
```

#### 4.2获取消息列表

```javascript
Request Url:  http://47.95.243.80:3000/message/receive_list
Method:POST
Parameters:{
	"id":"id"
}
Response: 
	{
		'code':200, 
		'msg': 'success',
         'result':[{
                "id":"id",
             	"sender":"sender",
             	"content":"content",
             	"invitation_status":"invitation"
            },
            ………………
                	{
                   
            }]
                   
	}
```

#### 4.3查询消息详情

```javascript
Request Url:  http://47.95.243.80:3000/message/message_info
Method:POST
Parameters:{
	"id":"id",
}
Response: 
	{
		'code':200, 
		'msg': 'success',
         'result':{
          		'id':'id',
                 'sender':'sender',
                 'receiver':'receiver',
                 'content':'content',
                 'time':'time',
                 'message_status':'message_status',
                 'invitation_status':"pending"   [Enum 字段]
            }
	}
```

#### 4.4更新消息状态

```javascript
Request Url:  http://47.95.243.80:3000/message/update_message_status
Method:POST
Parameters:{
	"id":"id",
    "message_status":"read"  [Enum 字段],
}
Response: 
	{
		'code':200, 
		'msg': 'success'
	}
```

### 五、邀请模块

#### 5.1发出添加好友邀请

```javascript
Request Url:  http://47.95.243.80:3000/invitation/send
Method:POST
Parameters:{
	"sender":"sender",
    "receiver":"receiver",
    "content":"content"
}
Response: 
	{
		'code':200, 
		'msg': 'success'
	}
```

#### 5.2更新邀请状态

```javascript
Request Url:  http://47.95.243.80:3000/invitation/update_invitation_status
Method:POST
Parameters:{
	"id":"id",
    "invitation_status":"invitation_status" [Enum 字段]
}
Response: 
	{
		'code':200, 
		'msg': 'success'
	}
```

#### 5.3发送邀请短信（邀请未注册用户注册）

```javascript
Request Url:  http://47.95.243.80:3000/invitation/newInvitaion
Method:POST
Parameters:{
	"inviterName":"inviterName",
	"targetNumber":"targetNumber"
}
Response: 
	{
		'code':200, 
		'msg': 'success'
	}
```

#### 