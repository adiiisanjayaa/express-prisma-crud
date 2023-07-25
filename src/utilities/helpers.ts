import * as bcrypt from "bcryptjs";

module Helper {
    export module AuthHelper {
        //hash password
        export function hashPassword(password: string) {
            if(password!=undefined&&password!=''){
                password = bcrypt.hashSync(password, 8);
                return password;
            }
        }
        //checkk if unencrypted password is valid
        export function checkIfUnencryptedPasswordIsValid(password:string, unencryptedPassword: string) {
          return bcrypt.compareSync(unencryptedPassword, password);
        }
    }
}

export default Helper;