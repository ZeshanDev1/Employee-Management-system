pipeline {
    agent any

    environment {
        COMPOSE_PROJECT_NAME = 'employee-app-deploy'
    }

    stages {
        stage('Cleanup Previous Containers') {
            steps {
                script {
                    sh '''
                        echo 🧹 Cleaning up old containers...
                        docker-compose -p $COMPOSE_PROJECT_NAME -f docker-compose.jenkins.yml down || true
                    '''
                }
            }
        }

        stage('Build and Deploy') {
            steps {
                script {
                    sh '''
                        echo 🚀 Building and deploying application...
                        docker-compose -p $COMPOSE_PROJECT_NAME -f docker-compose.jenkins.yml up -d --build
                    '''
                }
            }
        }
    }

    post {
        success {
            echo '✅ Application deployed successfully!'
        }
        failure {
            echo '❌ Deployment failed.'
        }
        always {
            echo '🏁 Pipeline execution complete.'
        }
    }
}
