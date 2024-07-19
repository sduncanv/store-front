export function validateString(string) {

    // 1. Validar la longitud del string
    if (string.length > 120) {
        return {
            error: "El texto supera el límite de 120 caracteres.",
            isValid: false
        };
    }
  
    // 2. Validar la presencia de números
    const containsNumbers = /[0-9]/.test(string);
    if (containsNumbers) {
        return {
            error: "El texto no debe contener números.",
            isValid: false
        };
    }
  
    // 3. Validar la presencia de caracteres especiales
    const characters = /[!"#$%&'()*+,-./:;=<=>?@\[\]^_{|}~]/.test(string);
    if (characters) {
        return {
            error: "El texto no debe contener caracteres especiales.",
            isValid: false
        };
    }
  
    // Si todas las validaciones pasan, el string es válido
    return {
        error: null,
        isValid: true,
        evaluatedString: string
    };
}

export function validateEmail(email) {
    
    // 1. Validar la presencia de caracteres especiales
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const validation = emailRegex.test(email);
    if (!validation) {
        return {
            error: "Asegurate de escribir un correo exitoso.",
            isValid: false
        };
    }
  
    // Si todas las validaciones pasan, el string es válido
    return {
        error: null,
        isValid: true,
        evaluatedEmail: email
    };
}

export function validateUsername(username) {

    // 1. Validar la presencia de espacios
    if (username.includes(' ')) {
        return {
            error: "El nombre de usuario no debe contener espacios.",
            isValid: false
        };
    }

    // 2. Validar la presencia de caracteres especiales
    const hasSpecialChars = /[!"#$%&'()*+,-./:;<=>?@\[\]^_{|}~]/.test(username);
    if (hasSpecialChars) {
        return {
            error: "El nombre de usuario no debe contener caracteres especiales.",
            isValid: false
        };
    }

    // 3. Validar la longitud del string
    if (username.length < 8) {
        return {
            error: "El nombre de usuario debe tener mínimo 8 caracteres.",
            isValid: false
        };
    }

    if (username.length > 35) {
        return {
            error: "El nombre de usuario debe tener menos de 35 caracteres.",
            isValid: false
        };
    }

    for (let i = 0; i < username.length; i++) {
        if (username[i] !== username[i].toLowerCase()) {
            return {
                error: "El nombre de usuario no debe contener mayúsculas.",
                isValid: false
            };
        }
    }

    // Si todas las validaciones pasan, el username es válido
    return {
        error: null,
        isValid: true,
        validatedUsername: username.toLowerCase() // Convierte a minúsculas
    };
}

export function validatePassword(password) {

    // 1. Validar la presencia de espacios
    if (password.includes(' ')) {
        return {
            error: "La contraseña no debe contener espacios.",
            isValid: false
        };
    }

    // 2. Validar la presencia de mayúsculas
    const charactersPass = /[!"#$%&'()*+,-./:;<=>?@\[\]^_{|}~]/.test(password);
    if (!charactersPass) {
        return {
            error: "La contraseña debe contener caracter especia (@={}[]#?%).",
            isValid: false
        };
    }

    if (password.length < 8) {
        return {
            error: "La contraseña debe tener mínimo 8 caracteres.",
            isValid: false
        };
    }
  
    // Si todas las validaciones pasan, la contraseña es válida
    return {
        error: null,
        isValid: true,
        evaluatedPassword: password
    };
}

export function allElementsTrue(array) {
    return array.every(element => element === true);
}

/**
 * Thist functions calculates total price of a new order
 * @param {Array} products cartProducts: Array of objects
 * @returns {number} Total price
 */
export const totalPrice = (products) => {
    let sum = 0
    products.forEach(product => sum += product.price)
    return sum
}

export function getDate() {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');

    const formattedDate = `${year}${month}${day}`;

    return {
        formattedDate: formattedDate
    };
}