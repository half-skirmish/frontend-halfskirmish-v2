def run(Map args) {
    def registryPush = args.registryPush?.trim()
    def registryPull = args.registryPull?.trim()
    def imageName = args.imageName?.trim()
    def imageTag = (args.imageTag ?: 'latest').trim()
    def credentialsId = args.credentialsId

    def builtImage = args.builtImage?.trim()
    if (!builtImage && imageName) {
        builtImage = "${imageName}:${imageTag}"
    }

    if (!builtImage || !registryPush || !registryPull || !imageName || !credentialsId) {
        error 'Missing required parameters for pushImage stage.'
    }

    def pushTag = "${registryPush}/${imageName}:${imageTag}"
    def pullTag = "${registryPull}/${imageName}:${imageTag}"

    sh "docker tag ${builtImage} ${pushTag}"

    withCredentials([usernamePassword(credentialsId: credentialsId, passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
        sh "docker login ${registryPush} -u ${DOCKER_USERNAME} -p ${DOCKER_PASSWORD}"
        sh "docker push ${pushTag}"
        sh "docker logout ${registryPush}"

        sh "docker tag ${builtImage} ${pullTag}"
        sh "docker login ${registryPull} -u ${DOCKER_USERNAME} -p ${DOCKER_PASSWORD}"
        sh "docker push ${pullTag}"
        sh "docker logout ${registryPull}"
    }
}

return this