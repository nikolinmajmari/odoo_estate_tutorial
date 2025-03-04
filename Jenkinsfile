pipeline {
    agent any
    environment{
        ODOO_CMD_ARGS='--dev=all'
    }
    stages {
        
        stage('Build & Start Containers for Testing') {
            environment{
                ODOO_CMD_ARGS='-d db --db_host db --db_password odoo --log-level=test --test-enable --stop-after-init --no-http -i web'
            }
            steps {
                sh 'sudo docker-compose -f docker-compose.test.yaml up --abort-on-container-exit --exit-code-from web'
            }
        }

        stage('Drop containers for tests ') {
            steps {
                script {
                   sh 'sudo docker-compose -f docker-compose.test.yaml down'
                }
            }
        }

        stage('Deploy to Production') {
            when {
                branch 'main'
            }
            steps {
                sh 'sudo docker-compose up'
            }
        }
    }
    post {
        failure {
            sh 'sudo docker-compose down'
        }
        always {
            sh 'sudo docker-compose -f docker-compose.test.yaml down'
        }
    }
}