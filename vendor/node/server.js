//npm install base-64
//npm install body-parser
//npm install cors
//npm install express
//npm install fs
//npm install node-fetch
//npm install request
//npm install require
//npm install xml2js
//npm install x2js


process.env['NODE_TLS_REJECT_UNAUTHORIZED']=0;
const express = require("express");
const fs = require('fs');
var cors = require('cors');
const bodyparser = require("body-parser");
const app=express();
var request = require("request");
const{response} = require('express')
const parser = require('xml2js')
const xml = require('x2js')
const fetch = require('node-fetch');

app.use(bodyparser.json());
app.use(cors());
app.use(function(req,res,next){
    res.getHeader("Access-Control-Allow-Original","*");
    res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept");
    next();
})


//vendor login
var vendor_id;
var username;
app.post("/venlogin",async(req,res)=> {
    console.log(req.body);
    vendor_id = req.body.id;
    var url = 'https://dxbktlds4.kaarcloud.com:4300/sap/bc/srt/rfc/sap/zws_tul_cust_login/100/zws_tul_cust_login/zws_tul_cust_login';
    var xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
              <soapenv:Header/>
                <soapenv:Body>
                  <urn:ZTUL_CUST_LOGIN>
                    <ZCUS_ID>${req.body.id}</ZCUS_ID>
                    <ZCUS_PASSWORD>${req.body.pwd}</ZCUS_PASSWORD>
                  </urn:ZTUL_CUST_LOGIN>
                </soapenv:Body>
              </soapenv:Envelope>`
    var options =await fetch(url, {
      'method': 'POST',
      'headers': {
        'Content-Type': 'text/xml;charset=UTF-8',
        'SOAPAction': '"urn:sap-com:document:sap:rfc:functions:zws_tul_cust_login:ZTUL_CUST_LOGINRequest"',
        'Authorization': 'Basic QUJBUEVSMzpBYmFwZXJAMTIz',
        'Cookie': 'sap-usercontext=sap-client=100'
      },
      body: xml


    }).then(res => res.text())
        parser.parseString(options, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          var SendData = data['soap-env:Envelope']['soap-env:Body'][0]['n0:ZTUL_CUST_LOGINResponse'][0]['MESSAGE'];
          console.log(SendData);
          res.send(SendData);
      }
    }) 
    
   
});


//vendor profile
app.post("/venprofile",async(req,res)=> {
    console.log(req.body);
  var url = 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_TKR_VEN&receiverParty=&receiverService=&interface=SI_TKR_VEN_PROFILE&interfaceNamespace=http://tul_ven_portal.com';
  var xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">\r\n
  <soapenv:Header/>\r\n   <soapenv:Body>\r\n
  <urn:ZTUL_VEN_PROFILE>\r\n
  <!--You may enter the following 2 items in any order-->\r\n
  <ZVEN_ID>${vendor_id}</ZVEN_ID>\r\n
  <VENDOR_PROFILE>\r\n
  <!--Zero or more repetitions:-->\r\n
  <item>\r\n               \r\n            </item>\r\n         </VENDOR_PROFILE>\r\n      </urn:ZTUL_VEN_PROFILE>\r\n   </soapenv:Body>\r\n</soapenv:Envelope>`
    var options =await fetch(url, {
      'method': 'POST',
      'headers': {
        'Content-Type': 'text/xml;charset=UTF-8',
        'SOAPAction': '"http://sap.com/xi/WebService/soap1.1"',
        'Authorization': 'Basic cG91c2VyQDM6VGVjaEAyMDIy',
        'Cookie': 'MYSAPSSO2=AjExMDAgAA9wb3J0YWw6cG91c2VyQDOIAAdkZWZhdWx0AQAIUE9VU0VSQDMCAAMwMDADAANLUE8EAAwyMDIzMDkyMDEyNDQFAAQAAAAICgAIUE9VU0VSQDP%2FAQYwggECBgkqhkiG9w0BBwKggfQwgfECAQExCzAJBgUrDgMCGgUAMAsGCSqGSIb3DQEHATGB0TCBzgIBATAiMB0xDDAKBgNVBAMTA0tQTzENMAsGA1UECxMESjJFRQIBADAJBgUrDgMCGgUAoF0wGAYJKoZIhvcNAQkDMQsGCSqGSIb3DQEHATAcBgkqhkiG9w0BCQUxDxcNMjMwOTIwMTI0NDM3WjAjBgkqhkiG9w0BCQQxFgQUZ7jQ3aTIWL33dW3gyY2p5h4caFYwCQYHKoZIzjgEAwQwMC4CFQCwcivOIypQkgO55TL%2FTjZhwaNtdgIVAPWjj6sBKheXdM9ZbJkYyS6O7m5z; JSESSIONID=R_1iYWzjzM1wvTNCf8V3fYlR-Z6yigF-Y2kA_SAP0KEMMJFTo2javszhHI1ReDQe; JSESSIONMARKID=rqShZgqSePsYTlNJ_Ps27lWAS2sXiycqDn235jaQA; saplb_*=(J2EE6906720)6906750'
      },
      body: xml


    }).then(res => res.text())
        parser.parseString(options, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          var SendData = data['SOAP:Envelope']['SOAP:Body'][0]['ns0:ZTUL_VEN_PROFILE.Response'][0]['VENDOR_PROFILE'][0]['item'];
          console.log(SendData);
          res.send(SendData);
      }
    }) 
    
   
});



//vendor goods receipt
app.post("/vengoodsrec",function(req,res){
  var options = {
    'method': 'POST',
    'url': 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_TKR_VEN&receiverParty=&receiverService=&interface=SI_TKR_VEN_GOODS_RECEIPT&interfaceNamespace=http://tul_ven_portal.com',
    'headers': {
      'Content-Type': 'text/xml;charset=UTF-8',
      'SOAPAction': '"http://sap.com/xi/WebService/soap1.1"',
      'Authorization': 'Basic cG91c2VyQDU6VGVjaEAyMDIy',
      'Cookie': 'MYSAPSSO2=AjExMDAgAA9wb3J0YWw6UE9VU0VSQDGIAAdkZWZhdWx0AQAIUE9VU0VSQDECAAMwMDADAANLUE8EAAwyMDIzMDcxMTA2MDUFAAQAAAAICgAIUE9VU0VSQDH%2FAQQwggEABgkqhkiG9w0BBwKggfIwge8CAQExCzAJBgUrDgMCGgUAMAsGCSqGSIb3DQEHATGBzzCBzAIBATAiMB0xDDAKBgNVBAMTA0tQTzENMAsGA1UECxMESjJFRQIBADAJBgUrDgMCGgUAoF0wGAYJKoZIhvcNAQkDMQsGCSqGSIb3DQEHATAcBgkqhkiG9w0BCQUxDxcNMjMwNzExMDYwNTM1WjAjBgkqhkiG9w0BCQQxFgQUw9B4Fx8fd279aoliwCfCVoTNiSowCQYHKoZIzjgEAwQuMCwCFDMvaL25w7xg1InWqrRTzluzw3AnAhQIP!dBsVXbQldDgCA8I%2F0%2FGSgVbA%3D%3D; JSESSIONID=-3QnYOued4sD78dnL4hjK5kXIo5DiQF-Y2kA_SAPW-h1bS4GG-X0pCxzCYR3G8gB; JSESSIONMARKID=4m-J3AvSj--UEOSYt0h-xU3r6a9qqlDMrDBn5jaQA; saplb_*=(J2EE6906720)6906750'
    },
    body: `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">\r\n   <soapenv:Header/>\r\n   <soapenv:Body>\r\n      <urn:ZTUL_VEN_GOODS_RECEIPT>\r\n         <!--You may enter the following 3 items in any order-->\r\n         <ZVEN_ID>${vendor_id}</ZVEN_ID>\r\n         <!--Optional:-->\r\n         <HEADER_RESULT>\r\n            <!--Zero or more repetitions:-->\r\n            <item>\r\n               \r\n            </item>\r\n         </HEADER_RESULT>\r\n         <!--Optional:-->\r\n         <RETURN>\r\n            <!--Zero or more repetitions:-->\r\n            <item>\r\n               \r\n            </item>\r\n         </RETURN>\r\n      </urn:ZTUL_VEN_GOODS_RECEIPT>\r\n   </soapenv:Body>\r\n</soapenv:Envelope>`

  };


  request(options, function (error, response) {
    if (error) throw new Error(error);
    var data=new xml();
    var xmljs = data.xml2js(response.body);
    xmljs = JSON.stringify(xmljs)
    res.send(xmljs);

  })     
});

  //vendor cd memo
  app.post("/vencdmemo",function(req,res){
    console.log(username);
    var options = {
      'method': 'POST',
      'url': 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_TKR_VEN&receiverParty=&receiverService=&interface=SI_TKR_VEN_CDMEMO&interfaceNamespace=http://tul_ven_portal.com',
      'headers': {
        'Content-Type': 'text/xml;charset=UTF-8',
        'SOAPAction': '"http://sap.com/xi/WebService/soap1.1"',
        'Authorization': 'Basic cG91c2VyQDU6VGVjaEAyMDIy',
        'Cookie': 'MYSAPSSO2=AjExMDAgAA9wb3J0YWw6UE9VU0VSQDGIAAdkZWZhdWx0AQAIUE9VU0VSQDECAAMwMDADAANLUE8EAAwyMDIzMDcxMTA2MDUFAAQAAAAICgAIUE9VU0VSQDH%2FAQQwggEABgkqhkiG9w0BBwKggfIwge8CAQExCzAJBgUrDgMCGgUAMAsGCSqGSIb3DQEHATGBzzCBzAIBATAiMB0xDDAKBgNVBAMTA0tQTzENMAsGA1UECxMESjJFRQIBADAJBgUrDgMCGgUAoF0wGAYJKoZIhvcNAQkDMQsGCSqGSIb3DQEHATAcBgkqhkiG9w0BCQUxDxcNMjMwNzExMDYwNTM1WjAjBgkqhkiG9w0BCQQxFgQUw9B4Fx8fd279aoliwCfCVoTNiSowCQYHKoZIzjgEAwQuMCwCFDMvaL25w7xg1InWqrRTzluzw3AnAhQIP!dBsVXbQldDgCA8I%2F0%2FGSgVbA%3D%3D; JSESSIONID=-3QnYOued4sD78dnL4hjK5kXIo5DiQF-Y2kA_SAPW-h1bS4GG-X0pCxzCYR3G8gB; JSESSIONMARKID=4m-J3AvSj--UEOSYt0h-xU3r6a9qqlDMrDBn5jaQA; saplb_*=(J2EE6906720)6906750'
      },
      body: `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">\r\n   <soapenv:Header/>\r\n   <soapenv:Body>\r\n      <urn:ZTUL_VEN_CD>\r\n         <!--You may enter the following 3 items in any order-->\r\n         <ZVEN_ID>${vendor_id}</ZVEN_ID>\r\n         <ZCREDIT>\r\n            <!--Zero or more repetitions:-->\r\n            <item>\r\n               \r\n            </item>\r\n         </ZCREDIT>\r\n         <ZDEBIT>\r\n            <!--Zero or more repetitions:-->\r\n            <item>\r\n               \r\n            </item>\r\n         </ZDEBIT>\r\n      </urn:ZTUL_VEN_CD>\r\n   </soapenv:Body>\r\n</soapenv:Envelope>`

    };


request(options, function (error, response) {
  if (error) throw new Error(error);
  var data=new xml();
  var xmljs = data.xml2js(response.body);
  xmljs = JSON.stringify(xmljs)
  res.send(xmljs);

})     
});


//vendor payment and aging
app.post("/venpayage",function(req,res){
  console.log(username);
  var options = {
    'method': 'POST',
    'url': 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_TKR_VEN&receiverParty=&receiverService=&interface=SI_TKR_VEN_PAYMENT&interfaceNamespace=http://tul_ven_portal.com',
    'headers': {
      'Content-Type': 'text/xml;charset=UTF-8',
      'SOAPAction': '"http://sap.com/xi/WebService/soap1.1"',
      'Authorization': 'Basic cG91c2VyQDU6VGVjaEAyMDIy',
      'Cookie': 'MYSAPSSO2=AjExMDAgAA9wb3J0YWw6UE9VU0VSQDGIAAdkZWZhdWx0AQAIUE9VU0VSQDECAAMwMDADAANLUE8EAAwyMDIzMDcxMTA2MDUFAAQAAAAICgAIUE9VU0VSQDH%2FAQQwggEABgkqhkiG9w0BBwKggfIwge8CAQExCzAJBgUrDgMCGgUAMAsGCSqGSIb3DQEHATGBzzCBzAIBATAiMB0xDDAKBgNVBAMTA0tQTzENMAsGA1UECxMESjJFRQIBADAJBgUrDgMCGgUAoF0wGAYJKoZIhvcNAQkDMQsGCSqGSIb3DQEHATAcBgkqhkiG9w0BCQUxDxcNMjMwNzExMDYwNTM1WjAjBgkqhkiG9w0BCQQxFgQUw9B4Fx8fd279aoliwCfCVoTNiSowCQYHKoZIzjgEAwQuMCwCFDMvaL25w7xg1InWqrRTzluzw3AnAhQIP!dBsVXbQldDgCA8I%2F0%2FGSgVbA%3D%3D; JSESSIONID=-3QnYOued4sD78dnL4hjK5kXIo5DiQF-Y2kA_SAPW-h1bS4GG-X0pCxzCYR3G8gB; JSESSIONMARKID=4m-J3AvSj--UEOSYt0h-xU3r6a9qqlDMrDBn5jaQA; saplb_*=(J2EE6906720)6906750'
    },
    body: `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">\r\n   <soapenv:Header/>\r\n   <soapenv:Body>\r\n      <urn:ZTUL_VEN_PAYMENT>\r\n         <!--You may enter the following 2 items in any order-->\r\n         <ZVEN_ID>${vendor_id}</ZVEN_ID>\r\n         <IT_RESULT>\r\n            <!--Zero or more repetitions:-->\r\n            <item>\r\n               \r\n            </item>\r\n         </IT_RESULT>\r\n      </urn:ZTUL_VEN_PAYMENT>\r\n   </soapenv:Body>\r\n</soapenv:Envelope>`

  };


request(options, function (error, response) {
if (error) throw new Error(error);
var data=new xml();
var xmljs = data.xml2js(response.body);
xmljs = JSON.stringify(xmljs)
res.send(xmljs);

})     
});



//vendor purchase od h
app.post("/venpurchase_od",function(req,res){
  console.log(username);
  var options = {
    'method': 'POST',
    'url': 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_TKR_VEN&receiverParty=&receiverService=&interface=SI_TKR_VEN_PURCHASE_OD&interfaceNamespace=http://tul_ven_portal.com',
    'headers': {
      'Content-Type': 'text/xml;charset=UTF-8',
      'SOAPAction': '"http://sap.com/xi/WebService/soap1.1"',
      'Authorization': 'Basic cG91c2VyQDM6VGVjaEAyMDIy',
      'Cookie': 'MYSAPSSO2=AjExMDAgAA9wb3J0YWw6cG91c2VyQDOIAAdkZWZhdWx0AQAIUE9VU0VSQDMCAAMwMDADAANLUE8EAAwyMDIzMDkyMDEyNDQFAAQAAAAICgAIUE9VU0VSQDP%2FAQYwggECBgkqhkiG9w0BBwKggfQwgfECAQExCzAJBgUrDgMCGgUAMAsGCSqGSIb3DQEHATGB0TCBzgIBATAiMB0xDDAKBgNVBAMTA0tQTzENMAsGA1UECxMESjJFRQIBADAJBgUrDgMCGgUAoF0wGAYJKoZIhvcNAQkDMQsGCSqGSIb3DQEHATAcBgkqhkiG9w0BCQUxDxcNMjMwOTIwMTI0NDM3WjAjBgkqhkiG9w0BCQQxFgQUZ7jQ3aTIWL33dW3gyY2p5h4caFYwCQYHKoZIzjgEAwQwMC4CFQCwcivOIypQkgO55TL%2FTjZhwaNtdgIVAPWjj6sBKheXdM9ZbJkYyS6O7m5z; JSESSIONID=K-cgN4oPdc8VatY4yH3K7cRwiq6yigF-Y2kA_SAPSQm9TL4DOfaR0NkxvoeO1eRy; JSESSIONMARKID=yS5eqAE1TE92l6guHf4IPIWDUNCQqpjijV3H5jaQA; saplb_*=(J2EE6906720)6906750'
    },
    body: `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">\r\n   <soapenv:Header/>\r\n   <soapenv:Body>\r\n      <urn:ZTUL_VEN_PURCHASE_OD>\r\n         <!--You may enter the following 4 items in any order-->\r\n         <ZVEN_ID>${vendor_id}</ZVEN_ID>\r\n         <!--Optional:-->\r\n         <IT_FLOW>\r\n            <!--Zero or more repetitions:-->\r\n            <item>\r\n               \r\n            </item>\r\n         </IT_FLOW>\r\n         <!--Optional:-->\r\n         <IT_HEADER>\r\n            <!--Zero or more repetitions:-->\r\n            <item>\r\n               \r\n            </item>\r\n         </IT_HEADER>\r\n         <!--Optional:-->\r\n         <IT_ITEM>\r\n            <!--Zero or more repetitions:-->\r\n            <item>\r\n               \r\n            </item>\r\n         </IT_ITEM>\r\n      </urn:ZTUL_VEN_PURCHASE_OD>\r\n   </soapenv:Body>\r\n</soapenv:Envelope>`

  };


request(options, function (error, response) {
if (error) throw new Error(error);
var data=new xml();
var xmljs = data.xml2js(response.body);
xmljs = JSON.stringify(xmljs)
res.send(xmljs);

})     
});

//vendor quotation
app.post("/venquota",function(req,res){
  console.log(username);
  var options = {
    'method': 'POST',
    'url': 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_TKR_VEN&receiverParty=&receiverService=&interface=SI_TKR_VEN_QUOTA&interfaceNamespace=http://tul_ven_portal.com',
    'headers': {
      'Content-Type': 'text/xml;charset=UTF-8',
      'SOAPAction': '"http://sap.com/xi/WebService/soap1.1"',
      'Authorization': 'Basic cG91c2VyQDM6VGVjaEAyMDIy',
      'Cookie': 'MYSAPSSO2=AjExMDAgAA9wb3J0YWw6cG91c2VyQDOIAAdkZWZhdWx0AQAIUE9VU0VSQDMCAAMwMDADAANLUE8EAAwyMDIzMDkyMDEyNDQFAAQAAAAICgAIUE9VU0VSQDP%2FAQYwggECBgkqhkiG9w0BBwKggfQwgfECAQExCzAJBgUrDgMCGgUAMAsGCSqGSIb3DQEHATGB0TCBzgIBATAiMB0xDDAKBgNVBAMTA0tQTzENMAsGA1UECxMESjJFRQIBADAJBgUrDgMCGgUAoF0wGAYJKoZIhvcNAQkDMQsGCSqGSIb3DQEHATAcBgkqhkiG9w0BCQUxDxcNMjMwOTIwMTI0NDM3WjAjBgkqhkiG9w0BCQQxFgQUZ7jQ3aTIWL33dW3gyY2p5h4caFYwCQYHKoZIzjgEAwQwMC4CFQCwcivOIypQkgO55TL%2FTjZhwaNtdgIVAPWjj6sBKheXdM9ZbJkYyS6O7m5z; JSESSIONID=K-cgN4oPdc8VatY4yH3K7cRwiq6yigF-Y2kA_SAPSQm9TL4DOfaR0NkxvoeO1eRy; JSESSIONMARKID=yS5eqAE1TE92l6guHf4IPIWDUNCQqpjijV3H5jaQA; saplb_*=(J2EE6906720)6906750'
    },
    body: `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">\r\n   <soapenv:Header/>\r\n   <soapenv:Body>\r\n      <urn:ZTUL_VEN_REQ_QUOTA>\r\n         <!--You may enter the following 2 items in any order-->\r\n         <ZVEN_ID>${vendor_id}</ZVEN_ID>\r\n         <QUOTATION_LIST>\r\n            <!--Zero or more repetitions:-->\r\n            <item>\r\n               \r\n            </item>\r\n         </QUOTATION_LIST>\r\n      </urn:ZTUL_VEN_REQ_QUOTA>\r\n   </soapenv:Body>\r\n</soapenv:Envelope>`

  };

  


  request(options, function (error, response) {
    if (error) throw new Error(error);
    var data=new xml();
    var xmljs = data.xml2js(response.body);
    xmljs = JSON.stringify(xmljs)
    res.send(xmljs);

  })     
});

//vendor invoice 
app.post("/veninvoice",function(req,res){
  console.log(username);
  var options = {
    
      'method': 'POST',
      'url': 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_TKR_VEN&receiverParty=&receiverService=&interface=SI_TKR_VEN_INVOICE&interfaceNamespace=http://tul_ven_portal.com',
      'headers': {
        'Content-Type': 'text/xml;charset=UTF-8',
        'SOAPAction': '"http://sap.com/xi/WebService/soap1.1"',
        'Authorization': 'Basic cG91c2VyQDU6VGVjaEAyMDIy',
        'Cookie': 'MYSAPSSO2=AjExMDAgAA9wb3J0YWw6UE9VU0VSQDGIAAdkZWZhdWx0AQAIUE9VU0VSQDECAAMwMDADAANLUE8EAAwyMDIzMDcxMTA2MDUFAAQAAAAICgAIUE9VU0VSQDH%2FAQQwggEABgkqhkiG9w0BBwKggfIwge8CAQExCzAJBgUrDgMCGgUAMAsGCSqGSIb3DQEHATGBzzCBzAIBATAiMB0xDDAKBgNVBAMTA0tQTzENMAsGA1UECxMESjJFRQIBADAJBgUrDgMCGgUAoF0wGAYJKoZIhvcNAQkDMQsGCSqGSIb3DQEHATAcBgkqhkiG9w0BCQUxDxcNMjMwNzExMDYwNTM1WjAjBgkqhkiG9w0BCQQxFgQUw9B4Fx8fd279aoliwCfCVoTNiSowCQYHKoZIzjgEAwQuMCwCFDMvaL25w7xg1InWqrRTzluzw3AnAhQIP!dBsVXbQldDgCA8I%2F0%2FGSgVbA%3D%3D; JSESSIONID=-3QnYOued4sD78dnL4hjK5kXIo5DiQF-Y2kA_SAPW-h1bS4GG-X0pCxzCYR3G8gB; JSESSIONMARKID=4m-J3AvSj--UEOSYt0h-xU3r6a9qqlDMrDBn5jaQA; saplb_*=(J2EE6906720)6906750'
      },
      body: '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">\r\n   <soapenv:Header/>\r\n   <soapenv:Body>\r\n      <urn:ZTUL_FM_VEN_INVOICE>\r\n         <ZVEN_ID>1</ZVEN_ID>\r\n      </urn:ZTUL_FM_VEN_INVOICE>\r\n   </soapenv:Body>\r\n</soapenv:Envelope>'

    };


request(options, function (error, response) {
if (error) throw new Error(error);
var data=new xml();
var xmljs = data.xml2js(response.body);
xmljs = JSON.stringify(xmljs)
res.send(xmljs);

})     
});


app.listen(3030,()=>{
    console.log("Server listening on 3030");
});
