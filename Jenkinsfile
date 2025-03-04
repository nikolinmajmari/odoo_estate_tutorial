pipeline {
    agent any

    stages {

        environment{
            ODOO_CMD_ARGS='--dev=all'
        }
        
        stage('Build & Start Containers for Testing') {
            environment{
                ODOO_CMD_ARGS='-d db --db_host db --db_password odoo --log-level=test --test-enable --stop-after-init --no-http -i web'
            }
            steps {
                sh 'sudo docker-compose up'
            }
        }

        stage('Run Unit Tests') {
            steps {
                script {
                   sh 'echo test'
                }
            }
        }
        stage('Stop & Remove Test Containers') {
            steps {
                sh 'sudo docker-compose down'
            }
        }

        stage('Deploy to Production') {
            when {
                branch 'main'
            }
            steps {
                sh 'sudo docker-compose up -d --build'
            }
        }
    }
    post {
        failure {
            sh 'sudo docker-compose down'
        }
    }
}