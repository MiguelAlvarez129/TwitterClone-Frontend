const empty = require('is-empty')
const validator = require("validator");

export const validateRegister = (pass) => {

    const specialChar = RegExp(/\W{2,}/);
    const letter = RegExp(/[A-Za-z]{2,}/)
    const number = RegExp(/\d{2,}/)
    const password = !empty(pass) ? pass : ''

    let errors = []

    if (!validator.isLength(password,{min:6})){
        errors.push({message:'Password must be at least 6 characters long',valid:false})
    } else {
        errors.push({message:'Password must be at least 6 characters long',valid:true})
    }
     if (!specialChar.test(password)){
        errors.push({message:'Password must have at least 2 special (?@#/*\) characters',valid:false})
    } else {
        errors.push({message:'Password must have at least 2 special (?@#/*\) characters',valid:true})
    }
     if (!letter.test(password)){
        errors.push({message:'Password must have at least 2 letters',valud:false})
    } else {
        errors.push({message:'Password must have at least 2 letters',valid:true})
    }
    if (!number.test(password)){
        errors.push({message:'Password must have at least 2 numbers',valid:false})
    } else {
        errors.push({message:'Password must have at least 2 numbers',valid:true})
    }

    return errors
}