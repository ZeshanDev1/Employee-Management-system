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

                        # Remove any conflicting containers by name
                        docker rm -f server_jenkins || true
                        docker rm -f client_jenkins || true

                        # Shut down any running docker-compose project
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
        always {
            echo '🏁 Pipeline execution complete.'
        }
        failure {
            echo '❌ Deployment failed.'
        }
    }
}
