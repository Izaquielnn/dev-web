import AuthService from "./AuthService";

class PlantinhaAPI {
    constructor() {
        this.apiURL = "http://localhost:3001";
    }

    async getPosts() {
        let response = await fetch(`${this.apiURL}/posts`);
        let responseJson = await response.json();
        let posts = responseJson.error ? [] : responseJson.data;
        return posts;
    }

    async createPost(post) {
        let user = AuthService.getLoggedUser();
        try {
            let response = await fetch(`${this.apiURL}/posts`, {
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user?.token}`
                },
                method: "POST",
                body: JSON.stringify(post)
            });
            let responseJson = await response.json();
            return responseJson.item;

        } catch (error) {
            return false;
        }

    }

    async login(user) {
        let response = await fetch(`${this.apiURL}/users/auth`, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(user)
        });
        let responseJson = await response.json();
        return responseJson;
    }

    async register(user) {
        let response = await fetch(`${this.apiURL}/users`, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(user)
        });
        let responseJson = await response.json();
        return responseJson;
    }

}

export default new PlantinhaAPI();