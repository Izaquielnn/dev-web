class PlantinhaAPI {
    constructor() {
        this.apiURL = "http://localhost:3000";
    }

    async getPosts() {
        let response = await fetch(`${this.apiURL}/posts`);
        let responseJson = await response.json();
        let posts = responseJson.error ? [] : responseJson.data;
        return posts;
    }
}

export default new PlantinhaAPI();