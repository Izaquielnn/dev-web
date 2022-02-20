import React from "react";
import { render as renderD, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Feed from '../pages/Feed/Feed';
import PlantinhaApi from '../services/PlantinhaApi';

let container = null;
beforeEach(() => {
    // configurar o elemento do DOM como o alvo da renderização
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // limpar na saída
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it("renders posts", async () => {
    let fakePosts = [
        {
            _id: "6201cdd550da96b67e9d9ac6",
            title: "Cebolinha - segunda semana",
            description: "Adubei apenas com casca de ovo e banana, vejam como cresceram minhas cebolinhas <3",
            imgUrl: "https://i.pinimg.com/originals/4b/54/a8/4b54a8b3e422bc5f4af7dcc7a852d644.jpg"
        },
        {
            _id: "6201ce2f50da96b67e9d9ac8",
            title: "Socorrrooo!",
            description: "Gente, essa semana meu tomateiro começou a ficar assim. O que pode ser?",
            imgUrl: "https://www.agrolink.com.br/upload/problemas/Septoria_lycopersici51.jpg"
        }
    ];

    jest.spyOn(PlantinhaApi, "getPosts").mockImplementation(() =>
        Promise.resolve(fakePosts)
    );
    await act(async () => {
        renderD(<Feed />, container);
    });

    expect(container.querySelectorAll(".Post").length).toBe(2);

    PlantinhaApi.getPosts.mockRestore();
});