node {
       stage('SCM Checkout') { 
            checkout([$class: 'GitSCM', branches: [[name: '*/master']],
            userRemoteConfigs: [[credentialsId: 'db49e728-bf73-4961-bb8f-a34924f760b2', 
            url: 'https://github.com/rohanjoshi95/frontend.git']]])
       }
        stage ('build package')  {
            sh '''
            ng build
            '''
        }
        stage("Build Docker Image"){
            docker.withRegistry('https://registry.hub.docker.com', 'db49e728-bf73-4961-bb8f-a34924f760b2') {
            def customImage = docker.build("rohanjoshi95/frontend:latest")
            customImage.push()
            }
        }
        stage('Deployment on Dev Environment'){
		    sh '''
			scp /var/lib/jenkins/workspace/frontend/deployment ec2-user@198.60.105.2:/frontend/deployment
			'''
		    sshagent (credentials: ['deploy-dev']) {
				sh 'ssh -o StrictHostKeyChecking=no -l ec2-user@198.60.105.2'
				sh kubectl apply -f /frontend/deployment/frontend-deployment.yml
			}
        }
        stage ('Approval For Production Deployment')  {
            echo "Taking approval from Prod Manager"     
            timeout(time: 10, unit: 'DAYS') {
            input message: 'Deploy into Production after UAT', submitter: 'rohanjoshi95'
            }
         }
        stage('Deployment on Prod Environment'){
		    sh '''
			scp /var/lib/jenkins/workspace/frontend/deployment ec2-user@198.60.108.2:/frontend/deployment
			'''
		    sshagent (credentials: ['deploy-prod']) {
				sh 'ssh -o StrictHostKeyChecking=no -l ec2-user@198.60.108.2'
				sh kubectl apply -f /frontend/deployment/frontend-deployment.yml
			}
        }
}