// Arquivo: src/js/app.js

// Garante que o script só rode após o HTML estar completo
document.addEventListener('DOMContentLoaded', () => {

    // Seleciona os elementos principais do DOM
    const form = document.getElementById('job-form');
    const jobListContainer = document.getElementById('job-list');

    // Função para carregar as vagas do localStorage (READ)
    function loadJobs() {
        console.log("Executando loadJobs...");
        const jobs = JSON.parse(localStorage.getItem('jobVacancies')) || [];
        console.log("Vagas encontradas no localStorage:", jobs);

        jobListContainer.innerHTML = ''; // Limpa o container antes de adicionar

        // Itera sobre as vagas e cria os cards
        jobs.forEach(job => {
            const card = document.createElement('card-news');

            // Define os atributos do Web Component
            card.setAttribute('id', job.id); // Passa o ID para o card
            card.setAttribute('nome-anunciante', job.anuncianteNome);
            card.setAttribute('foto-anunciante', job.anuncianteFoto);
            card.setAttribute('titulo', job.vagaTitulo);
            card.setAttribute('setor', job.vagaSetor);
            card.setAttribute('imagem-empresa', job.empresaImagem);
            card.setAttribute('descricao', job.vagaDescricao);

            // Adiciona o card criado ao container
            jobListContainer.appendChild(card);
        });

        console.log("Cards renderizados na tela.");
    }

    // Função para carregar dados da vaga no formulário para edição (UPDATE)
    function starEdit(id) {
        console.log("Iniciando edição da vaga ID:", id);

        const jobs = JSON.parse(localStorage.getItem('jobVacancies')) || [];
        const jobIdNumber = Number(id);
        const jobToEdit = jobs.find(job => job.id === jobIdNumber);

        console.log("Vaga encontrada para edição:", jobToEdit);

        if (!jobToEdit) {
            console.error("Vaga não encontrada!");
            alert("Erro: Vaga de ID " + id + " não encontrada no armazenamento local.");
            return;
        }

        // Preenche o formulário com os dados da vaga
        document.getElementById('anunciante-nome').value = jobToEdit.anuncianteNome;
        document.getElementById('anunciante-foto').value = jobToEdit.anuncianteFoto;
        document.getElementById('vaga-titulo').value = jobToEdit.vagaTitulo;
        document.getElementById('vaga-setor').value = jobToEdit.vagaSetor;
        document.getElementById('empresa-imagem').value = jobToEdit.empresaImagem;
        document.getElementById('vaga-descricao').value = jobToEdit.vagaDescricao;

        // Marca o formulário com o ID da vaga que está sendo editada
        form.setAttribute('data-editing-id', id);
        form.querySelector('button[type="submit"]').textContent = 'Salvar Alterações';
        form.scrollIntoView({ behavior: 'smooth' });
    }

    // Função para deletar uma vaga (DELETE)
    function deleteJobs(id) {
        if (!confirm("Tem certeza que quer deletar a vaga?")) return;

        const jobs = JSON.parse(localStorage.getItem('jobVacancies')) || [];
        const jobIdNumber = Number(id);
        const jobIndex = jobs.findIndex(job => job.id === jobIdNumber);

        if (jobIndex !== -1) {
            jobs.splice(jobIndex, 1);
            localStorage.setItem('jobVacancies', JSON.stringify(jobs));

            console.log(`Vaga com ID ${id} apagada com sucesso!`);
            alert("Vaga excluída com sucesso!");
            loadJobs(); // Atualiza a lista na tela
        } else {
            console.error("Vaga não encontrada para exclusão!", id);
            alert("Vaga não localizada!");
        }
    }

    // "Ouvinte" principal do formulário (CREATE e UPDATE)
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        console.log("Formulário enviado (submit).");

        const editingId = form.getAttribute('data-editing-id');
        const jobs = JSON.parse(localStorage.getItem('jobVacancies')) || [];

        if (editingId) {
            // --- MODO UPDATE ---
            console.log("Modo: UPDATE");

            const jobIndex = jobs.findIndex(job => job.id === Number(editingId));

            if (jobIndex !== -1) {
                const updatedJob = {
                    id: Number(editingId),
                    anuncianteNome: document.getElementById('anunciante-nome').value,
                    anuncianteFoto: document.getElementById('anunciante-foto').value,
                    vagaTitulo: document.getElementById('vaga-titulo').value,
                    vagaSetor: document.getElementById('vaga-setor').value,
                    empresaImagem: document.getElementById('empresa-imagem').value,
                    vagaDescricao: document.getElementById('vaga-descricao').value,
                };

                jobs[jobIndex] = updatedJob;
                localStorage.setItem('jobVacancies', JSON.stringify(jobs));
                alert('Vaga atualizada com sucesso!');
            } else {
                alert("Erro ao atualizar: vaga não encontrada.");
            }

            form.removeAttribute('data-editing-id');
            form.querySelector('button[type="submit"]').textContent = 'Publicar Vaga';

        } else {
            // --- MODO CREATE ---
            console.log("Modo: CREATE");

            const newJob = {
                id: Date.now(),
                anuncianteNome: document.getElementById('anunciante-nome').value,
                anuncianteFoto: document.getElementById('anunciante-foto').value,
                vagaTitulo: document.getElementById('vaga-titulo').value,
                vagaSetor: document.getElementById('vaga-setor').value,
                empresaImagem: document.getElementById('empresa-imagem').value,
                vagaDescricao: document.getElementById('vaga-descricao').value,
            };

            jobs.push(newJob);
            localStorage.setItem('jobVacancies', JSON.stringify(jobs));
            alert('Vaga publicada com sucesso!');
        }

        form.reset();
        loadJobs();
        console.log("Formulário resetado e lista recarregada.");
    });

    // Ouvinte para evento 'edit-job' (vindo do componente card-news)
    jobListContainer.addEventListener('edit-job', (event) => {
        console.log("Evento 'edit-job' recebido com ID:", event.detail.id);
        starEdit(event.detail.id);
    });

    // Ouvinte para evento 'delete-job' (vindo do componente card-news)
    jobListContainer.addEventListener('delete-job', (event) => {
        console.log("Evento 'delete-job' recebido com ID:", event.detail.id);
        deleteJobs(event.detail.id);
    });

    // Carrega as vagas existentes assim que a página é iniciada
    loadJobs();
});
