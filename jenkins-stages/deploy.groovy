def run(Map args) {
    def namespace = args.namespace ?: 'apps'
    def deploymentName = args.deploymentName ?: 'kahichan-frontend'
    def manifestsDir = args.manifestsDir ?: 'manifests'
    def kubeconfigKahitoz = args.kubeconfigKahitoz
    def kubeconfigNaman = args.kubeconfigNaman
    def targets = args.targets ?: []
    def credentialsId = args.credentialsId
    def registryPull = args.registryPull

    if (!credentialsId || !registryPull) {
        error 'deploy.groovy requires credentialsId and registryPull parameters.'
    }

    if (targets.isEmpty()) {
        error 'No deployment targets provided.'
    }

    targets.each { target ->
        String kubeconfig
        switch (target) {
            case 'KAHITOZ':
                kubeconfig = kubeconfigKahitoz
                break
            case 'NAMAN':
                kubeconfig = kubeconfigNaman
                break
            default:
                error "Unsupported target ${target}"
        }

        if (!kubeconfig) {
            error "Kubeconfig not provided for target ${target}"
        }

        echo "Processing deployment on ${target} cluster"

        withEnv(["KUBECONFIG=${kubeconfig}"]) {
            sh """
              kubectl create namespace ${namespace} --dry-run=client -o yaml | kubectl apply -f -
            """

            withCredentials([usernamePassword(credentialsId: credentialsId, passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                sh """
                  kubectl -n ${namespace} create secret docker-registry regcred \
                    --docker-server=${registryPull} \
                    --docker-username=${'$'}DOCKER_USERNAME \
                    --docker-password=${'$'}DOCKER_PASSWORD \
                    --dry-run=client -o yaml | kubectl apply -f -
                """
            }

            sh "kubectl apply -f ${manifestsDir}/service.yaml"
            sh "kubectl apply -f ${manifestsDir}/ingress.yaml"

            int status = sh(script: "kubectl get deployment ${deploymentName} -n ${namespace}", returnStatus: true)

            sh "kubectl apply -f ${manifestsDir}/deployment.yaml"

            if (status == 0) {
                echo "Deployment exists on ${target}. Performing rolling restart."
                sh "kubectl rollout restart deployment/${deploymentName} -n ${namespace}"
            } else {
                echo "Deployment created on ${target}."
            }

            sh "kubectl rollout status deployment/${deploymentName} -n ${namespace}"
        }
    }
}

return this