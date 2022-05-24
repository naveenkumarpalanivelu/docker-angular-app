pipeline {
    agent any
    stages {
        stage("Ansible Init") {
            steps {
                script {
                    def tfHome = tool name: 'ansible'
                    env.PATH = "${tfHome}:${env.PATH}"
                    sh 'ansible --version'
                }
            }
        }
        stage("Run ansible playbook") {
            steps {
                sh "ansible-playbook aws_external_s3.yaml"
            }
        }
    }
}
