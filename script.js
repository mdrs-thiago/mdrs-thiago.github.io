document.addEventListener('DOMContentLoaded', function () {
    fetch('cfg/publications.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar o arquivo JSON');
            }
            return response.json();
        })
        .then(data => {
            const publicationsList = document.getElementById('publications-list');
            data.forEach(publication => {
                const publicationItem = document.createElement('div');
                publicationItem.classList.add('publication-item');

                // Cria um link para o título
                const titleLink = document.createElement('a');
                titleLink.href = publication.link;
                titleLink.textContent = publication.title;
                titleLink.target = "_blank"; // Abre o link em uma nova aba

                const title = document.createElement('h3');
                title.appendChild(titleLink);

                const authors = document.createElement('p');
                authors.classList.add('publication-authors');
                authors.textContent = publication.authors;

                publicationItem.appendChild(title);
                publicationItem.appendChild(authors);
                publicationsList.appendChild(publicationItem);
            });
        })
        .catch(error => {
            console.error('Erro ao carregar publicações:', error);
            const publicationsList = document.getElementById('publications-list');
            publicationsList.innerHTML = '<p>Não foi possível carregar as publicações.</p>';
        });
});