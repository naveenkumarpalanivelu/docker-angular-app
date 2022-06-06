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
        stage("Run external ansible playbook") {
            steps {
                sh 'pip3 install -U boto3'
                sh 'ansible --version'
                sh 'python --version'
            }
        }
        stage("Run ui ansible playbook") {
            steps {
                sh "ansible-playbook aws_backend_s3.yaml"
            }
        }
        stage("Docker stage") {
            steps {
                script {
                    def image_id = "$BUILD_NUMBER"
                    sh "cp docker-backend.yaml /tmp/devops-s3/target"
                    sh "cp Dockerfile /tmp/devops-s3/target"
                    sh "ansible-playbook /tmp/devops-s3/target/docker-backend.yaml --extra-vars image_id=${image_id}"
                }
            }
        }
        stage('Deploy frontend microservice') {
            steps {
                sh 'kubectl apply -f Deployment-frontend.yaml'
            }
        }
    }
}
