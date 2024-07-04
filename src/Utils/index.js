const regex = {
    email: /^(?:[\w!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/,
    pinCode: /^[1-9][0-9]{5}$/,
    password: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
    percent: /^[1-9][0-9]?$|^100$/,
    onlyNumber: /^[1-9]+[0-9]*$/,
    onlyAlphabet: /^[A-Za-z ]+$/,
    mobile: /^[6-9]\d{9}$/,
    number: /^\d+$/,
 };

 // <-------- Validate Mobile ---------->
 export const validateMobile = (phone) => {
    if (phone?.toString().length < 1) {
       return false;
    } else if (
       phone?.toString().length == 10 &&
       regex.mobile.test(phone)
    ) {
       return true;
    } else {
       return false;
    }
 };
 // <-------- Validate Pincode ---------->
 export const validatePincode = (pincode) => {
    if (pincode?.toString().length < 1) {
       return false;
    } else if (
       pincode?.toString().length == 6 &&
       regex.onlyNumber.test(pincode)
    ) {
       return true;
    } else {
       return false;
    }
 };
 // <----- validate required ----------->
 export const required = (value) => {
    if (!value || !value.toString().trim().length) {
       return true;
    }
    return false;
 };
 // <----- validate password ------------->
 export const validatePassword = (password) => {
    if (password != '' && regex.password.test(password)) {
       return true;
    }
    return false;
 };
 // <----- validate email ------------->
 export const validateEmail = (email) => {
    if (email && email.length < 1) {
       return false;
    } else if (email && regex.email.test(email)) {
       return true;
    } else {
       return false;
    }
 };
 // <------validate percent------>
 export const validatePercent = (discount) => {
    if (discount && regex.percent.test(discount)) {
       return true;
    } else {
       return false;
    }
 };
 export const validateOnlyNumber = (number) => {
    if (number && regex.onlyNumber.test(number)) {
       return true;
    } else {
       return false;
    }
 };
 export const validateOnlyAlphabet = (text) => {
    if (text && regex.onlyAlphabet.test(text)) {
       return true;
    } else {
       return false;
    }
 };
 // <--------- check file size -------->
 export const checkIfFilesAreCorrectSize = (file, sizeLimit) => {
    let valid = true;
    if (file) {
       if (Math.ceil(file.size / (1024 * 1024)) > sizeLimit) {
          valid = false;
       }
    }
    return valid;
 };
 // <--------- check object and array value -------->
 export const hasObjectValues = (value) => {
    if (
       (value && Object.keys(value).length > 0) ||
       (value && Array.isArray(value) && value.length > 0)
    ) {
       return true;
    }
    return false;
 };
 // <--------- check enter input only number -------->
 export const isNumber = (input) => {
    return regex?.number.test(input);
 };
 export const extractNumbers = (input) => {
    const regex = /\d+/g; // Match one or more digits
    const matches = input.match(regex);
    if (matches) {
       const maxNumbers = 6;
       const joinedMatches = matches.join('').slice(0, maxNumbers);
       return joinedMatches;
    }
    return '';
 };
 export const extractPincode = (input) => {
    const regex = /\d+/g; // Match one or more digits
    const matches = input.match(regex);
    if (matches) {
       const maxNumbers = 6;
       const joinedMatches = matches.join('').slice(0, maxNumbers);
       return joinedMatches;
    }
    return '';
 };
 export const extractAlphabate = (input) => {
    const regex = /[^a-zA-Z\s]+/g; // Match one or more digits
    const alphabetsOnly = input.replace(regex, '');
    return alphabetsOnly;
 };
 export const numberValidation = (input, sizeLimit) => {
    const regex = /\d+/g; // Match one or more digits
    const matches = input.match(regex);
    if (matches) {
       const maxNumbers = sizeLimit;
       const joinedMatches = matches.join('').slice(0, maxNumbers);
       return joinedMatches;
    }
    return '';
 };
 export const alphabetValidation = (input, sizeLimit) => {
    const regex = /[^a-zA-Z\s]/g; // Match one or more digits
    const alphabetsOnly = input.replace(regex, "");
    if (alphabetsOnly) {
       const maxNumbers = sizeLimit;
       const joinedMatches = alphabetsOnly.slice(0, maxNumbers);
       return joinedMatches;
    }
    return '';
 };
 export const alphaNumericValidation = (input, sizeLimit) => {
    const regex = /[^a-zA-Z0-9\s]/g; // Match one or more digits
    const alphaNumeric = input.replace(regex, "");
    if (alphaNumeric) {
       const maxLimit = sizeLimit;
       const joinedMatches = alphaNumeric.slice(0, maxLimit);
       return joinedMatches;
    }
    return '';
 };
 export const limitInput = (input, sizeLimit) => {
    if (input) {
       const value = input.slice(0, sizeLimit);
       return value
    }
    return '';
 }
 export const emailValidation = (input) => {
    const regex = /[^a-zA-Z0-9.@\s]/g; // Match one or more digits
    const alphabetsOnly = input.replace(regex, "");
    if (alphabetsOnly) {
       const maxNumbers = 50;
       const joinedMatches = alphabetsOnly.slice(0, maxNumbers);
       return joinedMatches;
    }
    return '';
 };
 export const parkingValidation = (input) => {
    const regex = /[^a-zA-Z0-9\s]/g; // Match one or more digits
    const alphabetsOnly = input.replace(regex, "");
    if (alphabetsOnly) {
       const maxNumbers = 15;
       const joinedMatches = alphabetsOnly.slice(0, maxNumbers);
       return joinedMatches;
    }
    return "";
 };
 export const colorValidation = (input) => {
    const regex = /[^a-zA-Z\s]/g; // Match one or more digits
    const alphabetsOnly = input.replace(regex);
    if (alphabetsOnly) {
       const maxNumbers = 15;
       const joinedMatches = alphabetsOnly.slice(0, maxNumbers);
       return joinedMatches;
    }
    return "";
 };
 export const processInput = (input) => {
    var pattern = /^.{0,40}$/; // Regular expression pattern
    return pattern.test(input) ? input : input.slice(0, 40);
 };