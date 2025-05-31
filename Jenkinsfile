pipeline {
    agent any

    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    echo 'Building Docker Image...'
                    sh 'docker build -t names_portfolio .'
                }
            }
        }

        stage('Stop and Remove Existing Container') {
            steps {
                script {
                    echo 'Stopping and removing existing container if it exists...'
                    sh '''
                        if [ $(docker ps -q -f name=names_portfolio) ]; then
                            docker stop names_portfolio
                            docker rm names_portfolio
                        fi
                    '''
                }
            }
        }

        stage('Docker Compose Up') {
            steps {
                script {
                    echo 'Bringing up containers using docker-compose...'
                    sh 'sudo docker compose up -d --build'
                }
            }
        }

        stage('Remove Dangling Images') {
            steps {
                script {
                    echo 'Removing untagged (dangling) images...'
                    sh '''
                        dangling_images=$(docker images -f "dangling=true" -q)
                        if [ -n "$dangling_images" ]; then
                            docker rmi $dangling_images || true
                        fi
                    '''
                }
            }
        }
    }
}
