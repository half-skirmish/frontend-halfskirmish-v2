def run(Map args) {
    def imageName = args.get('imageName', '').trim()
    def providedTag = args.get('imageTag', '').trim()
    def imageTag = providedTag

    if (!imageTag) {
        if (!imageName) {
            error 'Provide imageTag or imageName so the build stage can tag the image.'
        }
        imageTag = "${imageName}:latest"
    }

    def dockerfile = args.get('dockerfile', 'Dockerfile')
    def buildContext = args.get('buildContext', '.')

    sh """
      docker build -t ${imageTag} -f ${dockerfile} ${buildContext}
    """
}

return this