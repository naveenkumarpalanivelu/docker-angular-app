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
        stage("Run ansible playbook") {
            steps {
                sh 'pip3 install -U boto3'
                sh 'pip install -U boto'
                sh 'ansible --version'
                sh 'python --version'
                sh "ansible-playbook aws_external_s3.yaml"
            }
        }
    }
}
