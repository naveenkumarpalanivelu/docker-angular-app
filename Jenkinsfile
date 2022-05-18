pipeline {
    agent any
    stages {
        stage("Upload artifacts to S3 bucket") {
            steps {
                s3Upload consoleLogLevel: 'INFO', dontSetBuildResultOnFailure: false, dontWaitForConcurrentBuildCompletion: false, entries: [[bucket: 'devops-artifacts-2022', excludedFile: '/dist', flatten: false, gzipFiles: false, keepForever: false, managedArtifacts: false, noUploadOnFailure: false, selectedRegion: 'us-east-1', showDirectlyInBrowser: false, sourceFile: '**/dist/docker-angular-app/', storageClass: 'STANDARD', uploadFromSlave: false, useServerSideEncryption: false]], pluginFailureResultConstraint: 'FAILURE', profileName: 'S3-Artifacts', userMetadata: []
            }
        }
        stage("Run ansible playbook") {
            steps {
                ansiblePlaybook(playbook: '/home/ec2-user/devops-playbook/aws_external_s3.yaml')
            }
        }
    }
}
