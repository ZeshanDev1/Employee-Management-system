pipeline {
    agent any

    environment {
        COMPOSE_PROJECT_NAME = 'employee-app-jenkins'
        TEST_REPO_URL = 'https://github.com/ZeshanDev1/Employee-tests.git'
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
                    echo '🧪 Cloning and running Selenium tests...'

                    sh '''
                        echo 📥 Cloning test repo...
                        git clone $TEST_REPO_URL employee-tests

                        echo 🧪 Building and running Selenium test container...
                        cd employee-tests
                        docker build -t selenium-tests .
                        docker run --rm selenium-tests
                    '''
                }
            }
        }
    }

    post {
        always {
            echo '✅ Pipeline completed (even if tests failed)'
        }
        failure {
            echo '❌ Pipeline failed. Check logs above.'
        }
    }
}
