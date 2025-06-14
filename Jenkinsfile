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

        stage('Run Tests') {
            steps {
                script {
                    sh '''
                        echo 📥 Cloning test repo...
                        rm -rf Employee-tests || true
                        git clone https://github.com/ZeshanDev1/Employee-tests.git
                        cd Employee-tests

                        echo 🐳 Building Docker test container...
                        docker build -t selenium-tests .

                        echo 🧪 Running Selenium tests...
                        docker run --rm selenium-tests
                    '''
                }
            }
        }
    }

    post {
        success {
            echo "✅ Build & Test pipeline completed successfully!"
        }
        failure {
            echo "❌ Build or Test stage failed. Check logs!"
        }
    }
}

