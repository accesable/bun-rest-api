import { Collection, Db, ObjectId } from "mongodb";
import UserRepository from "./user.repository";
import { User } from "../models/user";
class UserRepositoryImpl implements UserRepository {
    private collection: Collection<User>;

    constructor(dbInstance: Db) {
        this.collection = dbInstance.collection<User>("users");
    }

    async findUserByUsername(username: string): Promise<User | null> {
        try {
            return await this.collection.findOne({ username });
        } catch (error) {
            console.error("Error finding user by username:", error);
            throw new Error("Failed to find user by username.");
        }
    }

    async saveUser(user: User): Promise<User> {
        try {
            const result = await this.collection.insertOne(user);
            return { ...user, _id: result.insertedId.toString() };
        } catch (error) {
            console.error("Error saving user to the database:", error);
            throw new Error("Failed to save user.");
        }
    }

    async findUserById(id: string): Promise<User | null> {
        try {
            return await this.collection.findOne({ _id: id });
        } catch (error) {
            console.error("Error finding user by ID:", error);
            throw new Error("Failed to find user by ID.");
        }
    }

    async updateUser(user: User): Promise<User> {
        try {
            const { _id, ...updateData } = user;
            const result = await this.collection.updateOne({ _id: _id }, { $set: updateData });

            if (result.modifiedCount === 0) {
                throw new Error("User not found or no changes made.");
            }

            return user;
        } catch (error) {
            console.error("Error updating user:", error);
            throw new Error("Failed to update user.");
        }
    }

    async deleteUser(id: string): Promise<void> {
        try {
            const result = await this.collection.deleteOne({ _id: id });

            if (result.deletedCount === 0) {
                throw new Error("User not found.");
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            throw new Error("Failed to delete user.");
        }
    }
}

export default UserRepositoryImpl;