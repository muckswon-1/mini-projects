
import validator from "validator";



const email = "mukabwacyril@gmail.com";
const checkEmpty = '';
const phone = "0729439194";

console.log(validator.isEmail(email));
console.log(validator.isEmpty(checkEmpty));



 export const validatePhone = phone => {
    const cleanPhoneNumber = phone.replace(/\D/g, '');
    const kenyanPhoneNumberRegex = /^(\+254|0)[17]\d{8}$/;

    if(validator.isMobilePhone(cleanPhoneNumber,kenyanPhoneNumberRegex)){
        return true;
    }

    else return "Invalid Phone Number"
}

export const validateKenyanPhoneNumber = (phoneNumber) => {
    const cleanPhoneNumber = phoneNumber.replace(/\D/g, '');
  
    // Check if the phone number starts with the appropriate Kenyan country code
    if (cleanPhoneNumber.startsWith('+254') || cleanPhoneNumber.startsWith('0')) {
      // Remove the country code from the phone number
      const numberWithoutCode = cleanPhoneNumber.replace(/^(\+254|0)/, '');
  
      // Validate the remaining digits
      const kenyanPhoneNumberRegex = /^[17]\d{8}$/;
      return kenyanPhoneNumberRegex.test(numberWithoutCode);
    }
  
    return "Invalid phone number ";
  };


export const validateEmail = email => {
    if(!validator.isEmail(email)){
        return "Invalid Email"
    }

    return true;

};

export const isEmpty = str => {
    if(validator.isEmpty(str)){
       return "This field is required";
    }
    else return false;
};
