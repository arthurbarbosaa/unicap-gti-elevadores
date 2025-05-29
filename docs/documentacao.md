# Documentação do Sistema de Monitoramento de Elevadores UNICAP

## Arquitetura

O sistema foi desenvolvido utilizando Next.js 14, uma framework React moderna que oferece renderização do lado do servidor (SSR) e geração estática. A arquitetura do sistema é baseada em componentes e utiliza o padrão de API Routes do Next.js para gerenciar as comunicações em tempo real.

### Principais Tecnologias

- **Next.js 14**: Framework React para desenvolvimento web
- **TailwindCSS**: Framework CSS para estilização
- **Server-Sent Events (SSE)**: Protocolo para comunicação em tempo real
- **API Routes**: Endpoints para gerenciamento de alertas

#### Integração Hardware-Software

- **Protocolo HTTP**: Comunicação entre dispositivos e servidor
- **Sistema de IPs Autorizados**: Segurança na comunicação com dispositivos
- **Eventos em Tempo Real**: Notificação imediata de problemas detectados
- **Feedback Sonoro**: Alerta sonoro para problemas críticos

## Componentes

### 1. Frontend

#### Página Principal (page.jsx)

- Componente raiz da aplicação
- Gerencia o estado global dos alertas
- Estabelece conexão SSE com o backend
- Renderiza a lista de alertas

#### Componente Alert (Alert.jsx)

- Exibe alertas individuais
- Gerencia interações do usuário
- Implementa feedback sonoro para novos alertas
- Permite resolução de problemas

### 2. Backend

#### API de Stream (/api/stream/route.js)

- Gerencia conexões SSE
- Mantém lista global de problemas
- Notifica clientes sobre atualizações

#### API de Alertas (/api/alert/route.js)

- Recebe novos alertas
- Valida IPs autorizados
- Dispara notificações

#### API de Resolução (/api/alert/resolve/route.js)

- Remove IPs da lista de problemas
- Atualiza todos os clientes conectados

## Fluxos Principais

### 1. Monitoramento de Alertas

1. Cliente estabelece conexão SSE com o servidor
2. Servidor mantém conexão aberta
3. Novos alertas são enviados em tempo real
4. Interface atualiza automaticamente

### 2. Criação de Alertas

1. Dispositivo autorizado envia POST para /api/alert
2. Sistema valida o IP do dispositivo
3. Alerta é adicionado à lista global
4. Todos os clientes são notificados

### 3. Resolução de Problemas

1. Operador clica em "Resolver"
2. Sistema envia POST para /api/alert/resolve
3. IP é removido da lista global
4. Clientes são atualizados em tempo real

## Instruções de Instalação/Uso

### Requisitos

- Node.js 18 ou superior
- NPM ou Yarn

### Instalação

1. Clone o repositório

```bash
git clone [URL_DO_REPOSITORIO]
```

2. Instale as dependências

```bash
npm install
# ou
yarn install
```

3. Inicie o servidor de desenvolvimento

```bash
npm run dev
# ou
yarn dev
```

4. Acesse a aplicação em `http://localhost:3000`

### Configuração

1. Lista de IPs Autorizados

- Edite o arquivo `/api/alert/route.js`
- Modifique a constante `AUTHORIZED_IPS`

2. Personalização de Alertas

- Edite o componente `Alert.jsx`
- Ajuste estilos usando classes TailwindCSS

### Uso

1. Monitoramento

- Acesse a interface web
- Observe alertas em tempo real
- Utilize o botão "Resolver" para tratar problemas

2. Envio de Alertas

- Use a API REST em `/api/alert`
- Envie POST com IP autorizado
- Monitore resposta do servidor

## Segurança

- Validação de IPs autorizados
- Proteção contra injeção de dados
- Conexões SSE seguras
- Sem exposição de dados sensíveis
