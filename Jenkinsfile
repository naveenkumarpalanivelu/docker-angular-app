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
        stage("Upload artifacts to S3 bucket") {
            steps {
                withAWS(profile:'S3-Artifacts', region:'us-east-1') {
                    s3Upload(file:'dist/docker-angular-app/', bucket:'devops-demo-artifacts', path:'devops-demo-artifacts/dist/docker-angular-app/')
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
        stage("Run external ansible playbook") {
            steps {
                sh 'pip3 install -U boto3'
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
                    def image_id = "$BUILD_NUMBER"
                    sh "cp docker-frontend.yaml /tmp/devops-s3/dist"
                    sh "cp Dockerfile /tmp/devops-s3/dist"
                    sh "ansible-playbook /tmp/devops-s3/dist/docker-frontend.yaml --extra-vars image_id=${image_id}"
                }
            }
        }
        stage('remove docker images after deployment') {
            steps {
                script {
                    def image_id = "$BUILD_NUMBER"
                    sh "docker image rm naveen24788/frontend:${image_id}"
                    sh "docker image rm frontend:${image_id}"
                }
            }
        }
        stage('Deploy frontend microservice') {
            steps {
                withAWS(credentials: 'kubernetes-cluster', region: 'us-east-1') {
                    sh 'kubectl apply -f Deployment-frontend.yaml'
                }
            }
        }
    }
}
