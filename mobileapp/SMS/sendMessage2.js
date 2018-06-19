/**
 * 云通信基础能力业务短信发送、查询详情以及消费消息示例，供参考。
 * Created on 2017-07-31
 */
const SMSClient = require('@alicloud/sms-sdk')
// ACCESS_KEY_ID/ACCESS_KEY_SECRET 根据实际申请的账号信息进行替换
const accessKeyId = 'LTAInqFwvaSp5XSf'
const secretAccessKey = 'dQmpcStlhRk8PUgZQHqNQr2WSWwlVr'
//初始化sms_client
let smsClient = new SMSClient({accessKeyId, secretAccessKey})
//发送短信


function messageVerify(phoneNumber,verifyCode){
    smsClient.sendSMS({
        PhoneNumbers: phoneNumber,
        SignName: '小世界',
        TemplateCode: 'SMS_137665616',
        TemplateParam: JSON.stringify({
            "code":verifyCode
        })
    }).then(function (res) {
        let {Code}=res
        if (Code === 'OK') {
            //处理返回参数
            console.log(res)
        }
    }, function (err) {
        console.log(err)
    })
}

function forgetPassword(phoneNumber,verifyCode){
    smsClient.sendSMS({
        PhoneNumbers: phoneNumber,
        SignName: '小世界',
        TemplateCode: 'SMS_137665739',
        TemplateParam: JSON.stringify({
            "code":verifyCode
        })
    }).then(function (res) {
        let {Code}=res
        if (Code === 'OK') {
            //处理返回参数
            console.log(res)
        }
    }, function (err) {
        console.log(err)
    })
}


// messageVerify('15082362189',"666999")
module.exports={
    messageVerify:messageVerify,
    forgetPassword:forgetPassword
}