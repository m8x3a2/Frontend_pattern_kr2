// Фильтрация проектов
class ProjectFilter {
    constructor() {
        this.filterButtons = document.querySelectorAll('.filter-buttons .btn');
        this.projectItems = document.querySelectorAll('.project-item');
        this.init();
    }

    init() {
        this.filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.filterProjects(e.target.dataset.filter);
                this.updateActiveButton(e.target);
            });
        });
    }

    filterProjects(filter) {
        this.projectItems.forEach(item => {
            if (filter === 'all' || item.dataset.category === filter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }

    updateActiveButton(activeButton) {
        this.filterButtons.forEach(button => {
            button.classList.remove('active');
        });
        activeButton.classList.add('active');
    }
}

// Инициализация фильтра проектов
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.filter-buttons')) {
        new ProjectFilter();
    }
});