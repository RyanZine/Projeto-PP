// Utilitários do Pequenos Programadores
const PP = {
    // Sistema de notificações
    notify: {
        show: function(message, type = 'info') {
            const notification = document.createElement('div');
            notification.className = `pp-notification ${type}`;
            notification.innerHTML = `
                <div class="notification-content">
                    <p>${message}</p>
                    <button class="close-notification">×</button>
                </div>
            `;
            document.body.appendChild(notification);

            // Animação de entrada
            setTimeout(() => notification.classList.add('show'), 100);

            // Auto-fechar após 5 segundos
            setTimeout(() => this.hide(notification), 5000);

            // Botão de fechar
            notification.querySelector('.close-notification').addEventListener('click', () => {
                this.hide(notification);
            });
        },
        hide: function(notification) {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }
    },

    // Validação de formulários
    forms: {
        validate: function(formElement) {
            const inputs = formElement.querySelectorAll('input, textarea, select');
            let isValid = true;

            inputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    this.showError(input, 'Este campo é obrigatório');
                    isValid = false;
                } else if (input.type === 'email' && input.value) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(input.value)) {
                        this.showError(input, 'Email inválido');
                        isValid = false;
                    }
                } else if (input.type === 'password' && input.dataset.minLength) {
                    if (input.value.length < parseInt(input.dataset.minLength)) {
                        this.showError(input, `A senha deve ter no mínimo ${input.dataset.minLength} caracteres`);
                        isValid = false;
                    }
                }
            });

            return isValid;
        },
        showError: function(input, message) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'form-error';
            errorDiv.textContent = message;
            
            // Remove erro anterior se existir
            const existingError = input.parentNode.querySelector('.form-error');
            if (existingError) existingError.remove();
            
            input.parentNode.appendChild(errorDiv);
            input.classList.add('error');

            // Remove o erro quando o usuário começar a digitar
            input.addEventListener('input', () => {
                errorDiv.remove();
                input.classList.remove('error');
            }, { once: true });
        }
    },

    // Animações de scroll suave
    scroll: {
        toElement: function(element, offset = 0) {
            const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        },
        init: function() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', (e) => {
                    e.preventDefault();
                    const target = document.querySelector(anchor.getAttribute('href'));
                    if (target) this.toElement(target, 80);
                });
            });
        }
    },

    // Sistema de loading
    loading: {
        show: function(message = 'Carregando...') {
            const loader = document.createElement('div');
            loader.className = 'pp-loader';
            loader.innerHTML = `
                <div class="loader-content">
                        <div class="spinner">
                            <img src="logo.png" alt="Carregando..." />
                        </div>
                    <p>${message}</p>
                </div>
            `;
            document.body.appendChild(loader);
            setTimeout(() => loader.classList.add('show'), 100);
        },
        hide: function() {
            const loader = document.querySelector('.pp-loader');
            if (loader) {
                loader.classList.remove('show');
                setTimeout(() => loader.remove(), 300);
            }
        }
    },

    // Efeitos de animação
    animations: {
        fadeIn: function(element) {
            element.style.opacity = '0';
            element.style.transition = 'opacity 0.5s ease';
            setTimeout(() => element.style.opacity = '1', 100);
        },
        slideIn: function(element, direction = 'left') {
            const distance = direction === 'left' ? '-20px' : '20px';
            element.style.transform = `translateX(${distance})`;
            element.style.opacity = '0';
            element.style.transition = 'all 0.5s ease';
            setTimeout(() => {
                element.style.transform = 'translateX(0)';
                element.style.opacity = '1';
            }, 100);
        }
    },

    // Verifica força da senha
    checkPasswordStrength: function(password) {
        let strength = 0;
        
        // Comprimento mínimo
        if (password.length >= 8) strength += 20;
        
        // Letras maiúsculas
        if (password.match(/[A-Z]/)) strength += 20;
        
        // Letras minúsculas
        if (password.match(/[a-z]/)) strength += 20;
        
        // Números
        if (password.match(/[0-9]/)) strength += 20;
        
        // Caracteres especiais
        if (password.match(/[^A-Za-z0-9]/)) strength += 20;
        
        return strength;
    },

    // Inicialização
    init: function() {
        // Se estiver na página inicial, mostra a animação de carregamento
        if (location.pathname.endsWith('pequenos_programadores.html')) {
            // Oculta o conteúdo principal
            const mainContent = document.getElementById('main-content');
            if (mainContent) {
                mainContent.style.opacity = '0';
                mainContent.style.transition = 'opacity 0.5s ease';
            }
            
            // Mostra o loader
            this.loading.show('Carregando experiência interativa...');
            
            // Após 2 segundos, remove o loader e mostra o conteúdo
            setTimeout(() => {
                this.loading.hide();
                if (mainContent) {
                    mainContent.style.opacity = '1';
                }
                // Mostra a mensagem de boas-vindas após o loading
                setTimeout(() => {
                    this.notify.show('Bem-vindo ao Pequenos Programadores! 🚀', 'success');
                }, 500);
            }, 2000);
        }

        // Inicializa scroll suave
        this.scroll.init();

        // Inicializa validação de formulários
        document.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', (e) => {
                if (!this.forms.validate(form)) {
                    e.preventDefault();
                    this.notify.show('Por favor, corrija os erros no formulário.', 'error');
                }
            });

            // Monitora campos de senha para mostrar força
            const passwordInputs = form.querySelectorAll('input[type="password"]');
            passwordInputs.forEach(input => {
                input.addEventListener('input', (e) => {
                    const strength = this.checkPasswordStrength(e.target.value);
                    const progressBar = input.closest('.form-group').querySelector('.password-strength .progress');
                    if (progressBar) {
                        progressBar.style.width = strength + '%';
                        
                        // Atualiza a cor baseado na força
                        if (strength < 40) {
                            progressBar.style.background = '#ff4444';
                        } else if (strength < 80) {
                            progressBar.style.background = '#ffbb33';
                        } else {
                            progressBar.style.background = '#00C851';
                        }
                    }
                });
            });
        });

        // Permitir abrir/fechar clicando em qualquer parte do container (exceto dentro do detalhe)
        document.querySelectorAll('.resource-item').forEach(item => {
            item.addEventListener('click', (e) => {
                // não toggla se clique ocorreu dentro do detalhe
                if (e.target.closest('.resource-details')) return;
                // não duplicar se o clique foi no botão (o handler do botão já lida)
                if (e.target.closest('.resource-toggle')) return;
                // não ativar para elementos interativos dentro do item
                if (e.target.closest('a, input, textarea, select, label')) return;
                const btn = item.querySelector('.resource-toggle');
                if (btn) btn.click();
            });
        });

        // Adiciona animações aos elementos com classe .animate
        this.initAnimations();

        // Inicializa toggles de descrição dos recursos (aparece ao clicar)
        document.querySelectorAll('.resource-toggle').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const item = btn.closest('.resource-item');
                if (!item) return;
                const details = item.querySelector('.resource-details');
                const expanded = btn.getAttribute('aria-expanded') === 'true';

                // Fecha outras aberturas (comportamento accordion)
                document.querySelectorAll('.resource-item.open').forEach(openItem => {
                    if (openItem !== item) {
                        openItem.classList.remove('open');
                        const t = openItem.querySelector('.resource-toggle');
                        const d = openItem.querySelector('.resource-details');
                        if (t) t.setAttribute('aria-expanded', 'false');
                        if (d) {
                            d.setAttribute('aria-hidden', 'true');
                            d.style.maxHeight = null;
                        }
                    }
                });

                // Alterna o item atual
                btn.setAttribute('aria-expanded', String(!expanded));
                if (!expanded) {
                    item.classList.add('open');
                    details.setAttribute('aria-hidden', 'false');
                    // ajusta maxHeight para animação suave
                    details.style.maxHeight = details.scrollHeight + 'px';
                } else {
                    item.classList.remove('open');
                    details.setAttribute('aria-hidden', 'true');
                    details.style.maxHeight = null;
                }
            });
        });
    },

    // Inicializa animações
    initAnimations: function() {
        const observerConfig = {
            threshold: 0.2,
            rootMargin: '50px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerConfig);

        document.querySelectorAll('.animate').forEach(el => {
            observer.observe(el);
        });
    }
};

// Inicializa quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    PP.init();
});

/**
 * Função responsável por adicionar eventos aos botões dos cursos.
 * Quando um botão é clicado, exibe uma mensagem personalizada no console.
 */
function inicializarEventosDosCursos() {
    // Seleciona todos os botões dentro do container de cursos
    const botoes = document.querySelectorAll(".cursos button");

    // Seleciona todos os títulos dos cursos (summary)
    const titulos = document.querySelectorAll(".cursos summary");

    // Para cada botão encontrado, adiciona um evento de clique
    botoes.forEach(function(botao, indice) {
        botao.addEventListener("click", function(event) {
            // Impede o comportamento padrão do botão (caso exista)
            event.preventDefault();

            // Obtém o nome do curso correspondente ao botão clicado
            const nomeCurso = titulos[indice] ? titulos[indice].textContent : "Curso desconhecido";

            // Exibe uma mensagem no console informando qual curso foi acessado
            console.log(`Você acessou: ${nomeCurso}`);

            // Opcional: Exibe uma mensagem na tela para o usuário
            // alert(`Você está acessando: ${nomeCurso}`);
        });
    });
}
