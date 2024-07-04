## Pipeline script

```bash
node {
    try {
        stage('fetch'){
            git branch: '$GIT_BRANCH', url: '$GIT_REMOTE'
        }
        stage('deploy'){
            sh '$DEPLOY_SHELL'
        }
        stage('notify'){
            emailext body: '您好：<br/>项目构建成功！<br/> 项目地址：<a href="$WEB_URL">$WEB_URL</a> <br/> $PROJECT_NAME - Build # $BUILD_NUMBER - <font color="green">$BUILD_STATUS</font>: <br/>Check console output at $BUILD_URL to view the results.', subject: 'jenkins通知：$PROJECT_NAME - Build # $BUILD_NUMBER - $BUILD_STATUS!', to: '$SUCCESS_EMAIL_LIST'
        }
    } catch(e){
        currentBuild.result = "FAILED"
        emailext body: '您好：<br/>项目构建失败！<br/>请查看 $PROJECT_NAME - Build # $BUILD_NUMBER - <font color="red">$BUILD_STATUS</font>: <br/>Check console output at $BUILD_URL to view the results.', subject: '你好：你的项目构建失败，请查看$PROJECT_NAME - Build # $BUILD_NUMBER - $BUILD_STATUS!', to: '$FAIL_EMAIL_LIST'
        throw e
    }
}

```
