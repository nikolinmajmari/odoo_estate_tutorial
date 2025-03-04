pipeline {
    agent any

    stages {
        
        stage('Build & Start Containers for Testing') {
            steps {
                sh 'docker-compose up -d --build'
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
                sh ' docker-compose down'
            }
        }

        stage('Deploy to Production') {
            when {
                branch 'main'
            }
            steps {
                sh ' docker-compose up -d --build'
            }
        }
    }
    post {
        always {
            sh ' docker-compose down'
        }
    }
}