apt update -y && apt upgrade -y 


apt install npm 
npm i -g pm2
npm i -g ts-node
npm i -g typescript

apt install unzip -y 

curl -fsSL https://deno.land/x/install/install.sh | sh

mv /root/.deno/bin/deno /usr/bin/