import axios from "axios";

export class AuthService {
    async createUser({username, email, password}) {
        try {
            if (!username || !email || !password) {
                throw new Error("Username, email and password are required");
            }
            const response = await axios.post("/api/v1/user/createUser", {username, email, password});
            return response.data;
        } catch (error) {
            console.log("Error in authservice.createUser", error);
            return {status:error.status, message: error.message, data: null};
        }
    }

    async login({identifier,password}) {
        try {
            if (!identifier || !password) {
                throw new Error("Username or email and password are required");
            }
            const response = await axios.post("/api/v1/user/login", {identifier, password});
            return response.data;
        } catch (error) {
            console.log("Error in authservice.login", error);
            return {status:error.status, message: error.message, data: null};
        }
    }

    async logout() {
        try {
            const response = await axios.post("/api/v1/user/logout");
            return response.data;
        } catch (error) {
            console.log("Error in authservice.logout", error);
            return {status:error.status, message: error.message, data: null};
        }
    }

    async getCurrentUser() {
        try {
            const response = await axios.get("/api/v1/user/me");
            return response.data;
        } catch (error) {
            console.log("Error in authservice.getCurrentUser", error);
            return {status:error.status, message: error.message, data: null};
        }
    }

    async requestForgotPasswordEmail({email}) {
        try {
            if (!email) {
                throw new Error("Email is required");
            }
            const response = await axios.post("/api/v1/user/forgotPassword", {email});
            return response.data;
        } catch (error) {
            console.log("Error in authservice.requestForgotPasswordEmail", error);
            return {status:error.status, message: error.message, data: null};
        }
    }

    async resetPassword({token,OTP,password}) {
        try {
            if (!token || !password || !OTP) {
                throw new Error("Token, OTP and password are required");
            }
            const response = await axios.post("/api/v1/user/resetPassword", {token, password, OTP});
            return response.data;
        } catch (error) {
            console.log("Error in authservice.resetPassword", error);
            return {status:error.status, message: error.message, data: null};
        }
    }

    async changePassword({oldPassword, newPassword}) {
        try {
            if (!oldPassword || !newPassword) {
                throw new Error("Old password and new password are required");
            }
            const response = await axios.post("/api/v1/user/changePassword", {oldPassword, newPassword});
            return response.data;
        } catch (error) {
            console.log("Error in authservice.changePassword", error);
            return {status:error.status, message: error.message, data: null};
        }
    }

    async changeEmail({email}) {
        try {
            if (!email) {
                throw new Error("New email is required");
            }
            const response = await axios.post("/api/v1/user/changeEmail", {email});
            return response.data;
        } catch (error) {
            console.log("Error in authservice.changeEmail", error);
            return {status:error.status, message: error.message, data: null};
        }
    }

    async changeUsername({username}) {
        try {
            if (!username) {
                throw new Error("New username is required");
            }
            const response = await axios.post("/api/v1/user/changeUsername", {username});
            return response.data;
        } catch (error) {
            console.log("Error in authservice.changeUsername", error);
            return {status:error.status, message: error.message, data: null};
        }
    }

    async deleteUser({username}) {
        try {
            if (!username) {
                throw new Error("Username is required");
            }
            const response = await axios.delete(`/api/v1/user/deleteUser/${username}`);
            return response.data;
        } catch (error) {
            console.log("Error in authservice.deleteUser", error);
            return {status:error.status, message: error.message, data: null};
        }
    }

    async getAllUsers() {
        try {
            const response = await axios.get("/api/v1/user/getAll");
            return response.data;
        } catch (error) {
            console.log("Error in authservice.getAllUsers", error);
            return {status:error.status, message: error.message, data: null};
        }
    }
}

export const authService = new AuthService();