import UserService from './user';
import UserRepositoryImpl from '../repositories/user.repoImpl';
import { jest } from '@jest/globals';

describe('UserService', () => {
    let userRepository: UserRepositoryImpl;
    let userService: UserService;

    beforeEach(() => {
        userRepository = new UserRepositoryImpl({}); // Provide the required argument
        userService = new UserService(userRepository);
    });

    it('should throw an error if the username already exists in the repository', async () => {
        const existingUser = { _id: '123', username: 'existingUser', email: 'test@example.com', password: 'hashedpassword' };
        jest.spyOn(userRepository, 'findUserByUsername').mockResolvedValue(existingUser);

        const newUser = { username: 'existingUser', email: 'new@example.com', password: 'newpassword' };

        await expect(userService.registerUser(newUser)).rejects.toThrow('Username already exists.');
    });
});
