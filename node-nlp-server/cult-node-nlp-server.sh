if [ -z $1 ] 
then
    echo "please add a space followed by a port number at the end of ./start-server.sh"
else
    ts-node src/node-nlp-server.ts $1
fi
