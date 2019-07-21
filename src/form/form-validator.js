const defaultRules = {
    required: /\S+/,
    email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
}

export const loginRules = {
    email: [
        {
            test: defaultRules.required,
            message: "Email obligatorio"
        },
        {
            test: defaultRules.email,
            message: "Debe ingresar un email valido"
        }
    ],
    password: [
        {
            test: defaultRules.required,
            message: "Contraseña obligatoria"
        }
    ]
};

export const registerRules = {
    email: [
        {
            test: defaultRules.required,
            message: "Email obligatorio"
        },
        {
            test: defaultRules.email,
            message: "Debe ingresar un email valido"
        }
    ],
    nick: [
        {
            test: defaultRules.required,
            message: "Nick obligatorio"
        }
    ],
    password: [
        {
            test: defaultRules.required,
            message: "Contraseña obligatoria"
        }
    ],
    repeatPassword: [
        {
            test: defaultRules.required,
            message: "Contraseña obligatoria"
        }
    ]
};

class FormValidator {

    static isValidForm(form, rules) {
        const fields = Object.keys(form);
        
        for (const field of fields) {

            const fieldRules = rules[field];
            const value = form[field];

            for (const rule of fieldRules) {
                if (typeof rule.test === "object") {
                    const reg = new RegExp(rule.test);
                    if (!reg.test(value))
                        return false;
                }
                if (typeof rule.test === "function") {
                    const response = rule.test(value);
                    if (!response) return false;
                }
            }

        }

        return true;
    }

    static validateField(field, rules, value) {
        const fieldRules = rules[field];
        for (const rule of fieldRules) {
            if (typeof rule.test === "object") {
                const reg = new RegExp(rule.test);
                if (!reg.test(value))
                    return rule.message;
            }
            if (typeof rule.test === "function") {
                const response = rule.test(value);
                if (!response) return rule.message;
            }
        }

        return "";
    }

}

export default FormValidator;