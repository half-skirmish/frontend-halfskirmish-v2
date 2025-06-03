pipeline {
    agent any

    environment {
        IMAGE_NAME = "namans_portfolio_image"
        TAG = "latest"
        REGISTRY = "192.168.1.2:30003"
    }

    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    echo 'Building Docker Image...'
                    sh "docker build -t ${IMAGE_NAME}:${TAG} ."
                }
            }
        }

        stage('Tag Image for Registry') {
            steps {
                script {
                    echo 'Tagging image for remote registry...'
                    sh "docker tag ${IMAGE_NAME}:${TAG} ${REGISTRY}/${IMAGE_NAME}:${TAG}"
                }
            }
        }

        stage('Push Image to Registry') {
            steps {
                script {
                    echo 'Pushing Docker Image to Registry...'
                    // Optional login step if auth is required:
                    // sh "docker login ${REGISTRY} -u <username> -p <password>"
                    sh "docker push ${REGISTRY}/${IMAGE_NAME}:${TAG}"
                }
            }
        }

        stage('Remove Local Image (Optional)') {
            steps {
                script {
                    echo 'Removing local image to save space (optional)...'
                    sh "docker rmi ${REGISTRY}/${IMAGE_NAME}:${TAG} || true"
                }
            }
        }
    }
}