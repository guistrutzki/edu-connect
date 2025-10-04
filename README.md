# 🧩 EduConnect

> **Transformando fala em compreensão visual para uma comunicação verdadeiramente inclusiva**

## 🎯 Visão Geral

O **EduConnect** é uma plataforma de **comunicação e aprendizado inclusivo** que traduz o ambiente sonoro em representações visuais e textuais acessíveis. Ajudamos pessoas com **autismo, deficiência auditiva ou visual** a compreenderem melhor o que está sendo dito em aulas, reuniões e interações diárias.

### 🚀 O que fazemos

- 🎙️ **Capturamos** a fala em tempo real
- 🤖 **Transcrevemos** usando reconhecimento de voz avançado
- 🖼️ **Convertemos** texto em representações visuais (ícones, emojis, pictogramas)
- 🧠 **Simplificamos** o conteúdo com linguagem clara e interativa
- ♿ **Adaptamos** a visualização conforme o perfil de acessibilidade do usuário

## 💡 Problema que Resolvemos

A comunicação falada ainda é uma barreira para milhões de pessoas com necessidades específicas de compreensão:

- **Autismo**: Dificuldade de foco e interpretação auditiva
- **Deficiência auditiva**: Dependência de intérpretes de Libras ou legendas
- **Deficiência visual**: Falta de adaptação sensorial em ambientes educacionais

**Resultado**: Exclusão, dificuldade de aprendizado e perda de autonomia.

## 🎯 Público-Alvo

- 👨‍🎓 Alunos com autismo, deficiência auditiva ou visual leve
- 🏫 Escolas e universidades buscando aulas mais inclusivas
- 🏢 Empresas interessadas em comunicação acessível em treinamentos

## ✨ Funcionalidades Principais (MVP)

- **Fala → Texto → Imagem** em tempo real
- **Biblioteca visual** de pictogramas (ARASAAC + OpenMoji)
- **Modos de acessibilidade**: contraste, tamanho, ícones ampliados
- **Perfis personalizados** para diferentes necessidades
- **Modo leitura fácil** com substituição automática de palavras complexas
- **Exportação de sessões** (transcrições e representações visuais)

## 🛠️ Stack Técnica

- **Mobile**: React Native + Expo (managed workflow)
- **Speech-to-Text**: Expo Speech + Web Speech API
- **Ícones/Emojis**: OpenMoji + ARASAAC
- **Estado**: Zustand
- **Acessibilidade**: React Native Accessibility API

## 🚀 Começando

### Pré-requisitos

- Node.js 18+
- Bun (`curl -fsSL https://bun.sh/install | bash`)
- Expo CLI (`bun install -g @expo/cli`)
- Expo Go app no seu dispositivo móvel

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/edu-connect.git
cd edu-connect

# Instale as dependências
bun install

# Inicie o servidor de desenvolvimento
bun expo start
```

### Scripts Disponíveis

```bash
bun expo start          # Servidor de desenvolvimento
bun expo start --web    # Executar no navegador
bun expo build          # Build para produção
bun expo publish        # Publicar no Expo
```

## 📱 Como Usar

1. Instale o **Expo Go** no seu dispositivo móvel
2. Execute `bun expo start` no terminal
3. Escaneie o QR code com o Expo Go
4. O app será carregado no seu dispositivo

## 🛣️ Roadmap

- [ ] **MVP (Hackathon)**: App básico de tradução fala → ícones
- [ ] **Personalização**: Perfis de acessibilidade avançados
- [ ] **Plataforma SaaS**: Login, painel, relatórios
- [ ] **IA Avançada**: Simplificação semântica com LLMs
- [ ] **Integração Libras**: APIs de tradução para Libras

## 💬 Mensagem do Projeto

> "O EduConnect transforma fala em compreensão. Um espaço onde o som se torna visível, o aprendizado acessível e a comunicação realmente inclusiva."

## 🤝 Propósito da Equipe

Unir **tecnologia e empatia** para tornar o aprendizado acessível a todos. Acreditamos que **educar é conectar** — e que a inclusão começa quando cada pessoa é capaz de entender o mundo à sua volta.

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

---

<div align="center">
  <p>Feito com ❤️ para uma comunicação mais inclusiva</p>
</div>
