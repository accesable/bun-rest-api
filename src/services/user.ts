import UserRepositoryImpl from "../repositories/user.repoImpl";
import { AuthModel, SignInBody, SignUpBody, UserDetailsBody } from "../models/user";
import { ObjectId } from "mongodb";
import AppError from "../utils/AppError";
class UserService{
    private userRepository: UserRepositoryImpl;

    constructor(userRepository: UserRepositoryImpl) {
        this.userRepository = userRepository;
    }
    async registerUser(user : SignUpBody): Promise<UserDetailsBody> {
        try {
            const existingUser = await this.userRepository.findUserByUsername(user.username);

            if (existingUser) {
                throw new AppError("Username already exists.",403);
            }

            const hashedPassword = await Bun.password.hash(user.password);
            const newUser = { ...user, password: hashedPassword ,_id : new ObjectId().toString() };
            const savedUser = await this.userRepository.saveUser(newUser);

            return  {
                _id: savedUser._id,
                username: savedUser.username,
                email: savedUser.email,
            };
            
        } catch (error) {
                // Here you can throw an AppError or handle specific cases
            console.error("Error during user registration:", error);

            if (error instanceof AppError) {
                throw error; // Rethrow if it's an AppError to be handled by the controller
            }

            throw new AppError("Failed to register user. Please try again later."); // Generic error 
        }
    }
}

export default UserService;