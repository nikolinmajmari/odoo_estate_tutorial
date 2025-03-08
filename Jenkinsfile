pipeline {
    agent any
    stages {
        stage('Build & Start Containers for Testing and run') {
            agent any
            environment{
                ODOO_CMD_ARGS='-d db --db_host db --db_password odoo --log-level=test --test-enable --stop-after-init --no-http -i web'
                ODOO_EXPOSE_PORT=8069
                SOFTCELL_BASE_ADDONS_PATH='./custom-modules'
                POSTGRES_EXPOSE_PORT=5432
            }
            steps {
                sh 'docker-compose up --abort-on-container-exit	'
            }
        }

        stage('Deploy to Production') {
            when {
                branch 'main'
            }
            steps {
                sh 'docker-compose -d --build'
            }
        }

        stage('Deploy to Stagging') {
            when {
                branch 'stagging'
            }
            steps {
                sh 'docker-compose up -d --build'
            }
        }
    }

    post {
        always {
            sh 'docker-compose -f $COMPOSE_FILE down || true'
        }
    }
}