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
    }
}
