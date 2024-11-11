pipeline {
    agent any
    environment {
        NODE_ENV = 'production'
        // Agrega otras variables de entorno si son necesarias
    }
    tools {
        nodejs 'node js'
    }
    stages {
        stage('Instalar Dependencias') {
            steps {
                script {
                    sh 'npm install'
                }
            }
        }
        stage('Correr Tests') {
            steps {
                script {
                    sh 'npm test'  // Ajusta este comando si tus pruebas usan otro comando
                }
            }
        }
        stage('Compilar Aplicación') {
            steps {
                script {
                    sh 'npm run build'  // Asegúrate de que el comando build esté configurado en tu package.json
                }
            }
        }
        stage('Desplegar') {
            steps {
                script {
                    // Usa pm2 para correr la aplicación de manera permanente en producción
                    sh 'pm2 stop backend || true'  // Detener la instancia previa de pm2 si existe
                    sh 'pm2 start dist/index.js --name backend'  // Cambia 'dist/index.js' según tu archivo de inicio
                }
            }
        }
    }
    post {
        always {
            archiveArtifacts artifacts: '**/logs/*.log', allowEmptyArchive: true
        }
        success {
            echo 'Despliegue exitoso.'
        }
        failure {
            echo 'El despliegue falló.'
        }
    }
}
