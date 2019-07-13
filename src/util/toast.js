import { Toast } from "native-base";

export const successToast = message => {
    return Toast.show({
        text: message,
        type: "success",
        duration: 2000
    });
}

export const dangerToast = message => {
    return Toast.show({
        text: message,
        type: "danger",
        duration: 2000
    });
}

export const wariningToast = message => {
    return Toast.show({
        text: message,
        type: "warining",
        duration: 2000
    });
}