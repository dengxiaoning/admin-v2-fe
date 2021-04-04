#!/bin/sh
GIT_HOME=/opt/developer/git-repository/
DEST_PATH=/opt/product/front/

if [ ! -n "$1" ];
then
    echo -e "Please input a project name! You can input as follows:"
    echo -e "./fe-deploy.sh admin-v2-fe"
    exit
fi

if [ $1 = "admin-v2-fe" ];
then
    echo -e "----------------Enter Project---------------"
    cd $GIT_HOME$1
else
    echo -e "Invalid Project Name!"
    exit
fi

# clean dist 
echo -e "----------------Clean Dist---------------"
rm -rf ./learn-admin-react

echo -e "----------------Git  Pull---------------"
git pull



echo -e "----------------Npm Install --unsafe-perm=true --allow-root---------------"
npm install --unsafe-perm=true --allow-root


echo -e "----------------Npm run Dist---------------"
npm run dist


if [ -d "./learn-admin-react" ];
then
    echo -e "----------------Clean Dist ---------------"
    rm -rf $DEST_PATH/learn-admin-react

    echo -e "----------------Copy Dist---------------"
    cp -R ./learn-admin-react $DEST_PATH/$1/


    echo -e "----------------Deploy Success---------------"
else
    echo -e "----------------Deploy Fail---------------"
fi