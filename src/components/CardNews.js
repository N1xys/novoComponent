// Arquivo: src/components/CardNews.js

class CardNews extends HTMLElement {
    constructor() {
        super();
        // Cria a "raiz" do Shadow DOM
        this.attachShadow({ mode: "open" });
    }

    // Chamado automaticamente quando o elemento é adicionado ao DOM
    connectedCallback() {
        // Constrói o HTML interno e os estilos
        this.shadowRoot.appendChild(this.build());
        this.shadowRoot.appendChild(this.styles());
    }

    build() {
        const componentRoot = document.createElement("div");
        componentRoot.setAttribute("class", "card");

        // --- card-left ---
        const cardLeft = document.createElement("div");
        cardLeft.setAttribute("class", "card-left");

        const span = document.createElement("span");
        // Lê os atributos definidos no app.js
        span.textContent = this.getAttribute("setor") || "Setor não informado";

        const h1 = document.createElement("h1");
        h1.textContent = this.getAttribute("titulo") || "Título da Vaga não informado";

        const p = document.createElement("p");
        p.textContent = this.getAttribute("descricao") || "Descrição da vaga não informada";

        // Div para informações do anunciante
        const anunciante = document.createElement("div");
        anunciante.setAttribute("class", "anunciante");

        const imgAnunciante = document.createElement("img");
        imgAnunciante.src = this.getAttribute("foto-anunciante") || "https://via.placeholder.com/20";
        imgAnunciante.alt = "Foto do Anunciante";

        const nomeAnunciante = document.createElement("span");
        nomeAnunciante.textContent = " | Postado por: " + (this.getAttribute("nome-anunciante") || "Anunciante Desconhecido");

        anunciante.appendChild(imgAnunciante);
        anunciante.appendChild(nomeAnunciante);


        // --- Botão Editar ---
        const editButton = document.createElement("button");
        editButton.setAttribute("class", "edit-button");
        editButton.textContent = "Editar";

        // Adiciona o "ouvinte" de clique no botão
        editButton.addEventListener("click", () => {
            // Dispara um evento customizado chamado 'edit-job'
            this.dispatchEvent(new CustomEvent("edit-job", {
                detail: {
                    id: this.getAttribute("id") // Envia o ID da vaga no evento
                },
                bubbles: true,  // Permite o evento "borbulhar" para fora
                composed: true // Permite o evento "atravessar" a barreira do Shadow DOM
            }));
        });

        const deletebutton = document.createElement("button");
        deletebutton.setAttribute("class", "delete-button");
        deletebutton.textContent = 'excluir';

        deletebutton.addEventListener("click", () => {
            this.dispatchEvent(new CustomEvent("delete-job", {
                detail: { id: this.getAttribute("id") },
                bubbles: true,
                composed: true,
            }));
        });


        // Adiciona os elementos ao card-left
        cardLeft.appendChild(span);
        cardLeft.appendChild(h1);
        cardLeft.appendChild(p);
        cardLeft.appendChild(anunciante);
        cardLeft.appendChild(editButton);
        cardLeft.appendChild(deletebutton) // Adiciona o botão

        // --- card-right ---
        const cardRight = document.createElement("div");
        cardRight.setAttribute("class", "card-right");

        const imgEmpresa = document.createElement("img");
        imgEmpresa.src = this.getAttribute("imagem-empresa") || "https://via.placeholder.com/180";
        imgEmpresa.alt = "Imagem da Empresa";

        cardRight.appendChild(imgEmpresa);

        // Adiciona tudo à raiz do componente
        componentRoot.appendChild(cardLeft);
        componentRoot.appendChild(cardRight);

        return componentRoot;
    }

    styles() {
        // Define os estilos encapsulados para este componente
        const style = document.createElement("style");
        style.textContent = `
            .card {
                background-color: white;
                box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
                -webkit-box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
                -moz-box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
                width: 750px;
                display: flex;
                flex-direction: row;
                border: 1px solid gray; /* Sintaxe de borda corrigida */
                margin-bottom: 8px;
            }

            .card-right {
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .card-left {
                display: flex;
                flex-direction: column;
                justify-content: center;
                padding: 10px;
                flex-grow: 1; /* Ocupa o espaço restante */
            }

            .card-left > span {
                color: rgb(82, 81, 81);
                font-size: 14px;
            }

            .card-left > h1 {
                margin-top: 15px;
                font-size: 25px;
            }

            .card-left > p {
                color: rgb(67, 67, 67);
                margin-top: 10px;
                margin-bottom: 10px;
            }

            .card-right > img {
                width: 180px;
                height: 180px;
                object-fit: cover;
                margin: 30px;
            }

            .anunciante {
                display: flex;
                align-items: center;
                margin-top: 5px;
            }

            .anunciante img {
                width: 20px;
                height: 20px;
                border-radius: 50%;
                border: 1px solid red;
                margin-right: 5px;
            }

            .anunciante span {
                font-size: 12px;
                color: #333;
            }

            /* Estilo do Botão Editar */
            .edit-button {
                background-color: #f0ad4e; /* Laranja */
                color: white;
                border: none;
                padding: 5px 10px;
                cursor: pointer;
                font-size: 12px;
                margin-top: 10px;
                width: 70px; /* Largura fixa */
                border-radius: 4px; /* Borda arredondada */
            }
            .edit-button:hover {
                background-color: #ec971f;
            }

            .delete-button {
                background-color: #f0ad4e; /* Laranja */
                color: white;
                border: none;
                padding: 5px 10px;
                cursor: pointer;
                font-size: 12px;
                margin-top: 10px;
                width: 70px; /* Largura fixa */
                border-radius: 4px; /* Borda arredondada */
            }
            .delete-button:hover {
                background-color: #ec971f;
            }
            
            button{
            
            }
        `;
        return style;
    }
}

// Define o elemento customizado <card-news>
customElements.define("card-news", CardNews);