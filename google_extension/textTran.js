/*const translatte = require('translatte');
const test = () =>{
    translatte("toiling", {to: 'zh-tw'}).then(res => {
        //console.log(res);
        console.log(res.text);
    }).catch(err => {
        console.error(err);
    });
}
test()*/

var { translate } = require("google-translate-api-browser");


translate("你好", { to: "en" })
    .then(res => {
        console.log(res.text);
    })
    .catch(err => {
      console.error(err);
    });