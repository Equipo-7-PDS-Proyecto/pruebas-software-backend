pipeline {
    agent any
    environment {
        PATH = "${env.WORKSPACE}/node_modules/.bin:${env.PATH}"
        BUILD_ID = 'dontKillMe'
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
                sh 'npm run build && npx mocha --reporter mocha-junit-reporter --reporter-options mochaFile=./reports/test-results.xml ./dist/test/**/*.js'
            }
            post {
                always {
                    junit 'reports/test-results.xml'
                }
                failure {
                    error('Tests failed')
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
            when {
                //Solo ejecuta esta etapa si las pruebas pasaron
                expression { currentBuild.result == null || currentBuild.result == 'SUCCESS' }
            }
            steps {
                script {
                    // Detiene la instancia de la aplicación si está en ejecución
                    sh 'sudo systemctl stop backend.service || true'
                    // Copia los archivos necesarios para el despliegue
                    sh "sudo cp -r ${WORKSPACE}/dist /home/ec2-user/pruebas-software-backend/"
                    // Inicia el servicio
                    sh 'sudo systemctl start backend.service'
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
