pipeline {
    agent any
    environment {
        PROJECT_NAME = 'employee-app-jenkins'
        COMPOSE_FILE = 'docker-compose.jenkins.yml'
    }
    stages {
        stage('Build and Deploy') {
            steps {
                script {
                    sh """
                        echo "🛑 Cleaning up existing containers..."
                        docker rm -f server_jenkins || true
                        docker rm -f client_jenkins || true

                        echo "📦 Bringing down previous docker-compose project..."
                        docker-compose -p ${PROJECT_NAME} -f ${COMPOSE_FILE} down

                        echo "🚀 Building and starting new containers..."
                        docker-compose -p ${PROJECT_NAME} -f ${COMPOSE_FILE} up -d --build
                    """
                }
            }
        }
    }
    post {
        success {
            echo "✅ Deployment successful! Check the app on port 3001."
        }
        failure {
            echo "❌ Deployment failed. Please check logs."
        }
    }
}

