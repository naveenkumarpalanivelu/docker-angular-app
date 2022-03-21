pipeline {
    agent any
    tools {nodejs 'nodejs'}
    stages {
        stage("Install project dependencies") {
            steps {
                sh 'npm install'
            }
        }
        stage("Build Artifact") {
            steps {
                sh 'npm run build'
            }
        }
    }
}