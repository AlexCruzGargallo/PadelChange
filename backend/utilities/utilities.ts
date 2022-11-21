class Utilities {
    public static emailValidation(email: string): boolean {
        let regexEmail: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if (email.match(regexEmail)) {
            return true
        }
        return false
    }

    public static nameValidation(name: string): boolean {
        let regexName: RegExp =
            /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g
        let maxLength = 60
        if (name.length <= maxLength && name.match(regexName)) return true
        return false
    }

    public static passwordValidation(password: string) {
        let regexPassword: RegExp =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
        if (password.match(regexPassword)) {
            return true
        }
        return false
    }

    public static capitalizeFirstLetter(string: string): string {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }
}

export default Utilities
