# SSP-DF Strategic Dashboard

![Project Overview](assets/project-overview.svg)

## 📋 Sobre o Projeto

O **SSP-DF Strategic Dashboard** é uma plataforma de inteligência de dados desenvolvida para a **Secretaria de Segurança Pública do Distrito Federal**. O sistema centraliza indicadores estratégicos, permitindo o monitoramento em tempo real do efetivo, alocação de recursos e gestão de competências das forças de segurança (PMDF, PCDF, CBMDF e DETRAN-DF).

Este projeto foi documentado e estruturado seguindo a metodologia **BMAD (Breakthrough Method for Agile AI-Driven Development)**, garantindo uma arquitetura escalável e focada nas necessidades do usuário final (Gestor Estratégico).

> **Acesse a Documentação Completa:** [BMAD_DOCUMENTATION.md](./BMAD_DOCUMENTATION.md)

## 🚀 Funcionalidades Principais

*   **Visão Geral Estratégica:** KPIs em tempo real sobre Efetivo Total, Cobertura Regional e Previsão de Aposentadorias.
*   **Alocação Inteligente:** Mapa de calor e tabelas comparativas de Efetivo Real vs. Ideal por Região Administrativa.
*   **Gestão de Competências:** Análise de gaps de habilidades (ex: Cibercrimes, Operações Especiais) para direcionamento de cursos.
*   **Projeção de Vacância:** Gráficos preditivos para antecipação de aposentadorias e planejamento de concursos.
*   **Interface Moderna:** UX focada em clareza, com modo escuro/claro e design responsivo.

## 🛠️ Stack Tecnológica

O projeto utiliza uma arquitetura moderna baseada em **Single Page Application (SPA)**:

*   **Frontend:** React 18
*   **Linguagem:** TypeScript
*   **Build Tool:** Vite
*   **Estilização:** Tailwind CSS
*   **Visualização de Dados:** Recharts
*   **Ícones:** Lucide React

## 🏗️ Arquitetura do Sistema

```mermaid
graph TD
    User[Gestor SSP] -->|Acessa| UI[Interface Web (React)]
    UI -->|Visualiza| Overview[Dashboard Geral]
    UI -->|Gerencia| Alloc[Módulo de Alocação]
    UI -->|Analisa| Skills[Módulo de Competências]
    
    subgraph "Core Application"
        Overview
        Alloc
        Skills
        State[Gerenciamento de Estado]
    end
    
    subgraph "Data Layer (Simulated)"
        State -->|Consome| MockData[Constants / JSON]
        MockData -.->|Futuro| API[API REST/GraphQL]
    end
```

## 📦 Instalação e Execução

### Pré-requisitos
*   Node.js (versão 18 ou superior)
*   npm ou yarn

### Passo a Passo

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/gabrieldantass5/Dashboard---PPT.git
    cd Dashboard---PPT
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Execute o projeto em modo de desenvolvimento:**
    ```bash
    npm run dev
    ```

4.  **Acesse no navegador:**
    O sistema estará disponível em `http://localhost:5173` (ou porta similar indicada no terminal).

## 🤝 Contribuição

1.  Faça um Fork do projeto.
2.  Crie uma Branch para sua Feature (`git checkout -b feature/NovaFeature`).
3.  Faça o Commit (`git commit -m 'Add: Nova Feature'`).
4.  Faça o Push (`git push origin feature/NovaFeature`).
5.  Abra um Pull Request.

---
*Projeto desenvolvido com foco em inovação e eficiência para a Segurança Pública.*