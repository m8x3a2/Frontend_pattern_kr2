// Валидация форм
class FormValidator {
    constructor() {
        this.contactForm = document.getElementById('contactForm');
        this.init();
    }

    init() {
        if (this.contactForm) {
            this.contactForm.addEventListener('submit', (e) => this.validateForm(e));
            this.setupRealTimeValidation();
        }
    }

    setupRealTimeValidation() {
        const inputs = this.contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearValidation(input));
        });
    }

    validateField(field) {
        this.clearValidation(field);

        if (field.id === 'name' && !field.value.trim()) {
            this.showError(field, 'Пожалуйста, введите ваше имя');
            return false;
        }

        if (field.id === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                this.showError(field, 'Пожалуйста, введите корректный email');
                return false;
            }
        }

        if (field.id === 'message' && !field.value.trim()) {
            this.showError(field, 'Пожалуйста, введите сообщение');
            return false;
        }

        return true;
    }

    validateForm(e) {
        e.preventDefault();
        
        const fields = this.contactForm.querySelectorAll('input, textarea');
        let isValid = true;

        fields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        if (isValid) {
            this.submitForm();
        }
    }

    showError(field, message) {
        field.classList.add('is-invalid');
        let errorDiv = field.nextElementSibling;
        if (!errorDiv || !errorDiv.classList.contains('invalid-feedback')) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'invalid-feedback';
            field.parentNode.insertBefore(errorDiv, field.nextSibling);
        }
        errorDiv.textContent = message;
    }

    clearValidation(field) {
        field.classList.remove('is-invalid');
        const errorDiv = field.nextElementSibling;
        if (errorDiv && errorDiv.classList.contains('invalid-feedback')) {
            errorDiv.textContent = '';
        }
    }

    submitForm() {
        // Здесь можно добавить отправку формы на сервер
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };
        
        console.log('Данные формы:', formData);
        alert('Сообщение отправлено! Спасибо за ваше сообщение.');
        this.contactForm.reset();
    }
}

// Инициализация валидации форм
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('contactForm')) {
        new FormValidator();
    }
});