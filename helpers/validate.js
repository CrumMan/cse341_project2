const Validator = require("validatorjs");
const validator =  (body, rules, customMessages, callback) => {
const validation = new Validator(body,rules, customMessages);
if(validation.passes()){
     callback(null,true)
}
else{
        callback.errors, false
    }
};

