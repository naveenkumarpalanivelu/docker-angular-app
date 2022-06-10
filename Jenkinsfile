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
                s3Upload consoleLogLevel: 'INFO', dontSetBuildResultOnFailure: false, dontWaitForConcurrentBuildCompletion: false, entries: [[bucket: 'devops-demo-artifacts', excludedFile: '/dist', flatten: false, gzipFiles: false, keepForever: false, managedArtifacts: false, noUploadOnFailure: false, selectedRegion: 'us-east-1', showDirectlyInBrowser: false, sourceFile: '**/dist/docker-angular-app/', storageClass: 'STANDARD', uploadFromSlave: false, useServerSideEncryption: false]], pluginFailureResultConstraint: 'FAILURE', profileName: 'S3-Artifacts', userMetadata: []
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
                sh 'kubectl apply -f Deployment-frontend.yaml'
            }
        }
    }
}
