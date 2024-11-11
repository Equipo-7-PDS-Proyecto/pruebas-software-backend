pipeline {
    agent any
    environment {
        PATH = "${env.WORKSPACE}/node_modules/.bin:${env.PATH}"
        PM2_HOME = "${env.WORKSPACE}/.pm2"
        BUILD_ID='dontKillMe'
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
        //stage('Correr Tests') {
          //  steps {
                // Ejecuta las pruebas y genera un archivo de reporte en formato JUnit
            //    sh 'npm run build && npx mocha --reporter mocha-junit-reporter --reporter-options mochaFile=./reports/test-results.xml ./dist/test/**/*.js'
            //}
            //post {
             //   always {
                    // Publica los resultados del reporte JUnit, independientemente de si pasa o falla
               //     junit 'reports/test-results.xml'
                //}
                //failure {
                    // Si las pruebas fallan, detén el pipeline
                 //   echo 'Tests failed. Stopping pipeline.'
                   // error('Tests failed')
                //}
            //}
        //}
        stage('Compilar Aplicación') {
            steps {
                script {
                    sh 'npm run build'  // Asegúrate de que el comando build esté configurado en tu package.json
                }
            }
        }
        stage('Desplegar') {
            //when {
                // Solo ejecuta esta etapa si las pruebas pasaron
              //  expression { currentBuild.result == null || currentBuild.result == 'SUCCESS' }
            //}
            steps {
                script {
                    // Usa pm2 para correr la aplicación de manera permanente en producción
                    sh 'npx pm2 stop backend || true'  // Detener la instancia previa de pm2 si existe
                    sh 'nohup npx pm2 start dist/index.js --name backend > pm2.log 2>&1 &'  // Cambia 'dist/index.js' según tu archivo de inicio
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
