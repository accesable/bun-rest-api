import { User } from "../models/user";
interface UserRepository {
    findUserByUsername(username: string): Promise<User | null>;
    saveUser(user: User): Promise<User>;
    findUserById(id: string): Promise<User | null>;
    updateUser(user: User): Promise<User>;
    deleteUser(id: string): Promise<void>;
    // Add more methods as needed
    // Example: findUsersByEmail(email: string): Promise<User[]>;
}
export default UserRepository;