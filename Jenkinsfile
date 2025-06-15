pipeline {
    agent any

    environment {
        COMPOSE_PROJECT_NAME = 'employee-app-jenkins'
    }

    stages {
        stage('Build and Deploy') {
            steps {
                script {
                    sh '''
                        echo 🧹 Cleaning old containers...
                        docker rm -f server_jenkins || true
                        docker rm -f client_jenkins || true

                        echo 📦 Stopping previous deployment...
                        docker-compose -p $COMPOSE_PROJECT_NAME -f docker-compose.jenkins.yml down

                        echo 🚀 Starting new deployment...
                        docker-compose -p $COMPOSE_PROJECT_NAME -f docker-compose.jenkins.yml up -d --build
                    '''
                }
            }
        }

        stage('Run Selenium Tests') {
            steps {
                script {
                    echo "🧪 Running Selenium test container..."
                    dir('employee-tests') {
                        sh '''
                            docker build -t selenium-tests .
                            docker run --rm selenium-tests
                        '''
                    }
                }
            }
        }
    }

    post {
        success {
            echo "✅ Pipeline completed successfully!"
        }
        failure {
            echo "❌ Pipeline failed. Check logs above."
        }
    }
}
