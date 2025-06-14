pipeline {
    agent any
    environment {
        PROJECT_NAME = 'employee-app-jenkins'
        COMPOSE_FILE = 'docker-compose.jenkins.yml'
        TEST_REPO = 'https://github.com/YOUR_USERNAME/employee-tests.git'
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

        stage('Test') {
            steps {
                script {
                    sh """
                        echo "🧪 Cloning test repo..."
                        rm -rf employee-tests
                        git clone ${TEST_REPO}

                        echo "🔧 Building test container..."
                        cd employee-tests
                        docker build -t employee-tests-image .

                        echo "🚀 Running tests..."
                        docker run --rm employee-tests-image
                    """
                }
            }
        }
    }
    post {
        success {
            echo "✅ Pipeline completed successfully."
        }
        failure {
            echo "❌ Pipeline failed. Check Jenkins logs."
        }
    }
}

