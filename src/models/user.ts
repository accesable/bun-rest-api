import { Elysia, t } from 'elysia'

const AuthModel = {
	sign_in: t.Object({
		username: t.String(),
		password: t.String()
	}),
    sign_up: t.Object({
        username: t.String(),
        password: t.String(),
        email: t.String()
    }),
    user_details : t.Object({
        _id: t.String(),
        username: t.String(),
        email: t.String(),
    })
}
// Optional: Create types for each DTO
export type SignInBody = typeof AuthModel.sign_in.static;
export type SignUpBody = typeof AuthModel.sign_up.static;
export type UserDetailsBody = typeof AuthModel.user_details.static;
interface User {
    _id: string;
    username: string;
    email: string;
    password: string;
}
export { AuthModel, User };