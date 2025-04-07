# E-commerce Full Stack Project

Este é um projeto full stack de e-commerce.

## Tecnologias Utilizadas

### Frontend
- HTML
- CSS
- Javascript

### Backend
- Java
- Springboot
- PostgreSql

### Infraestrutura
- Docker
- Docker Compose
- Nginx (servidor http)

## Pré-requisitos

Antes de iniciar, certifique-se de ter instalado em sua máquina:
- Docker ([instalação](https://docs.docker.com/get-docker/))
- Docker Compose ([instalação](https://docs.docker.com/compose/install/))
- Git

## Como Executar o Projeto

Siga estes passos simples para rodar a aplicação:

1. **Clone o repositório** (se ainda não tiver feito):
   ```bash
   git clone https://github.com/gustavoalmeidam7/ecommerce-trabalho
   cd ecommerce-trabalho
   ```

2. **Execute o script de build**:
   ```bash
   chmod +x build.sh
   ./build.sh
   ```

3. **Inicie os containers com Docker Compose**:
   ```bash
   docker-compose up -d
   ```

4. **Acesse a aplicação**:
   - Frontend clientes: `http://localhost:9090`
   - Frontend controle: `http://localhost:9091`
   - Backend API: `http://localhost:8080/produtos` 

5. (Opcional) **Para parar a aplicação**:
   ```bash
   docker-compose down
   ```
