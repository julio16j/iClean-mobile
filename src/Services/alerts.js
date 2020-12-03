import { showMessage } from "react-native-flash-message";
function message (type) {
  return function (message) {
    showMessage({
      message,
      type
    })
  }
}
export const erroMessage = message('danger')
export const sucessMessage = message('success')
export const infoMessage = message('info')