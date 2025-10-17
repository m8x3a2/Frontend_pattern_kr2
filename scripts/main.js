// Управление темой
class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('themeToggle');
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.setTheme(this.currentTheme);
        this.themeToggle?.addEventListener('click', () => this.toggleTheme());
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-bs-theme', theme);
        this.themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
        localStorage.setItem('theme', theme);
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.currentTheme = newTheme;
        this.setTheme(newTheme);
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    new ThemeManager();
    
    // Плавная прокрутка для навигационных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Функция для добавления новой задачи (для diary.html)
function addNewTask() {
    const date = document.getElementById('taskDate').value;
    const description = document.getElementById('taskDescription').value;
    
    if (!date || !description) {
        alert('Пожалуйста, заполните все поля');
        return;
    }
    
    // Здесь можно добавить логику сохранения задачи
    console.log('Новая задача:', { date, description });
    
    // Закрываем модальное окно
    const modal = bootstrap.Modal.getInstance(document.getElementById('addTaskModal'));
    modal.hide();
    
    // Очищаем форму
    document.getElementById('addTaskForm').reset();
    
    alert('Задача добавлена!');
}