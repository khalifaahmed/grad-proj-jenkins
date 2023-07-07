def build () {
    echo "Building the Docker image..."

    sh "echo 'jenkins BUILD_NUMBER' :: $BUILD_NUMBER"

    // //Building the docker image
    // sh "cd ./network ; docker build -t network:1.0 ."
    // sh "cd ./issuetracker_angular ; docker build -t issuetracker-angular:1.0 ."
    // sh "cd ./issuetracker_api ; docker build -t issuetracker-api:1.0 ."

    // //Pushing the docker image to DockerHub
    // withCredentials([usernamePassword(credentialsId: 'dockerHub', passwordVariable: 'PASS', usernameVariable: 'USER')]){
    //     sh "echo $PASS | docker login -u $USER --password-stdin"
    //     sh "docker tag network:1.0 9529777/network:1.0"
    //     sh "docker push 9529777/network:1.0"
    //     sh "docker tag issuetracker-angular:1.0 9529777/issuetracker-angular:1.0"
    //     sh "docker push 9529777/issuetracker-angular:1.0"
    //     sh "docker tag issuetracker-api:1.0 9529777/issuetracker-api:1.0"
    //     sh "docker push 9529777/issuetracker-api:1.0"
    // } 
    

    // //Pushing the docker image to private AWS ECR Registry
    // sh "aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 766285842753.dkr.ecr.us-east-1.amazonaws.com"
    // //sh "docker tag grad-proj-app:1.0 766285842753.dkr.ecr.us-east-1.amazonaws.com/grad-proj-app:1.0"
    // //sh "docker push 766285842753.dkr.ecr.us-east-1.amazonaws.com/grad-proj-app:1.0"    

}

def test () {
    echo "testint the app... "
}

def deploy () {
    echo "Deploying the app on kubernetes... "

    //create docker secret to pull our private image from docker hub        
    sh "kubectl create secret docker-registry my-docker-registry-key --docker-server=docker.io --docker-username=9529777 --docker-password=ahmed@12345"
    
    //deploy the nginx-ingress controller to perform the ingress rules in the ingress.yaml file 
    sh "helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx ; helm repo update"
    sh "helm install grad-proj-ingress-controller ingress-nginx/ingress-nginx"
    // sh "helm install grad-proj ingress-nginx/ingress-nginx -f grad_proj_values.yaml"

    //deploy a metric server so as to make autoscaling based on some metrics of pods
    sh "kubectl apply -f components.yaml ; sleep 50"
    sh "kubectl top nodes"
    sh "kubectl top pods"

    //deploy our application using helm our chart
    sh "helm install grad-proj-app-1 grad-proj-app"

}

return this