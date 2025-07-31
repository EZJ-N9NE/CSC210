document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const formObject = {};
        
        for (let [key, value] of formData.entries()) {
            formObject[key] = value;
        }
        
        if (validateForm(formObject)) {
            submitForm(formObject);
        }
    });
    
    function validateForm(data) {
        const errors = [];
        
        if (!data.name || data.name.trim().length < 2) {
            errors.push('Please enter a valid name (at least 2 characters)');
        }
        
        if (!data.email || !isValidEmail(data.email)) {
            errors.push('Please enter a valid email address');
        }
        
        if (!data.subject) {
            errors.push('Please select a subject');
        }
        
        if (!data.message || data.message.trim().length < 10) {
            errors.push('Please enter a message (at least 10 characters)');
        }
        
        if (errors.length > 0) {
            showFormStatus('error', errors.join('<br>'));
            return false;
        }
        
        return true;
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function submitForm(data) {
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            
            showFormStatus('success', 
                `Thank you, ${data.name}! Your message has been received. I'll get back to you soon at ${data.email}.`
            );
            
            contactForm.reset();
            
            console.log('Form submitted:', data);
            
        }, 2000);
    }
    
    function showFormStatus(type, message) {
        formStatus.className = `form-status ${type}`;
        formStatus.innerHTML = message;
        formStatus.style.display = 'block';
        
        if (type === 'success') {
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 10000);
        }
        
        formStatus.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    const inputs = contactForm.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            this.style.borderColor = '';
        });
    });
    
    function validateField(field) {
        let isValid = true;
        const value = field.value.trim();
        
        switch(field.name) {
            case 'name':
                isValid = value.length >= 2;
                break;
            case 'email':
                isValid = isValidEmail(value);
                break;
            case 'subject':
                isValid = value !== '';
                break;
            case 'message':
                isValid = value.length >= 10;
                break;
        }
        
        if (!isValid && value !== '') {
            field.style.borderColor = '#E74C3C';
        } else if (isValid && value !== '') {
            field.style.borderColor = '#27AE60';
        } else {
            field.style.borderColor = '';
        }
        
        return isValid;
    }
    
    const messageField = document.getElementById('message');
    if (messageField) {
        const charCounter = document.createElement('div');
        charCounter.style.cssText = 'text-align: right; font-size: 0.8rem; color: #666; margin-top: 0.5rem;';
        messageField.parentNode.appendChild(charCounter);
        
        function updateCharCounter() {
            const currentLength = messageField.value.length;
            const minLength = 10;
            charCounter.textContent = `${currentLength} characters (minimum ${minLength})`;
            
            if (currentLength >= minLength) {
                charCounter.style.color = '#27AE60';
            } else {
                charCounter.style.color = '#666';
            }
        }
        
        messageField.addEventListener('input', updateCharCounter);
        updateCharCounter();
    }
});