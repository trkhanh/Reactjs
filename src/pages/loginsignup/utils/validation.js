
/**
 * validate input text
 * @param {String} targetName 
 * @param {String} targetValue 
 */

const validation = (targetName, targetValue) => {
  let isValid = false
  let errorMessage = ''


  switch (targetName) {
    case 'email':
      isValid = !!targetValue.match(/[\w-]+@([\w-]+\.)+[\w-]+/i)
      errorMessage = isValid ? '' : 'invalid email'
      break;

    case 'password':
      
      switch (false) {
        case !!targetValue.match(/(?=.*[a-z])/g):
          errorMessage = 'at least one lower case'
          break;
        case !!targetValue.match(/(?=.*[A-Z])/g):
          errorMessage = 'at least one Upper case'
          break;
        case !!targetValue.match(/(?=.{6,15})/g):
          errorMessage = 'length between 6 to 15'
          break;
      }

  }

  if (!targetValue) {
    errorMessage = "Required"
  }

  return {
      targetName:targetName,
      isValid: isValid,
      errorMessage: errorMessage
  }
}
export default validation;