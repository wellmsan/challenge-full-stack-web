class MaskUtils {

    constructor() {
    }

    static removerMascara(cpf) { // 
        return cpf.replace(".", "").replace(".", "").replace("-", "")
    }
    
    static hideMailAdress(email) {
        email = email.toLowerCase();
        const prefix = email.substring(0, email.lastIndexOf('@'));
        const domain = email.substring(email.lastIndexOf('@'), email.length);
        let hiddenMail;
    
        if (prefix.length > 6) {
            const primeirasLetras =  prefix.substring(0, 2);
            const asteriscos = "*".repeat(prefix.length-4);
            const ultimasLetras =  prefix.substring(prefix.length-2, prefix.length);
    
            hiddenMail = primeirasLetras + asteriscos + ultimasLetras + domain;
        } else {
            const primeirasLetras = prefix.substring(0, 3);
            const asteriscos = "*".repeat(prefix.length-3);
    
            hiddenMail =  primeirasLetras + asteriscos + domain;
        }
    
        return hiddenMail;
    }
}
export default MaskUtils