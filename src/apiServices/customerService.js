import axios from 'axios';

export class CustomerService {
    
    async createCustomer({name, cId, aadhar, address="", phone}) {
        try {
            if (!name || !cId || !aadhar || !phone) {
                throw new Error("Please provide all the required fields");
            }
            if (aadhar.length < 12) {
                throw new Error("Invalid aadhar number");
            }
            if (cId.length < 4) {
                throw new Error("customer id should be atleast 4 characters long");
            }
            if (phone.length < 10) {
                throw new Error("Invalid phone number");
            }
            const response = await axios.post("/api/v1/customerInfo/create",{name, cId, aadhar, address, phone});
            return response.data;
        } catch (error) {
            console.log("Error in createCustomer", error);
            return {status:error.status, message: error.message, data: null};
        }
    }

    async updateCustomer({name, newCId, aadhar, cId, address="", phone}) {
        try {
            if (!cId) {
                throw new Error("Please provide customer id");
            }
            if (!name || !aadhar || !phone || !newCId) {
                throw new Error("Please provide all the required fields")
            }
            const response = await axios.patch(`/api/v1/customerInfo/update/${cId}`,{name, newCId, aadhar, address, phone});
            return response.data;
        } catch (error) {
            console.log("Error in updateCustomer", error);
            return {status:error.status, message: error.message, data: null};
        }
    }

    async deleteCustomer({cId}) {
        try {
            if (!cId) {
                throw new Error("Please provide customer id");
            }
            const response = await axios.delete(`/api/v1/customerInfo/delete/${cId}`);
            return response.data;
        } catch (error) {
            console.log("Error in deleteCustomer", error);
            return {status:error.status, message: error.message, data: null};
        }
    }

    async findCustomer({cId}) {
        try {
            if (!cId) {
                throw new Error("Please provide customer id");
            }
            const response = await axios.get(`/api/v1/customerInfo/find/${cId}`);
            return response.data;
        } catch (error) {
            console.log("Error in findCustomer", error);
            return {status:error.status, message: error.message, data: null};
        }
    }

    async getAllCustomers({page=1, limit=10}) {
        try {
            const response = await axios.get(`/api/v1/customerInfo/all?page=${page}&limit=${limit}`);
            return response.data;
        } catch (error) {
            console.log("Error in getAllCustomers", error);
            return {status:error.status, message: error.message, data: null};
        }
    }

    async sesrchCustomer({searchBy="cId", search, page=1, limit=10}) {
        try {
            if (!search) {
                throw new Error("Please provide search query");
            }
            const response = await axios.get(`/api/v1/customerInfo/search?searchBy=${searchBy}&search=${search}&page=${page}&limit=${limit}`);
            return response.data;
        } catch (error) {
            console.log("Error in sesrchCustomer", error);
            return {status:error.status, message: error.message, data: null};
        }
    }

    async getCustomerById({cId}){
        try {
            if(!cId){
                throw new Error("Please Provide Customer Id")
            }
            const response = await axios.get(`/api/v1/customerInfo/get/${cId}`)
            return response.data;
        } catch (error) {
            console.log("Error in getCustomerById", error);
            return {status:error.status, message: error.message, data: null};
        }
    }
}

export const customerService = new CustomerService();