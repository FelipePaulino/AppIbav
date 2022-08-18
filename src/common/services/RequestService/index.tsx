import { connectApi } from "../ConnectApi";

class RequestService {
  async getCelulas() {
    const response = await connectApi.get("/celulas.json");

    if (response.data) {
      return response.data;
    } else {
      throw new Error("Algo deu errado na conexão do get");
    }
  }

  async getReports() {
    const response = await connectApi.get("/relatorios.json");

    if (response.data) {
      return response.data;
    } else {
      throw new Error("Algo deu errado na conexão do get");
    }
  }

  async getSingleReport(id: string) {
    const response = await connectApi.get(`relatorios/${id}.json`);

    if (response.data) {
      return response.data;
    } else {
      throw new Error("Algo deu errado na conexão do get");
    }
  }

  async getUsers() {
    const response = await connectApi.get("/users.json");

    if (response.data) {
      return response.data;
    } else {
      throw new Error("Algo deu errado na conexão do get");
    }
  }

  async deleteUser(id: string) {
    await connectApi.delete(`/users/${id}.json`);
  }
}

export default RequestService;
