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
                sh 'pip install -U boto'
                sh 'ansible --version'
                sh 'python --version'
                sh "ansible-playbook aws_external_s3.yaml"
            }
        }
        stage("Run ui ansible playbook") {
            steps {
                sh "ansible-playbook aws_ui_s3.yaml"
            }
        }
        stage("Docker stage") {
            steps {
                script {
                    def image_id = "0.0.6"
                    sh "cp docker-frontend.yaml /tmp/devops-s3/dist"
                    sh "cp Dockerfile /tmp/devops-s3/dist"
                    sh "ansible-playbook /tmp/devops-s3/dist/docker-frontend.yaml --extra-vars image_id=${image_id}"
                }
            }
        }
    }
}
