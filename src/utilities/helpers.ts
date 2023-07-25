import * as bcrypt from "bcryptjs";

module Helper {
    export module AuthHelper {
        export function testHelper(link: string) {
            return 'worked';
        }

        export function hashPassword(password: string) {
            if(password!=undefined&&password!=''){
                password = bcrypt.hashSync(password, 8);
                return password;
            }
        }
      
        export function checkIfUnencryptedPasswordIsValid(password:string, unencryptedPassword: string) {
          return bcrypt.compareSync(unencryptedPassword, password);
        }
    }
}

export default Helper;