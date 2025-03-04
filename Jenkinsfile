pipeline {
    agent any

    stages {
        
        stage('Build & Start Containers for Testing') {
            steps {
                sh 'sudo docker-compose up -d --build'
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