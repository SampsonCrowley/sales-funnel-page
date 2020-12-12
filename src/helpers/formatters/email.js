const emailPattern = '(^$|^[^@\\s;.\\/\\[\\]\\\\]+(\\.[^@\\s;.\\/\\[\\]\\\\]+)*@[^@\\s;.\\/\\[\\]\\\\]+(\\.[^@\\s;.\\/\\[\\]\\\\]+)*\\.[^@\\s;.\\/\\[\\]\\\\]+$)',
      emailRegex = new RegExp(emailPattern)

export { emailPattern, emailRegex }
