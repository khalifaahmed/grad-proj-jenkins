def gv
pipeline{
  agent any
  environment{
    APP_NAME = 'grad-proj-app'
    ECR_REPO  = '766285842753.dkr.ecr.us-east-1.amazonaws.com'
    ECR_IMAGE = '766285842753.dkr.ecr.us-east-1.amazonaws.com/grad-proj-app'
    DOCKERHUB_REPO = '9529777/grad-proj-app:1.0'
  }
    stages {
      stage("init"){
        steps{
          script{
            gv = load "script.groovy"
          }  
        }
      }
      stage("build"){
        steps{
          script{
            gv.build()
          }
        }
      }
      stage("test"){
        steps{
          script{
            gv.test()
          }
        }
      }      
      stage("deploy"){
        steps{
          script{
            gv.deploy()
          }
        }
      }      
    }
}