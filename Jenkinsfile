pipeline {
    agent any
    stages {
        stage("Ansible Init") {
            steps {
                script {
                    def tfHome = tool name: 'ansible'
                    env.PATH = "${tfHome}:${env.PATH}"
                    sh 'ansible --version'
                    sh 'python --version'
                }
            }
        }
        stage("Docker stage") {
            steps {
                script {
                    def image_id = "$BUILD_NUMBER"
                    sh "cp -R dist/docker-angular-app/* /tmp/devops-s3/dist/docker-angular-app/"
                    sh "cp docker-frontend.yaml /tmp/devops-s3/dist"
                    sh "cp Dockerfile /tmp/devops-s3/dist"
                    sh "ansible-playbook /tmp/devops-s3/dist/docker-frontend.yaml --extra-vars image_id=${image_id}"
                }
            }
        }
    }
}
