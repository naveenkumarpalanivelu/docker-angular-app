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
                ansiblePlaybook(inventory: 'inventories/a/hosts', playbook: 'ansible-playbook aws_external_s3.yaml')
            }
        }
    }
}
