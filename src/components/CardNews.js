class CardNews extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({ mode: "open" });
        shadow.appendChild(this.build());
        shadow.appendChild(this.style());
    }

    build() {
        const componentRoot = document.createElement("div");
        componentRoot.setAttribute("class", "card");

        const cardLeft = document.createElement("div");
        cardLeft.setAttribute("class", "card-left");

        const author = document.createElement("span");
        author.textContent = "Vagas de Emprego";

        const authorInfo = document.createElement("span");
        const authorImg = document.createElement("img");
        authorImg.src = "../../assets/muttley.jpg";
        authorImg.alt = "Foto de perfil";
        authorInfo.appendChild(authorImg);
        authorInfo.appendChild(document.createTextNode(" Mutley Vigarista"));

        const linkTitle = document.createElement("h1");
        linkTitle.textContent = `Dick Vigarista contrata Devs`;

        const newContent = document.createElement("p");
        newContent.textContent = `Procura-se Devs que saibam trabalhar sob pressão,
             para trabalhar no Project Catch the Pigeon. Ambiente acolhedor e 
             amigável, dando ênfase no crescimento pessoal. 
             Café por conta da casa!!!!!!`;

        cardLeft.appendChild(author);
        cardLeft.appendChild(document.createElement("br"));
        cardLeft.appendChild(authorInfo);
        cardLeft.appendChild(linkTitle);
        cardLeft.appendChild(newContent);

        const cardRight = document.createElement("div");
        cardRight.setAttribute("class", "card-right");
        const newsImage = document.createElement("img");
        newsImage.src = "../../assets/dick_muttley-HBO-003.jpg";
        newsImage.alt = "Imagem da Notícia";

        cardRight.appendChild(newsImage);

        componentRoot.appendChild(cardLeft);
        componentRoot.appendChild(cardRight);

        return componentRoot;
    }

    style() {
        const style = document.createElement("style");
        style.textContent = `
.card {
    width: 720px;
    display: flex;
    flex-direction: row;
    background-color: rgb(253, 249, 242);
    border-radius: 25px;
}

.card-left {
    display: flex;
    justify-content: center;
    padding: 10px;
    flex-direction: column;
}

.card-left > span {
    color: rgb(52, 52, 52);
}

.card-left > h1 {
    margin-top: 15px;
    font-size: 25px;
}

.card-left img {
    border-radius: 200px;
    width: 30px;
}

.card-right {
    align-items: center;
    justify-content: center;
    display: flex;
}

.card-right img {
    width: 180px;
    margin: 20px;
    border-radius: 15px;
}
        `;
        return style;
    }
}

customElements.define('card-news', CardNews);
