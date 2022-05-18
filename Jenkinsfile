pipeline {
    agent any
    stages {
        stage("Run ansible playbook") {
            steps {
                ansiblePlaybook(playbook: '/home/ec2-user/devops-playbook/aws_external_s3.yaml')
            }
        }
    }
}
