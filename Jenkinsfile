pipeline {
    agent any
    environment{
        ODOO_CMD_ARGS='--dev=all'
        ODOO_EXPOSE_PORT=8069
        SOFTCELL_BASE_ADDONS_PATH='./custom-modules'
        POSTGRES_EXPOSE_PORT=5432
    }
    stages {
        stage('Build & Start Containers for Testing and run tests') {
            environment{
                ODOO_CMD_ARGS='-d db --db_host db --db_password odoo --log-level=test --test-enable --stop-after-init --no-http -i web'
            }
            steps {
                  script {
                      catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                          // Run your tests here (e.g., Maven, Gradle, or any other test command)
                          sh 'sudo docker-compose up --abort-on-container-exit --exit-code-from web'
                      }
                  }
            }
        }
        stage('Deploy to Production') {
            environment{
                ODOO_CMD_ARGS='--dev=all'
                ODOO_EXPOSE_PORT=80
            }
            when {
                branch 'main'
            }
            steps {
                sh 'docker-compose -f docker-compose.yaml up -d --build'
            }
        }

        stage('Deploy to Stagging') {
            when {
                branch 'stagging'
            }
            steps {
                sh 'docker-compose -f docker-compose.yaml up -d --build'

            }
        }
    }
    post {
        failure {
            sh 'sudo docker-compose down'
        }
    }
}