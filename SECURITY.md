# Segurança – Projeto Pequenos Programadores

## 1. Objetivo
Esta política estabelece diretrizes de segurança para proteger o código, os colaboradores e os usuários do Projeto **Pequenos Programadores**, garantindo integridade, disponibilidade e confidencialidade das informações.

---

## 2. Escopo
Esta política se aplica a:
- Todo o código-fonte hospedado no repositório;
- Contribuidores, mantenedores e colaboradores externos;
- Issues, pull requests, documentação e recursos associados.

---

## 3. Diretrizes de Contribuição Segura

### 3.1 Código
- Não incluir dados sensíveis no repositório (senhas, tokens, chaves de API, dados pessoais).
- Utilizar variáveis de ambiente para qualquer credencial usada no projeto.
- Evitar dependências inseguras ou descontinuadas.
- Revisar código antes do merge para identificar riscos de segurança.

### 3.2 Pull Requests
- Todo PR deve ser revisado por pelo menos um mantenedor.
- PRs devem passar por testes automáticos (se existirem).
- Mudanças críticas devem ser discutidas previamente em Issues.

### 3.3 Issues
- Relatórios de segurança **não** devem ser públicos.
- Issues de segurança devem ser tratadas de forma privada (ver seção 7).

---

## 4. Controle de Acesso
- Mantenedores autorizados podem realizar merges na branch principal.
- As permissões seguem o princípio do **menor privilégio**.
- Acesso temporário deve ser removido após o término da colaboração.

---

## 5. Boas Práticas de Desenvolvimento Seguro
- Manter versões atualizadas de linguagens, frameworks e bibliotecas.
- Implementar validações de entrada para evitar XSS, SQL Injection e outras vulnerabilidades.
- Utilizar HTTPS para qualquer comunicação externa.
- Priorizar código limpo e documentado para reduzir riscos futuros.

---

## 6. Proteção de Dados
- O projeto **não deve armazenar dados pessoais de crianças ou usuários**, exceto quando autorizado pelos responsáveis e conforme legislação.
- Qualquer dado coletado (se houver) deve ser anonimizado e minimizado.

---

## 7. Relato de Vulnerabilidades
Caso você encontre uma falha de segurança:

1. **Não abra um Issue público.**  
2. Envie um e-mail para: **seu-email@exemplo.com** (altere para o contato real).  
3. Inclua:
   - Descrição da vulnerabilidade  
   - Passos para reproduzir  
   - Possível impacto  

A equipe responderá em até **72 horas**.

---

## 8. Gestão de Dependências
- Dependências devem ser monitoradas e atualizadas periodicamente.
- Recomenda-se habilitar o Dependabot (GitHub).
- Dependências descontinuadas ou suspeitas devem ser evitadas.

---

## 9. Branch Principal (main)
- Commits diretos na branch principal são proibidos, exceto em correções emergenciais.
- Todo código deve passar por PR e revisão.

---

## 10. Licença e Uso Responsável
- O código deve respeitar a licença definida no repositório.
- É proibido usar o projeto para fins ilegais, prejudiciais ou discriminatórios.

---

## 11. Atualização da Política
Esta política pode ser atualizada periodicamente. A versão oficial estará sempre disponível neste arquivo.
