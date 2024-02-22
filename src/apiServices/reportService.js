import axios from "axios";

export class ReportService {
    async createReport({fiveh=0, twoh=0, oneh=0, fifty=0, twenty=0, ten=0, others=0, eId}) {
        try {
            if (!eId) {
                throw new Error("Please provide entry id");
            }
            const response = await axios.post("/api/v1/report/create", {fiveh, twoh, oneh, fifty, twenty, ten, others, eId});
            return response.data;
        } catch (error) {
            console.log("Error in reportService.createReport", error);
            return {status:error.status, message: error.message, data: null};
        }
    }

    async updateReport({rId, fiveh=0, twoh=0, oneh=0, fifty=0, twenty=0, ten=0, others=0}) {
        try {
            if (!rId) {
                throw new Error("Please provide report id");
            }
            const response = await axios.patch(`/api/v1/report/update/${rId}`, {fiveh, twoh, oneh, fifty, twenty, ten, others});
            return response.data;
        } catch (error) {
            console.log("Error in reportService.updateReport", error);
            return {status:error.status, message: error.message, data: null};
        }
    }

    async deleteReport({rId}) {
        try {
            if (!rId) {
                throw new Error("Please provide report id");
            }
            const response = await axios.delete(`/api/v1/report/delete/${rId}`);
            return response.data;
        } catch (error) {
            console.log("Error in reportService.deleteReport", error);
            return {status:error.status, message: error.message, data: null};
        }
    }
}

export const reportService = new ReportService();