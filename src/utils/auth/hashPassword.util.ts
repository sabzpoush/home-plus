import bcrypt from 'bcrypt';

export function hashPassword(password):string{
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password,salt);
}