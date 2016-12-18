export const minlength = min => val => !!val && val.length >= min

export const maxlength = max => val => !val || val.length <= max
