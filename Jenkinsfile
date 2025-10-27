pipeline {
    agent any
    options {
        skipDefaultCheckout(true)
        timestamps()
    }
    parameters {
        choice(name: 'K3S_TARGET', choices: ['KAHITOZ', 'NAMAN', 'BOTH'], description: 'Select the K3s node(s) to deploy to')
    }
    environment {
        IMAGE_NAME = 'naman-portfolio'
        IMAGE_TAG = 'latest'
        REG1 = 'registrypush.kahitoz.com:5000'
        REG2 = 'registry.kahitoz.com'
        K8S_NAMESPACE = 'apps'
        DEPLOYMENT_NAME = 'naman-portfolio'
        MANIFESTS_DIR = 'manifests'
        KUBECONFIG_KAHITOZ = '/home/jenkins/.kubekahitoz/config'
        KUBECONFIG_NAMAN = '/home/jenkins/.kubenaman/config'
        DOCKER_CRED_ID = 'docker_creds'
        BUILT_IMAGE = ''
    }
    stages {
        stage('Checkout SCM') {
            steps {
                script {
                    checkout scm
                    env.BUILT_IMAGE = "${env.IMAGE_NAME}:${env.IMAGE_TAG}"
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    def buildStage = load('jenkins-stages/buildImage.groovy')
                    buildStage.run([
                        imageName  : env.IMAGE_NAME,
                        buildContext: '.',
                        dockerfile : 'Dockerfile'
                    ])
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    def pushStage = load('jenkins-stages/pushImage.groovy')
                    def localBuiltImage = env.BUILT_IMAGE?.trim()
                    if (!localBuiltImage) {
                        localBuiltImage = "${env.IMAGE_NAME}:${env.IMAGE_TAG}"
                    }
                    pushStage.run([
                        builtImage   : localBuiltImage,
                        registryPush : env.REG1,
                        registryPull : env.REG2,
                        imageName    : env.IMAGE_NAME,
                        imageTag     : env.IMAGE_TAG,
                        credentialsId: env.DOCKER_CRED_ID
                    ])
                }
            }
        }

        stage('Check Deployment and Deploy') {
            steps {
                script {
                    def deployStage = load('jenkins-stages/deploy.groovy')

                    List<String> targets
                    switch (params.K3S_TARGET) {
                        case 'BOTH':
                            targets = ['KAHITOZ', 'NAMAN']
                            break
                        case 'KAHITOZ':
                            targets = ['KAHITOZ']
                            break
                        case 'NAMAN':
                            targets = ['NAMAN']
                            break
                        default:
                            error "Unsupported K3S_TARGET value: ${params.K3S_TARGET}"
                    }

                    deployStage.run([
                        namespace: env.K8S_NAMESPACE,
                        deploymentName: env.DEPLOYMENT_NAME,
                        manifestsDir: env.MANIFESTS_DIR,
                        kubeconfigKahitoz: env.KUBECONFIG_KAHITOZ,
                        kubeconfigNaman: env.KUBECONFIG_NAMAN,
                        credentialsId: env.DOCKER_CRED_ID,
                        registryPull: env.REG2,
                        targets: targets
                    ])
                }
            }
        }
    }
    post {
        always {
            cleanWs()
        }
    }
}