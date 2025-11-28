# 🗺️ Mapping-cordova

Um projeto de **aplicativo móvel híbrido** desenvolvido utilizando o framework **Apache Cordova**, focado em funcionalidades de **mapeamento e geolocalização**.

Este projeto permite a criação de uma aplicação que pode ser empacotada para rodar em diferentes plataformas móveis (como Android e iOS), utilizando tecnologias web (HTML, CSS e JavaScript) para a interface do usuário.

---

## ✨ Tecnologias

O projeto é construído sobre a seguinte pilha de tecnologias:

- **Apache Cordova**: Framework para desenvolvimento de aplicativos móveis híbridos.
- **HTML5, CSS3, JavaScript**: Utilizados no frontend (pasta `www`).
- **Java**: Possivelmente usado para o desenvolvimento de plugins nativos ou para a plataforma Android (pasta `backend` e/ou código Cordova).
- **Node.js/npm**: Utilizado para gerenciar dependências e executar comandos do Cordova.

---

## ⚙️ Pré-requisitos

Para executar e desenvolver neste projeto, você precisará ter o seguinte instalado em sua máquina:

1. **Node.js e npm** (ou yarn)
2. **Cordova CLI** (Interface de Linha de Comando do Cordova)
3. **SDKs de Plataforma**  
   - Android Studio para Android  
   - Xcode para iOS (somente macOS)

### Instalação do Cordova CLI

```bash
npm install -g cordova
🚀 Instalação e Configuração
Siga os passos abaixo para clonar o repositório e preparar o ambiente de desenvolvimento:

1. Clonar o Repositório
bash
Copiar código
git clone https://github.com/arthuolliveira/Mapping-cordova.git
cd Mapping-cordova
2. Instalar Dependências
Instale as dependências definidas no package.json:

bash
Copiar código
npm install
3. Adicionar Plataformas
O Cordova precisa que você adicione as plataformas móveis desejadas.
Para Android:

bash
Copiar código
cordova platform add android
Para iOS (opcional e requer macOS):

bash
Copiar código
cordova platform add ios
4. Construir o Projeto
bash
Copiar código
cordova build android
# ou
# cordova build ios
▶️ Como Usar
Executar em um Emulador ou Dispositivo
bash
Copiar código
# Android
cordova run android

# iOS
cordova run ios
Visualizar no Navegador (Apenas Frontend)
Para testar apenas HTML/CSS/JS sem funções nativas:

bash
Copiar código
cordova serve
Acesse o endereço mostrado no terminal (geralmente http://localhost:8000).

📂 Estrutura do Projeto
A estrutura principal do projeto segue o padrão Cordova:

powershell
Copiar código
Mapping-cordova/
├── backend/          # Possível código para servidor ou plugins nativos.
├── platforms/        # Código nativo gerado (ignorado pelo Git).
├── plugins/          # Plugins Cordova instalados.
├── www/              # Frontend web (HTML, CSS, JS, assets).
│   ├── css/
│   ├── img/
│   ├── js/
│   └── index.html    # Ponto de entrada do app.
├── config.xml        # Configuração principal do Cordova.
├── package.json      # Dependências e scripts do Node.js.
└── .gitignore        # Arquivos/pastas ignoradas pelo Git.