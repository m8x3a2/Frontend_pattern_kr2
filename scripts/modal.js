// Управление модальными окнами проектов
class ProjectModal {
    constructor() {
        this.modal = document.getElementById('projectModal');
        this.modalTitle = document.getElementById('modalTitle');
        this.modalBody = document.getElementById('modalBody');
        this.projectData = {
            1: {
                title: 'Личный сайт',
                description: 'Полностью адаптивный личный сайт-портфолио, созданный с использованием HTML5 и CSS3. Включает современный дизайн, анимации и оптимизацию для различных устройств.',
                technologies: ['HTML5', 'CSS3', 'JavaScript'],
                images: ['../images/project1.jpg'],
                liveLink: '#',
                githubLink: '#'
            },
            2: {
                title: 'Todo-приложение',
                description: 'Интерактивное приложение для управления задачами с возможностью добавления, редактирования, удаления и отметки выполненных задач. Локальное хранение данных.',
                technologies: ['JavaScript', 'LocalStorage', 'CSS3'],
                images: ['../images/project2.jpg'],
                liveLink: '#',
                githubLink: '#'
            },
            3: {
                title: 'Интернет-магазин',
                description: 'Полнофункциональный интернет-магазин с корзиной покупок, системой фильтрации товаров и оформлением заказов. Реализован на React с использованием современных хуков.',
                technologies: ['React', 'React Router', 'Context API'],
                images: ['../images/project3.jpg'],
                liveLink: '#',
                githubLink: '#'
            },
            4: {
                title: 'Портфолио на Bootstrap',
                description: 'Адаптивное портфолио, созданное с использованием Bootstrap 5. Включает сетку проектов, модальные окна и responsive навигацию.',
                technologies: ['Bootstrap 5', 'JavaScript', 'CSS3'],
                images: ['../images/project4.jpg'],
                liveLink: '#',
                githubLink: '#'
            }
        };
        this.init();
    }

    init() {
        this.modal.addEventListener('show.bs.modal', (e) => {
            const button = e.relatedTarget;
            const projectId = button.dataset.project;
            this.loadProjectData(projectId);
        });
    }

    loadProjectData(projectId) {
        const project = this.projectData[projectId];
        if (!project) return;

        this.modalTitle.textContent = project.title;
        
        this.modalBody.innerHTML = `
            <div class="row">
                <div class="col-md-6">
                    <img src="${project.images[0]}" class="img-fluid rounded mb-3" alt="${project.title}">
                </div>
                <div class="col-md-6">
                    <p>${project.description}</p>
                    <h6>Технологии:</h6>
                    <div class="mb-3">
                        ${project.technologies.map(tech => `<span class="badge bg-primary me-1">${tech}</span>`).join('')}
                    </div>
                    <div class="d-grid gap-2">
                        <a href="${project.liveLink}" class="btn btn-success" target="_blank">Живая версия</a>
                        <a href="${project.githubLink}" class="btn btn-outline-primary" target="_blank">Исходный код</a>
                    </div>
                </div>
            </div>
        `;
    }
}

// Инициализация модальных окон проектов
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('projectModal')) {
        new ProjectModal();
    }
});