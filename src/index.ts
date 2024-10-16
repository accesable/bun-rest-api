import { Elysia } from 'elysia';
import { router } from './routes';
import { connectToMongo } from './db/mongoClient'; // Import the MongoDB connection function
import { swagger } from '@elysiajs/swagger'
import { AuthModel,SignUpBody } from './models/user';
import UserRepository from './repositories/user.repository';
import UserRepositoryImpl from './repositories/user.repoImpl';
import UserService from './services/user';
import AppError from './utils/AppError';
const port = process.env.PORT || 3000;
try {
    const db = await connectToMongo() ;
    const userRepository = new UserRepositoryImpl(db);
    const userService = new UserService(userRepository);
    const app = new Elysia()
                .use(swagger())
                .post('/api/sign-up',async ({body}) => {
                    try {
                        return await userService.registerUser(body as SignUpBody);
                    } catch (error) {
                        if (error instanceof AppError) {
                            return {
                                status: error.statusCode,
                                message : error.message
                            }
                        }
                        return {
                            status: 500,
                            message : "An unexpected error occurred"
                        }
                    }
                },{
                    body : AuthModel.sign_up
                })
                .listen(port);

    console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
    );
} catch (error) {
    console.log("Failed to start up server : ",error)    
    process.exit(1); 
}

// Start the server and handle any errors
