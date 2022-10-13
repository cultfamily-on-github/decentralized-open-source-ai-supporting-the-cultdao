
if [ "$1" = "" ] 
then
    echo "please provide either locally or production mode as a parameter when calling this shell script"

else


if [ "$1" = "locally" ]
then

    echo "starting the cultbot server locally"
    deno run --allow-read --allow-net --allow-write --allow-env --unstable src/cult-bot/cult-bot-server.ts 8049

fi


if [ "$1" = "production mode" ]
then
    echo "starting the cultbot server in production mode"
    pm2 start src/cult-bot/cult-bot-server.ts --interpreter="deno" --interpreter-args="run --allow-read --allow-write --allow-env --allow-net --unstable" -- 11443
fi 
fi 
