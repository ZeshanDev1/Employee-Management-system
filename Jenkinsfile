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
                    sh '''
                        echo "🧹 Cleaning old containers..."
                        docker rm -f server_jenkins || true
                        docker rm -f client_jenkins || true

                        echo "📦 Stopping previous deployment..."
                        docker-compose -p ${PROJECT_NAME} -f ${COMPOSE_FILE} down

                        echo "🚀 Starting new deployment..."
                        docker-compose -p ${PROJECT_NAME} -f ${COMPOSE_FILE} up -d --build
                    '''
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    sh '''
                        echo 📥 Cloning test repo...

                        # 🧹 Remove existing test folder if present
                        if [ -d "Employee-tests" ]; then
                            echo "🧹 Removing existing Employee-tests directory..."
                            rm -rf Employee-tests
                        fi

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

