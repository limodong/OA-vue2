// 正则判断js

/**
 * 手机号正则校验 (符合规则返回true)
 *  只要是13,14,15,16,17,18,19开头即可
 * @param {*} mobile
 * @returns
 */
export const mobileReg = function (mobile) {
  let regExp = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/;
  return regExp.test(mobile);
}
/**
 * 手机验证码 正则校验 (符合规则返回true)
 *  只能为数字且长度不能超过6
 * @param {*} verificationCode
 * @returns
 */
export const verificationCodeReg = function (verificationCode) {
  let regExp = /^\d{6}$/;
  return regExp.test(verificationCode);
}
