pipeline {
    agent any
    stages {
        stage("Install project dependencies") {
            steps {
                nodejs('nodejs') {
                    sh 'node --version'
                    sh 'npm --version'
                    sh 'npm install'
                }
            }
        }
        stage("Build Artifact") {
            steps {
                nodejs('nodejs') {
                    sh 'npm run build'
                }
            }
        }
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
                    sh "cp -a dist/. /tmp/devops-s3/dist"
                    sh "cp docker-frontend.yaml /tmp/devops-s3/dist"
                    sh "cp Dockerfile /tmp/devops-s3/dist"
                    sh "ansible-playbook /tmp/devops-s3/dist/docker-frontend.yaml --extra-vars image_id=${image_id}"
                }
            }
        }
    }
}
