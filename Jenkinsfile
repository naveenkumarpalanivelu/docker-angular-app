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
                s3Upload consoleLogLevel: 'INFO', dontSetBuildResultOnFailure: false, dontWaitForConcurrentBuildCompletion: false, entries: [[bucket: 'devops-artifacts-2022', excludedFile: '/dist', flatten: false, gzipFiles: false, keepForever: false, managedArtifacts: false, noUploadOnFailure: false, selectedRegion: 'us-east-1', showDirectlyInBrowser: false, sourceFile: '**/dist/docker-angular-app/', storageClass: 'STANDARD', uploadFromSlave: false, useServerSideEncryption: false]], pluginFailureResultConstraint: 'FAILURE', profileName: 'S3-Artifacts', userMetadata: []
            }
        }
    }
}