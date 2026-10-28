# Stage 1: Build Spring Boot application
FROM eclipse-temurin:21-jdk AS build

WORKDIR /app

# Copy Maven wrapper and pom.xml
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Copy source code
COPY src ./src

# Give permission to Maven wrapper
RUN chmod +x mvnw

# Build application
RUN ./mvnw clean package -DskipTests


# Stage 2: Run Spring Boot application
FROM eclipse-temurin:21-jre

WORKDIR /app

# Copy generated JAR file
COPY --from=build /app/target/*.jar app.jar

# Default DB = Postgres on the host machine (port 5433); docker-compose overrides this
ENV SPRING_DATASOURCE_URL=jdbc:postgresql://host.docker.internal:5433/exam_2400032515

EXPOSE 8081

ENTRYPOINT ["java", "-jar", "app.jar"]
