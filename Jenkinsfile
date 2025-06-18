pipeline {
    agent any

    environment {
        COMPOSE_PROJECT_NAME = 'employee-app-deploy'
        TEST_REPO_URL = 'https://github.com/ZeshanDev1/Employee-tests.git'
    }

    stages {
        stage('Cleanup Previous Containers') {
            steps {
                script {
                    sh '''
                        echo 🧹 Cleaning up old containers...

                        # Force remove any containers by name
                        docker rm -f server_jenkins || true
                        docker rm -f client_jenkins || true

                        # Stop docker-compose project if already running
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

        stage('Run Selenium Tests') {
            steps {
                script {
                    echo '🧪 Cloning and running Selenium tests...'

                    sh '''
                        echo 📥 Cloning test repo...
                        rm -rf employee-tests
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
            echo '🏁 Pipeline execution complete.'
        }
        failure {
            echo '❌ Deployment failed.'
        }
    }
}
