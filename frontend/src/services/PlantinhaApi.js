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
        let response = await fetch(`${this.apiURL}/posts`, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(post)
        });
        let responseJson = await response.json();
        return responseJson.item;
    }
}

export default new PlantinhaAPI();