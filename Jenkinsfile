pipeline {
    agent any
    stages {
        stage("Run ansible playbook") {
            steps {
                ansiblePlaybook(playbook: 'devops-playbook/aws_external_s3.yaml')
            }
        }
    }
}
