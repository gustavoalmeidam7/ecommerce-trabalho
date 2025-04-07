FROM gradle:8.5.0-jdk17 AS builder

COPY --chown=gradle:gradle . /home/

WORKDIR /home/

# Compila o projeto
RUN ./gradlew build --no-daemon

# Etapa 2: Imagem final leve
FROM eclipse-temurin:17-jre-alpine

# Cria diretório para o app
WORKDIR /app

# Copia o .jar gerado
COPY --from=builder /home/build/libs/ecommerce.projeto-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java","-jar","/app/app.jar"]